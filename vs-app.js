/**
 * INSTANTE INFINITO — vs-app.js
 * Lógica exclusiva para la página Victoria's Secret
 * Lee splashes desde productos.json
 */

'use strict';

const $vs  = (sel, ctx = document) => ctx.querySelector(sel);
const $$vs = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

let CONFIG_VS   = {};
let SPLASHES    = [];
const vsModals  = new Map();

const fbVs = (i = 0) => [
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
][i % 3];

const waVs = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

/* ── Scroll lock ── */
function lockScrollVs() {
  const y = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${y}px`;
  document.body.style.width = '100%';
  document.body.dataset.scrollY = y;
}
function unlockScrollVs() {
  const y = parseInt(document.body.dataset.scrollY || '0');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, y);
}

/* ── INIT ── */
async function initVS() {
  try {
    const res  = await fetch('productos.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    CONFIG_VS = data.config;
    SPLASHES  = data.splashes || [];

    initVsWaLinks();
    populateVsGrid();
    populateVsHomeGrid(); // sección en el inicio
    initVsFilters();

  } catch(err) {
    console.error('[VS] Error cargando splashes:', err);
    const grid = document.getElementById('vsGrid');
    if (grid) grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-muted)">
        <p style="font-family:var(--font-display);font-size:1.2rem;font-style:italic;margin-bottom:.75rem">
          No se pudieron cargar los productos
        </p>
        <p style="font-size:.875rem">Abre con Live Server en VS Code o sube al hosting.</p>
      </div>`;
  }
}

/* ── WA LINKS ── */
function initVsWaLinks() {
  const msg = waVs(CONFIG_VS.whatsapp, 'Hola, me gustaría recibir información sobre los Body Mist de Victoria\'s Secret. ¿Pueden ayudarme?');
  ['waFloat','footerWaLink','footerWaLink2','bannerWaLink'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = msg;
  });
}

/* ── CARD DE SPLASH ── */
function buildSplashCard(s, index = 0) {
  const foto = s.fotos?.[0] || fbVs(s.id);
  const waMsg = waVs(CONFIG_VS.whatsapp, `Hola, me interesa el Body Mist ${s.nombre} de Victoria's Secret. ¿Tienen disponibilidad?`);

  const badgeHTML = s.agotado ? `<span class="splash-card__badge splash-card__badge--soldout">Agotado</span>`
                  : s.estado === 'hot'     ? `<span class="splash-card__badge splash-card__badge--hot">Top</span>`
                  : s.estado === 'new'     ? `<span class="splash-card__badge splash-card__badge--new">Nuevo</span>`
                  : s.estado === 'offer'   ? `<span class="splash-card__badge splash-card__badge--offer">Oferta</span>`
                  : s.estado === 'soldout' ? `<span class="splash-card__badge splash-card__badge--soldout">Agotado</span>`
                  : '';

  const priceHTML = s.precioAntes
    ? `<span class="splash-card__price-old">$${s.precioAntes.toFixed(2)}</span>
       <span class="splash-card__price">$${s.precio.toFixed(2)}</span>`
    : `<span class="splash-card__price">$${s.precio.toFixed(2)}</span>`;

  const card = document.createElement('article');
  card.className = 'splash-card reveal-up';
  card.style.setProperty('--d', index % 4);
  card.style.animationDelay = `${index * 60}ms`;
  card.dataset.id     = s.id;
  card.dataset.estado = s.agotado ? 'agotado' : (s.estado || 'disponible');

  card.innerHTML = `
    <div class="splash-card__img-wrap" role="button" tabindex="0"
         aria-label="Ver detalles de ${s.nombre}">
      ${badgeHTML}
      <img class="splash-card__img" src="${foto}" alt="${s.nombre}"
           loading="lazy" onerror="this.onerror=null;this.src='${fbVs(index)}'" />
    </div>
    <div class="splash-card__info">
      <span class="splash-card__type">Body Mist</span>
      <h3 class="splash-card__name">${s.nombre}</h3>
      <p class="splash-card__ml">${s.ml || 250} ml · ${s.familia}</p>
      <div class="splash-card__price-row">${priceHTML}</div>
    </div>
    <div class="splash-card__actions">
      <button class="btn splash-card__btn-cart"
        data-id="${s.id}" data-nombre="${s.nombre}"
        data-precio="${s.precio}" data-foto="${foto}">
        Agregar al carrito
      </button>
      <a href="${waMsg}" target="_blank" rel="noopener noreferrer"
         class="btn splash-card__btn-wa" aria-label="Consultar por WhatsApp">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>`;

  return card;
}

