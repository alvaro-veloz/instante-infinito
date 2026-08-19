/* Capa de arte adicional — no toca carrito, catálogo ni checkout */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('ii-js');

  function initPreloader() {
    const pre = document.getElementById('iiPreloader');
    if (!pre) { document.documentElement.classList.add('ii-loaded'); return; }

    const wordEl = pre.querySelector('#iiPreloader__word');
    if (wordEl && !reduceMotion) {
      const text = wordEl.textContent.trim();
      wordEl.textContent = '';
      [...text].forEach((ch, i) => {
        const span = document.createElement('span');
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.style.animationDelay = `${i * 40}ms`;
        wordEl.appendChild(span);
      });
    }

    const release = () => {
      document.documentElement.classList.add('ii-loaded');
      setTimeout(() => pre.remove(), 800);
    };

    if (reduceMotion) {
      release();
      return;
    }
    const minTime = new Promise(res => setTimeout(res, 1150));
    const loaded = new Promise(res => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', res, { once: true });
    });
    Promise.all([minTime, loaded]).then(release);
    setTimeout(release, 4000);
  }

  function initWipeReveal() {
    const els = document.querySelectorAll('[data-wipe]');
    if (!els.length) return;
    if (reduceMotion) { els.forEach(el => el.classList.add('is-wiped')); return; }

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-wiped');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  }

  function initMagnetic() {
    if (reduceMotion || matchMedia('(hover: none)').matches) return;
    const targets = document.querySelectorAll('[data-magnetic]');
    const strength = 0.28;

    targets.forEach(el => {
      let raf = null;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.classList.add('is-pulled');
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${x}px, ${y}px)`;
        });
      });
      el.addEventListener('mouseleave', () => {
        el.classList.remove('is-pulled');
        el.style.transform = '';
      });
    });
  }

  function initCardTilt() {
    if (reduceMotion || matchMedia('(hover: none)').matches) return;
    const maxTilt = 6;
    let current = null;
    let raf = null;

    document.addEventListener('mousemove', e => {
      const wrap = e.target.closest?.('.product-card__img-wrap, .splash-card__img-wrap');
      if (!wrap) {
        if (current) { current.style.transform = ''; current = null; }
        return;
      }
      current = wrap;
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        wrap.style.transform =
          `rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) scale(1.02)`;
      });
    });

    document.addEventListener('mouseleave', e => {
      const wrap = e.target.closest?.('.product-card__img-wrap, .splash-card__img-wrap');
      if (wrap) wrap.style.transform = '';
    }, true);
  }

  function initHeroVideo() {
    if (reduceMotion) return;
    const saveData = navigator.connection?.saveData;
    if (saveData) return;

    document.querySelectorAll('.hero__slide-video[data-autoplay]').forEach(video => {
      video.addEventListener('loadeddata', () => video.classList.add('is-ready'));
      video.addEventListener('error', () => video.classList.remove('is-ready'), true);
      video.preload = 'auto';
      video.load();
      video.play().catch(() => {});
    });
  }

  function initCursor() {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    if (reduceMotion) return;

    const dot = document.createElement('div');
    dot.className = 'ii-cursor is-hidden';
    document.body.appendChild(dot);
    document.documentElement.classList.add('ii-cursor-ready');

    let x = 0, y = 0, raf = null;
    document.addEventListener('mousemove', e => {
      x = e.clientX; y = e.clientY;
      dot.classList.remove('is-hidden');
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      });
    });
    document.addEventListener('mouseleave', () => dot.classList.add('is-hidden'));

    document.addEventListener('mouseover', e => {
      const card = e.target.closest?.('.product-card, .splash-card');
      const link = !card && e.target.closest?.('a, button, [data-magnetic]');
      dot.classList.toggle('ii-cursor--view', !!card);
      dot.classList.toggle('ii-cursor--link', !!link);
    });
  }

  function initPageTransitions() {
    if (reduceMotion) return;
    const overlay = document.createElement('div');
    overlay.id = 'iiPageExit';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    document.addEventListener('click', e => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      const isSameOrigin = url.origin === location.origin;
      const isHtmlNav = /\.html$/.test(url.pathname) || url.pathname === '/' || url.pathname.endsWith('/');
      const isSamePage = url.pathname === location.pathname;
      if (!isSameOrigin || !isHtmlNav || isSamePage) return;
      if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || a.hasAttribute('download')) return;

      e.preventDefault();
      overlay.classList.add('is-active');
      setTimeout(() => { location.href = a.href; }, 420);
    });
  }

  function initHeroParallax() {
    if (reduceMotion) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const layers = hero.querySelectorAll('.hero__slide-bg');
    if (!layers.length) return;

    let raf = null;
    const update = () => {
      const r = hero.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const offset = r.top * -0.08;
      layers.forEach(el => { el.style.transform = `scale(1.15) translateY(${offset}px)`; });
    };
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { update(); raf = null; });
    }, { passive: true });
    update();
  }

  function initTouchZoom() {
    if (matchMedia('(hover:hover)').matches) return; // ya tiene zoom por mouse
    document.addEventListener('click', e => {
      const wrap = e.target.closest?.('.modal__main-img-wrap, .splash-modal__img-wrap');
      if (!wrap) return;
      wrap.classList.toggle('is-zoomed');
    });
  }

  function initFavorites() {
    const KEY = 'ii_favorites';
    const read = () => {
      try { return JSON.parse(localStorage.getItem(KEY)) || []; }
      catch { return []; }
    };
    const write = list => {
      try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
    };

    const paint = () => {
      const saved = read();
      document.querySelectorAll('[data-fav-id]').forEach(btn => {
        const key = `${btn.dataset.favType || 'perfume'}:${btn.dataset.favId}`;
        const isFav = saved.includes(key);
        btn.classList.toggle('is-fav', isFav);
        btn.setAttribute('aria-pressed', String(isFav));
      });
    };

    document.addEventListener('click', e => {
      const btn = e.target.closest?.('[data-fav-id]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();

      const key = `${btn.dataset.favType || 'perfume'}:${btn.dataset.favId}`;
      const saved = read();
      const idx = saved.indexOf(key);
      if (idx > -1) saved.splice(idx, 1);
      else saved.push(key);
      write(saved);
      paint();
      btn.classList.remove('is-popping');
      void btn.offsetWidth;
      btn.classList.add('is-popping');
    });

    paint();
    const mo = new MutationObserver(paint);
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function boot() {
    [initPreloader, initWipeReveal, initMagnetic, initCardTilt, initHeroVideo, initCursor, initPageTransitions, initFavorites, initTouchZoom, initHeroParallax].forEach(fn => {
      try { fn(); } catch (err) { console.error('[steroids]', fn.name, err); }
    });
  }

  function safetyNet() {
    document.querySelectorAll('[data-wipe]:not(.is-wiped)')
      .forEach(el => el.classList.add('is-wiped'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  setTimeout(safetyNet, 2500);
})();
