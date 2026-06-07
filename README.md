# Instante Infinito

A fully functional fragrance e-commerce experience built without a single framework — pure HTML, CSS, and JavaScript. Dynamic product catalog powered by JSON, a persistent shopping cart, and a WhatsApp-native checkout flow that routes orders directly to the store owner. No backend required.

## Features

- 40+ products loaded dynamically from a structured JSON catalog
- Cart engine with real-time quantity management and order totals
- WhatsApp checkout: auto-generates a pre-filled message with the full order summary
- Victoria's Secret dedicated section with its own UI layer
- Responsive layout optimized for mobile-first browsing
- Product splash imagery and category-based navigation

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom, no frameworks) |
| Logic | Vanilla JavaScript (ES6+) |
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
├── app.js              # Core cart and UI logic
├── productos.js        # Product rendering engine
├── vs-app.js           # VS section logic
├── productos.json      # Product catalog (40+ items)
├── styles.css          # Global styles
├── vs-styles.css       # VS section styles
└── img/
    ├── hero/           # Hero imagery
    ├── products/       # Product photography
    └── splashes/       # Splash visuals
```

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
