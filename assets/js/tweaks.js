// Tweaks panel for asherif.me
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 35,
  "accentChroma": 0.14,
  "bgHue": 80,
  "density": "regular",
  "displayFont": "Instrument Serif",
  "showTicker": true,
  "theme": "light"
} /*EDITMODE-END*/;
const DISPLAY_FONTS = ["Instrument Serif", "Playfair Display", "DM Serif Display", "Fraunces", "EB Garamond"];
function applyTweaks(t) {
  const root = document.documentElement;
  const dark = t.theme === "dark";

  // Lightness stops — inverted for dark mode
  const L = dark ? {
    bg: 0.16,
    sunk: 0.19,
    paper: 0.22,
    ink: 0.94,
    inkSoft: 0.74,
    inkFaint: 0.50,
    rule: 0.30,
    ruleSoft: 0.25,
    accent: 0.68,
    accentInk: 0.78
  } : {
    bg: 0.975,
    sunk: 0.955,
    paper: 0.99,
    ink: 0.15,
    inkSoft: 0.28,
    inkFaint: 0.42,
    rule: 0.78,
    ruleSoft: 0.86,
    accent: 0.54,
    accentInk: 0.34
  };
  root.style.setProperty('--accent', `oklch(${L.accent} ${t.accentChroma} ${t.accentHue})`);
  root.style.setProperty('--accent-ink', `oklch(${L.accentInk} ${Math.max(t.accentChroma - 0.04, 0.04)} ${t.accentHue})`);
  root.style.setProperty('--bg', `oklch(${L.bg} 0.008 ${t.bgHue})`);
  root.style.setProperty('--bg-sunk', `oklch(${L.sunk} 0.01 ${t.bgHue})`);
  root.style.setProperty('--paper', `oklch(${L.paper} 0.006 ${t.bgHue})`);
  root.style.setProperty('--ink', `oklch(${L.ink} 0.012 ${t.bgHue})`);
  root.style.setProperty('--ink-soft', `oklch(${L.inkSoft} 0.012 ${t.bgHue})`);
  root.style.setProperty('--ink-faint', `oklch(${L.inkFaint} 0.012 ${t.bgHue})`);
  root.style.setProperty('--rule', `oklch(${L.rule} 0.012 ${t.bgHue})`);
  root.style.setProperty('--rule-soft', `oklch(${L.ruleSoft} 0.01 ${t.bgHue})`);
  root.style.setProperty('--ff-serif', `"${t.displayFont}", "Times New Roman", serif`);
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  // Notify the topbar theme button so it can update its icon/aria state.
  window.dispatchEvent(new CustomEvent('asherif:theme', {
    detail: {
      theme: dark ? 'dark' : 'light',
      source: 'tweaks'
    }
  }));
  const scale = t.density === "dense" ? 14 : t.density === "airy" ? 18 : 16;
  document.body.style.fontSize = scale + 'px';
  const ticker = document.querySelector('.ticker');
  if (ticker) ticker.style.display = t.showTicker ? '' : 'none';

  // Ensure display font is loaded
  const id = 'tweak-font-link';
  let link = document.getElementById(id);
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  const fam = t.displayFont.replace(/ /g, '+');
  link.href = `https://fonts.googleapis.com/css2?family=${fam}:ital@0;1&display=swap`;
}
function TweaksApp() {
  const [t, setT] = window.useTweaks(_initial);

  // Sync state when the topbar theme-toggle flips theme externally.
  React.useEffect(() => {
    const onExtTheme = e => {
      if (e.detail && e.detail.source === 'toggle' && e.detail.theme !== t.theme) {
        setT({
          theme: e.detail.theme
        });
      }
    };
    window.addEventListener('asherif:theme', onExtTheme);
    return () => window.removeEventListener('asherif:theme', onExtTheme);
  }, [t.theme, setT]);
  React.useEffect(() => {
    applyTweaks(t);
    try {
      localStorage.setItem('asherif-tweaks', JSON.stringify(t));
    } catch (e) {}
  }, [t]);
  return /*#__PURE__*/React.createElement(window.TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Theme"
  }, /*#__PURE__*/React.createElement(window.TweakRadio, {
    value: t.theme,
    options: [{
      label: "Light",
      value: "light"
    }, {
      label: "Dark",
      value: "dark"
    }],
    onChange: v => setT({
      theme: v
    })
  })), /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Accent color"
  }, /*#__PURE__*/React.createElement(window.TweakSlider, {
    label: "Hue",
    value: t.accentHue,
    min: 0,
    max: 360,
    step: 5,
    onChange: v => setT({
      accentHue: v
    })
  }), /*#__PURE__*/React.createElement(window.TweakSlider, {
    label: "Chroma",
    value: t.accentChroma,
    min: 0,
    max: 0.24,
    step: 0.01,
    onChange: v => setT({
      accentChroma: v
    })
  })), /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Paper warmth"
  }, /*#__PURE__*/React.createElement(window.TweakSlider, {
    label: "Hue",
    value: t.bgHue,
    min: 0,
    max: 360,
    step: 5,
    onChange: v => setT({
      bgHue: v
    })
  })), /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Typography"
  }, /*#__PURE__*/React.createElement(window.TweakSelect, {
    label: "Display font",
    value: t.displayFont,
    options: DISPLAY_FONTS.map(f => ({
      label: f,
      value: f
    })),
    onChange: v => setT({
      displayFont: v
    })
  })), /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Density"
  }, /*#__PURE__*/React.createElement(window.TweakRadio, {
    value: t.density,
    options: [{
      label: "Dense",
      value: "dense"
    }, {
      label: "Regular",
      value: "regular"
    }, {
      label: "Airy",
      value: "airy"
    }],
    onChange: v => setT({
      density: v
    })
  })), /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Chrome"
  }, /*#__PURE__*/React.createElement(window.TweakToggle, {
    label: "Show ticker",
    value: t.showTicker,
    onChange: v => setT({
      showTicker: v
    })
  })));
}

// Apply defaults on load (before tweak panel opens)
// Try localStorage first for cross-page persistence
let _initial = {
  ...TWEAK_DEFAULTS
};
try {
  const stored = localStorage.getItem('asherif-tweaks');
  if (stored) _initial = {
    ..._initial,
    ...JSON.parse(stored)
  };
} catch (e) {}

// System preference on first visit (only if no stored value)
try {
  if (!localStorage.getItem('asherif-tweaks') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    _initial.theme = 'dark';
  }
} catch (e) {}
applyTweaks(_initial);
const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(/*#__PURE__*/React.createElement(TweaksApp, null));
