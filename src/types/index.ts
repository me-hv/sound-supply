export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  originCountry: string;
  isAuthorizedDealer: boolean;
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

export interface TechnicalSpecification {
  group: "Audio Performance" | "Connectivity & I/O" | "Hardware & Build" | "Compatibility & Power";
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  title: string;
  attributes: {
    color?: string;
    finish?: string;
    keyCount?: number;
    sizeInch?: number;
    cableLengthMeters?: number;
    handOrientation?: "Right-Handed" | "Left-Handed";
    connectivity?: "USB-C" | "Thunderbolt 4" | "Bluetooth + Wired";
    impedanceOhms?: number;
  };
  mrpInr: number;
  sellingPriceInr: number;
  stockStatus: "in-stock" | "low-stock" | "pre-order" | "out-of-stock";
  stockCount: number;
  images: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  role: string; // e.g. "Music Producer, Mumbai", "Audio Engineer, Bengaluru"
  rating: number;
  date: string;
  verifiedBuyer: boolean;
  headline: string;
  content: string;
}

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
