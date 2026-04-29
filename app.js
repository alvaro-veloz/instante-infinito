/**
 * INSTANTE INFINITO — app.js v3
 * ES Module · Lee desde productos.json via fetch()
 * ─────────────────────────────────────────────────
 * IMPORTANTE: Requiere servidor local para fetch().
 * Usa "Live Server" en VS Code (clic derecho → Open with Live Server)
 * o sube a hosting (Cloudflare Pages, Netlify, etc.)
 */

'use strict';

/* ─────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Imagen de respaldo si falla la foto del producto */
const FALLBACKS = [
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
  'https://images.unsplash.com/photo-1543726969-a1da85a6d334?w=600&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
];
const fb = (i = 0) => FALLBACKS[i % FALLBACKS.length];

/** Genera URL de WhatsApp con mensaje */
const wa = (num, msg) =>
  `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

/* ─────────────────────────────────────────────────
   ESTADO GLOBAL
───────────────────────────────────────────── */
let CONFIG    = {};
let PRODUCTOS = [];
const modalCache = new Map();

/* ─────────────────────────────────────────────────
   PUNTO DE ENTRADA — carga el JSON y arranca todo
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────────
   SCROLL LOCK — funciona en todos los navegadores
   incluido Safari iOS que ignora overflow:hidden en body
───────────────────────────────────────────── */
function lockScroll() {
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.overflow = 'hidden';
  // En iOS Safari necesitamos position:fixed
  if (/iP(hone|ad|od)/.test(navigator.userAgent)) {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  }
}
function unlockScroll() {
  const scrollY = parseInt(document.body.dataset.scrollY || '0');
  document.body.style.overflow = '';
  if (/iP(hone|ad|od)/.test(navigator.userAgent)) {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
  }
  window.scrollTo(0, scrollY);
}

async function init() {
  try {
    const res  = await fetch('productos.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    CONFIG    = data.config;
    PRODUCTOS = data.productos;

    /* Arranca todo en orden */
    document.body.classList.add('js-ready');
    initBanner();
    initHeader();
    initHero();
    initWaLinks();
    await populateGrids();
    initFilters();
    initFaq();
    initCopyPhone();
    initCartDrawer();
    initReveal();
    Cart.updateBadge();

  } catch (err) {
    console.error('[II] Error al cargar productos.json:', err);
    /* Muestra mensaje amigable si falla el fetch */
    showFetchError();
  }
}

function showFetchError() {
  const grids = ['featuredGrid', 'catalogGrid'];
  grids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-muted)">
        <p style="font-family:var(--font-display);font-size:1.3rem;font-style:italic;margin-bottom:.75rem">
          No se pudieron cargar los productos
        </p>
        <p style="font-size:.875rem;line-height:1.7">
          Asegúrate de abrir el sitio con <strong>Live Server</strong> en VS Code<br>
          o súbelo a tu hosting para que funcione correctamente.
        </p>
      </div>`;
  });
}

/* ─────────────────────────────────────────────────
   1. LINKS DE WHATSAPP — inyectados desde CONFIG
───────────────────────────────────────────── */
function initWaLinks() {
  const msgGen  = wa(CONFIG.whatsapp, 'Hola, me gustaría recibir asesoría sobre sus perfumes. ¿Pueden ayudarme?');

  const waIds = [
    'waFloat','bannerWaLink','ctaWaLink',
    'mainWaBtn','channelWaBtn',
    'footerWaLink','footerWaLink2',
    'heroWaLink0','heroWaLink1','heroWaLink2',
  ];
  waIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = msgGen;
  });

  /* Teléfono en texto */
  const ph = CONFIG.whatsapp;
  const formatted = `(+${ph.slice(0,3)}) ${ph.slice(3,6)} ${ph.slice(6,9)} ${ph.slice(9)}`;
  $$('[id="ctaPhone"],[id="contactPhone"]').forEach(el => {
    if (el.id === 'ctaPhone')
      el.textContent = `${formatted} · ${CONFIG.horario}`;
    if (el.id === 'contactPhone')
      el.textContent = formatted;
  });
}

