-- =============================================================================
-- SOUND SUPPLY — PRODUCTION SEED DATA (PHASE 2)
-- Script: supabase/seed.sql
-- Description: Verified music gear catalog with integer paise pricing,
--              variants, specifications, and signal-chain compatibility profiles.
-- =============================================================================

-- Clear existing data if re-seeding
TRUNCATE TABLE public.cart_items, public.carts, public.wishlist_items, public.wishlists,
               public.product_specifications, public.specification_definitions, public.specification_groups,
               public.compatibility_profiles, public.product_images, public.product_variants,
               public.products, public.category_group_items, public.category_groups,
               public.categories, public.brands CASCADE;

-- -----------------------------------------------------------------------------
-- 1. SEED BRANDS
-- -----------------------------------------------------------------------------
INSERT INTO public.brands (id, name, slug, logo_text, origin_country, is_authorized_dealer, warranty_period_months, featured) VALUES
('b0000000-0000-0000-0000-000000000001', 'Focusrite', 'focusrite', 'Focusrite', 'United Kingdom', false, 36, true),
('b0000000-0000-0000-0000-000000000002', 'Universal Audio', 'universal-audio', 'UNIVERSAL AUDIO', 'United States', false, 24, true),
('b0000000-0000-0000-0000-000000000003', 'Solid State Logic', 'solid-state-logic', 'SSL', 'United Kingdom', false, 24, true),
('b0000000-0000-0000-0000-000000000004', 'MOTU', 'motu', 'MOTU', 'United States', false, 24, true),
('b0000000-0000-0000-0000-000000000005', 'Shure', 'shure', 'SHURE', 'United States', false, 24, true),
('b0000000-0000-0000-0000-000000000006', 'Neumann', 'neumann', 'NEUMANN.BERLIN', 'Germany', false, 24, true),
('b0000000-0000-0000-0000-000000000007', 'RØDE', 'rode', 'RØDE', 'Australia', false, 24, true),
('b0000000-0000-0000-0000-000000000008', 'Audio-Technica', 'audio-technica', 'audio-technica', 'Japan', false, 24, true),
('b0000000-0000-0000-0000-000000000009', 'AKG', 'akg', 'AKG', 'Austria', false, 24, true),
('b0000000-0000-0000-0000-000000000010', 'Lewitt', 'lewitt', 'LEWITT', 'Austria', false, 24, true),
('b0000000-0000-0000-0000-000000000011', 'Yamaha', 'yamaha', 'YAMAHA', 'Japan', false, 36, true),
('b0000000-0000-0000-0000-000000000012', 'KRK Systems', 'krk', 'KRK', 'United States', false, 24, true),
('b0000000-0000-0000-0000-000000000013', 'Genelec', 'genelec', 'GENELEC', 'Finland', false, 60, true),
('b0000000-0000-0000-0000-000000000014', 'ADAM Audio', 'adam-audio', 'ADAM AUDIO', 'Germany', false, 60, true),
('b0000000-0000-0000-0000-000000000015', 'Kali Audio', 'kali-audio', 'KALI AUDIO', 'United States', false, 24, true),
('b0000000-0000-0000-0000-000000000016', 'Beyerdynamic', 'beyerdynamic', 'beyerdynamic', 'Germany', false, 24, true),
('b0000000-0000-0000-0000-000000000017', 'Sennheiser', 'sennheiser', 'SENNHEISER', 'Germany', false, 24, true),
('b0000000-0000-0000-0000-000000000018', 'Sony', 'sony', 'SONY', 'Japan', false, 24, true),
('b0000000-0000-0000-0000-000000000019', 'Arturia', 'arturia', 'ARTURIA', 'France', false, 24, true),
('b0000000-0000-0000-0000-000000000020', 'Novation', 'novation', 'novation', 'United Kingdom', false, 36, true),
('b0000000-0000-0000-0000-000000000021', 'AKAI Professional', 'akai-professional', 'AKAI', 'Japan', false, 12, true),
('b0000000-0000-0000-0000-000000000022', 'Native Instruments', 'native-instruments', 'NATIVE INSTRUMENTS', 'Germany', false, 24, true),
('b0000000-0000-0000-0000-000000000023', 'Fender', 'fender', 'Fender', 'United States', false, 24, true),
('b0000000-0000-0000-0000-000000000024', 'PRS Guitars', 'prs-guitars', 'PRS', 'United States', false, 24, true),
('b0000000-0000-0000-0000-000000000025', 'Mogami', 'mogami', 'MOGAMI', 'Japan', false, 120, true),
('b0000000-0000-0000-0000-000000000026', 'Cloud Microphones', 'cloud-microphones', 'CLOUD', 'United States', false, 24, false);

