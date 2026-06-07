/* ================================================
   LUMIÈRE PARFUMS — app.js
   Módulos:
   1. Utilidades
   2. Header (scroll + menú mobile)
   3. Carrito
   4. Acordeón
   5. Filtros (catálogo)
   6. Zoom de imagen
   7. Toast
   8. WhatsApp flotante
   9. Init
   ================================================ */

'use strict';

/* ================================================
   1. UTILIDADES
   ================================================ */

/** Selector corto */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Formatea precio */
const formatPrice = (n) =>
  '$' + Number(n).toFixed(2);

/** Genera ID único */
let _uid = 0;
const uid = () => ++_uid;

/* ================================================
   2. HEADER — scroll shadow + menú mobile
   ================================================ */
const initHeader = () => {
  const header     = $('.site-header');
  const menuToggle = $('#menuToggle');
  const mainNav    = $('.main-nav');
  if (!header) return;

  /* Sombra al hacer scroll */
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menú mobile */
  if (!menuToggle || !mainNav) return;

  const openMenu = () => {
    mainNav.classList.add('mobile-open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onEscMenu);
    document.addEventListener('click', onOutsideMenu);
  };

  const closeMenu = () => {
    mainNav.classList.remove('mobile-open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onEscMenu);
    document.removeEventListener('click', onOutsideMenu);
  };

  const onEscMenu = (e) => { if (e.key === 'Escape') closeMenu(); };

  const onOutsideMenu = (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('mobile-open');
    isOpen ? closeMenu() : openMenu();
  });

  /* Cierra menú al hacer clic en un enlace */
  $$('.nav-link', mainNav).forEach(link => {
    link.addEventListener('click', closeMenu);
  });
};

/* ================================================
   3. CARRITO
   ================================================ */

/* ── Estado ─────────────────────────────────── */
let cart = [];   // [{ id, name, price, qty }]

/* ── Persistencia (sessionStorage) ──────────── */
const CART_KEY = 'lp_cart';

const saveCart = () => {
  try { sessionStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (_) {}
};

const loadCart = () => {
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    if (raw) cart = JSON.parse(raw);
  } catch (_) { cart = []; }
};

/* ── Cálculos ────────────────────────────────── */
const cartTotal = () =>
  cart.reduce((acc, item) => acc + item.price * item.qty, 0);

const cartItemCount = () =>
  cart.reduce((acc, item) => acc + item.qty, 0);

/* ── Añadir producto ─────────────────────────── */
const addToCart = (id, name, price) => {
  const p = parseFloat(price);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: p, qty: 1 });
  }
  saveCart();
  renderCart();
  showToast(`✦ ${name} agregado`);
};

/* ── Cambiar cantidad ────────────────────────── */
const changeQty = (id, delta) => {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
};

/* ── Eliminar producto ───────────────────────── */
const removeFromCart = (id) => {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
};

