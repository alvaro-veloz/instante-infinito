# Instante Infinito

A fully functional fragrance e-commerce experience built without a single framework — pure HTML, CSS, and JavaScript. Dynamic product catalog powered by JSON, a persistent shopping cart, and a WhatsApp-native checkout flow that routes orders directly to the store owner. No backend required.

## Features

- 40+ products loaded dynamically from a structured JSON catalog
- Cart engine with real-time quantity management and order totals
- WhatsApp checkout: auto-generates a pre-filled message with the full order summary
- Victoria's Secret dedicated section with its own UI layer and product modal
- Wishlist with `localStorage` persistence — no account or backend required
- Custom cursor and magnetic buttons on desktop, disabled automatically on touch devices
- Animated preloader, scroll-triggered reveals, and short fade transitions between pages
- Optional video backgrounds in the hero (progressive enhancement — falls back to static images if no video file is present)
- Product image zoom on hover (desktop) and tap (mobile)
- Responsive layout optimized for mobile-first browsing, with `dvh`-based hero sizing to avoid mobile browser chrome issues
- Editorial black-and-white visual system with a dedicated Victoria's Secret pink accent

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom, no frameworks) — `styles.css` (core) + `steroids.css` (art-direction layer) |
| Logic | Vanilla JavaScript (ES6+) — `app.js` (core) + `steroids.js` (motion/UX layer) |
| Fonts | Fraunces & Instrument Sans (UI/headlines), Tenor Sans (product names), Bebas Neue (numerals) |
| Data | JSON flat-file catalog |
| Checkout | WhatsApp Business API (wa.me deep link) |
| Hosting | Cloudflare Pages |

## Project Structure

```
instante-infinito/
├── index.html          # Main storefront
├── catalogo.html       # Full product catalog
├── victoriasecret.html # VS dedicated section
├── contacto.html       # Contact page
├── app.js              # Core cart, catalog and UI logic
├── steroids.js         # Motion, cursor, wishlist, transitions — additive layer
├── productos.js        # Product rendering engine
├── vs-app.js            # VS section logic
├── productos.json      # Product catalog (40+ items)
├── styles.css          # Global styles (core design system)
├── steroids.css        # Art-direction layer (loads after styles.css/vs-styles.css)
├── vs-styles.css        # VS section styles
└── img/
    ├── hero/           # Hero imagery + optional .mp4 video backgrounds
    ├── products/       # Product photography
    ├── splashes/       # Splash visuals (Victoria's Secret)
    ├── why-us/         # Optional background photo for "Por qué elegirnos"
    └── contacto/       # Optional background photo for the contact page
```

> `steroids.css` / `steroids.js` are an additive layer on top of the original design — they don't modify cart, catalog, or checkout logic, and fail gracefully (the site still works normally if either file is removed).

## Local Development

```bash
git clone https://github.com/andina-web-studio/instante-infinito.git
cd instante-infinito
# Open index.html in any browser — no build step required
```

## Live Site

[instanteinfinito.andinawebstudio.com](https://instanteinfinito.andinawebstudio.com)

## License

MIT License. Built by [Andina Web Studio](https://andinawebstudio.com).