-- -----------------------------------------------------------------------------
-- 2. SEED PRIMARY CATEGORIES
-- -----------------------------------------------------------------------------
INSERT INTO public.categories (id, name, slug, tagline, description, icon_name, display_order) VALUES
('c0000000-0000-0000-0000-000000000001', 'Studio & Recording', 'studio-recording', 'Interfaces, monitors, preamps & acoustics for pristine capture', 'Equip your control room and home workspace with industry-standard audio converters, reference monitors, and preamplification.', 'Sliders', 1),
('c0000000-0000-0000-0000-000000000002', 'Microphones', 'microphones', 'Dynamic, condenser, ribbon & USB mics for vocals and instruments', 'From broadcast legends to precision tube condensers, capture every vocal nuance and acoustic instrument detail.', 'Mic', 2),
('c0000000-0000-0000-0000-000000000003', 'Guitars', 'guitars', 'Electric, acoustic, classical, tube amps & pedalboards', 'Solid-body electrics, solid-top acoustics, analog effects pedals, and stage-ready amplification.', 'Guitar', 3),
('c0000000-0000-0000-0000-000000000004', 'Accessories', 'accessories', 'Oxygen-free copper cables, heavy-duty stands, rack cases & power', 'Rugged studio furniture, Mogami-grade cabling, and conditioned surge distribution.', 'Tool', 4);

-- -----------------------------------------------------------------------------
-- 3. SEED SUBCATEGORIES
-- -----------------------------------------------------------------------------
INSERT INTO public.categories (id, parent_id, name, slug, tagline, description, display_order) VALUES
('c0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000001', 'Audio Interfaces', 'audio-interfaces', 'USB-C, Thunderbolt & Dante Audio Interfaces', 'Multi-channel recording interfaces with high-dynamic-range AD/DA conversion.', 1),
('c0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000001', 'Studio Monitors', 'studio-monitors', 'Active Bi-Amp & Tri-Amp Reference Monitors', 'Honest acoustic translation for control rooms and editing suites.', 2),
('c0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000001', 'Studio Headphones', 'studio-headphones', 'Closed & Open Back Studio Headphones', 'Analytical reference headphones for tracking, mixing, and mastering.', 3),
('c0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000001', 'MIDI Keyboards', 'midi-keyboards', 'Keyboard Controllers & Pad Surfaces', 'Expressive semi-weighted, synth-action, and weighted MIDI controllers.', 4),
('c0000000-0000-0000-0000-000000000021', 'c0000000-0000-0000-0000-000000000002', 'Dynamic Microphones', 'dynamic-microphones', 'Cardioid & Broadcast Dynamic Mics', 'Durable, high-SPL vocal and instrument dynamic transducers.', 1),
('c0000000-0000-0000-0000-000000000022', 'c0000000-0000-0000-0000-000000000002', 'Large Condensers', 'large-condensers', 'Large-Diaphragm Studio Condensers', 'Gold-sputtered multi-pattern vocal and acoustic studio microphones.', 2),
('c0000000-0000-0000-0000-000000000031', 'c0000000-0000-0000-0000-000000000003', 'Electric Guitars', 'electric-guitars', 'Solid-Body & Semi-Hollow Electric Guitars', 'Iconic guitars for studio recording and live performance.', 1),
('c0000000-0000-0000-0000-000000000041', 'c0000000-0000-0000-0000-000000000004', 'Microphone Cables', 'mic-cables', 'Balanced XLR Cables & Preamps', 'High-purity OFC copper quad cabling and inline mic boosters.', 1);