/* ─────────────────────────────────────────────────
   2. BANNER SUPERIOR
───────────────────────────────────────────── */
function initBanner() {
  const banner   = document.getElementById('topBanner');
  const closeBtn = document.getElementById('closeBanner');
  if (!banner || !closeBtn) return;

  try {
    if (sessionStorage.getItem('ii_banner_closed'))
      banner.classList.add('is-hidden');
  } catch(e) {}

  closeBtn.addEventListener('click', () => {
    banner.classList.add('is-hidden');
    try { sessionStorage.setItem('ii_banner_closed', '1'); } catch(e) {}
  });
}

/* ─────────────────────────────────────────────────
   3. HEADER — scroll shadow + hamburguesa
───────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mobileNav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ─────────────────────────────────────────────────
   4. HERO CARRUSEL
───────────────────────────────────────────── */
function initHero() {
  const track  = document.getElementById('heroTrack');
  const dots   = document.getElementById('heroDots');
  const prev   = document.getElementById('heroPrev');
  const next   = document.getElementById('heroNext');
  const numEl  = document.getElementById('heroCurrentNum');
  if (!track) return;

  const slides = $$('.hero__slide', track);
  const total  = slides.length;
  let current  = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('hero__slide--active');
    current = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('hero__slide--active');
    if (numEl) numEl.textContent = String(current + 1).padStart(2, '0');
    $$('.hero__dot', dots).forEach((d, i) => {
      d.classList.toggle('hero__dot--on', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  slides[0].classList.add('hero__slide--active');
  if (prev) prev.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  if (next) next.addEventListener('click', () => { goTo(current + 1); startTimer(); });
  $$('.hero__dot', dots).forEach((dot, i) =>
    dot.addEventListener('click', () => { goTo(i); startTimer(); })
  );

  /* Swipe táctil */
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); startTimer(); }
  }, { passive: true });

  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', startTimer);
  startTimer();
}

/* ─────────────────────────────────────────────────
   5. CARRITO
───────────────────────────────────────────── */
const Cart = (() => {
  const KEY = 'ii_cart_v3';
  const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = items => { try { sessionStorage.setItem(KEY, JSON.stringify(items)); } catch {} };
  const count = () => load().reduce((s, i) => s + i.qty, 0);
  const total = () => load().reduce((s, i) => s + parseFloat(i.precio) * i.qty, 0);

  function add(item) {
    const items = load();
    const found = items.find(i => i.id === item.id);
    found ? found.qty++ : items.push({ ...item, qty: 1 });
    save(items); updateBadge(); renderBody();
  }
  function remove(id) { save(load().filter(i => i.id !== id)); updateBadge(); renderBody(); }
  function changeQty(id, delta) {
    const items = load();
    const item  = items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { remove(id); return; }
    save(items); updateBadge(); renderBody();
  }

  function waMsg() {
    const items = load();
    if (!items.length) return '';
    let m = 'Hola, me gustaría hacer el siguiente pedido:\n\n';
    items.forEach(i => { m += `• ${i.nombre} × ${i.qty} — $${(i.precio * i.qty).toFixed(2)}\n`; });
    m += `\nTotal estimado: $${total().toFixed(2)}\n\n¿Tienen disponibilidad?`;
    return m;
  }

  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    badge.textContent = count();
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 320);
  }

  function renderBody() {
    const body   = document.getElementById('cartBody');
    const empty  = document.getElementById('cartEmpty');
    const foot   = document.getElementById('cartFoot');
    const totEl  = document.getElementById('cartTotal');
    if (!body) return;

    $$('.cart-item', body).forEach(el => el.remove());
    const items = load();

    if (!items.length) {
      if (empty) empty.style.display = '';
      if (foot)  foot.style.display  = 'none';
      return;
    }
    if (empty) empty.style.display = 'none';
    if (foot)  foot.style.display  = 'block';
    if (totEl) totEl.textContent = `$${total().toFixed(2)}`;

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img class="cart-item__img" src="${item.foto}" alt="${item.nombre}"
             onerror="this.onerror=null;this.src='${fb()}'" loading="lazy"/>
        <div class="cart-item__info">
          <p class="cart-item__name">${item.nombre}</p>
          <p class="cart-item__price">$${parseFloat(item.precio).toFixed(2)}</p>
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" data-action="dec" data-id="${item.id}" aria-label="Reducir cantidad">−</button>
            <span class="cart-item__qty-val">${item.qty}</span>
            <button class="cart-item__qty-btn" data-action="inc" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-id="${item.id}" aria-label="Eliminar ${item.nombre}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>`;
      $$('.cart-item__qty-btn', el).forEach(btn =>
        btn.addEventListener('click', () =>
          changeQty(btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1))
      );
      $('.cart-item__remove', el).addEventListener('click', () => remove(item.id));
      body.insertBefore(el, empty);
    });
  }

  return { add, remove, changeQty, load, total, count, waMsg, updateBadge, renderBody };
})();

