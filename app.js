/* ============================================================
   INSTANTE INFINITO — app.js
   Módulos:
   1. Utilidades
   2. Carrito
   3. Acordeón
   4. Menú móvil
   5. Filtros de catálogo
   6. Lightbox / Zoom
   7. Scroll animations
   8. Init
============================================================ */

'use strict';

/* ============================================================
   1. UTILIDADES
============================================================ */

/** Selecciona un elemento del DOM */
const $ = (sel, ctx = document) => ctx.querySelector(sel);

/** Selecciona múltiples elementos del DOM */
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Número de WhatsApp (reemplazar con el real) */
const WA_NUMBER = '593999999999'; // REEMPLAZAR

/** Formatea precio como string */
const formatPrice = (n) =>
  '$' + Number(n).toFixed(2);

/** Abre WhatsApp en nueva pestaña */
const openWhatsApp = (msg) => {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/** Bloquea/desbloquea scroll del body */
const lockScroll   = () => { document.body.style.overflow = 'hidden'; };
const unlockScroll = () => { document.body.style.overflow = ''; };

/** Emite un evento personalizado */
const emit = (name, detail = {}) =>
  document.dispatchEvent(new CustomEvent(name, { detail }));


/* ============================================================
   2. MÓDULO CARRITO
============================================================ */
const Cart = (() => {

  /* ── Estado ── */
  let items = []; // [{ id, name, price, qty }]

  /* ── Referencias DOM ── */
  const getDrawer   = () => $('#cartDrawer');
  const getOverlay  = () => $('#cartOverlay');
  const getCount    = () => $('#cartCount');
  const getList     = () => $('#cartItems');
  const getEmpty    = () => $('#cartEmpty');
  const getFooter   = () => $('#cartFooter');
  const getTotal    = () => $('#cartTotal');
  const getToggle   = () => $('#cartToggle');
  const getClose    = () => $('#cartClose');
  const getCheckout = () => $('#checkoutBtn');

  /* ── Abrir / Cerrar ── */
  const open = () => {
    const drawer  = getDrawer();
    const overlay = getOverlay();
    if (!drawer || !overlay) return;
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    getToggle()?.setAttribute('aria-expanded', 'true');
    lockScroll();
  };

  const close = () => {
    const drawer  = getDrawer();
    const overlay = getOverlay();
    if (!drawer || !overlay) return;
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    getToggle()?.setAttribute('aria-expanded', 'false');
    unlockScroll();
  };

  /* ── Añadir producto ── */
  const add = (id, name, price) => {
    const idx = items.findIndex(i => i.id === id);
    if (idx >= 0) {
      items[idx].qty += 1;
    } else {
      items.push({ id, name, price: parseFloat(price), qty: 1 });
    }
    render();
    updateBadge();
    open();
    emit('cart:updated', { items });
  };

  /* ── Eliminar producto ── */
  const remove = (id) => {
    items = items.filter(i => i.id !== id);
    render();
    updateBadge();
    emit('cart:updated', { items });
  };

  /* ── Cambiar cantidad ── */
  const setQty = (id, delta) => {
    const idx = items.findIndex(i => i.id === id);
    if (idx < 0) return;
    items[idx].qty += delta;
    if (items[idx].qty <= 0) {
      remove(id);
      return;
    }
    render();
    updateBadge();
    emit('cart:updated', { items });
  };

  /* ── Calcular total ── */
  const getSum = () =>
    items.reduce((acc, i) => acc + i.price * i.qty, 0);

  /* ── Badge del header ── */
  const updateBadge = () => {
    const count  = getCount();
    if (!count) return;
    const total = items.reduce((acc, i) => acc + i.qty, 0);
    count.textContent = total;
    if (total > 0) {
      count.classList.add('visible');
    } else {
      count.classList.remove('visible');
    }
  };

  /* ── Renderizar lista ── */
  const render = () => {
    const list   = getList();
    const empty  = getEmpty();
    const footer = getFooter();
    const total  = getTotal();
    if (!list) return;

    // Limpiar items anteriores (mantener el nodo "vacío")
    $$('.cart-item', list).forEach(el => el.remove());

    if (items.length === 0) {
      empty?.removeAttribute('hidden');
      footer?.setAttribute('hidden', '');
      return;
    }

    empty?.setAttribute('hidden', '');
    footer?.removeAttribute('hidden');

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.dataset.id = item.id;
      li.innerHTML = `
        <div class="cart-item-info">
          <p class="cart-item-name">${escapeHtml(item.name)}</p>
          <p class="cart-item-price">${formatPrice(item.price)} c/u</p>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn qty-minus" aria-label="Reducir cantidad de ${escapeHtml(item.name)}">−</button>
          <span class="qty-num" aria-live="polite">${item.qty}</span>
          <button class="qty-btn qty-plus"  aria-label="Aumentar cantidad de ${escapeHtml(item.name)}">+</button>
        </div>`;
      list.appendChild(li);

      li.querySelector('.qty-minus').addEventListener('click', () => setQty(item.id, -1));
      li.querySelector('.qty-plus').addEventListener('click',  () => setQty(item.id, +1));
    });

    if (total) total.textContent = formatPrice(getSum());
  };

  /* ── Checkout → WhatsApp ── */
  const checkout = () => {
    if (items.length === 0) return;

    const lines = items.map(i =>
      `  • ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`
    ).join('\n');

    const msg =
      `Hola, quiero comprar los siguientes perfumes:\n\n` +
      `${lines}\n\n` +
      `*Total: ${formatPrice(getSum())}*\n\n` +
      `Por favor, indíquenme cómo proceder con el pago y el envío. ¡Gracias!`;

    openWhatsApp(msg);
  };

  /* ── Escape HTML ── */
  const escapeHtml = (str) =>
    str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  /* ── Bind eventos ── */
  const bind = () => {
    // Toggle carrito
    $('#cartToggle')?.addEventListener('click', () => {
      const drawer = getDrawer();
      const isOpen = drawer?.getAttribute('aria-hidden') === 'false';
      isOpen ? close() : open();
    });

    // Cerrar carrito
    $('#cartClose')?.addEventListener('click', close);

    // Overlay cierra carrito
    $('#cartOverlay')?.addEventListener('click', close);

    // Checkout
    $('#checkoutBtn')?.addEventListener('click', checkout);

    // Botones "Agregar al carrito" (delegación)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-to-cart');
      if (!btn) return;
      const { id, name, price } = btn.dataset;
      add(id, name, price);
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  return { init: bind, open, close, add, remove, items: () => items };

})();


