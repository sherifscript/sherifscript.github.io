# /data — reading feed

This folder is **written by GitHub Actions**, not by hand. Don't edit `books.json` directly — it gets overwritten every 6 hours.

## Files

| File | Purpose | Edit by hand? |
|---|---|---|
| `books.json` | Cached snapshot of your Hardcover shelves. Read by the site at runtime. | No — managed by `.github/workflows/refresh-books.yml`. |
| `excluded_books.json` | Manual blocklist. JSON array of Hardcover book IDs (as strings) that should NEVER appear on the site. | **Yes.** Add IDs here whenever you want belt-and-suspenders filtering. |

## How the feed updates

1. Every 6 hours, the **Refresh reading feed** workflow runs on GitHub's servers.
2. It reads `HARDCOVER_TOKEN` from GitHub Secrets (never from this repo).
3. It calls Hardcover's GraphQL API for your currently-reading and recently-finished shelves.
4. It filters out any book matching:
   - NSFW genre tags (`erotica`, `adult`, `romance-erotica`, `porn` — see `fetch-books.mjs` to extend)
   - Anything in `excluded_books.json`
5. It writes a sanitised snapshot to `books.json` and commits the change.
6. GitHub Pages serves the new `books.json`; the site re-renders the ticker on next page load.

## How to add a book to the blocklist

Find the book's Hardcover ID (visible in the URL or via the API). Add it as a quoted string to the array:

```json
["123456", "789012"]
```

Push that change. The next workflow run picks it up.

## How to trigger a refresh on demand

GitHub → repo → **Actions** tab → **Refresh reading feed** → **Run workflow** (top right). Useful when you've just added a book to Hardcover and want it live immediately.
