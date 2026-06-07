/* ============================================================
   INSTANTE INFINITO — app.js
   Vanilla JS puro — sin frameworks externos
   ============================================================ */

'use strict';

/* ============================================================
   DATOS DE MODALES — PRODUCTOS 5 AL 20
   Edita estos objetos para personalizar cada modal.
   Los productos 1-4 se editan directamente en el HTML.
   Ver guía de administración para referencia completa.
   ============================================================ */
const PRODUCTS_DATA = {
  5: {
    gender: 'Mujer', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]', '[Nota 6]'],
    longevity: 4, projection: 3, intensity: 3,
    occasions: ['🌸 Primavera', '☀️ Día'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia, personalidad y experiencia de esta fragancia.]'
  },
  6: {
    gender: 'Hombre', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]', '[Nota 3]'],
    notesHeart: ['[Nota 4]', '[Nota 5]'],
    notesBase:  ['[Nota 6]', '[Nota 7]'],
    longevity: 5, projection: 4, intensity: 4,
    occasions: ['🌙 Noche', '👔 Formal'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  7: {
    gender: 'Unisex', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]'],
    longevity: 3, projection: 2, intensity: 2,
    occasions: ['🌿 Casual', '☀️ Día', '🎀 Regalo'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  8: {
    gender: 'Mujer', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]', '[Nota 5]'],
    notesBase:  ['[Nota 6]', '[Nota 7]'],
    longevity: 4, projection: 4, intensity: 3,
    occasions: ['💐 Floral', '🎁 Regalo', '🌸 Primavera'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  9: {
    gender: 'Hombre', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]', '[Nota 3]'],
    notesHeart: ['[Nota 4]', '[Nota 5]'],
    notesBase:  ['[Nota 6]', '[Nota 7]', '[Nota 8]'],
    longevity: 5, projection: 5, intensity: 5,
    occasions: ['🌙 Noche', '🥂 Eventos', '❄️ Invierno'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  10: {
    gender: 'Unisex', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]', '[Nota 6]'],
    longevity: 3, projection: 3, intensity: 3,
    occasions: ['🌿 Casual', '🌞 Todo el año'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  11: {
    gender: 'Mujer', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]'],
    longevity: 4, projection: 3, intensity: 3,
    occasions: ['🌺 Romántico', '🌸 Primavera'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  12: {
    gender: 'Hombre', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]', '[Nota 6]'],
    longevity: 4, projection: 4, intensity: 4,
    occasions: ['👔 Formal', '💼 Trabajo', '☀️ Día'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  13: {
    gender: 'Unisex', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]', '[Nota 3]'],
    notesHeart: ['[Nota 4]', '[Nota 5]'],
    notesBase:  ['[Nota 6]'],
    longevity: 3, projection: 3, intensity: 2,
    occasions: ['🌿 Casual', '🌊 Verano'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  14: {
    gender: 'Mujer', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]', '[Nota 6]'],
    longevity: 4, projection: 4, intensity: 4,
    occasions: ['🌙 Noche', '🥂 Eventos', '💎 Lujo'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  15: {
    gender: 'Hombre', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]'],
    longevity: 3, projection: 3, intensity: 3,
    occasions: ['☀️ Día', '🌿 Casual', '🌊 Verano'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  16: {
    gender: 'Unisex', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]', '[Nota 6]'],
    longevity: 4, projection: 3, intensity: 3,
    occasions: ['🎁 Regalo', '🌿 Casual', '🌞 Todo el año'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  17: {
    gender: 'Mujer', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]', '[Nota 5]'],
    notesBase:  ['[Nota 6]', '[Nota 7]'],
    longevity: 5, projection: 4, intensity: 4,
    occasions: ['🌙 Noche', '💃 Romántico', '❄️ Invierno'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  18: {
    gender: 'Hombre', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]', '[Nota 3]'],
    notesHeart: ['[Nota 4]', '[Nota 5]'],
    notesBase:  ['[Nota 6]'],
    longevity: 3, projection: 3, intensity: 3,
    occasions: ['💼 Trabajo', '☀️ Día', '🌿 Casual'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  19: {
    gender: 'Unisex', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]', '[Nota 6]'],
    longevity: 4, projection: 4, intensity: 4,
    occasions: ['🥂 Eventos', '🌙 Noche', '💎 Lujo'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  },
  20: {
    gender: 'Mujer', concentration: '[EDP / EDT]',
    family: '[Familia Olfativa]', year: '[Año]',
    notesTop:   ['[Nota 1]', '[Nota 2]'],
    notesHeart: ['[Nota 3]', '[Nota 4]'],
    notesBase:  ['[Nota 5]'],
    longevity: 3, projection: 3, intensity: 2,
    occasions: ['🌸 Primavera', '☀️ Día', '🎀 Regalo'],
    description: '[Descripción del perfume. Escribe aquí 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]'
  }
};

/* ============================================================
   NÚMERO DE WHATSAPP
   Si cambia el número, edítalo aquí una sola vez.
   ============================================================ */
const WA_NUMBER = '593962277374';
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ============================================================
   HELPERS
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const FALLBACKS = [
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=75',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=75',
  'https://images.unsplash.com/photo-1543726969-a1da85a6d334?w=500&q=75',
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=75',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=75',
];
const getFallback = (i = 0) => FALLBACKS[i % FALLBACKS.length];

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3300);
}

/* ============================================================
   1. JS READY — activa animaciones de scroll
   ============================================================ */
document.body.classList.add('js-ready');

/* ============================================================
   2. FAVICON SVG (inyectado dinámicamente)
   ============================================================ */
(function injectFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M16 2C16 2 12 8 8 10C8 10 14 10 16 16C18 10 24 10 24 10C20 8 16 2 16 2Z" fill="#a8894f"/>
    <path d="M16 16C16 16 12 22 8 22C8 22 14 22 16 28C18 22 24 22 24 22C20 22 16 16 16 16Z" fill="#a8894f" opacity="0.55"/>
  </svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const link = Object.assign(document.createElement('link'), {
    rel: 'icon', type: 'image/svg+xml',
    href: URL.createObjectURL(blob)
  });
  document.head.appendChild(link);
})();

/* ============================================================
   3. BANNER SUPERIOR
   ============================================================ */
(function initBanner() {
  const banner = document.getElementById('topBanner');
  const btn    = document.getElementById('closeBanner');
  if (!banner || !btn) return;

  // Recuerda si fue cerrado en esta sesión
  try {
    if (sessionStorage.getItem('ii_banner_closed')) {
      banner.classList.add('is-hidden');
    }
  } catch(e) {}

  btn.addEventListener('click', () => {
    banner.classList.add('is-hidden');
    try { sessionStorage.setItem('ii_banner_closed', '1'); } catch(e) {}
  });
})();

/* ============================================================
   4. HEADER — sombra al scroll + hamburguesa
   ============================================================ */
(function initHeader() {
  const header    = document.getElementById('header');
  const toggle    = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!header) return;

  // Sombra al hacer scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  // Hamburguesa
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Cierra al clicar fuera
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        mobileNav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

/* ============================================================
   5. CARRITO — sessionStorage "ii_cart"
   ============================================================ */
const Cart = (() => {
  const KEY = 'ii_cart';

  function load() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || []; }
    catch(e) { return []; }
  }

  function save(items) {
    try { sessionStorage.setItem(KEY, JSON.stringify(items)); } catch(e) {}
  }

  function add(item) {
    const items = load();
    const found = items.find(i => i.id === item.id);
    if (found) { found.qty += 1; }
    else { items.push({ ...item, qty: 1 }); }
    save(items);
    updateBadge();
    renderBody();
  }

  function remove(id) {
    save(load().filter(i => i.id !== id));
    updateBadge();
    renderBody();
  }

  function changeQty(id, delta) {
    const items = load();
    const item  = items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { remove(id); return; }
    save(items);
    updateBadge();
    renderBody();
  }

  function total() {
    return load().reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);
  }

  function count() {
    return load().reduce((s, i) => s + i.qty, 0);
  }

  function waMessage() {
    const items = load();
    if (!items.length) return '';
    let msg = 'Hola, me gustaría hacer el siguiente pedido:\n\n';
    items.forEach(i => {
      msg += `• ${i.name} × ${i.qty} — $${(parseFloat(i.price) * i.qty).toFixed(2)}\n`;
    });
    msg += `\nTotal estimado: $${total().toFixed(2)}`;
    msg += '\n\n¿Tienen disponibilidad?';
    return msg;
  }

  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const c = count();
    badge.textContent = c;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }

  function renderBody() {
    const body   = document.getElementById('cartBody');
    const empty  = document.getElementById('cartEmpty');
    const foot   = document.getElementById('cartFoot');
    const totalEl = document.getElementById('cartTotal');
    if (!body) return;

    // Elimina items anteriores
    $$('.cart-item', body).forEach(el => el.remove());

    const items = load();

    if (!items.length) {
      if (empty) empty.style.display = '';
      if (foot)  foot.style.display  = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';
    if (foot)  foot.style.display  = 'block';
    if (totalEl) totalEl.textContent = `$${total().toFixed(2)}`;

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img class="cart-item__img"
          src="${item.img}"
          alt="${item.name}"
          onerror="this.onerror=null; this.src='${getFallback()}'" />
        <div class="cart-item__info">
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__price">$${parseFloat(item.price).toFixed(2)}</p>
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" data-action="dec" data-id="${item.id}">−</button>
            <span class="cart-item__qty-val">${item.qty}</span>
            <button class="cart-item__qty-btn" data-action="inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-id="${item.id}" aria-label="Eliminar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>`;

      // Eventos qty y remove
      $$('.cart-item__qty-btn', el).forEach(btn => {
        btn.addEventListener('click', () => {
          changeQty(btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1);
        });
      });
      $('.cart-item__remove', el).addEventListener('click', () => remove(item.id));

      body.insertBefore(el, empty);
    });
  }

  // API pública
  return { add, remove, changeQty, load, total, count, waMessage, updateBadge, renderBody };
})();

/* ============================================================
   6. DRAWER DEL CARRITO
   ============================================================ */
(function initCartDrawer() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const cartBtn = document.getElementById('cartBtn');
  const closeBtn = document.getElementById('cartClose');
  const waBtn   = document.getElementById('cartWaBtn');
  if (!drawer) return;

  function open() {
    Cart.renderBody();
    drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (cartBtn)  cartBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay)  overlay.addEventListener('click', close);

  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const msg = Cart.waMessage();
      if (!msg) return;
      window.open(waLink(msg), '_blank');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Inicializa badge al cargar
  Cart.updateBadge();
})();

/* ============================================================
   7. MODALES DE PRODUCTO
   ============================================================ */

// Construye el HTML interno de un modal dinámico (productos 5-20)
function buildModalHTML(card) {
  const id       = card.dataset.id;
  const name     = card.dataset.name     || `Perfume ${id}`;
  const price    = card.dataset.price    || '0.00';
  const priceOri = card.dataset.priceOriginal || '';
  const cat      = card.dataset.category || 'unisex';
  const imgsRaw  = card.dataset.imgs     || '';
  const imgs     = imgsRaw.split(',').map(s => s.trim()).filter(Boolean);
  const d        = PRODUCTS_DATA[id]     || {};

  const catLabel = { hombre: 'Hombre', mujer: 'Mujer', unisex: 'Unisex' }[cat] || cat;
  const catClass = `modal__cat--${cat}`;

  const priceOldHTML = priceOri
    ? `<span class="modal__price-old">$${parseFloat(priceOri).toFixed(2)}</span>` : '';

  // Miniaturas
  const thumbsHTML = imgs.map((src, i) => `
    <button class="modal__thumb${i === 0 ? ' modal__thumb--on' : ''}" data-src="${src}">
      <img src="${src}" alt="Vista ${i+1}"
           onerror="this.onerror=null; this.src='${getFallback(i)}'" />
    </button>`).join('');

  // Auth siempre al final
  const authHTML = `
    <button class="modal__thumb modal__thumb--auth" data-src="img/auth.jpg">
      <img src="img/auth.jpg" alt="Autenticidad"
           onerror="this.onerror=null; this.src='${getFallback(4)}'" />
      <span class="modal__thumb-auth-label">Auth.</span>
    </button>`;

  // Notas
  const notesRow = (arr) => arr.map(n => `<span class="note">${n}</span>`).join('');

  // Barras
  const barHTML = (label, level) => `
    <div class="modal__bar-row">
      <span class="modal__bar-label">${label}</span>
      <div class="modal__bar-track">
        <div class="modal__bar-fill" data-level="${level}"></div>
      </div>
      <span class="modal__bar-num">${level}/5</span>
    </div>`;

  // Ocasiones
  const occasionsHTML = (d.occasions || [])
    .map(o => `<span class="chip">${o}</span>`).join('');

  const mainSrc = imgs[0] || getFallback(0);

  return `
    <button class="modal__close" aria-label="Cerrar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div class="modal__gallery">
      <div class="modal__main-img-wrap">
        <img class="modal__main-img" src="${mainSrc}" alt="${name}"
             onerror="this.onerror=null; this.src='${getFallback(0)}'" />
      </div>
      <div class="modal__thumbs">
        ${thumbsHTML}
        ${authHTML}
      </div>
    </div>

    <div class="modal__info">
      <span class="modal__cat ${catClass}">${catLabel}</span>
      <h2 class="modal__name">${name}</h2>
      <p class="modal__brand">[Marca / Casa]</p>
      <div class="modal__price-row">
        ${priceOldHTML}
        <span class="modal__price">$${parseFloat(price).toFixed(2)}</span>
      </div>
      <div class="modal__meta">
        <div class="modal__meta-item">
          <span class="modal__meta-label">Concentración</span>
          <span class="modal__meta-val">${d.concentration || '[EDP / EDT]'}</span>
        </div>
        <div class="modal__meta-item">
          <span class="modal__meta-label">Familia</span>
          <span class="modal__meta-val">${d.family || '[Familia Olfativa]'}</span>
        </div>
        <div class="modal__meta-item">
          <span class="modal__meta-label">Lanzamiento</span>
          <span class="modal__meta-val">${d.year || '[Año]'}</span>
        </div>
        <div class="modal__meta-item">
          <span class="modal__meta-label">Género</span>
          <span class="modal__meta-val">${d.gender || catLabel}</span>
        </div>
      </div>
      <div class="modal__pyramid">
        <h4 class="modal__section-label">Pirámide olfativa</h4>
        <div class="modal__pyramid-row">
          <span class="modal__pyramid-stage">Salida</span>
          <div class="modal__notes">${notesRow(d.notesTop || [])}</div>
        </div>
        <div class="modal__pyramid-row">
          <span class="modal__pyramid-stage">Corazón</span>
          <div class="modal__notes">${notesRow(d.notesHeart || [])}</div>
        </div>
        <div class="modal__pyramid-row">
          <span class="modal__pyramid-stage">Fondo</span>
          <div class="modal__notes">${notesRow(d.notesBase || [])}</div>
        </div>
      </div>
      <div class="modal__bars">
        ${barHTML('Longevidad', d.longevity  || 3)}
        ${barHTML('Proyección', d.projection || 3)}
        ${barHTML('Intensidad', d.intensity  || 3)}
      </div>
      <div class="modal__occasions">
        <h4 class="modal__section-label">Ideal para</h4>
        <div class="modal__occasion-chips">${occasionsHTML}</div>
      </div>
      <div class="modal__desc-wrap">
        <p class="modal__desc" id="dyn-desc-${id}">
          ${d.description || '[Descripción del perfume.]'}
        </p>
        <button class="modal__desc-toggle" data-desc="dyn-desc-${id}">Leer más</button>
      </div>
      <div class="modal__actions">
        <button class="btn btn--dark modal__add-cart"
          data-id="${id}"
          data-name="${name}"
          data-price="${price}"
          data-img="${mainSrc}">
          Agregar al carrito
        </button>
        <a href="${waLink('Hola, me interesa el perfume ' + name + '. ¿Tienen disponibilidad?')}"
           target="_blank" rel="noopener" class="btn btn--wa">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>`;
}

// Vincula todos los eventos de un modal (galería, cerrar, carrito, descripción)
function bindModal(overlay) {
  if (overlay._bound) return;
  overlay._bound = true;

  // Cerrar con botón X
  const closeBtn = $('.modal__close', overlay);
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(overlay));

  // Cerrar al clicar el overlay (fuera del modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });

  // Galería — cambio de imagen principal
  $$('.modal__thumb', overlay).forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src    = thumb.dataset.src;
      const mainImg = $('.modal__main-img', overlay);
      if (mainImg && src) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 100);
      }
      $$('.modal__thumb--on', overlay).forEach(t => t.classList.remove('modal__thumb--on'));
      thumb.classList.add('modal__thumb--on');
    });
  });

  // Descripción colapsable
  $$('.modal__desc-toggle', overlay).forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.desc);
      if (!target) return;
      const expanded = target.classList.toggle('is-expanded');
      btn.textContent = expanded ? 'Leer menos' : 'Leer más';
    });
  });

  // Agregar al carrito desde el modal
  $$('.modal__add-cart', overlay).forEach(btn => {
    btn.addEventListener('click', () => {
      Cart.add({
        id:    btn.dataset.id,
        name:  btn.dataset.name,
        price: btn.dataset.price,
        img:   btn.dataset.img
      });
      closeModal(overlay);
      showToast(`"${btn.dataset.name}" agregado al carrito`);
    });
  });
}

// Anima las barras al abrir modal
function animateBars(overlay) {
  setTimeout(() => {
    $$('.modal__bar-fill', overlay).forEach(bar => bar.classList.add('bar-on'));
  }, 120);
}

// Abre un modal
function openModal(modalId) {
  let overlay = document.getElementById(modalId);

  // Si no existe en el HTML, construirlo dinámicamente (productos 5-20)
  if (!overlay) {
    const id   = modalId.replace('modal-', '');
    const card = document.querySelector(`.product-card[data-id="${id}"]`);
    if (!card) return;

    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = modalId;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const box = document.createElement('div');
    box.className = 'modal';
    box.innerHTML = buildModalHTML(card);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  bindModal(overlay);
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  animateBars(overlay);
}

// Cierra un modal
function closeModal(overlay) {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
  // Reinicia barras para la próxima apertura
  $$('.modal__bar-fill', overlay).forEach(b => b.classList.remove('bar-on'));
}

// ESC cierra modales abiertos
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    $$('.modal-overlay.is-open').forEach(m => closeModal(m));
  }
});

// Delegación global de clics
document.addEventListener('click', (e) => {

  // 1. Botón "Ver detalles" — abre modal
  const openBtn = e.target.closest('[data-open]');
  if (openBtn) {
    openModal(openBtn.dataset.open);
    return;
  }

  // 2. Botón "Agregar al carrito" en la tarjeta (product-card__btn-cart)
  const cartBtn = e.target.closest('.product-card__btn-cart');
  if (cartBtn) {
    Cart.add({
      id:    cartBtn.dataset.id,
      name:  cartBtn.dataset.name,
      price: cartBtn.dataset.price,
      img:   cartBtn.dataset.img
    });
    showToast(`"${cartBtn.dataset.name}" agregado al carrito`);
    return;
  }

  // 3. Botón "Agregar al carrito" dentro del modal
  const modalCartBtn = e.target.closest('.modal__add-cart');
  if (modalCartBtn) {
    Cart.add({
      id:    modalCartBtn.dataset.id,
      name:  modalCartBtn.dataset.name,
      price: modalCartBtn.dataset.price,
      img:   modalCartBtn.dataset.img
    });
    const overlay = modalCartBtn.closest('.modal-overlay');
    if (overlay) closeModal(overlay);
    showToast(`"${modalCartBtn.dataset.name}" agregado al carrito`);
    return;
  }
});

/* ============================================================
   ZOOM DE IMAGEN EN MODAL (desktop)
   El zoom sigue el cursor del mouse.
   En móvil está desactivado desde CSS.
   ============================================================ */
document.addEventListener('mousemove', (e) => {
  const wrap = e.target.closest('.modal__main-img-wrap');
  if (!wrap) return;
  const rect = wrap.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
  const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
  wrap.style.setProperty('--zoom-x', `${x}%`);
  wrap.style.setProperty('--zoom-y', `${y}%`);
});

/* ============================================================
   8. FILTROS DEL CATÁLOGO
   ============================================================ */
(function initFilters() {
  const grid      = document.getElementById('catalogGrid');
  const countEl   = document.getElementById('filterCount');
  const noResults = document.getElementById('noResults');
  const clearBtn  = document.getElementById('clearFilters');
  if (!grid) return;

  let activeCat    = 'todos';
  let activeStatus = 'todos';

  function applyFilters() {
    const cards = $$('.product-card', grid);
    let visible = 0;

    cards.forEach(card => {
      const matchCat    = activeCat    === 'todos' || card.dataset.category === activeCat;
      const matchStatus = activeStatus === 'todos' || card.dataset.status   === activeStatus;
      const show = matchCat && matchStatus;

      if (show) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity   = '1';
          card.style.transform = 'none';
        });
        visible++;
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          if (card.style.opacity === '0') card.style.display = 'none';
        }, 260);
      }
    });

    if (countEl)   countEl.textContent = visible;
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  $$('.fpill').forEach(pill => {
    pill.addEventListener('click', () => {
      const { filter, val } = pill.dataset;
      if (filter === 'cat')    activeCat    = val;
      if (filter === 'status') activeStatus = val;

      // Actualiza UI de pills
      $$('.fpill').forEach(p => {
        if (p.dataset.filter === filter) {
          p.classList.toggle('fpill--on', p === pill);
        }
      });

      applyFilters();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCat = activeStatus = 'todos';
      $$('.fpill').forEach(p => p.classList.toggle('fpill--on', p.dataset.val === 'todos'));
      applyFilters();
    });
  }
})();

/* ============================================================
   9. CARRUSEL MÓVIL — featured (inicio)
   ============================================================ */
(function initFeaturedCarousel() {
  const grid = document.getElementById('featuredGrid');
  const dots = $$('.featured__dot');
  if (!grid || !dots.length) return;

  function updateDots() {
    const w     = grid.firstElementChild?.offsetWidth || 1;
    const gap   = 16;
    const index = Math.round(grid.scrollLeft / (w + gap));
    dots.forEach((d, i) => d.classList.toggle('featured__dot--on', i === index));
  }

  grid.addEventListener('scroll', updateDots, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const w   = grid.firstElementChild?.offsetWidth || 1;
      const gap = 16;
      grid.scrollTo({ left: i * (w + gap), behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   10. FAQ ACORDEÓN
   ============================================================ */
(function initFaq() {
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  $$('.faq-item__q', accordion).forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Cierra todos
      $$('.faq-item.is-open', accordion).forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-item__q')?.setAttribute('aria-expanded', 'false');
      });

      // Si estaba cerrado, lo abre
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ============================================================
   11. COPIAR NÚMERO DE TELÉFONO
   ============================================================ */
(function initCopyBtn() {
  const btn     = document.getElementById('copyBtn');
  const btnText = document.getElementById('copyBtnText');
  if (!btn) return;

  const NUMBER = '+593962277374';

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(NUMBER);
    } catch(e) {
      // Fallback para navegadores sin soporte
      const ta = Object.assign(document.createElement('textarea'), {
        value: NUMBER, style: 'position:fixed;opacity:0'
      });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (btnText) btnText.textContent = '¡Copiado!';
    showToast('Número copiado al portapapeles');
    setTimeout(() => {
      if (btnText) btnText.textContent = 'Copiar número';
    }, 2500);
  });
})();

/* ============================================================
   12. ANIMACIONES SCROLL — IntersectionObserver
   ============================================================ */
(function initReveal() {
  const els = $$('.reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();