/* ============================================================
   3. MÓDULO ACORDEÓN
============================================================ */
const Accordion = (() => {

  /**
   * Abre un panel y cierra los hermanos si closeOthers=true
   */
  const toggle = (trigger, closeOthers = false) => {
    const panel     = document.getElementById(trigger.getAttribute('aria-controls'));
    const isOpen    = trigger.getAttribute('aria-expanded') === 'true';
    const accordion = trigger.closest('.accordion');

    if (closeOthers && accordion) {
      // Cierra todos los demás del mismo acordeón
      $$('.accordion-trigger[aria-expanded="true"]', accordion).forEach(t => {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          const p = document.getElementById(t.getAttribute('aria-controls'));
          p?.setAttribute('hidden', '');
        }
      });
    }

    if (isOpen) {
      trigger.setAttribute('aria-expanded', 'false');
      panel?.setAttribute('hidden', '');
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      panel?.removeAttribute('hidden');
    }
  };

  const bind = () => {
    // Delegación global — funciona en cualquier página
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.accordion-trigger');
      if (!trigger) return;

      // Las FAQ cierran los otros; los de producto no
      const isFaq = trigger.closest('.faq-accordion');
      toggle(trigger, !!isFaq);
    });
  };

  return { init: bind };

})();


/* ============================================================
   4. MÓDULO MENÚ MÓVIL
============================================================ */
const MobileMenu = (() => {

  const bind = () => {
    const toggle = $('#menuToggle');
    const menu   = $('#mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-label', 'Abrir menú');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        menu.removeAttribute('hidden');
        toggle.setAttribute('aria-label', 'Cerrar menú');
      }
    });

    // Cierra si se hace clic en un enlace del menú móvil
    $$('.mobile-nav-link', menu).forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('hidden', '');
      });
    });

    // Cierra con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('hidden', '');
        toggle.focus();
      }
    });
  };

  return { init: bind };

})();


/* ============================================================
   5. MÓDULO FILTROS DE CATÁLOGO
============================================================ */
const CatalogFilters = (() => {

  const bind = () => {
    const btns = $$('.filter-btn');
    if (btns.length === 0) return; // no estamos en catálogo

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Actualizar estado activo
        btns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        applyFilter(btn.dataset.filter);
      });
    });

    // "Ver todos" en mensaje sin resultados
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-filter="all"]')) {
        e.preventDefault();
        const allBtn = $('[data-filter="all"].filter-btn') || $('[data-filter="all"]');
        allBtn?.click();
      }
    });
  };

  const applyFilter = (filter) => {
    const cards    = $$('.product-card');
    const noResult = $('#noResults');
    let visible    = 0;

    cards.forEach(card => {
      const show = matchesFilter(card, filter);
      if (show) {
        card.removeAttribute('hidden');
        // Pequeña entrada al aparecer
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeIn 0.3s ease forwards';
        visible++;
      } else {
        card.setAttribute('hidden', '');
      }
    });

    if (noResult) {
      visible === 0
        ? noResult.removeAttribute('hidden')
        : noResult.setAttribute('hidden', '');
    }
  };

  const matchesFilter = (card, filter) => {
    if (filter === 'all') return true;
    if (filter === 'available') return card.dataset.available === 'true';
    return card.dataset.category === filter;
  };

  return { init: bind };

})();


