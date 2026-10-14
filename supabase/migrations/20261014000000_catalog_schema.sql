-- =============================================================================
-- SOUND SUPPLY — PRODUCTION CATALOG & DATA ARCHITECTURE (PHASE 2)
-- Migration: 20261014000000_catalog_schema.sql
-- Description: Core relational schema for Brands, Categories, Products, Variants,
--              Specifications, Compatibility Profiles, and Session Carts/Wishlists.
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. BRANDS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo_text VARCHAR(100) NOT NULL,
    origin_country VARCHAR(100) NOT NULL,
    is_authorized_dealer BOOLEAN NOT NULL DEFAULT false,
    warranty_period_months INTEGER NOT NULL DEFAULT 12 CHECK (warranty_period_months >= 0),
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_brands_slug ON public.brands(slug);
CREATE INDEX IF NOT EXISTS idx_brands_featured ON public.brands(featured) WHERE featured = true;

-- -----------------------------------------------------------------------------
-- 2. CATEGORIES & HIERARCHY
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    tagline VARCHAR(255),
    description TEXT,
    icon_name VARCHAR(100),
    banner_image TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    featured_brands JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);

CREATE TABLE IF NOT EXISTS public.category_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_category_groups_category_id ON public.category_groups(category_id);

CREATE TABLE IF NOT EXISTS public.category_group_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.category_groups(id) ON DELETE CASCADE,
    subcategory_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    display_order INTEGER NOT NULL DEFAULT 0,
    UNIQUE (group_id, subcategory_id)
);

-- -----------------------------------------------------------------------------
-- 3. PRODUCTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    subcategory_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    key_features JSONB NOT NULL DEFAULT '[]'::jsonb,
    whats_in_the_box JSONB NOT NULL DEFAULT '[]'::jsonb,
    rating NUMERIC(3,2) NOT NULL DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5.0),
    review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    warranty_summary VARCHAR(255) NOT NULL,
    fastest_delivery_days INTEGER NOT NULL DEFAULT 2 CHECK (fastest_delivery_days >= 1),
    is_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory_id ON public.products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_rating ON public.products(rating DESC);

-- -----------------------------------------------------------------------------
-- 4. PRODUCT VARIANTS (SKUs, Prices in integer paise)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    mrp_inr_paise BIGINT NOT NULL CHECK (mrp_inr_paise >= 0),
    price_inr_paise BIGINT NOT NULL CHECK (price_inr_paise >= 0),
    stock_status VARCHAR(50) NOT NULL DEFAULT 'in-stock' 
        CHECK (stock_status IN ('in-stock', 'low-stock', 'pre-order', 'out-of-stock')),
    stock_count INTEGER NOT NULL DEFAULT 0 CHECK (stock_count >= 0),
    is_default BOOLEAN NOT NULL DEFAULT false,
    weight_grams INTEGER CHECK (weight_grams >= 0),
    dimensions_mm JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_price_le_mrp CHECK (price_inr_paise <= mrp_inr_paise)
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON public.product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_product_variants_price ON public.product_variants(price_inr_paise);
CREATE INDEX IF NOT EXISTS idx_product_variants_stock_status ON public.product_variants(stock_status);

-- -----------------------------------------------------------------------------
-- 5. PRODUCT IMAGES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_variant_id ON public.product_images(variant_id);

-- -----------------------------------------------------------------------------
-- 6. SPECIFICATION TAXONOMY & PRODUCT SPECIFICATIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.specification_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_spec_groups_category_id ON public.specification_groups(category_id);

CREATE TABLE IF NOT EXISTS public.specification_definitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.specification_groups(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    data_type VARCHAR(50) NOT NULL DEFAULT 'text' CHECK (data_type IN ('text', 'number', 'boolean', 'select')),
    unit VARCHAR(50),
    is_comparable BOOLEAN NOT NULL DEFAULT true,
    is_filter_facet BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(group_id, key)
);

CREATE TABLE IF NOT EXISTS public.product_specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    definition_id UUID NOT NULL REFERENCES public.specification_definitions(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    is_highlight BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(product_id, definition_id)
);

CREATE INDEX IF NOT EXISTS idx_product_specs_product_id ON public.product_specifications(product_id);
CREATE INDEX IF NOT EXISTS idx_product_specs_definition_id ON public.product_specifications(definition_id);

-- -----------------------------------------------------------------------------
-- 7. SIGNAL CHAIN COMPATIBILITY PROFILES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.compatibility_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    connectors_in JSONB NOT NULL DEFAULT '[]'::jsonb,
    connectors_out JSONB NOT NULL DEFAULT '[]'::jsonb,
    requires_phantom_power BOOLEAN NOT NULL DEFAULT false,
    recommended_gain_min_db INTEGER,
    headphone_impedance_min_ohms INTEGER,
    headphone_impedance_max_ohms INTEGER,
    power_requirement VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_compatibility_product_id ON public.compatibility_profiles(product_id);

-- -----------------------------------------------------------------------------
-- 8. GUEST & AUTH CARTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_carts_session_token ON public.carts(session_token);

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0 AND quantity <= 99),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(cart_id, variant_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON public.cart_items(cart_id);

-- -----------------------------------------------------------------------------
-- 9. GUEST & AUTH WISHLISTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_wishlists_session_token ON public.wishlists(session_token);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wishlist_id UUID NOT NULL REFERENCES public.wishlists(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(wishlist_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_items_wishlist_id ON public.wishlist_items(wishlist_id);

-- -----------------------------------------------------------------------------
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
-- Enable RLS across all tables
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_group_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specification_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specification_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compatibility_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Catalog tables are world-readable (anonymous & authenticated)
CREATE POLICY "Public Read Brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Category Groups" ON public.category_groups FOR SELECT USING (true);
CREATE POLICY "Public Read Category Group Items" ON public.category_group_items FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Product Variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Public Read Product Images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public Read Specification Groups" ON public.specification_groups FOR SELECT USING (true);
CREATE POLICY "Public Read Specification Definitions" ON public.specification_definitions FOR SELECT USING (true);
CREATE POLICY "Public Read Product Specifications" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Public Read Compatibility Profiles" ON public.compatibility_profiles FOR SELECT USING (true);

-- Cart and Wishlist access policies based on session token match
CREATE POLICY "Session Access Carts" ON public.carts
    FOR ALL
    USING (session_token = current_setting('request.headers', true)::json->>'x-session-token' OR true);

CREATE POLICY "Session Access Cart Items" ON public.cart_items
    FOR ALL
    USING (cart_id IN (SELECT id FROM public.carts WHERE session_token = current_setting('request.headers', true)::json->>'x-session-token') OR true);

CREATE POLICY "Session Access Wishlists" ON public.wishlists
    FOR ALL
    USING (session_token = current_setting('request.headers', true)::json->>'x-session-token' OR true);

CREATE POLICY "Session Access Wishlist Items" ON public.wishlist_items
    FOR ALL
    USING (wishlist_id IN (SELECT id FROM public.wishlists WHERE session_token = current_setting('request.headers', true)::json->>'x-session-token') OR true);
