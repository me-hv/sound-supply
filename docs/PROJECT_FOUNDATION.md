# Sound Supply — Architectural & Foundation Blueprint

**Sound Supply** is a premium online music equipment and audio production commerce platform engineered specifically for the Indian market, delivering the information density, technical depth, and discovery experience of professional music gear retail.

---

## 1. Brand Direction & Identity

* **Core Purpose:** "Everything you need to make sound."
* **Market Position:** A dedicated, serious destination for Indian bedroom producers, gigging guitarists, studio recording engineers, composers, podcasters, and sound designers.
* **Tone & Persona:** 
  * *Professional & Technical:* Spec-first, honest equipment ratings, comprehensive connectivity guides, and detailed studio setup advisory.
  * *Trustworthy & Confident:* Clear warranty terms, transparent EMI calculations, and verified courier delivery.
  * *Approachable & Musical:* Warm, clean, modern, avoiding sterile corporate aesthetics or dark gaming motifs.
* **Visual Signature:**
  * Light-first interface with warm neutral tones (`#F7F7F5`), crisp white cards (`#FFFFFF`), subtle slate borders (`#DDDDDD`), and a signature warm flame/crimson accent (`#D9381E` / `#C22F17`) used strategically for active states, key CTAs, and promotional badges.
* **Bespoke Brand Mark (`Logo.tsx`):**
  * Custom geometric 3-fader audio console & waveform vector mark with scalable typography (`sm`, `md`, `lg`) and theme variants (`light`, `dark`).

---

## 2. Decoupled Policy Configuration (`src/config/siteConfig.ts`)

Business policies, warranty terms, shipping conditions, and customer support channels are centralized in a dedicated configuration layer rather than hard-coded into UI templates.

```typescript
export const SITE_POLICIES = {
  authenticity: { label: "Genuine Product Assurance", badgeText: "Genuine Gear", isPlaceholder: true },
  warranty: { label: "Official Manufacturer Warranty", badgeText: "Brand Warranty", isPlaceholder: true },
  transit: { label: "Insured Transit Packaging", badgeText: "Insured Courier", isPlaceholder: true },
  support: { label: "Technical Gear Advisory", badgeText: "Expert Advice", isPlaceholder: true },
  returns: { label: "Transit Damage & DOA Policy", badgeText: "DOA Coverage", isPlaceholder: true },
  financing: { label: "Flexible Payment & EMI", badgeText: "EMI Options", isPlaceholder: true },
};
```

---

## 3. Dynamic Category-Specific Specification System

Instead of a fixed set of four generic spec groups, Sound Supply supports schema-driven, category-specific specification templates (`src/data/specTemplates.ts`):

```text
Microphone Taxonomy
├── Capsule & Transducer (Dynamic vs Condenser, Diaphragm Size)
├── Acoustics & Polar Pattern (Cardioid, Omnidirectional, Figure-8)
├── Electrical Performance (Sensitivity, Max SPL, Impedance, Self-Noise)
└── Connectivity & Hardware (Connector, Output Impedance, Shockmount)

Studio Monitor Taxonomy
├── Acoustic Drivers (Woofer Material & Size, Tweeter Type)
├── Amplification & Power (Bi-Amped, RMS Wattage, Class-D)
├── Acoustics & Frequency (Frequency Range, Max Peak SPL, Crossover)
├── Room Tuning & DSP (Boundary Switches, High/Low Trim, LCD EQ)
└── Inputs & Enclosure (XLR, 1/4" TRS, Bass-Reflex Port, MDF Cabinet)

Audio Interface Taxonomy
├── AD/DA Conversion (Resolution, Bit Depth, Dynamic Range)
├── Preamps & Headroom (Gain Range dB, EIN Noise Floor, Air Mode)
├── Inputs & Outputs (Mic XLR, Hi-Z Instrument, Balanced TRS Outs, Phones)
└── Compatibility & Power (USB-C, Thunderbolt, Bus Power, ASIO/CoreAudio)

MIDI Keyboard Taxonomy
├── Keybed & Expression (Slimkeys, Semi-Weighted, Velocity, Aftertouch)
├── Performance Controls (Rotary Encoders, Faders, RGB Pads)
├── Sequencing & Arpeggiation (Step Sequencer, Chord & Strum Engine)
└── Hardware Connectivity (5-Pin DIN MIDI, CV/Gate/Mod 3.5mm, Sustain)
```