/* ============================================================
   6. MÓDULO LIGHTBOX / ZOOM
============================================================ */
const Lightbox = (() => {

  let lastFocus = null;

  const open = (src, alt) => {
    const lb       = $('#lightbox');
    const backdrop = $('#lightboxBackdrop');
    const img      = $('#lightboxImg');
    if (!lb || !backdrop || !img) return;

    lastFocus = document.activeElement;

    img.src = src;
    img.alt = alt || '';

    lb.removeAttribute('hidden');
    backdrop.removeAttribute('hidden');
    lockScroll();

    // Focus en botón cerrar
    $('#lightboxClose')?.focus();
  };

  const close = () => {
    const lb       = $('#lightbox');
    const backdrop = $('#lightboxBackdrop');
    if (!lb || !backdrop) return;

    lb.setAttribute('hidden', '');
    backdrop.setAttribute('hidden', '');
    unlockScroll();

    lastFocus?.focus();
  };

  const bind = () => {
    // Delegación: clic en botón zoom
    document.addEventListener('click', (e) => {
      const zoomBtn = e.target.closest('.zoom-btn');
      if (!zoomBtn) return;
      const card = zoomBtn.closest('.product-card');
      const img  = card?.querySelector('.product-img');
      if (!img) return;
      open(img.src, img.alt);
    });

    // Cerrar
    $('#lightboxClose')?.addEventListener('click', close);
    $('#lightboxBackdrop')?.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  return { init: bind, open, close };

})();


/* ============================================================
   7. MÓDULO ANIMACIONES DE SCROLL
============================================================ */
const ScrollAnimations = (() => {

  const bind = () => {
    // Agrega clase .fade-in a los elementos que queremos animar
    const targets = $$(
      '.product-card, .review-card, .trust-item, .payment-item, ' +
      '.contact-method, .section-header, .hero-content, .hero-visual'
    );

    targets.forEach((el, i) => {
      el.classList.add('fade-in');
      // Delay escalonado para grids
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
    });

    if (!('IntersectionObserver' in window)) {
      // Fallback: muestra todo
      targets.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(el => observer.observe(el));
  };

  return { init: bind };

})();


/* ============================================================
   8. MÓDULO HEADER — scroll behavior
============================================================ */
const Header = (() => {

  const bind = () => {
    const header = $('.site-header');
    if (!header) return;

    let lastY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          // Añade sombra suave al hacer scroll
          if (y > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.25)';
          } else {
            header.style.boxShadow = '';
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  };

  return { init: bind };

})();


/* ============================================================
   9. MÓDULO LAZY IMAGES (native + polyfill)
============================================================ */
const LazyImages = (() => {

  const bind = () => {
    // El atributo loading="lazy" nativo cubre la mayoría de casos.
    // Este módulo añade un fallback visual para imágenes con placeholder.
    $$('img[loading="lazy"]').forEach(img => {
      if (img.complete) return;

      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease';

      img.addEventListener('load', () => {
        img.style.opacity = '1';
      }, { once: true });

      img.addEventListener('error', () => {
        // Placeholder de texto si la imagen no carga
        img.style.opacity = '0.4';
        img.alt = img.alt || 'Imagen no disponible';
      }, { once: true });
    });
  };

  return { init: bind };

})();


/* ============================================================
   10. MÓDULO WHATSAPP DIRECTO (botón individual por producto)
============================================================ */
const DirectWhatsApp = (() => {

  const bind = () => {
    // Si en el futuro se agregan botones "Comprar por WhatsApp" directos
    // (fuera del carrito), este módulo los maneja.
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-buy-direct');
      if (!btn) return;
      const { name, price } = btn.dataset;
      if (!name) return;
      const msg = `Hola, me interesa el perfume *${name}* (${formatPrice(price)}). ¿Está disponible?`;
      openWhatsApp(msg);
    });
  };

  return { init: bind };

})();


/* ============================================================
   11. INIT — punto de entrada
============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Inicializar todos los módulos
  Cart.init();
  Accordion.init();
  MobileMenu.init();
  CatalogFilters.init();
  Lightbox.init();
  ScrollAnimations.init();
  Header.init();
  LazyImages.init();
  DirectWhatsApp.init();

  // Marcar la página activa en la nav (por si acaso no lo detecta el HTML)
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Reducir motion si el usuario lo prefiere
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
  }

});