/* ── Render del carrito ──────────────────────── */
const renderCart = () => {
  const itemsEl  = $('#cartItems');
  const footerEl = $('#cartFooter');
  const totalEl  = $('#cartTotal');
  const countEls = $$('#cartCount');   // puede haber uno por página

  if (!itemsEl) return;

  /* Actualizar contador */
  const count = cartItemCount();
  countEls.forEach(el => {
    el.textContent = count;
    el.style.display = count === 0 ? 'none' : '';
  });

  /* Vacío */
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Aún no has agregado perfumes.</p>';
    if (footerEl) footerEl.hidden = true;
    return;
  }

  /* Items */
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price * item.qty)}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Reducir cantidad de ${item.name}">−</button>
        <span class="qty-num" aria-label="Cantidad: ${item.qty}">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Aumentar cantidad de ${item.name}">+</button>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar ${item.name} del carrito">✕</button>
    </div>
  `).join('');

  /* Footer */
  if (footerEl) {
    footerEl.hidden = false;
    if (totalEl) totalEl.textContent = formatPrice(cartTotal());
  }

  /* Eventos en los items */
  $$('.qty-btn', itemsEl).forEach(btn => {
    btn.addEventListener('click', () => {
      const id     = btn.dataset.id;
      const action = btn.dataset.action;
      changeQty(id, action === 'inc' ? 1 : -1);
    });
  });

  $$('.cart-item-remove', itemsEl).forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
};

/* ── Abrir / cerrar carrito ──────────────────── */
const initCart = () => {
  loadCart();
  renderCart();

  const drawer    = $('#cartDrawer');
  const overlay   = $('#cartOverlay');
  const toggleBtn = $('#cartToggle');
  const closeBtn  = $('#cartClose');
  const waBtn     = $('#btnWhatsappCart');
  if (!drawer) return;

  const openCart = () => {
    drawer.hidden  = false;
    overlay.hidden = false;
    toggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const closeCart = () => {
    drawer.hidden  = true;
    overlay.hidden = true;
    toggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn?.focus();
  };

  toggleBtn?.addEventListener('click', () => {
    drawer.hidden ? openCart() : closeCart();
  });

  closeBtn?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.hidden) closeCart();
  });

  /* Botón WhatsApp en el carrito */
  waBtn?.addEventListener('click', sendWhatsApp);

  /* Botones "Agregar al carrito" en la página */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart');
    if (!btn) return;

    const { id, name, price } = btn.dataset;
    if (!id || !name || !price) return;

    addToCart(id, name, price);

    /* Feedback visual en el botón */
    btn.textContent = '✓ Agregado';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = '+ Agregar al carrito';
      btn.classList.remove('added');
    }, 1800);
  });
};

/* ── Mensaje WhatsApp ────────────────────────── */
const sendWhatsApp = () => {
  if (cart.length === 0) return;

  const WA_NUMBER = '593990000000';

  const lines = cart.map(item =>
    `• ${item.name} x${item.qty} — ${formatPrice(item.price * item.qty)}`
  ).join('\n');

  const total = formatPrice(cartTotal());

  const msg = encodeURIComponent(
    `Hola, quiero comprar estos perfumes:\n\n${lines}\n\nTotal: ${total}\n\n¿Está disponible?`
  );

  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
};

/* ================================================
   4. ACORDEÓN (detalles de producto + FAQ)
   ================================================ */
const initAccordions = () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.accordion-btn');
    if (!btn) return;

    const expanded   = btn.getAttribute('aria-expanded') === 'true';
    const contentId  = btn.getAttribute('aria-controls');
    const content    = contentId ? document.getElementById(contentId) : null;
    if (!content) return;

    /* Toggle */
    const newState = !expanded;
    btn.setAttribute('aria-expanded', String(newState));
    content.hidden = !newState;

    /* Animación suave de altura */
    if (newState) {
      content.style.maxHeight = '0';
      content.style.overflow  = 'hidden';
      content.style.transition = 'max-height 260ms cubic-bezier(.25,.46,.45,.94)';
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + 'px';
      });
      content.addEventListener('transitionend', () => {
        content.style.maxHeight = '';
        content.style.overflow  = '';
      }, { once: true });
    } else {
      content.style.maxHeight  = content.scrollHeight + 'px';
      content.style.overflow   = 'hidden';
      content.style.transition = 'max-height 220ms cubic-bezier(.25,.46,.45,.94)';
      requestAnimationFrame(() => { content.style.maxHeight = '0'; });
      content.addEventListener('transitionend', () => {
        content.style.maxHeight = '';
        content.style.overflow  = '';
      }, { once: true });
    }
  });
};

/* ================================================
   5. FILTROS — CATÁLOGO
   ================================================ */
const initFilters = () => {
  const grid      = $('#catalogGrid');
  const noResults = $('#noResults');
  const countEl   = $('#filterCount');
  if (!grid) return;

  let activeCat  = 'all';
  let activeDisp = 'all';

  /* Aplica filtros combinados */
  const applyFilters = () => {
    const cards = $$('.product-card', grid);
    let visible = 0;

    cards.forEach(card => {
      const cat    = card.dataset.category  || '';
      const status = card.dataset.status    || '';

      const matchCat  = activeCat  === 'all' || cat    === activeCat;
      const matchDisp = activeDisp === 'all' || status === activeDisp;

      const show = matchCat && matchDisp;
      if (show) {
        delete card.dataset.hidden;
        card.removeAttribute('data-hidden');
        card.style.display = '';
        visible++;
      } else {
        card.dataset.hidden = '1';
        card.style.display  = 'none';
      }
    });

    if (countEl) countEl.textContent = visible;
    if (noResults) noResults.hidden = visible > 0;
  };

  /* Bind pills de categoría */
  $$('.filter-pill[data-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      $$('.filter-pill[data-filter]').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      activeCat = pill.dataset.filter;
      applyFilters();
    });
  });

  /* Bind pills de disponibilidad */
  $$('.filter-pill[data-filter-disp]').forEach(pill => {
    pill.addEventListener('click', () => {
      $$('.filter-pill[data-filter-disp]').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      activeDisp = pill.dataset.filterDisp;
      applyFilters();
    });
  });

  /* Filtro por URL query (?q=hombre) */
  const params = new URLSearchParams(window.location.search);
  const qCat   = params.get('q');
  if (qCat) {
    const target = $(`.filter-pill[data-filter="${qCat}"]`);
    if (target) {
      target.click();
    }
  }

  applyFilters();
};

/* ================================================
   6. ZOOM DE IMAGEN
   ================================================ */
const initImageZoom = () => {
  /* Clic en imagen de producto → abre modal */
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.product-image-wrap .product-img');
    if (!img) return;

    /* No abrir si el producto está agotado */
    const card = img.closest('.product-card--soldout');
    if (card) return;

    openZoom(img.src, img.alt);
  });
};

const openZoom = (src, alt) => {
  /* Evitar duplicados */
  if ($('.img-zoom-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'img-zoom-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Vista ampliada: ' + alt);
  overlay.setAttribute('aria-modal', 'true');

  const closeBtn = document.createElement('button');
  closeBtn.className   = 'img-zoom-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Cerrar imagen ampliada');

  const zoomed = document.createElement('img');
  zoomed.src    = src.replace('w=400&h=400', 'w=800&h=800');
  zoomed.alt    = alt;
  zoomed.width  = 800;
  zoomed.height = 800;

  overlay.appendChild(closeBtn);
  overlay.appendChild(zoomed);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  closeBtn.focus();

  const closeZoom = () => {
    overlay.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEscZoom);
  };

  const onEscZoom = (e) => { if (e.key === 'Escape') closeZoom(); };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) closeZoom();
  });

  document.addEventListener('keydown', onEscZoom);
};

/* ================================================
   7. TOAST
   ================================================ */
let toastTimer = null;

const showToast = (msg) => {
  /* Eliminar toast anterior */
  const existing = $('.toast');
  if (existing) {
    existing.remove();
    clearTimeout(toastTimer);
  }

  const toast = document.createElement('div');
  toast.className   = 'toast';
  toast.textContent = msg;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  toastTimer = setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 2200);
};

/* ================================================
   8. WHATSAPP FLOTANTE — Cursor reveal al scroll
   ================================================ */
const initWhatsappFloat = () => {
  const btn = $('.whatsapp-float');
  if (!btn) return;

  /* Pulso sutil cada 8s para llamar la atención */
  let pulseTimer = setInterval(() => {
    btn.style.transform = 'translateY(-5px) scale(1.05)';
    setTimeout(() => { btn.style.transform = ''; }, 400);
  }, 8000);

  /* Limpiar al salir */
  window.addEventListener('beforeunload', () => clearInterval(pulseTimer));
};

/* ================================================
   9. HEADER SCROLL — cursor zoom en imágenes
   ================================================ */
const initProductImageCursor = () => {
  $$('.product-image-wrap').forEach(wrap => {
    const img = wrap.querySelector('.product-img');
    if (!img) return;

    /* Solo si no está agotado */
    const card = wrap.closest('.product-card--soldout');
    if (card) return;

    wrap.style.cursor = 'zoom-in';
  });
};

/* ================================================
   10. STICKY HEADER OFFSET para anclas
   ================================================ */
const initAnchorOffset = () => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const headerH = $('.site-header')?.offsetHeight || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
};

/* ================================================
   11. LAZY LOAD fallback (por si el navegador no
       soporta loading="lazy" nativo)
   ================================================ */
const initLazyFallback = () => {
  if ('loading' in HTMLImageElement.prototype) return; // soportado nativamente

  const imgs = $$('img[loading="lazy"]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) img.src = img.dataset.src;
      observer.unobserve(img);
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
};

/* ================================================
   12. ANIMACIONES AL SCROLL (Intersection Observer)
   ================================================ */
const initScrollAnimations = () => {
  if (!('IntersectionObserver' in window)) return;

  const targets = $$(
    '.product-card, .review-card, .trust-item, .contact-card, .promise-item, .payment-item, .social-link, .faq-item'
  );

  targets.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 480ms cubic-bezier(.25,.46,.45,.94), transform 480ms cubic-bezier(.25,.46,.45,.94)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      /* Delay escalonado según posición entre hermanos */
      const siblings = $$('.product-card, .review-card, .trust-item, .contact-card, .promise-item, .payment-item, .social-link, .faq-item', el.parentElement);
      const idx = siblings.indexOf(el);
      const delay = Math.min(idx * 60, 300);

      setTimeout(() => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, delay);

      observer.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
};

/* ================================================
   13. FAVICON SVG dinámico (si no existe archivo)
   ================================================ */
const injectFaviconIfMissing = () => {
  const existing = $('link[rel="icon"][type="image/svg+xml"]');
  if (!existing) return;

  /* Verificar si el archivo existe; si no, inyectar SVG inline como data URI */
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="#1a1714"/>
    <text x="16" y="22" text-anchor="middle" font-size="18" fill="#b89a6e" font-family="Georgia,serif">✦</text>
  </svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url  = URL.createObjectURL(blob);

  const link = document.createElement('link');
  link.rel   = 'icon';
  link.type  = 'image/svg+xml';
  link.href  = url;

  /* Reemplazar el existente */
  existing.replaceWith(link);
};

/* ================================================
   INIT — punto de entrada
   ================================================ */
const init = () => {
  initHeader();
  initCart();
  initAccordions();
  initFilters();
  initImageZoom();
  initWhatsappFloat();
  initProductImageCursor();
  initAnchorOffset();
  initLazyFallback();
  initScrollAnimations();
  injectFaviconIfMissing();
};

/* Ejecutar cuando el DOM esté listo */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