/* ── POBLAR GRID ── */
function populateVsGrid() {
  const grid = document.getElementById('vsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  SPLASHES.forEach((s, i) => grid.appendChild(buildSplashCard(s, i)));

  const countEl = document.getElementById('filterCount');
  if (countEl) countEl.textContent = SPLASHES.length;

  initRevealVs();
}

/* ── FILTROS ── */
function initVsFilters() {
  const grid      = document.getElementById('vsGrid');
  const countEl   = document.getElementById('filterCount');
  const noResults = document.getElementById('noResults');
  const clearBtn  = document.getElementById('clearFilters');
  if (!grid) return;

  function apply(filter) {
    const cards = $$vs('.splash-card', grid);
    let visible = 0;

    cards.forEach(card => {
      const match =
        filter === 'todos' ||
        filter === card.dataset.estado ||
        (filter === 'disponible' && card.dataset.estado !== 'agotado');

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

    const filterBar = document.getElementById('filterBar');
    $$vs('.fpill', filterBar || document).forEach(pill => {
      const on = pill.dataset.filter === filter;
      pill.classList.toggle('fpill--on', on);
      pill.setAttribute('aria-pressed', String(on));
    });
  }

  const filterBar = document.getElementById('filterBar');
  $$vs('.fpill', filterBar || document).forEach(pill =>
    pill.addEventListener('click', () => apply(pill.dataset.filter))
  );
  clearBtn?.addEventListener('click', () => apply('todos'));
}

/* ── MODAL SPLASH ── */
function buildSplashModal(s) {
  const foto   = s.fotos?.[0] || fbVs(s.id);
  const waMsg  = waVs(CONFIG_VS.whatsapp, `Hola, me interesa el Body Mist ${s.nombre} de Victoria's Secret. ¿Tienen disponibilidad?`);
  const chips  = (s.ocasiones || []).map(o => `<span class="chip">${o}</span>`).join('');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = `vs-modal-${s.id}`;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', s.nombre);

  const priceHTML = s.precioAntes
    ? `<span style="font-size:.9rem;color:var(--text-dim);text-decoration:line-through;margin-right:8px">$${s.precioAntes.toFixed(2)}</span><span class="splash-modal__price">$${s.precio.toFixed(2)}</span>`
    : `<span class="splash-modal__price">$${s.precio.toFixed(2)}</span>`;

  overlay.innerHTML = `
    <div class="splash-modal">
      <button class="modal__close" aria-label="Cerrar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="splash-modal__gallery">
        <div class="splash-modal__img-wrap">
          <img class="splash-modal__img" src="${foto}" alt="${s.nombre}"
               onerror="this.onerror=null;this.src='${fbVs(0)}'" />
        </div>
        <div class="splash-modal__thumbs">
          <button class="splash-modal__thumb splash-modal__thumb--on" data-src="${s.fotos[0] || foto}">
            <img src="${s.fotos[0] || foto}" alt="Foto 1"
                 onerror="this.onerror=null;this.src='${fbVs(0)}'" />
          </button>
          ${s.fotos && s.fotos[1] ? `<button class="splash-modal__thumb" data-src="${s.fotos[1]}">
            <img src="${s.fotos[1]}" alt="Foto 2"
                 onerror="this.onerror=null;this.src='${fbVs(1)}'" />
          </button>` : ''}
        </div>
      </div>

      <div class="splash-modal__info">
        <span class="splash-modal__type">Body Mist · Victoria's Secret</span>
        <h2 class="splash-modal__name">${s.nombre}</h2>
        <p class="splash-modal__brand">${s.familia}</p>
        <div>${priceHTML}</div>
        <div class="splash-modal__meta">
          <span class="splash-modal__meta-pill">${s.ml || 250} ml</span>
          <span class="splash-modal__meta-pill">Original</span>
          <span class="splash-modal__meta-pill">Importado</span>
        </div>
        <div class="splash-modal__fragancia">
          <div class="splash-modal__dato">
            <span class="splash-modal__dato-label">Tipo de fragancia</span>
            <span class="splash-modal__dato-val">${s.tipo_fragancia || s.familia}</span>
          </div>
          <div class="splash-modal__dato">
            <span class="splash-modal__dato-label">Notas</span>
            <span class="splash-modal__dato-val">${s.notas_simples || '—'}</span>
          </div>
        </div>
        <p class="splash-modal__desc">${s.descripcion}</p>
        <div class="splash-modal__ocasiones">${chips}</div>
      </div>

      <div class="splash-modal__actions">
        <button class="btn btn--dark splash-modal__add-cart"
          data-id="${s.id}" data-nombre="${s.nombre}"
          data-precio="${s.precio}" data-foto="${foto}">
          Agregar al carrito
        </button>
        <a href="${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn--wa">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>`;

  // Miniaturas — cambiar imagen principal
  $$vs('.splash-modal__thumb', overlay).forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src  = thumb.dataset.src;
      const img  = $vs('.splash-modal__img', overlay);
      const wrap = $vs('.splash-modal__img-wrap', overlay);
      if (img && src) {
        wrap.style.opacity = '0';
        setTimeout(() => { img.src = src; wrap.style.opacity = '1'; }, 150);
      }
      $$vs('.splash-modal__thumb--on', overlay).forEach(t => t.classList.remove('splash-modal__thumb--on'));
      thumb.classList.add('splash-modal__thumb--on');
    });
  });

  // Zoom con mouse en desktop
  const imgWrap = $vs('.splash-modal__img-wrap', overlay);
  if (imgWrap) {
    imgWrap.addEventListener('mousemove', e => {
      const r = imgWrap.getBoundingClientRect();
      imgWrap.style.setProperty('--zoom-x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      imgWrap.style.setProperty('--zoom-y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  }

  // Cerrar
  $vs('.modal__close', overlay).addEventListener('click', () => closeVsModal(overlay));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeVsModal(overlay); });

  // Agregar al carrito
  $vs('.splash-modal__add-cart', overlay).addEventListener('click', e => {
    e.stopPropagation();
    const btn = e.currentTarget;
    // Usar el Cart del app.js principal
    if (window.Cart) {
      window.Cart.add({ id: btn.dataset.id, nombre: btn.dataset.nombre, precio: btn.dataset.precio, foto: btn.dataset.foto });
    }
    const orig = btn.textContent;
    btn.textContent = '✓ Agregado';
    btn.style.background = 'var(--wa)';
    btn.style.borderColor = 'var(--wa)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 1800);
    showVsToast(`"${btn.dataset.nombre}" agregado`);
  });

  return overlay;
}