/* ─────────────────────────────────────────────────
   6. CART DRAWER
───────────────────────────────────────────── */
function initCartDrawer() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const cartBtn = document.getElementById('cartBtn');
  const closeBtn= document.getElementById('cartClose');
  const waBtn   = document.getElementById('cartWaBtn');
  if (!drawer) return;

  const open = () => {
    Cart.renderBody();
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('is-open');
    lockScroll();
    document.body.classList.add('cart-open');  // oculta el WA float
  };
  const close = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('is-open');
    unlockScroll();
    document.body.classList.remove('cart-open');  // muestra el WA float
  };

  cartBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  waBtn?.addEventListener('click', () => {
    const msg = Cart.waMsg();
    if (msg) window.open(wa(CONFIG.whatsapp, msg), '_blank');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ─────────────────────────────────────────────────
   7. CONSTRUIR TARJETA DE PRODUCTO
───────────────────────────────────────────── */
function buildCard(p, index = 0) {
  const foto = p.fotos?.[0] || fb(p.id);
  const catLabel = { hombre:'Hombre', mujer:'Mujer', unisex:'Unisex' }[p.categoria] || p.categoria;

  const badgeLabels = { hot:'Más vendido', new:'Nuevo', offer:'Oferta', soldout:'Agotado' };
  const badgeHTML = p.estado
    ? `<span class="product-card__badge product-card__badge--${p.estado}">${badgeLabels[p.estado] || p.estado}</span>`
    : '';

  const soldoutHTML = p.agotado
    ? `<div class="product-card__soldout-overlay">Agotado</div>` : '';

  const priceHTML = p.precioAntes
    ? `<span class="product-card__price-old">$${p.precioAntes.toFixed(2)}</span>
       <span class="product-card__price">$${p.precio.toFixed(2)}</span>`
    : `<span class="product-card__price">$${p.precio.toFixed(2)}</span>`;

  const waMsg = wa(CONFIG.whatsapp, `Hola, me interesa el perfume ${p.nombre}. ¿Tienen disponibilidad?`);

  const btnsHTML = p.agotado
    ? `<button class="btn product-card__btn-details" data-id="${p.id}"
         style="grid-column:1/-1">Ver detalles</button>`
    : `<button class="btn product-card__btn-details" data-id="${p.id}">Detalles</button>
       <button class="btn product-card__btn-cart"
         data-id="${p.id}" data-nombre="${p.nombre}"
         data-precio="${p.precio}" data-foto="${foto}">Carrito</button>
       <a href="${waMsg}" target="_blank" rel="noopener noreferrer"
         class="btn product-card__btn-wa" aria-label="Consultar por WhatsApp">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
         </svg>
       </a>`;

  const card = document.createElement('article');
  card.className = 'product-card reveal-up';
  card.style.setProperty('--d', index % 4);
  card.style.animationDelay = `${index * 60}ms`;
  card.dataset.id       = p.id;
  card.dataset.categoria = p.categoria;
  card.dataset.status   = p.agotado ? 'agotado' : (p.precioAntes ? 'oferta' : 'disponible');

  card.innerHTML = `
    <div class="product-card__img-wrap" role="button" aria-label="Ver detalles de ${p.nombre}" tabindex="0">
      ${badgeHTML}
      ${soldoutHTML}
      <img class="product-card__img" src="${foto}" alt="${p.nombre}"
           loading="lazy"
           onerror="this.onerror=null;this.src='${fb(p.id)}'" />
    </div>
    <div class="product-card__info">
      <span class="product-card__cat">${catLabel}</span>
      <h3 class="product-card__name">${p.nombre}</h3>
      <p class="product-card__brand">${p.marca}</p>
      <p class="product-card__family"><em>${p.familia}</em></p>
      <div class="product-card__price-row">${priceHTML}</div>
    </div>
    <div class="product-card__actions">${btnsHTML}</div>`;

  return card;
}

/* ─────────────────────────────────────────────────
   8. POBLAR GRIDS
───────────────────────────────────────────── */
async function populateGrids() {
  /* ── Inicio: los primeros 4 con estado "hot" o simplemente los primeros 4 ── */
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    featuredGrid.innerHTML = ''; /* quita skeletons */
    const hot   = PRODUCTOS.filter(p => p.estado === 'hot');
    const list  = hot.length >= 7 ? hot.slice(0, 7)
                : [...hot, ...PRODUCTOS.filter(p => p.estado !== 'hot')].slice(0, 7);

    list.forEach((p, i) => featuredGrid.appendChild(buildCard(p, i)));

    // Card CTA — invita a ver la colección completa
    const ctaCard = document.createElement('div');
    ctaCard.className = 'featured-cta-card reveal-up';
    ctaCard.dataset.count = PRODUCTOS.length;
    ctaCard.innerHTML = `
      <div class="featured-cta-card__inner">
        <p class="featured-cta-card__eyebrow">Colección completa</p>
        <h3 class="featured-cta-card__title">¿Ya encontraste<br>tu fragancia?</h3>
        <p class="featured-cta-card__text">Tenemos más de ${PRODUCTOS.length} fragancias originales esperándote.</p>
        <a href="catalogo.html" class="btn btn--dark featured-cta-card__btn">
          Ver toda la colección
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>`;
    featuredGrid.appendChild(ctaCard);

    /* Dots para carrusel móvil — 7 productos + 1 CTA */
    const dotsWrap = document.getElementById('featuredDots');
    if (dotsWrap) {
      const totalItems = list.length + 1; // +1 por la card CTA
      Array.from({ length: totalItems }).forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `featured__dot${i === 0 ? ' featured__dot--on' : ''}`;
        dot.setAttribute('aria-label', i < list.length ? `Producto ${i + 1}` : 'Ver colección');
        dot.addEventListener('click', () => {
          const w = featuredGrid.firstElementChild?.offsetWidth || 1;
          featuredGrid.scrollTo({ left: i * (w + 12), behavior: 'smooth' });
        });
        dotsWrap.appendChild(dot);
      });
      featuredGrid.addEventListener('scroll', () => {
        const w   = featuredGrid.firstElementChild?.offsetWidth || 1;
        const idx = Math.round(featuredGrid.scrollLeft / (w + 12));
        $$('.featured__dot', dotsWrap).forEach((d, i) =>
          d.classList.toggle('featured__dot--on', i === idx)
        );
      }, { passive: true });
    }
  }

  /* ── Catálogo: todos los productos ── */
  const catalogGrid = document.getElementById('catalogGrid');
  if (catalogGrid) {
    catalogGrid.innerHTML = ''; /* quita skeletons */
    PRODUCTOS.forEach((p, i) => catalogGrid.appendChild(buildCard(p, i)));

    /* Actualiza contador */
    const countEl = document.getElementById('filterCount');
    if (countEl) countEl.textContent = PRODUCTOS.length;

    /* Subtítulo dinámico */
    const sub = document.getElementById('catalogSubtitle');
    if (sub) sub.textContent = `${PRODUCTOS.length} fragancias originales · Hombre, Mujer & Unisex`;
  }

  /* Inicia reveal después de poblar */
  initReveal();
}

