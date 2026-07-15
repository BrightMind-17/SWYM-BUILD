<div align="center">

<img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/CSS_Modules-Scoped-ff69b4?style=for-the-badge" alt="CSS Modules"/>
<img src="https://img.shields.io/badge/localStorage-Persistent-34a853?style=for-the-badge&logo=googlechrome&logoColor=white" alt="localStorage"/>
<img src="https://img.shields.io/badge/No_Backend-Frontend_Only-orange?style=for-the-badge" alt="Frontend Only"/>

<br/><br/>

```
 ███████╗██╗  ██╗ ██████╗ ██████╗ ██╗    ██╗██╗███████╗███████╗
 ██╔════╝██║  ██║██╔═══██╗██╔══██╗██║    ██║██║██╔════╝██╔════╝
 ███████╗███████║██║   ██║██████╔╝██║ █╗ ██║██║███████╗█████╗
 ╚════██║██╔══██║██║   ██║██╔═══╝ ██║███╗██║██║╚════██║██╔══╝
 ███████║██║  ██║╚██████╔╝██║     ╚███╔███╔╝██║███████║███████╗
 ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝      ╚══╝╚══╝ ╚═╝╚══════╝╚══════╝
```

### A polished, full-featured e-commerce storefront built with **React + Vite**
**Wishlist management · Smart product suggestions · Real-time filters · Dual-list merge**

<br/>

