/**
 * Sound Supply — Database Row & Schema Types
 * 
 * Maps directly to PostgreSQL tables in supabase/migrations/20261014000000_catalog_schema.sql
 */

export interface DbBrand {
  id: string;
  name: string;
  slug: string;
  logo_text: string;
  origin_country: string;
  is_authorized_dealer: boolean;
  warranty_period_months: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  tagline: string | null;
  description: string | null;
  icon_name: string | null;
  banner_image: string | null;
  display_order: number;
  featured_brands: string[];
  created_at: string;
  updated_at: string;
}

export interface DbCategoryGroup {
  id: string;
  category_id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface DbCategoryGroupItem {
  id: string;
  group_id: string;
  subcategory_id: string;
  display_order: number;
}

export interface DbProduct {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  brand_id: string;
  category_id: string;
  subcategory_id: string | null;
  short_description: string;
  full_description: string;
  key_features: string[];
  whats_in_the_box: string[];
  rating: number;
  review_count: number;
  tags: string[];
  warranty_summary: string;
  fastest_delivery_days: number;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbProductVariant {
  id: string;
  product_id: string;
  sku: string;
  title: string;
  attributes: Record<string, string | number | boolean>;
  mrp_inr_paise: number;
  price_inr_paise: number;
  stock_status: "in-stock" | "low-stock" | "pre-order" | "out-of-stock";
  stock_count: number;
  is_default: boolean;
  weight_grams: number | null;
  dimensions_mm: { width: number; height: number; depth: number } | null;
  created_at: string;
  updated_at: string;
}

export interface DbProductImage {
  id: string;
  product_id: string;
  variant_id: string | null;
  url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface DbSpecificationGroup {
  id: string;
  category_id: string | null;
  name: string;
  display_order: number;
  created_at: string;
}

export interface DbSpecificationDefinition {
  id: string;
  group_id: string;
  key: string;
  label: string;
  data_type: "text" | "number" | "boolean" | "select";
  unit: string | null;
  is_comparable: boolean;
  is_filter_facet: boolean;
  display_order: number;
  created_at: string;
}

export interface DbProductSpecification {
  id: string;
  product_id: string;
  definition_id: string;
  value: string;
  is_highlight: boolean;
  created_at: string;
}

export interface DbCompatibilityProfile {
  id: string;
  product_id: string;
  connectors_in: Array<{
    type: string;
    count: number;
    phantomPowerCapable?: boolean;
  }>;
  connectors_out: Array<{
    type: string;
    count: number;
  }>;
  requires_phantom_power: boolean;
  recommended_gain_min_db: number | null;
  headphone_impedance_min_ohms: number | null;
  headphone_impedance_max_ohms: number | null;
  power_requirement: string | null;
  created_at: string;
}

export interface DbCart {
  id: string;
  session_token: string;
  created_at: string;
  updated_at: string;
}

export interface DbCartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface DbWishlist {
  id: string;
  session_token: string;
  created_at: string;
  updated_at: string;
}

export interface DbWishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  created_at: string;
}
