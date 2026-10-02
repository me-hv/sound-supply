# Sound Supply

> **Everything you need to make sound.**

Sound Supply is a modern online music equipment and audio production commerce platform engineered specifically for the Indian market. Inspired by the depth, product discoverability, information architecture, and technical seriousness of Sweetwater, Sound Supply features a completely original visual identity, editorial UX, and domain architecture tailored for Indian musicians, bedroom producers, recording engineers, podcasters, and DJs.

---

## 🎵 Brand & Philosophy

Sound Supply is built around **helping customers choose gear with confidence**, rather than merely displaying catalog listings.

* **Light-First Professional Retail:** Clean `#F7F7F5` canvas with crisp `#DDDDDD` borders, restrained 4–10px radii, subtle elevation, and a signature warm flame accent (`#D9381E`).
* **Technical Transparency:** Dynamic, category-specific specification templates instead of generic flat tables.
* **Signal Chain Awareness:** Clear understanding of hardware electrical relationships—inputs, outputs, +48V phantom power, preamp gain headroom, and headphone impedance matching.
* **Decoupled Business Policies:** All delivery, warranty, and authenticity claims are driven by a centralized policy configuration (`src/config/siteConfig.ts`), avoiding hardcoded factual assumptions.

---

## ⚡ Core Features & User Experience

### 1. Universal Search & Autocomplete
* Centered search bar visually dominating the global header.
* Instant keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
* Categorized autocomplete results: Matching Equipment, Categories, and Brands.
* Popular searches quick-picker for empty query state.

### 2. Multi-Level Navigation & 4-Column Mega-Menu
* **Utility Bar:** Displays storefront policy indicators and technical advice contacts.
* **Global Header:** Logo mark, dominant search, compare shortcut, wishlist, account, and studio cart.
* **Department Mega-Menu:**
  * *Column 1:* Department overview, description, and genuine hardware guarantee notice.
  * *Column 2:* Major core recording equipment.
  * *Column 3:* Subcategories & acoustic accessories.
  * *Column 4:* Featured brands directory & signal setup guide spotlight.

### 3. Retail-Standard Product Card
Engineered for rapid scanning and commerce clarity:
```text
BRAND (uppercase monospace label)
[ PRODUCT IMAGE ] (clean container with badge overlays)
PRODUCT NAME (2-line clamp)
★★★★★ 123 (ratings & review count)
2–3 SELECTIVE TECH SPECS (e.g. 24-bit/192kHz, 69dB Gain, 2x2 I/O)
₹XX,XXX  MRP ₹XX,XXX  XX% OFF
● In Stock (emerald indicator)
[ Add to Cart ] (full-width primary CTA with feedback state)
♡ Saved  |  ⚖ Compare (compact bottom action row)
```

### 4. Deep Product Detail Page (PDP)
* **Multi-Angle Gallery:** Primary viewport with thumbnail rail.
* **Variant Architecture:** Clean switching between SKU variants (finishes, driver sizes, bundle editions).
* **Indian Pincode Checker:** 6-digit postal code validation for delivery SLA estimation.
* **Structured Specifications:** Category-specific groups (AD/DA Conversion, Preamps, I/O Routing, Acoustic Enclosures).
* **Signal Chain & Hardware Compatibility Flowchart:**
  * Visual 3-node signal routing diagram:
    ```text
    [ Source / Transducer ] ──(Balanced 3-Pin XLR)──► [ Interface / Preamp ] ──(Line Out TRS)──► [ Active Monitors / Cans ]
    ```
  * Verified status checkpoints:
    * `✓ Requires +48V Phantom Power` / `✓ Provides +48V Phantom Power`
    * `✓ Compatible Connector: Balanced XLR / 1/4" TRS`
    * `⚠ Recommended Preamp Gain: ≥ 60 dB`
    * `✓ Headphone Driving Impedance: 16Ω – 300Ω`
    * `✓ Power: USB-C Bus-Powered`

### 5. Interactive Studio Builder
* **"WHAT ARE YOU BUILDING?"** goal selector: Bedroom Studio, Producer Setup, Vocal Recording, Home Band, or Commercial Facility.
* **"YOUR SETUP"** hardware slots: Microphone, Audio Interface, Headphones, Monitors, and Accessories with compatibility tags and live estimated totals.
* Full interactive builder workflow at `/studio-builder` with custom budget tiers and component checklists.