/* ─────────────────────────────────────────────────
   9. FILTROS DEL CATÁLOGO
───────────────────────────────────────────── */
function initFilters() {
  const grid      = document.getElementById('catalogGrid');
  const countEl   = document.getElementById('filterCount');
  const noResults = document.getElementById('noResults');
  const clearBtn  = document.getElementById('clearFilters');
  if (!grid) return;

  /* Lee ?cat=xxx de la URL */
  const urlParam = new URLSearchParams(window.location.search).get('cat') || 'todos';

  function apply(filter) {
    const cards = $$('.product-card', grid);
    let visible = 0;

    cards.forEach(card => {
      const match =
        filter === 'todos' ||
        (filter === 'oferta' && card.dataset.status === 'oferta') ||
        card.dataset.categoria === filter;

      if (match) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        });
        visible++;
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => { if (card.style.opacity === '0') card.style.display = 'none'; }, 240);
      }
    });

    if (countEl)   countEl.textContent = visible;
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';

    $$('.fpill').forEach(pill => {
      const on = pill.dataset.filter === filter;
      pill.classList.toggle('fpill--on', on);
      pill.setAttribute('aria-pressed', String(on));
    });
  }

  $$('.fpill').forEach(pill =>
    pill.addEventListener('click', () => apply(pill.dataset.filter))
  );
  clearBtn?.addEventListener('click', () => apply('todos'));

  /* Aplica filtro inicial desde URL */
  if (urlParam !== 'todos') apply(urlParam);
}

