# Guía para manejar tus productos
## Instante Infinito — archivo `productos.json`

---

## Lo único que necesitas saber

Todos tus productos están en el archivo **`productos.json`**.
Ábrelo con VS Code, edita, guarda con **Ctrl+S**, recarga el navegador con **F5**.

> ⚠️ Siempre abre el sitio con **Live Server** en VS Code (clic derecho en index.html → Open with Live Server). Si lo abres directo desde el explorador de archivos los productos no cargan.

---

## Cómo luce un producto en el JSON

```json
{
  "id": 1,
  "nombre": "Bleu de Chanel",
  "marca": "Chanel",
  "familia": "Amaderado Aromático",
  "precio": 89.99,
  "precioAntes": null,
  "categoria": "hombre",
  "estado": "hot",
  "agotado": false,
  "descripcion": "Fragancia fresca y elegante para el hombre moderno.",
  "fotos": [
    "img/products/product-1/1.jpg",
    "img/products/product-1/2.jpg"
  ],
  "notas": {
    "salida": ["Bergamota", "Pimienta"],
    "corazon": ["Cedro", "Jazmín"],
    "fondo": ["Sándalo", "Almizcle"]
  },
  "barras": {
    "longevidad": 4,
    "proyeccion": 5,
    "intensidad": 4
  },
  "ocasiones": ["🌙 Noche", "👔 Formal", "💼 Trabajo"]
}
```

---

## Cambiar nombre o precio

Busca el producto por su número (`"id": 5`) y edita:

```json
"nombre": "Sauvage Dior",
"precio": 95.00
```

Los precios usan **punto**, no coma. Correcto: `89.99` ✓  Mal: `89,99` ✗

---

## Poner un descuento (precio tachado)

```json
"precio": 75.00,
"precioAntes": 99.00
```

El precio anterior aparece tachado automáticamente. Para quitar el descuento pon `null`:

```json
"precioAntes": null
```

---

## Marcar como oferta, nuevo o más vendido

```json
"estado": "hot"
```

| Valor | Etiqueta | Color |
|-------|----------|-------|
| `"hot"` | Más vendido | Rojo |
| `"new"` | Nuevo | Verde |
| `"offer"` | Oferta | Dorado |
| `"soldout"` | Agotado | Gris |
| `null` | Sin etiqueta | — |

---

## Marcar como agotado

```json
"agotado": true,
"estado": "soldout"
```

Para reactivar cuando llegue stock:

```json
"agotado": false,
"estado": null
```

---

## Cambiar la categoría (para los filtros)

```json
"categoria": "hombre"
```

Solo estas tres opciones exactas, en minúscula:
- `"hombre"`
- `"mujer"`
- `"unisex"`

---

## Agregar fotos

Copia tus fotos a la carpeta `img/products/product-X/` y ponlas en el JSON:

```json
"fotos": [
  "img/products/product-1/1.jpg",
  "img/products/product-1/2.jpg",
  "img/products/product-1/3.jpg"
]
```

La **primera foto** es la que aparece en la tarjeta del catálogo. Las demás aparecen como miniaturas en el detalle.

---

## Agregar un producto nuevo

Copia el bloque completo de un producto existente, pégalo al final de la lista (antes del `]` de cierre), cámbiale el `id` por el número siguiente y edita todos los campos.

**Importante:** entre cada producto va una coma, excepto el último:

```json
{ ... producto 19 ... },
{ ... producto 20 ... }   ← el último NO lleva coma
```

---

## Borrar un producto

Elimina todo el bloque del producto, desde `{` hasta `}` inclusive, y asegúrate de que no quede una coma extra al final del producto anterior.

---

## Cambiar datos de la tienda (WhatsApp, redes sociales)

Al inicio del archivo `productos.json` hay una sección `"config"`:

```json
"config": {
  "whatsapp": "593962277374",
  "instagram": "https://instagram.com/tupagina",
  "facebook": "https://facebook.com/tupagina",
  "tiktok": "https://tiktok.com/@tupagina",
  "creditoUrl": "https://andinawebstudio.com"
}
```

Cambia solo lo que está entre comillas. El número de WhatsApp va **sin el +**, empezando por el código de país (593 para Ecuador).

---

## Chips de ocasiones disponibles

```
"🌙 Noche"       "☀️ Día"          "👔 Formal"
"💼 Trabajo"     "🌿 Casual"       "🥂 Eventos"
"❄️ Invierno"    "🌊 Verano"       "🌸 Primavera"
"🎀 Regalo"      "💎 Lujo"         "💃 Romántico"
"💐 Floral"      "🌞 Todo el año"
```

---

## Si algo se rompe

Presiona **Ctrl+Z** en VS Code para deshacer, luego **Ctrl+S** para guardar.
Si ya cerraste sin guardar, escríbele a tu desarrollador.

---

*Guía por **Andina Web Studio***