[**Live Demo**](http://localhost:5173) · [Report Bug](#) · [Request Feature](#)

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Component Reference](#-component-reference)
- [Data Schema](#-data-schema)
- [Wishlist Logic](#-wishlist-logic)
- [Merge Algorithm](#-merge-algorithm)
- [Responsive Design](#-responsive-design)
- [Design System](#-design-system)
- [Scripts](#-scripts)
- [Roadmap](#-roadmap)

---

## Overview

**ShopWise** is a mini shopping application built entirely on the frontend — no backend required. It demonstrates real-world React patterns like **Context API**, **custom hooks**, **CSS Modules**, and **localStorage persistence**, all wrapped in a clean, white-minimal UI with premium micro-interactions.

The layout is split into two always-visible zones and one overlay:

| Zone | Content |
|---|---|
| **Left Sidebar** (248 px) | Filters: Search · Category · Price Range · Sort Order |
| **Main Area** (flex 1) | Responsive product grid with 16 curated items |
| **Right Drawer** (overlay) | Wishlist panel — slides in from the right on product add |

---

## Features

### Products
- **16 sample products** across 5 categories: `Electronics`, `Footwear`, `Clothing`, `Accessories`, `Home & Living`
- Each card shows: product image, brand, name, description, star rating, and price overlay
- Image zoom on hover, card lift animation
- **Single heart button** on the image corner — the only wishlist control (no duplicate buttons)

### Wishlist Drawer
- Fixed right-side **slide-in drawer** (360 px wide, cubic-bezier `translateX` animation)
- **Auto-opens** the moment any product heart is clicked
- Semi-transparent **backdrop** to close; **X button** inside the drawer header
- Persistent floating **FAB** (bottom-right) shows item count and reopens drawer at any time
- Header heart icon also opens the drawer
- **Duplicate prevention** — re-adding silently ignores
- **localStorage persistence** — survives full page refresh

### Filters and Search (Left Sidebar)
- Real-time **text search** (matches name, brand, description)
- **Category filter** with visual active state and dot indicator
- **Price range dual sliders** (Min / Max, derived from dataset bounds)
- **Sort options**: Default · Price Low to High · Price High to Low · Top Rated
- **Reset** button appears dynamically when any filter is active
- Live **results count** display

### Similar Products
- Automatically surfaces **2–3 products** sharing the same **category or brand**
- Shown beneath each wishlist item via a collapsible toggle
- One-click `+` button to add directly to wishlist (shows checkmark if already added)

### Merge Wishlists
- Expandable panel inside the wishlist drawer
- Previews **Wishlist A** and **Wishlist B** side-by-side
- **Merge & Save** deduplicates by `id`, preserves A-first ordering
- Result written to `localStorage` immediately
- Purple gradient toast confirms merge success

### UI and Animations
- **White minimal theme** (no dark mode), subtle drop shadows, rounded-16 px cards
- **Outfit** (headings) + **Inter** (body) via Google Fonts
- Smooth hover: cards lift 4 px, images scale 1.06x, heart pulse on activate
- Toast notifications (fade-in / fade-out) for add and merge events
- Floating empty-state SVG with infinite float animation

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | Component model and hooks |
| [Vite 8](https://vite.dev/) | Dev server and bundler |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped, collision-free styles |
| [Context API](https://react.dev/reference/react/createContext) | Global wishlist state |
| [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Wishlist persistence |
| [Google Fonts](https://fonts.google.com/) | Outfit + Inter typefaces |
| [Unsplash](https://unsplash.com/) | Product imagery via CDN |

> **No external state library** (Redux, Zustand) — pure React Context + hooks.
> **No CSS framework** (Tailwind, Bootstrap) — vanilla CSS Modules only.

---

## Project Structure

```
SWYM BUILD/
├── index.html                           # HTML entry with SEO meta tags
├── vite.config.js                       # Vite configuration
├── package.json
├── README.md
└── src/
    ├── main.jsx                         # React DOM render entry
    ├── App.jsx                          # Root layout: filters + grid + drawer
    ├── App.css                          # Global CSS grid, fonts, reset
    ├── index.css                        # CSS custom properties (design tokens)
    │
    ├── context/
    │   └── WishlistContext.jsx          # Context API: wishlist + drawer state
    │
    ├── data/
    │   └── products.js                  # 16 products + CATEGORIES + WISHLIST_A/B
    │
    └── components/
        ├── layout/
        │   ├── Header.jsx               # Sticky nav bar, heart opens drawer
        │   └── Header.module.css
        │
        ├── products/
        │   ├── FiltersSidebar.jsx       # Left panel: search, category, price, sort
        │   ├── FiltersSidebar.module.css
        │   ├── ProductCard.jsx          # Single product card, heart toggle only
        │   ├── ProductCard.module.css
        │   ├── ProductGrid.jsx          # Responsive grid + empty state
        │   └── ProductGrid.module.css
        │
        └── wishlist/
            ├── WishlistDrawer.jsx       # Right slide-in drawer (FAB + backdrop)
            ├── WishlistDrawer.module.css
            ├── WishlistItem.jsx         # Wishlist row with remove button
            ├── WishlistItem.module.css
            ├── SimilarProducts.jsx      # 2-3 category/brand suggestions per item
            ├── SimilarProducts.module.css
            ├── MergeWishlists.jsx       # Expandable A+B merge panel
            └── MergeWishlists.module.css
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- npm `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shopwise.git
cd shopwise

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build      # Outputs optimised assets to /dist
npm run preview    # Serve production build locally
```

---

## Component Reference

### `WishlistContext`

The single source of truth for all wishlist operations. Wrap your app in `<WishlistProvider>` and consume with `useWishlist()`.

```js
const {
  wishlist,           // Product[]  – current wishlist array
  addToWishlist,      // (product) => void  – adds & auto-opens drawer
  removeFromWishlist, // (productId) => void
  isInWishlist,       // (productId) => boolean
  mergeWishlists,     // () => void  – merges WISHLIST_A + WISHLIST_B
  notification,       // { message, type } | null
  isDrawerOpen,       // boolean
  setIsDrawerOpen,    // (boolean) => void
} = useWishlist();
```

---

### `FiltersSidebar`

| Prop | Type | Description |
|---|---|---|
| `search` | `string` | Current search query |
| `onSearchChange` | `(string) => void` | Search update handler |
| `selectedCategory` | `string` | Active category |
| `onCategoryChange` | `(string) => void` | Category update handler |
| `sortOrder` | `string` | `default` \| `price-asc` \| `price-desc` \| `rating-desc` |
| `onSortChange` | `(string) => void` | Sort update handler |
| `priceRange` | `[number, number]` | `[min, max]` price bounds |
| `onPriceRangeChange` | `([number, number]) => void` | Price range update handler |
| `totalResults` | `number` | Number of visible products |

---

### `ProductCard`

Displays a single product. The **only wishlist interaction** is the heart button overlaid on the product image — no secondary buttons exist.

```jsx
<ProductCard product={product} />
```

Renders:
- `image` — full bleed with zoom-on-hover
- `categoryBadge` — top-left pill chip
- `heartBtn` — top-right, pink when active, with pulse animation
- `priceTag` — gradient overlay at image bottom
- `brand`, `name`, `description`, `StarRating` — below the image

---

### `WishlistDrawer`

A fixed, right-anchored slide-in panel with three open triggers:

1. **Heart on any ProductCard** — `addToWishlist()` sets `isDrawerOpen = true`
2. **Header heart icon** — calls `setIsDrawerOpen(true)`
3. **Floating FAB** (bottom-right) — calls `setIsDrawerOpen(true)`

Close triggers:
- **X button** inside the drawer header
- **Backdrop click** (the overlay outside the panel)

---

### `SimilarProducts`

Rendered inside each `WishlistItem` behind a collapsible toggle button.

```
Similar picks  v
┌────────────────────────────────────┐
│ [img]  Nike Air Max 270  $149.99 + │
│ [img]  Adidas Ultraboost $189.99 ✓ │
└────────────────────────────────────┘
```

Similarity filter:

```js
allProducts
  .filter(p =>
    p.id !== item.id &&
    (p.category === item.category || p.brand === item.brand)
  )
  .slice(0, 3)
```

---

## Data Schema

Each product in `src/data/products.js` follows this shape:

```js
{
  id:          number,   // Unique identifier
  name:        string,   // Display name
  category:    string,   // One of CATEGORIES[]
  brand:       string,   // Manufacturer / brand name
  price:       number,   // USD price (float)
  rating:      number,   // 0.0 to 5.0
  image:       string,   // URL (Unsplash CDN, 400x400)
  description: string,   // Short product description
}
```

**Available Categories:**

```
All  ·  Electronics  ·  Footwear  ·  Clothing  ·  Accessories  ·  Home & Living
```

**Sample products include:** AirPods Pro Max, Nike Air Max 270, MacBook Pro 14", Levi's 501 Jeans, Sony WH-1000XM5, Ray-Ban Aviator, Adidas Ultraboost 23, Samsung Galaxy Watch 6, Converse Chuck Taylor, and more.

---

## Wishlist Logic

```
┌────────────────────────────────────────────────────────────────┐
│                    addToWishlist(product)                      │
│                                                                │
│  Is product.id already in wishlist?                            │
│       YES  ──►  return early (no-op, no notification)          │
│       NO   ──►  append product to wishlist array               │
│            ──►  show toast notification (3 s auto-dismiss)     │
│            ──►  set isDrawerOpen = true                        │
│            ──►  useEffect persists to localStorage             │
└────────────────────────────────────────────────────────────────┘
```

**localStorage key:** `"wishlist"` — serialised as a JSON array of complete product objects. Hydrated on mount via lazy `useState` initialiser.

---

## Merge Algorithm

```
Inputs:
  WISHLIST_A       – predefined base list (order is preserved)
  WISHLIST_B       – secondary list (duplicates removed)
  currentWishlist  – user's existing items

Algorithm:
  1. seen  = new Set( WISHLIST_A.map(p => p.id) )
     merged = [ ...WISHLIST_A ]

  2. for each item in WISHLIST_B
       if item.id not in seen
         merged.push(item)
         seen.add(item.id)

  3. for each item in currentWishlist
       if item.id not in seen
         merged.push(item)
         seen.add(item.id)

Output:  merged[]
  → replaces wishlist state
  → persisted to localStorage
  → triggers purple toast notification
```

**Worked example:**

| List | Items |
|---|---|
| Wishlist A | AirPods Pro Max · Adidas Ultraboost · Tommy Hilfiger Polo · Scented Candle |
| Wishlist B | Sony WH-1000XM5 · **Adidas Ultraboost** *(duplicate)* · Fossil Gen 6 · Nike Air Max |
| **Merged result** | AirPods · Adidas · Tommy · Candle · Sony · Fossil · Nike |

---

## Responsive Design

| Breakpoint | Layout |
|---|---|
| `> 1024 px` | FiltersSidebar (248 px fixed) + Product Grid |
| `768 – 1024 px` | FiltersSidebar (220 px fixed) + Product Grid |
| `< 768 px` | Stacked: Filters section on top, Grid below |
| `< 480 px` | 2-column product grid, compact padding |

> The Wishlist Drawer is always a **fixed overlay** — it never affects the grid layout at any breakpoint. The FAB is always visible at the bottom-right corner.

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#6c63ff` | Accent, active states, category badges |
| `--color-accent` | `#e04f5f` | Heart icon, wishlist red-pink |
| `--color-text` | `#1a1a2e` | Body text, headings |
| `--color-muted` | `#888888` | Secondary text, placeholders |
| `--color-bg` | `#f4f4f8` | Page background |
| `--color-surface` | `#ffffff` | Cards, sidebars, drawer |

### Typography

| Font | Weights | Usage |
|---|---|---|
| **Outfit** | 700, 800 | Headings, brand name, drawer title, prices |
| **Inter** | 400, 500, 600 | Body copy, labels, filter buttons |

### Elevation

```css
/* Cards at rest */
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);

/* Cards on hover */
box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);

/* Drawer */
box-shadow: -8px 0 40px rgba(0, 0, 0, 0.12);

/* FAB */
box-shadow: 0 6px 24px rgba(0, 0, 0, 0.14);
```

### Border Radius

```css
--radius-md: 12px;   /* Buttons, inputs, list items */
--radius-lg: 16px;   /* Product cards              */
--radius-xl: 20px;   /* Drawer panel               */
```

---

## Scripts

```bash
npm run dev      # Start Vite dev server  →  http://localhost:5173
npm run build    # Production build       →  /dist
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## Roadmap

- [ ] Product detail modal / expanded view
- [ ] Multiple named wishlists (create, rename, delete)
- [ ] Share wishlist via shareable URL
- [ ] Add to Cart flow with quantity management
- [ ] Framer Motion page and drawer transitions
- [ ] Unit tests with Vitest + React Testing Library
- [ ] PWA support (offline mode via Service Worker)

---

## License

Distributed under the **MIT License**.

---

<div align="center">

Built with React + Vite &nbsp;·&nbsp; No backend &nbsp;·&nbsp; No CSS framework &nbsp;·&nbsp; Pure frontend

</div>
