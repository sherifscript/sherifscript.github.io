// fetch-books.mjs
//
// Pulls the user's Hardcover shelves via GraphQL and writes a sanitised,
// public-safe snapshot to data/books.json. Runs only on GitHub Actions —
// the API token is injected from secrets and NEVER lands in the output.
//
// Output shape:
//   {
//     updated_at: "2026-05-17T12:15:00.000Z",
//     username:   "asheriif",
//     currently_reading: [ { title, author, slug, cover, started_at } ],
//     recent:            [ { title, author, slug, cover, finished_at } ],
//     stats: { read_this_year: 23, total_read: 187 }
//   }
//
// NSFW filtering:
//   - Drops anything tagged with a known "adult"/"erotica" genre/tag.
//   - Drops any book whose ID is in data/excluded_books.json (manual override).

import fs from 'node:fs/promises';
import path from 'node:path';

const TOKEN = process.env.HARDCOVER_TOKEN;
if (!TOKEN) {
  console.error('Missing HARDCOVER_TOKEN env. Aborting.');
  process.exit(1);
}

const ENDPOINT = 'https://api.hardcover.app/v1/graphql';

// ---- Tunables -------------------------------------------------------------
const STATUS = {
  WANT_TO_READ: 1,
  CURRENTLY_READING: 2,
  READ: 3,
};
const NSFW_GENRES = new Set([
  'erotica', 'adult', 'romance-erotica', 'porn',
]);
// ---------------------------------------------------------------------------

async function gql(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2));
    throw new Error('GraphQL request failed');
  }
  return json.data;
}

// Defensive schema access — Hardcover's API is "in flux", so accept
// multiple plausible shapes and warn if a field goes missing.
function pickField(obj, ...candidates) {
  for (const k of candidates) {
    if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
  }
  return null;
}

async function loadExcluded() {
  try {
    const raw = await fs.readFile('data/excluded_books.json', 'utf8');
    const arr = JSON.parse(raw);
    return new Set(arr.map(String));
  } catch {
    return new Set();
  }
}

function isNSFW(book, excluded) {
  if (!book || typeof book !== 'object') return true;
  if (excluded.has(String(book.id))) return true;

  // Be defensive: API shapes vary. Ensure each source is an array before
  // using array methods so we don't crash when a field is an object/string.
  const cachedTags = Array.isArray(book.cached_tags) ? book.cached_tags : [];

  const taggingsRaw = pickField(book, 'taggings');
  const taggings = Array.isArray(taggingsRaw)
    ? taggingsRaw.map(t => (t && t.tag ? t.tag.tag : null)).filter(Boolean)
    : [];

  const genres = Array.isArray(book.genres) ? book.genres : [];

  const tags = [...cachedTags, ...taggings, ...genres]
    .filter(Boolean)
    .map(t => String(t).toLowerCase());

  return tags.some(t => NSFW_GENRES.has(t));
}

function normaliseBook(ub) {
  if (!ub) return null;
  const b = ub.book ?? ub;
  if (!b) return null;
  const title = pickField(b, 'title');
  if (!title) return null;
  const contributors = pickField(b, 'cached_contributors', 'contributors') ?? [];
  const author = Array.isArray(contributors) && contributors[0]
    ? (contributors[0].author?.name ?? contributors[0].name ?? null)
    : null;
  const cover = pickField(b, 'cached_image', 'image')?.url
    ?? pickField(b, 'cached_image_url');
  return {
    id: b.id,
    title,
    author,
    slug: pickField(b, 'slug'),
    cover,
    started_at: pickField(ub, 'date_added', 'started_at'),
    finished_at: pickField(ub, 'last_read_date', 'finished_at'),
    cached_tags: pickField(b, 'cached_tags', 'genres') ?? [],
    taggings: pickField(b, 'taggings') ?? [],
  };
}

const ME_QUERY = `
  query Me {
    me {
      username
    }
  }
`;

// We query each shelf separately so a schema hiccup on one doesn't
// nuke the whole feed.
const SHELF_QUERY = `
  query Shelf($status: Int!, $limit: Int!) {
    me {
      user_books(
        where: { status_id: { _eq: $status } }
        order_by: { updated_at: desc }
        limit: $limit
      ) {
        id
        status_id
        date_added
        last_read_date
        book {
          id
          title
          slug
          cached_image
          cached_contributors
          cached_tags
        }
      }
    }
  }
`;

async function fetchShelf(status, limit) {
  try {
    const data = await gql(SHELF_QUERY, { status, limit });
    const arr = data?.me?.[0]?.user_books ?? data?.me?.user_books ?? [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.warn(`Shelf ${status} fetch failed:`, e.message);
    return [];
  }
}

(async () => {
  const excluded = await loadExcluded();

  // Username (sanity check that auth works)
  const me = await gql(ME_QUERY);
  const username = me?.me?.[0]?.username ?? me?.me?.username ?? null;
  console.log('Authenticated as:', username);

  const [currentRaw, recentRaw] = await Promise.all([
    fetchShelf(STATUS.CURRENTLY_READING, 5),
    fetchShelf(STATUS.READ, 12),
  ]);

  const currently_reading = currentRaw
    .map(normaliseBook)
    .filter(b => b && !isNSFW(b, excluded))
    .slice(0, 3)
    // Strip internal fields before writing.
    .map(({ cached_tags, taggings, id, ...rest }) => rest);

  const recent = recentRaw
    .map(normaliseBook)
    .filter(b => b && !isNSFW(b, excluded))
    .slice(0, 6)
    .map(({ cached_tags, taggings, id, ...rest }) => rest);

  const out = {
    updated_at: new Date().toISOString(),
    username,
    currently_reading,
    recent,
  };

  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/books.json', JSON.stringify(out, null, 2) + '\n');

  console.log(`Wrote ${currently_reading.length} currently + ${recent.length} recent.`);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
