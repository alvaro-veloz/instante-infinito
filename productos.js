/* ============================================================
   INSTANTE INFINITO — productos.js
   
   ✅ ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR
   para agregar, quitar o modificar productos.
   
   REGLAS DE ORO:
   · Guarda con Ctrl+S después de cada cambio
   · Recarga el navegador con F5 para ver los cambios
   · No borres las comas entre productos
   · Los números usan punto, no coma: 89.99 ✓  89,99 ✗
   ============================================================ */

const PRODUCTOS = [

  /* ══════════════════════════════════════════════════════
     PRODUCTO 1
     ══════════════════════════════════════════════════════ */
  {
    id:        1,
    nombre:    "Bleu de Chanel",
    marca:     "Chanel",
    precio:    89.99,
    precioAntes: null,       // null = sin descuento | 120.00 = precio anterior tachado
    categoria: "hombre",     // "hombre" | "mujer" | "unisex"
    familia:   "Amaderado Aromático",
    badge:     "hot",        // "hot" | "new" | "offer" | "soldout" | null
    agotado:   false,        // true = agotado | false = disponible
    fotos: [
      "img/products/product-1/1.jpg",
      "img/products/product-1/2.jpg",
      "img/products/product-1/3.jpg"
    ],
    notas: {
      salida:   ["Pimienta Rosa", "Pomelo", "Menta"],
      corazon:  ["Jengibre", "Nuez moscada", "Jazmín"],
      fondo:    ["Incienso", "Cedro", "Sándalo"]
    },
    barras: {
      longevidad: 4,   // 1 al 5
      proyeccion: 5,   // 1 al 5
      intensidad: 4    // 1 al 5
    },
    ocasiones: ["🌙 Noche", "👔 Formal", "❄️ Invierno", "💼 Trabajo"],
    descripcion: "Bleu de Chanel es una fragancia amaderada y aromática para el hombre moderno. Fresca y elegante a la vez, ideal para el día a día y ocasiones formales. Un clásico que nunca falla y deja una estela impecable."
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 2
     ══════════════════════════════════════════════════════ */
  {
    id:        2,
    nombre:    "La Vie Est Belle",
    marca:     "Lancôme",
    precio:    75.00,
    precioAntes: 99.00,
    categoria: "mujer",
    familia:   "Floral Gourmand",
    badge:     "offer",
    agotado:   false,
    fotos: [
      "img/products/product-2/1.jpg",
      "img/products/product-2/2.jpg"
    ],
    notas: {
      salida:   ["Grosella negra", "Pera"],
      corazon:  ["Iris", "Jazmín", "Rosa"],
      fondo:    ["Praliné", "Vainilla", "Pachulí"]
    },
    barras: {
      longevidad: 5,
      proyeccion: 4,
      intensidad: 4
    },
    ocasiones: ["🌸 Primavera", "☀️ Día", "🎀 Regalo", "💃 Romántico"],
    descripcion: "La Vie Est Belle es un manifiesto de felicidad. Su corazón de iris se combina con notas gourmand que crean una fragancia adictiva y única. Perfecta para regalar o para sentirte especial cada día."
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 3
     ══════════════════════════════════════════════════════ */
  {
    id:        3,
    nombre:    "Sauvage",
    marca:     "Dior",
    precio:    95.00,
    precioAntes: null,
    categoria: "hombre",
    familia:   "Aromático Fresco",
    badge:     "hot",
    agotado:   false,
    fotos: [
      "img/products/product-3/1.jpg",
      "img/products/product-3/2.jpg"
    ],
    notas: {
      salida:   ["Bergamota", "Pimienta"],
      corazon:  ["Lavanda", "Geranio", "Vetiver"],
      fondo:    ["Ambroxan", "Cedro", "Labdano"]
    },
    barras: {
      longevidad: 5,
      proyeccion: 5,
      intensidad: 4
    },
    ocasiones: ["☀️ Día", "🌿 Casual", "🌊 Verano", "💼 Trabajo"],
    descripcion: "Sauvage evoca los paisajes salvajes al atardecer. Fresco, poderoso e inconfundible. Su proyección es extraordinaria y deja una estela imposible de ignorar. El perfume masculino más vendido del mundo."
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 4
     ══════════════════════════════════════════════════════ */
  {
    id:        4,
    nombre:    "Black Opium",
    marca:     "Yves Saint Laurent",
    precio:    105.00,
    precioAntes: null,
    categoria: "mujer",
    familia:   "Oriental Floral",
    badge:     "new",
    agotado:   false,
    fotos: [
      "img/products/product-4/1.jpg",
      "img/products/product-4/2.jpg"
    ],
    notas: {
      salida:   ["Pera", "Pomelo rosa"],
      corazon:  ["Café negro", "Jazmín", "Naranja"],
      fondo:    ["Vainilla", "Pachulí", "Cedro"]
    },
    barras: {
      longevidad: 5,
      proyeccion: 4,
      intensidad: 5
    },
    ocasiones: ["🌙 Noche", "❄️ Invierno", "🥂 Eventos", "💃 Romántico"],
    descripcion: "Black Opium es oscuro, adictivo e irresistible. La combinación de café negro con flores blancas crea un contraste único que atrapa desde el primer instante. Para mujeres que no pasan desapercibidas."
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 5
     ══════════════════════════════════════════════════════ */
  {
    id:        5,
    nombre:    "[Nombre del Perfume 5]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "unisex",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-5/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌿 Casual", "🌞 Todo el año"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 6
     ══════════════════════════════════════════════════════ */
  {
    id:        6,
    nombre:    "[Nombre del Perfume 6]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "hombre",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-6/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]", "[Nota 6]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["☀️ Día", "💼 Trabajo"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 7
     ══════════════════════════════════════════════════════ */
  {
    id:        7,
    nombre:    "[Nombre del Perfume 7]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "mujer",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-7/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌸 Primavera", "🎀 Regalo"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 8
     ══════════════════════════════════════════════════════ */
  {
    id:        8,
    nombre:    "[Nombre del Perfume 8]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "unisex",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-8/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]", "[Nota 6]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌿 Casual", "🌞 Todo el año"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 9
     ══════════════════════════════════════════════════════ */
  {
    id:        9,
    nombre:    "[Nombre del Perfume 9]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "hombre",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-9/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]", "[Nota 3]"],
      corazon:  ["[Nota 4]", "[Nota 5]"],
      fondo:    ["[Nota 6]", "[Nota 7]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌙 Noche", "🥂 Eventos"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 10
     ══════════════════════════════════════════════════════ */
  {
    id:        10,
    nombre:    "[Nombre del Perfume 10]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "mujer",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-10/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["💐 Floral", "🌸 Primavera"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 11
     ══════════════════════════════════════════════════════ */
  {
    id:        11,
    nombre:    "[Nombre del Perfume 11]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "unisex",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-11/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]", "[Nota 6]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌿 Casual", "🌞 Todo el año"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 12
     ══════════════════════════════════════════════════════ */
  {
    id:        12,
    nombre:    "[Nombre del Perfume 12]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "hombre",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-12/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["👔 Formal", "💼 Trabajo"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 13
     ══════════════════════════════════════════════════════ */
  {
    id:        13,
    nombre:    "[Nombre del Perfume 13]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "mujer",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-13/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]", "[Nota 6]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["💃 Romántico", "🌙 Noche"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 14
     ══════════════════════════════════════════════════════ */
  {
    id:        14,
    nombre:    "[Nombre del Perfume 14]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "unisex",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-14/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["💎 Lujo", "🥂 Eventos"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 15
     ══════════════════════════════════════════════════════ */
  {
    id:        15,
    nombre:    "[Nombre del Perfume 15]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "hombre",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-15/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]", "[Nota 6]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌊 Verano", "☀️ Día"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 16
     ══════════════════════════════════════════════════════ */
  {
    id:        16,
    nombre:    "[Nombre del Perfume 16]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "mujer",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-16/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌸 Primavera", "🎀 Regalo"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 17
     ══════════════════════════════════════════════════════ */
  {
    id:        17,
    nombre:    "[Nombre del Perfume 17]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "unisex",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-17/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]", "[Nota 3]"],
      corazon:  ["[Nota 4]", "[Nota 5]"],
      fondo:    ["[Nota 6]", "[Nota 7]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["🌿 Casual", "🌞 Todo el año"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 18
     ══════════════════════════════════════════════════════ */
  {
    id:        18,
    nombre:    "[Nombre del Perfume 18]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "hombre",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-18/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]", "[Nota 6]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["👔 Formal", "🌙 Noche"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 19
     ══════════════════════════════════════════════════════ */
  {
    id:        19,
    nombre:    "[Nombre del Perfume 19]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "mujer",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-19/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["💐 Floral", "☀️ Día"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  },

  /* ══════════════════════════════════════════════════════
     PRODUCTO 20
     ══════════════════════════════════════════════════════ */
  {
    id:        20,
    nombre:    "[Nombre del Perfume 20]",
    marca:     "[Marca / Casa]",
    precio:    0.00,
    precioAntes: null,
    categoria: "unisex",
    familia:   "[Familia Olfativa]",
    badge:     null,
    agotado:   false,
    fotos: [
      "img/products/product-20/1.jpg"
    ],
    notas: {
      salida:   ["[Nota 1]", "[Nota 2]"],
      corazon:  ["[Nota 3]", "[Nota 4]"],
      fondo:    ["[Nota 5]", "[Nota 6]"]
    },
    barras: {
      longevidad: 3,
      proyeccion: 3,
      intensidad: 3
    },
    ocasiones: ["💎 Lujo", "🥂 Eventos"],
    descripcion: "[Descripción del perfume. Escribe 2 a 4 oraciones que capturen la esencia y experiencia de esta fragancia.]"
  }

]; // ← NO borres este punto y coma

/* ============================================================
   CONFIGURACIÓN GENERAL DE LA TIENDA
   Edita estos datos cuando cambien.
   ============================================================ */
const CONFIG = {
  whatsapp:   "593962277374",
  nombreTienda: "Instante Infinito",
  slogan:     "La Alquimia del Momento",
  instagram:  "https://instagram.com/instanteinfinito",
  facebook:   "https://facebook.com/instanteinfinito",
  tiktok:     "https://tiktok.com/@instanteinfinito",
  creditoUrl: "https://andinawebstudio.com",

  /* Hero carrusel — 3 slides */
  heroSlides: [
    {
      imagen:    "img/hero/slide-hombre.jpg",
      eyebrow:   "Fragancias para él",
      titulo:    "El aroma que\nte define",
      subtitulo: "Perfumes originales importados para el hombre moderno.",
      btnTexto:  "Ver perfumes para hombre",
      btnFiltro: "hombre"
    },
    {
      imagen:    "img/hero/slide-mujer.jpg",
      eyebrow:   "Fragancias para ella",
      titulo:    "Un instante\ninfinito",
      subtitulo: "Fragancias que cuentan tu historia sin decir una palabra.",
      btnTexto:  "Ver perfumes para mujer",
      btnFiltro: "mujer"
    },
    {
      imagen:    "img/hero/slide-unisex.jpg",
      eyebrow:   "Sin fronteras",
      titulo:    "La alquimia\ndel momento",
      subtitulo: "Fragancias que trascienden géneros. Para quienes se atreven.",
      btnTexto:  "Ver colección unisex",
      btnFiltro: "unisex"
    }
  ]
};

/* ============================================================
   REFERENCIA RÁPIDA — badges y categorías válidas

   badge:     "hot"     → Más vendido (rojo)
              "new"     → Nuevo (azul)
              "offer"   → Oferta (cuando hay precioAntes)
              "soldout" → Agotado (gris)
              null      → Sin etiqueta

   categoria: "hombre" | "mujer" | "unisex"

   agotado:   true | false

   precioAntes: null (sin descuento) | 99.00 (precio anterior)
   ============================================================ */