/* ─────────────────────────────────────────────────
   10. MODAL DE PRODUCTO
───────────────────────────────────────────── */
function buildModal(p) {
  const fotos    = p.fotos?.length ? p.fotos : [fb(p.id)];
  const catLabel = { hombre:'Hombre', mujer:'Mujer', unisex:'Unisex' }[p.categoria] || p.categoria;
  const catClass = `modal__cat--${p.categoria}`;

  const priceHTML = p.precioAntes
    ? `<span class="modal__price-old">$${p.precioAntes.toFixed(2)}</span>
       <span class="modal__price">$${p.precio.toFixed(2)}</span>`
    : `<span class="modal__price">$${p.precio.toFixed(2)}</span>`;

  const thumbsHTML = fotos.map((src, i) => `
    <button class="modal__thumb${i === 0 ? ' modal__thumb--on' : ''}"
            data-src="${src}" aria-label="Ver imagen ${i + 1}">
      <img src="${src}" alt="Vista ${i + 1}"
           onerror="this.onerror=null;this.src='${fb(i)}'" loading="lazy"/>
    </button>`).join('');

  const authHTML = `
    <button class="modal__thumb modal__thumb--auth" data-src="img/auth.jpg" aria-label="Certificado de autenticidad">
      <img src="img/auth.jpg" alt="Autenticidad"
           onerror="this.onerror=null;this.src='${fb(4)}'" loading="lazy"/>
      <span class="modal__thumb-auth-label">Auth.</span>
    </button>`;

  const noteChips = arr => (arr || []).map(n => `<span class="note">${n}</span>`).join('');

  const barHTML = (label, level) => `
    <div class="modal__bar-row">
      <span class="modal__bar-label">${label}</span>
      <div class="modal__bar-track">
        <div class="modal__bar-fill" data-level="${level}" role="progressbar"
             aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="5"></div>
      </div>
      <span class="modal__bar-num">${level}/5</span>
    </div>`;

  const chipsHTML = (p.ocasiones || []).map(o => `<span class="chip">${o}</span>`).join('');

  const waMsg  = wa(CONFIG.whatsapp, `Hola, me interesa el perfume ${p.nombre}. ¿Tienen disponibilidad?`);

  const actionsHTML = p.agotado
    ? `<a href="${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn--outline">
         Avisar cuando llegue por WhatsApp
       </a>`
    : `<button class="btn btn--dark modal__add-cart"
         data-id="${p.id}" data-nombre="${p.nombre}"
         data-precio="${p.precio}" data-foto="${fotos[0]}">
         Agregar al carrito
       </button>
       <a href="${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn--wa">
         <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
         </svg>
         Consultar por WhatsApp
       </a>`;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = `modal-${p.id}`;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', p.nombre);

  const box = document.createElement('div');
  box.className = 'modal';
  box.innerHTML = `
    <button class="modal__close" aria-label="Cerrar modal">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div class="modal__gallery">
      <div class="modal__main-img-wrap">
        <img class="modal__main-img" src="${fotos[0]}" alt="${p.nombre}"
             onerror="this.onerror=null;this.src='${fb(0)}'" />
      </div>
      <div class="modal__thumbs">${thumbsHTML}${authHTML}</div>
    </div>

    <div class="modal__info">
      <span class="modal__cat ${catClass}">${catLabel}</span>
      <h2 class="modal__name">${p.nombre}</h2>
      <p class="modal__brand">${p.marca}</p>

      <div class="modal__price-row">${priceHTML}</div>

      <div class="modal__meta">
        <div class="modal__meta-item">
          <span class="modal__meta-label">Familia</span>
          <span class="modal__meta-val">${p.familia}</span>
        </div>
        <div class="modal__meta-item">
          <span class="modal__meta-label">Género</span>
          <span class="modal__meta-val">${catLabel}</span>
        </div>
        <div class="modal__meta-item">
          <span class="modal__meta-label">Contenido</span>
          <span class="modal__meta-val">${p.ml ? p.ml + ' ml' : '—'}</span>
        </div>
        <div class="modal__meta-item">
          <span class="modal__meta-label">Tipo</span>
          <span class="modal__meta-val">${p.concentracion || 'Eau de Parfum'}</span>
        </div>
      </div>

      <span class="modal__section-label">Pirámide olfativa</span>
      <div class="modal__pyramid">
        <div class="modal__pyramid-row">
          <span class="modal__pyramid-stage">Salida</span>
          <div class="modal__notes">${noteChips(p.notas?.salida)}</div>
        </div>
        <div class="modal__pyramid-row">
          <span class="modal__pyramid-stage">Corazón</span>
          <div class="modal__notes">${noteChips(p.notas?.corazon)}</div>
        </div>
        <div class="modal__pyramid-row">
          <span class="modal__pyramid-stage">Fondo</span>
          <div class="modal__notes">${noteChips(p.notas?.fondo)}</div>
        </div>
      </div>

      <div class="modal__bars">
        ${barHTML('Longevidad', p.barras?.longevidad || 3)}
        ${barHTML('Proyección', p.barras?.proyeccion || 3)}
        ${barHTML('Intensidad', p.barras?.intensidad || 3)}
      </div>

      <div class="modal__occasions">
        <span class="modal__section-label">Ideal para</span>
        <div class="modal__occasion-chips">${chipsHTML}</div>
      </div>

      <div class="modal__desc-wrap">
        <p class="modal__desc" id="mdesc-${p.id}">${p.descripcion}</p>
        <button class="modal__desc-toggle" data-desc="mdesc-${p.id}" aria-expanded="false">
          Leer más
        </button>
      </div>
    </div>

    <div class="modal__actions">${actionsHTML}</div>`;

  overlay.appendChild(box);
  return overlay;
}

