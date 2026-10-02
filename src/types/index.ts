/**
 * Sound Supply — Core Type Definitions & Data Architecture
 * 
 * Scalable domain model separating Products from Product Variants,
 * supporting dynamic category-specific specification attributes,
 * and defining hardware signal-chain compatibility profiles.
 */

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  originCountry: string;
  isAuthorizedDealer?: boolean;
  warrantyPeriodMonths: number;
  featured?: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  itemCount?: number;
}

export interface CategoryGroup {
  name: string;
  items: SubCategory[];
}

export interface SpecificationFieldDefinition {
  key: string;
  label: string;
  group: string;
  type: "text" | "number" | "boolean" | "select";
  unit?: string;
  comparable?: boolean;
  filterFacet?: boolean;
  description?: string;
}

export interface CategorySpecificationTemplate {
  categorySlug: string;
  groups: string[];
  fields: SpecificationFieldDefinition[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string;
  groups?: CategoryGroup[];
  featuredBrands?: string[];
  bannerImage?: string;
}

/**
 * Dynamic technical specification item.
 * Allows any category to define custom groups (Acoustic, Transducer, DSP, Keys, Frets, etc.)
 */
export interface TechnicalSpecification {
  group: string; // e.g. "Transducer & Acoustics", "Amplification & Power", "DAW Control & Keybed", "I/O & Routing"
  key?: string;
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
  comparable?: boolean;
}

/**
 * Signal-chain and electrical compatibility profile.
 * Prepares the architecture for the Studio Builder compatibility engine.
 */
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

/**
 * Separate SKU / Variant Entity.
 * Distinguishes product models from finishes, key counts, driver sizes, and cable lengths.
 */
export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  title: string; // e.g. "Matte Charcoal Grey", "37-Key White Edition", "5-inch Pair"
  attributes: {
    color?: string;
    finish?: string;
    keyCount?: number;
    sizeInch?: number;
    cableLengthMeters?: number;
    handOrientation?: "Right-Handed" | "Left-Handed";
    connectivity?: "USB-C" | "Thunderbolt 4" | "Bluetooth + Wired";
    impedanceOhms?: number;
    configuration?: string;
  };
  mrpInr: number;
  sellingPriceInr: number;
  stockStatus: "in-stock" | "low-stock" | "pre-order" | "out-of-stock";
  stockCount: number;
  images: string[];
  dimensionsMm?: { width: number; height: number; depth: number };
  weightGrams?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  verifiedBuyer: boolean;
  headline: string;
  content: string;
}

/**
 * Parent Product Entity.
 */
export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  brand: Brand;
  categorySlug: string;
  subCategorySlug: string;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  whatsInTheBox: string[];
  specifications: TechnicalSpecification[];
  compatibility?: CompatibilityProfile;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  variants: ProductVariant[];
  defaultVariantId: string;
  tags: ("bestseller" | "new" | "deal" | "pro-choice" | "studio-essential")[];
  warrantySummary: string;
  fastestDeliveryDays: number;
  emiStartingInr: number;
}

export interface FilterState {
  category?: string;
  subCategory?: string;
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  minRating?: number;
  specFilters: Record<string, string[]>;
}

export interface StudioGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  recommendedBudgetMin: number;
}

export interface StudioBudgetTier {
  id: string;
  label: string;
  rangeLabel: string;
  maxInr: number;
}