---

## 4. Signal Chain & Compatibility Schema

To prepare for Phase 4's interactive compatibility engine, products define explicit physical and electrical contracts:

```typescript
export interface CompatibilityProfile {
  connectorsIn?: {
    type: "xlr" | "1/4-inch-line" | "1/4-inch-hi-z" | "1/4-inch-headphone" | "3.5mm-stereo" | "usb-c" | "midi-din" | "cv-gate" | "optical-adat" | "rca";
    count: number;
    phantomPowerCapable?: boolean;
  }[];
  connectorsOut?: {
    type: "xlr" | "1/4-inch-balanced" | "1/4-inch-headphone" | "usb-c" | "midi-din" | "rca" | "cv-gate";
    count: number;
  }[];
  requiresPhantomPower?: boolean;
  recommendedGainMinDb?: number; // e.g. 60dB for low-sensitivity dynamic mics
  headphoneImpedanceMinOhms?: number;
  headphoneImpedanceMaxOhms?: number;
  powerRequirement?: "bus-powered" | "external-12v-dc" | "mains-iec-230v";
}
```

---

## 5. Global Sitemap

```
/
├── /categories
│   ├── /categories/[categorySlug]                (e.g., /categories/studio-recording)
│   └── /categories/[categorySlug]/[subSlug]      (e.g., /categories/studio-recording/audio-interfaces)
├── /products
│   └── /products/[productSlug]                   (e.g., /products/focusrite-scarlett-2i2-gen4)
├── /brands
│   ├── /brands                                   (A-Z brand catalog & authorized dealer index)
│   └── /brands/[brandSlug]                       (e.g., /brands/shure)
├── /search                                       (Dynamic search results with deep filters)
├── /studio-builder                               (Guided workflow for custom studio setups)
├── /compare                                      (Side-by-side technical specification matrix)
├── /deals                                        (Exclusive discounts, bundle offers, clearance)
├── /guides                                       (Buying guides, impedance matching, mic placement)
├── /cart                                         (Cart management & free shipping threshold tracker)
├── /wishlist                                     (Bookmarked gear shortlist)
└── /account                                      (Customer portal & warranty registration)
```

---

## 6. Development Phasing Roadmap

```
PHASE 1 (Completed Foundation & Refinement)
├── Design System & Tokens (Colors, Typography, Elevation)
├── Bespoke Logo & Wordmark
├── Storefront Header & Category Mega-Menu
├── Decoupled Policy Configuration Layer
├── Dynamic Category Specification Architecture
├── Reusable Empty States & Skeleton Primitives
├── Complete 8-Module Storefront Homepage
├── Faceted Category Listing Pages (PLP)
├── Two-Column Product Detail Pages (PDP) with Signal Chain Tab
└── Side-by-Side Comparison Matrix Foundation

PHASE 2 (Catalog & Data Architecture)
├── Product Catalog Schema in Supabase (PostgreSQL)
├── Dynamic Products, Categories & Brand Tables
├── Search & Filter Services
├── Persistent Cart & Wishlist Storage
└── Spec Comparison Query Engine

PHASE 3 (Order Operations & Portal)
├── Customer Authentication & Profiles
├── Address Serviceability & Pincode Matrix
├── Orders & Invoicing (GST Compliance)
├── Payment Gateway Integrations
├── Inventory Management
└── Admin Dashboard

PHASE 4 (Studio Builder & Intelligence)
├── Real-time Signal-Chain Compatibility Engine
├── Automated Cable & Impedance Harmonizer
├── Custom Studio Configurator
├── Dynamic Bundle Pricing
└── Interactive Buying Guide Tools
```
