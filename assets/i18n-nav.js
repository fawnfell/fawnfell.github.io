(() => {
  const STORAGE_KEY = 'ff_lang';
  const SESSION_AUTO_KEY = 'ff_auto_done';
  const SUPPORTED = ['en', 'ja', 'ko', 'zh-Hant'];
  const BOT_RE = /bot|crawl|spider|slurp|GPTBot|ClaudeBot|PerplexityBot|Googlebot|bingbot|Applebot|Bytespider|DuckDuckBot/i;

  function normLang(raw) {
    if (!raw) return null;
    const s = String(raw).trim().toLowerCase();
    if (s === 'en' || s.startsWith('en-')) return 'en';
    if (s === 'ja' || s.startsWith('ja-')) return 'ja';
    if (s === 'ko' || s.startsWith('ko-')) return 'ko';
    if (s === 'zh-hant' || s === 'zh-tw' || s === 'zh-hk' || s === 'zh-mo' || s.startsWith('zh-hant')) {
      return 'zh-Hant';
    }
    return null;
  }

  function detectSystemLang() {
    const prefs = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    for (const item of prefs) {
      const hit = normLang(item);
      if (hit) return hit;
    }
    return 'en';
  }

  function getAltMap() {
    const map = {};
    for (const el of document.querySelectorAll('link[rel="alternate"][hreflang]')) {
      const code = normLang(el.getAttribute('hreflang'));
      const href = el.getAttribute('href');
      if (code && href && SUPPORTED.includes(code)) {
        try {
          const u = new URL(href, location.origin);
          map[code] = u.pathname + u.search;
        } catch {
          map[code] = href;
        }
      }
    }
    return map;
  }

  function safeGet(store, key) {
    try { return store.getItem(key); } catch { return null; }
  }

  function safeSet(store, key, val) {
    try { store.setItem(key, val); } catch {}
  }

  const pageLang = normLang(document.documentElement.lang) || 'en';
  const isBot = BOT_RE.test(navigator.userAgent || '');
  const savedLang = normLang(safeGet(localStorage, STORAGE_KEY));
  const altMap = getAltMap();

  if (!isBot && pageLang === 'en' && Object.keys(altMap).length > 1) {
    let targetLang = savedLang;
    if (!targetLang && !safeGet(sessionStorage, SESSION_AUTO_KEY)) {
      targetLang = detectSystemLang();
      safeSet(sessionStorage, SESSION_AUTO_KEY, '1');
    }
    if (targetLang && targetLang !== pageLang && altMap[targetLang]) {
      const dest = altMap[targetLang] + location.hash;
      if (location.pathname + location.search + location.hash !== dest) {
        location.replace(dest);
        return;
      }
    }
  }

  const ROUTE_MAP = {
    '/': { en: '/', ja: '/ja/', ko: '/ko/', 'zh-Hant': '/zh-tw/' },
    '/products/': { en: '/products/', ja: '/products/ja/', ko: '/products/ko/', 'zh-Hant': '/products/zh-tw/' },
    '/products/executive-reborn/': {
      en: '/products/executive-reborn/',
      ja: '/products/executive-reborn/ja/',
      ko: '/products/executive-reborn/ko/',
      'zh-Hant': '/products/executive-reborn/zh-tw/',
    },
    '/products/executive-reborn/preview/': {
      en: '/products/executive-reborn/preview/',
      ja: '/products/executive-reborn/ja/preview/',
      ko: '/products/executive-reborn/ko/preview/',
      'zh-Hant': '/products/executive-reborn/zh-tw/preview/',
    },
  };

  function rewriteInternalLinks(lang) {
    if (!lang || !SUPPORTED.includes(lang)) return;
    for (const a of document.querySelectorAll('a[href]')) {
      if (a.closest('#lang-menu') || a.hasAttribute('data-set-lang')) continue;
      const raw = a.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || /^https?:/i.test(raw)) continue;
      const hashIdx = raw.indexOf('#');
      const pathPart = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
      const hashPart = hashIdx >= 0 ? raw.slice(hashIdx) : '';
      if (ROUTE_MAP[pathPart] && ROUTE_MAP[pathPart][lang]) {
        a.setAttribute('href', ROUTE_MAP[pathPart][lang] + hashPart);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const activePref = savedLang || (safeGet(sessionStorage, SESSION_AUTO_KEY) ? detectSystemLang() : null);
    if (activePref && activePref !== pageLang && Object.keys(altMap).length <= 1) {
      rewriteInternalLinks(activePref);
    }

    const menu = document.getElementById('lang-menu');
    const btn = document.querySelector('.lang-btn[popovertarget="lang-menu"]');
    if (menu) {
      menu.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-set-lang]');
        if (!link) return;
        const chosen = normLang(link.dataset.setLang);
        if (chosen) {
          safeSet(localStorage, STORAGE_KEY, chosen);
        }
      });

      if (btn && typeof CSS !== 'undefined' && !CSS.supports('position-area', 'block-end')) {
        menu.addEventListener('toggle', (e) => {
          if (e.newState !== 'open') return;
          const r = btn.getBoundingClientRect();
          const m = menu.getBoundingClientRect();
          const top = Math.min(r.bottom + 8, window.innerHeight - m.height - 8);
          const left = Math.max(8, Math.min(r.right - m.width, window.innerWidth - m.width - 8));
          menu.style.top = `${Math.max(8, top)}px`;
          menu.style.left = `${left}px`;
        });
      }
    }
  });
})();