function openModal(id) {
  const numId = parseInt(id);
  if (!modalCache.has(numId)) {
    const p = PRODUCTOS.find(p => p.id === numId);
    if (!p) return;
    const overlay = buildModal(p);
    document.getElementById('modalContainer').appendChild(overlay);
    bindModal(overlay);
    modalCache.set(numId, overlay);
  }
  const overlay = modalCache.get(numId);
  overlay.classList.add('is-open');
  lockScroll();
  /* Anima barras con pequeño delay */
  requestAnimationFrame(() =>
    setTimeout(() =>
      $$('.modal__bar-fill', overlay).forEach(b => b.classList.add('bar-on')), 80)
  );
}

function closeModal(overlay) {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  unlockScroll();
  $$('.modal__bar-fill', overlay).forEach(b => b.classList.remove('bar-on'));
}

function bindModal(overlay) {
  /* Cerrar */
  $('.modal__close', overlay)?.addEventListener('click', () => closeModal(overlay));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });

  /* Galería — cambiar imagen principal */
  $$('.modal__thumb', overlay).forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src  = thumb.dataset.src;
      const wrap = $('.modal__main-img-wrap', overlay);
      const img  = $('.modal__main-img', overlay);
      if (!img || !src) return;
      wrap?.classList.add('changing');
      setTimeout(() => { img.src = src; wrap?.classList.remove('changing'); }, 140);
      $$('.modal__thumb--on', overlay).forEach(t => t.classList.remove('modal__thumb--on'));
      thumb.classList.add('modal__thumb--on');
    });
  });

  /* Zoom con seguimiento del ratón en desktop */
  const wrap = $('.modal__main-img-wrap', overlay);
  if (wrap) {
    wrap.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      wrap.style.setProperty('--zoom-x', `${((e.clientX - r.left) / r.width  * 100).toFixed(1)}%`);
      wrap.style.setProperty('--zoom-y', `${((e.clientY - r.top)  / r.height * 100).toFixed(1)}%`);
    });
  }

  /* Descripción colapsable */
  $$('.modal__desc-toggle', overlay).forEach(btn => {
    btn.addEventListener('click', () => {
      const target   = document.getElementById(btn.dataset.desc);
      const expanded = target?.classList.toggle('is-expanded');
      btn.textContent = expanded ? 'Leer menos' : 'Leer más';
      btn.setAttribute('aria-expanded', String(expanded));
    });
  });

  /* Agregar al carrito desde modal — el modal se queda abierto */
  $$('.modal__add-cart', overlay).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // evita bubbling al overlay
      Cart.add({ id: btn.dataset.id, nombre: btn.dataset.nombre, precio: btn.dataset.precio, foto: btn.dataset.foto });
      // Feedback visual en el botón
      const original = btn.textContent;
      btn.textContent = '✓ Agregado';
      btn.style.background = 'var(--wa)';
      btn.style.borderColor = 'var(--wa)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 1800);
      showToast(`"${btn.dataset.nombre}" agregado al carrito`);
    });
  });
}