### 6. Side-by-Side Comparison Engine (`/compare`)
* Unobtrusive docked comparison tray (`CompareDrawer.tsx`) supporting up to 4 items.
* Comprehensive spec matrix with a **"Highlight Differences Only"** toggle and subtle `Diff` badges on distinct attributes.

### 7. Structured A–Z Brand Directory (`/brands`)
* Alphabetical manufacturer index (AKAI, ADAM Audio, Arturia, Audio-Technica, Fender, Focusrite, Genelec, KRK, Roland, RØDE, Sennheiser, Shure, SSL, Universal Audio, Yamaha).
* Quick letter-jump rail with anchor navigation.

### 8. Mobile-First Optimization
* Mobile header: `☰ SOUND SUPPLY 🛒` with full-width search input below.
* Persistent thumb-friendly bottom navigation bar (`MobileBottomNav.tsx`): **Home | Catalog | Search | Saved | Cart**.
* Dedicated slide-in drawer for facet filtering on category pages.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with centralized design tokens
* **Icons:** [Lucide React](https://lucide.dev/)
* **Typography:** `Inter` (UI sans) + `Space Grotesk` (Technical display / monospace numerals)

---

## 📁 Project Structure

```text
sound-supply/
├── src/
│   ├── app/                          # Next.js App Router routes
│   │   ├── layout.tsx                # Root layout, fonts, CommerceProvider
│   │   ├── page.tsx                  # 8-module Homepage
│   │   ├── categories/               # Category tree & dynamic [slug] PLP
│   │   ├── products/                 # Dynamic [slug] PDP with Signal Chain UI
│   │   ├── brands/                   # A-Z Brand Directory & [slug] pages
│   │   ├── studio-builder/           # Interactive hardware setup harmonizer
│   │   ├── compare/                  # Side-by-side specification matrix
│   │   ├── deals/                    # Promotions and studio packages
│   │   ├── guides/                   # Buying guides and technical advice
│   │   ├── cart/                     # Studio cart with item hydration
│   │   ├── wishlist/                 # Saved gear shortlist
│   │   └── search/                   # Search results page
│   ├── components/
│   │   ├── layout/                   # Header, UtilityBar, Footer, MobileBottomNav
│   │   ├── navigation/               # CategoryNav, MegaMenu, Breadcrumbs
│   │   ├── product/                  # ProductCard (retail hierarchy)
│   │   ├── search/                   # SearchBar (combobox, keyboard nav)
│   │   ├── comparison/               # CompareDrawer
│   │   ├── filters/                  # FilterSidebar (facets & mobile drawer)
│   │   ├── home/                     # Homepage section modules
│   │   └── ui/                       # Base primitives (Logo, Badge, RatingStars, Skeleton, EmptyState)
│   ├── config/
│   │   └── siteConfig.ts             # Centralized business policies & brand configuration
│   ├── context/
│   │   └── CommerceContext.tsx       # Local storage backed state (cart, wishlist, compare)
│   ├── data/
│   │   ├── products.ts               # Grounded pro audio catalog (Focusrite, Shure, Yamaha, etc.)
│   │   ├── categories.ts             # Department taxonomy and subcategories
│   │   ├── brands.ts                 # Manufacturer directory
│   │   ├── presets.ts                # Studio Builder configuration presets
│   │   ├── guides.ts                 # Editorial buying guides
│   │   └── specTemplates.ts          # Category-specific technical spec definitions
│   ├── lib/
│   │   └── utils.ts                  # Currency formatting (INR), cn helper, calculations
│   └── types/
│       └── index.ts                  # Core domain model (Product, ProductVariant, CompatibilityProfile)
├── tailwind.config.ts                # Design tokens (colors, borders, radii, typography)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) v18.18 or higher (v20+ recommended)
* `npm` or `yarn` / `pnpm`

### Installation
```bash
git clone https://github.com/me-hv/sound-supply.git
cd sound-supply
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 📄 License

This project is proprietary and developed for Sound Supply India. All brand names, logos, and trademarks referenced belong to their respective manufacturers.
