// books-ticker.js
//
// Reads data/books.json (written by the GitHub Action) and injects live
// reading status into the ticker. Falls back silently to the static
// markup if the file is missing, empty, or the fetch fails — so the
// page always has *something* in those slots.
//
// Markup contract: any element with `data-book-slot="N"` is replaced
// with the Nth entry from the prioritised list:
//   0..K-1 — currently_reading
//   K..    — recent (most recent finish first)

(async function () {
  function fmt(prefix, b) {
    if (!b || !b.title) return null;
    const who = b.author ? `, ${b.author}` : '';
    return `${prefix} — ${b.title}${who}`;
  }

  let data;
  try {
    const res = await fetch('/data/books.json', { cache: 'no-store' });
    if (!res.ok) return;
    data = await res.json();
  } catch {
    return; // network/parse fail → keep static fallback
  }

  const items = [];
  (data.currently_reading || []).forEach(b => {
    const line = fmt('Reading', b);
    if (line) items.push(line);
  });
  (data.recent || []).slice(0, 2).forEach(b => {
    const line = fmt('Recently finished', b);
    if (line) items.push(line);
  });

  if (items.length === 0) return; // empty feed → keep static fallback

  document.querySelectorAll('[data-book-slot]').forEach(el => {
    const idx = parseInt(el.dataset.bookSlot, 10);
    if (Number.isFinite(idx) && items[idx]) {
      el.textContent = items[idx];
    }
  });
})();