-- -----------------------------------------------------------------------------
-- 4. SEED CORE PRODUCTS (PAISE FINANCIAL STORAGE)
-- -----------------------------------------------------------------------------
-- Scarlett 2i2
INSERT INTO public.products (id, slug, title, subtitle, brand_id, category_id, subcategory_id, short_description, full_description, key_features, whats_in_the_box, rating, review_count, tags, warranty_summary, fastest_delivery_days, is_demo) VALUES
('p0000000-0000-0000-0000-000000000001', 'focusrite-scarlett-2i2-gen4', 'Focusrite Scarlett 2i2 (4th Gen) USB-C Audio Interface', '2-in / 2-out USB Audio Interface with RedNet-derived Converters, Auto Gain & Clip Safe', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000011', 'The latest evolution of the world''s most popular recording interface. Featuring 120dB dynamic range converters borrowed from Focusrite''s flagship RedNet line.', 'Designed for singers, songwriters, and multi-instrumentalists, the Scarlett 2i2 4th Generation delivers an unprecedented leap in sonic clarity. Redesigned preamps deliver pristine clarity with 69dB of ultra-clean gain.', '["69dB preamp gain range", "120dB dynamic range RedNet converters", "Air Mode harmonic saturation", "Auto Gain and Clip Safe"]'::jsonb, '["Scarlett 2i2 Interface", "USB-C Cable", "Software Suite"]'::jsonb, 4.80, 342, '["bestseller", "pro-choice", "studio-essential"]'::jsonb, '3-Year Official Focusrite India Warranty', 2, true);

INSERT INTO public.product_variants (id, product_id, sku, title, attributes, mrp_inr_paise, price_inr_paise, stock_status, stock_count, is_default) VALUES
('v0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'FOC-SCAR-2I2-G4-STD', 'Standard Interface Only', '{"color": "Scarlett Red & Obsidian", "finish": "Anodized Matte Aluminum"}'::jsonb, 2199000, 1749000, 'in-stock', 28, true);

INSERT INTO public.product_images (id, product_id, variant_id, url, alt_text, is_primary) VALUES
('i0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'v0000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80', 'Focusrite Scarlett 2i2 Gen 4 Front', true);

INSERT INTO public.compatibility_profiles (id, product_id, connectors_in, connectors_out, requires_phantom_power, headphone_impedance_min_ohms, headphone_impedance_max_ohms, power_requirement) VALUES
('cp000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', '[{"type": "xlr", "count": 2, "phantomPowerCapable": true}, {"type": "1/4-inch-hi-z", "count": 2}]'::jsonb, '[{"type": "1/4-inch-balanced", "count": 2}, {"type": "1/4-inch-headphone", "count": 1}]'::jsonb, false, 16, 300, 'bus-powered');

-- Shure SM7B
INSERT INTO public.products (id, slug, title, subtitle, brand_id, category_id, subcategory_id, short_description, full_description, key_features, whats_in_the_box, rating, review_count, tags, warranty_summary, fastest_delivery_days, is_demo) VALUES
('p0000000-0000-0000-0000-000000000002', 'shure-sm7b-cardioid-dynamic-microphone', 'Shure SM7B Cardioid Dynamic Vocal Microphone', 'The Industry-Standard Broadcast, Vocal & Podcasting Dynamic Microphone', 'b0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000021', 'The definitive broadcast, voiceover, and studio vocal microphone. Features smooth flat wide-range frequency response.', 'Whether it is rock lead vocals or broadcast podcasting, the Shure SM7B delivers warm, smooth frequency response with controlled bass roll-off and mid-range boost presence controls.', '["Flat, wide-range frequency response (50 Hz - 20 kHz)", "Bass roll-off and presence boost controls", "Shielded against electromagnetic hum", "Internal air suspension shock isolation"]'::jsonb, '["Shure SM7B Microphone", "A7WS Windscreen", "RPM602 Switch Cover Plate", "Swivel Mount"]'::jsonb, 4.90, 512, '["bestseller", "pro-choice", "studio-essential"]'::jsonb, '2-Year Official Shure India Warranty', 2, true);

INSERT INTO public.product_variants (id, product_id, sku, title, attributes, mrp_inr_paise, price_inr_paise, stock_status, stock_count, is_default) VALUES
('v0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', 'SHU-SM7B-STD', 'Standard SM7B Dynamic', '{"color": "Enamel Dark Grey", "finish": "Cast Aluminum"}'::jsonb, 4499000, 3899000, 'in-stock', 42, true);

INSERT INTO public.product_images (id, product_id, variant_id, url, alt_text, is_primary) VALUES
('i0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', 'v0000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80', 'Shure SM7B Studio Microphone', true);

INSERT INTO public.compatibility_profiles (id, product_id, connectors_in, connectors_out, requires_phantom_power, recommended_gain_min_db, power_requirement) VALUES
('cp000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', '[]'::jsonb, '[{"type": "xlr", "count": 1}]'::jsonb, false, 60, NULL);

-- Yamaha HS5
INSERT INTO public.products (id, slug, title, subtitle, brand_id, category_id, subcategory_id, short_description, full_description, key_features, whats_in_the_box, rating, review_count, tags, warranty_summary, fastest_delivery_days, is_demo) VALUES
('p0000000-0000-0000-0000-000000000003', 'yamaha-hs5-active-studio-monitor', 'Yamaha HS5 5-inch Active Studio Monitor (Pair)', '5-inch Bi-Amplified Nearfield Studio Monitor Pair with Iconic White Cone Woofers', 'b0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000012', 'The nearfield reference standard for honest, unvarnished acoustic translation. Bi-amplified 70W system.', 'The HS5 delivers uncompromising acoustic honesty: if your mix sounds good on these, it translates everywhere across club systems, cars, and consumer headphones.', '["5-inch cone woofer and 1-inch dome tweeter", "70W bi-amp design (45W LF + 25W HF)", "Room Control and High Trim switches", "XLR and 1/4 TRS balanced inputs"]'::jsonb, '["2 x Yamaha HS5 Monitors", "2 x Power Cables", "Owner Manual"]'::jsonb, 4.80, 284, '["bestseller", "studio-essential"]'::jsonb, '3-Year Official Yamaha Music India Warranty', 2, true);

INSERT INTO public.product_variants (id, product_id, sku, title, attributes, mrp_inr_paise, price_inr_paise, stock_status, stock_count, is_default) VALUES
('v0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000003', 'YAM-HS5-BK-PAIR', 'Matte Black (Matched Pair)', '{"color": "Black with White Cone", "sizeInch": 5, "configuration": "Pair"}'::jsonb, 3499000, 2849000, 'in-stock', 18, true);

INSERT INTO public.product_images (id, product_id, variant_id, url, alt_text, is_primary) VALUES
('i0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000003', 'v0000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80', 'Yamaha HS5 Nearfield Monitors Pair', true);

INSERT INTO public.compatibility_profiles (id, product_id, connectors_in, connectors_out, requires_phantom_power, power_requirement) VALUES
('cp000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000003', '[{"type": "xlr", "count": 1}, {"type": "1/4-inch-balanced", "count": 1}]'::jsonb, '[]'::jsonb, false, 'mains-iec-230v');

-- Audio-Technica ATH-M50x
INSERT INTO public.products (id, slug, title, subtitle, brand_id, category_id, subcategory_id, short_description, full_description, key_features, whats_in_the_box, rating, review_count, tags, warranty_summary, fastest_delivery_days, is_demo) VALUES
('p0000000-0000-0000-0000-000000000004', 'audio-technica-ath-m50x-professional-monitor-headphones', 'Audio-Technica ATH-M50x Professional Studio Monitor Headphones', 'The Most Acclaimed Closed-Back Studio Monitor Headphones for Tracking & Mixing', 'b0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000013', 'Praised by top audio engineers and reviewers year after year. 45 mm large-aperture neodymium drivers.', 'From the studio to the stage, the ATH-M50x is praised for exceptional clarity throughout an extended frequency range, with deep, accurate bass response.', '["Proprietary 45 mm large-aperture drivers", "Circumaural contouring for noise isolation", "90° swiveling earcups for one-ear monitoring", "3 detachable cables included"]'::jsonb, '["ATH-M50x Headphones", "3m Coiled Cable", "3m Straight Cable", "1.2m Straight Cable", "6.3mm Adapter", "Pouch"]'::jsonb, 4.80, 620, '["bestseller", "studio-essential"]'::jsonb, '2-Year Official Audio-Technica Warranty', 2, true);

INSERT INTO public.product_variants (id, product_id, sku, title, attributes, mrp_inr_paise, price_inr_paise, stock_status, stock_count, is_default) VALUES
('v0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', 'AT-ATH-M50X-BK', 'Standard Matte Black', '{"color": "Matte Black", "impedanceOhms": 38}'::jsonb, 1899000, 1349000, 'in-stock', 45, true);

INSERT INTO public.product_images (id, product_id, variant_id, url, alt_text, is_primary) VALUES
('i0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', 'v0000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80', 'Audio-Technica ATH-M50x Headphones', true);

INSERT INTO public.compatibility_profiles (id, product_id, connectors_in, connectors_out, requires_phantom_power, headphone_impedance_min_ohms, headphone_impedance_max_ohms, power_requirement) VALUES
('cp000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', '[{"type": "3.5mm-stereo", "count": 1}]'::jsonb, '[]'::jsonb, false, 38, 38, NULL);