function openVsModal(id) {
  const numId = parseInt(id);
  if (!vsModals.has(numId)) {
    const s = SPLASHES.find(s => s.id === numId);
    if (!s) return;
    const overlay = buildSplashModal(s);
    document.getElementById('modalContainer').appendChild(overlay);
    vsModals.set(numId, overlay);
  }
  const overlay = vsModals.get(numId);
  overlay.classList.add('is-open');
  lockScrollVs();
}

function closeVsModal(overlay) {
  overlay.classList.remove('is-open');
  unlockScrollVs();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape')
    $$vs('.modal-overlay.is-open').forEach(m => closeVsModal(m));
});

/* ── DELEGACIÓN DE CLICS ── */
document.addEventListener('click', e => {
  const imgWrap = e.target.closest('.splash-card__img-wrap');
  if (imgWrap) {
    const id = imgWrap.closest('.splash-card')?.dataset.id;
    if (id) { openVsModal(id); return; }
  }
  const cartBtn = e.target.closest('.splash-card__btn-cart');
  if (cartBtn) {
    if (window.Cart) {
      window.Cart.add({ id: cartBtn.dataset.id, nombre: cartBtn.dataset.nombre, precio: cartBtn.dataset.precio, foto: cartBtn.dataset.foto });
    }
    showVsToast(`"${cartBtn.dataset.nombre}" agregado`);
    return;
  }
});