/* ESC cierra modales */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')
    $$('.modal-overlay.is-open').forEach(m => closeModal(m));
});

/* ─────────────────────────────────────────────────
   11. DELEGACIÓN GLOBAL DE CLICS
───────────────────────────────────────────── */
document.addEventListener('click', e => {
  /* Imagen → abre modal */
  const imgWrap = e.target.closest('.product-card__img-wrap');
  if (imgWrap) {
    const id = imgWrap.closest('.product-card')?.dataset.id;
    if (id) { openModal(id); return; }
  }

  /* Botón "Detalles" → abre modal */
  const detBtn = e.target.closest('.product-card__btn-details');
  if (detBtn) { openModal(detBtn.dataset.id); return; }

  /* Botón "Carrito" en tarjeta */
  const cartBtn = e.target.closest('.product-card__btn-cart');
  if (cartBtn) {
    Cart.add({ id: cartBtn.dataset.id, nombre: cartBtn.dataset.nombre, precio: cartBtn.dataset.precio, foto: cartBtn.dataset.foto });
    showToast(`"${cartBtn.dataset.nombre}" agregado`);
    return;
  }
});

/* Teclado: Enter en imagen abre modal */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const imgWrap = e.target.closest('.product-card__img-wrap');
    if (imgWrap) {
      const id = imgWrap.closest('.product-card')?.dataset.id;
      if (id) openModal(id);
    }
  }
});

/* ─────────────────────────────────────────────────
   12. FAQ ACORDEÓN
───────────────────────────────────────────── */
function initFaq() {
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  $$('.faq-item__q', accordion).forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      $$('.faq-item.is-open', accordion).forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-item__q')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ─────────────────────────────────────────────────
   13. COPIAR NÚMERO DE TELÉFONO
───────────────────────────────────────────── */
function initCopyPhone() {
  const btn     = document.getElementById('copyPhoneBtn');
  const btnText = document.getElementById('copyBtnText');
  if (!btn) return;

  const number = `+${CONFIG.whatsapp}`;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(number);
    } catch {
      const ta = Object.assign(document.createElement('textarea'),
        { value: number, style: 'position:fixed;opacity:0' });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (btnText) btnText.textContent = '¡Copiado!';
    showToast('Número copiado al portapapeles');
    setTimeout(() => { if (btnText) btnText.textContent = 'Copiar número'; }, 2500);
  });
}

/* ─────────────────────────────────────────────────
   14. ANIMACIONES DE SCROLL — IntersectionObserver
───────────────────────────────────────────── */
function initReveal() {
  const els = $$('.reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────
   15. TOAST
───────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3300);
}

/* ─────────────────────────────────────────────────
   ARRANQUE
───────────────────────────────────────────── */
window.Cart = Cart;
init();
