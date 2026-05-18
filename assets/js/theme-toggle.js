// Global light/dark theme toggle.
// Source of truth: html[data-theme] attr + the `theme` key inside
// localStorage["asherif-tweaks"]. Stays in sync with the Tweaks panel
// (tweaks.jsx) via the `asherif:theme` CustomEvent.

(function () {
  const STORAGE_KEY = 'asherif-tweaks';

  function readStored() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function writeStored(patch) {
    try {
      const merged = { ...readStored(), ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {}
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme, source) {
    document.documentElement.setAttribute('data-theme', theme);
    writeStored({ theme });
    updateButtons(theme);
    window.dispatchEvent(new CustomEvent('asherif:theme', {
      detail: { theme, source: source || 'toggle' },
    }));
  }

  function updateButtons(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function flip() {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  // Click delegation — works even if buttons are added later.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-toggle]');
    if (btn) { e.preventDefault(); flip(); }
  });

  // Reflect external changes (Tweaks panel radio) on our button.
  window.addEventListener('asherif:theme', (e) => {
    if (e.detail && e.detail.source !== 'toggle') {
      updateButtons(e.detail.theme);
    }
  });

  // Initial state — the inline head script already set data-theme to
  // prevent FOUC; we just sync the buttons.
  updateButtons(currentTheme());

  // Expose for tweaks.jsx
  window.__asherifTheme = { apply: applyTheme, current: currentTheme };
})();