/* ── REVEAL SCROLL ── */
function initRevealVs() {
  const els = $$vs('.reveal-up');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── TOAST ── */
function showVsToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast toast--success';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3300);
}


/* ── GRID VS EN EL INICIO — 4 splashes hot o los primeros 4 ── */
function populateVsHomeGrid() {
  const grid     = document.getElementById('vsHomeGrid');
  const dotsWrap = document.getElementById('vsHomeDots');
  if (!grid || !SPLASHES.length) return;

  grid.innerHTML = '';
  const hot  = SPLASHES.filter(s => s.estado === 'hot');
  const list = hot.length >= 7 ? hot.slice(0, 7)
             : [...hot, ...SPLASHES.filter(s => s.estado !== 'hot')].slice(0, 7);

  list.forEach((s, i) => grid.appendChild(buildSplashCard(s, i)));

  // Card CTA — igual que en perfumes
  const ctaCard = document.createElement('div');
  ctaCard.className = 'featured-cta-card reveal-up';
  ctaCard.dataset.count = SPLASHES.length;
  ctaCard.innerHTML =
    '<div class="featured-cta-card__inner">' +
    '<p class="featured-cta-card__eyebrow">Colección completa</p>' +
    '<h3 class="featured-cta-card__title">¿Ya encontraste<br>tu splash?</h3>' +
    '<p class="featured-cta-card__text">Tenemos ' + SPLASHES.length + ' Body Mist Victoria\'s Secret originales.</p>' +
    '<a href="victoriasecret.html" class="btn btn--dark featured-cta-card__btn">Ver todos los splashes</a>' +
    '</div>';
  grid.appendChild(ctaCard);

  // Dots móvil
  if (dotsWrap) {
    list.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `featured__dot${i === 0 ? ' featured__dot--on' : ''}`;
      dot.setAttribute('aria-label', `Splash ${i + 1}`);
      dot.addEventListener('click', () => {
        const w = grid.firstElementChild?.offsetWidth || 1;
        grid.scrollTo({ left: i * (w + 12), behavior: 'smooth' });
      });
      dotsWrap.appendChild(dot);
    });
    grid.addEventListener('scroll', () => {
      const w   = grid.firstElementChild?.offsetWidth || 1;
      const idx = Math.round(grid.scrollLeft / (w + 12));
      [...dotsWrap.querySelectorAll('.featured__dot')].forEach((d, i) =>
        d.classList.toggle('featured__dot--on', i === idx)
      );
    }, { passive: true });
  }
}

/* ── ARRANQUE ── */
initVS();

/* ── LIGHTBOX — imagen splash a pantalla completa ── */
(function() {
  // Crear el lightbox una sola vez
  const lb = document.createElement('div');
  lb.className = 'splash-lightbox';
  lb.innerHTML = `
    <button class="splash-lightbox__close" aria-label="Cerrar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <img class="splash-lightbox__img" alt="Imagen ampliada" />
    <p class="splash-lightbox__hint">Toca fuera para cerrar</p>
  `;
  document.body.appendChild(lb);

  const lbImg   = lb.querySelector('.splash-lightbox__img');
  const lbClose = lb.querySelector('.splash-lightbox__close');

  function openLightbox(src) {
    lbImg.src = src;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Cerrar al hacer clic en el fondo o en la X
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target === lbImg) closeLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLightbox();
  });

  // Abrir lightbox al hacer clic en la imagen del modal splash
  document.addEventListener('click', e => {
    const imgWrap = e.target.closest('.splash-modal__img-wrap');
    if (imgWrap) {
      const img = imgWrap.querySelector('.splash-modal__img');
      if (img) {
        e.stopPropagation();
        openLightbox(img.src);
      }
    }
  });
})();
