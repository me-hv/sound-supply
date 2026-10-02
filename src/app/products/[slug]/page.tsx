"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { useCommerce } from "@/context/CommerceContext";
import { SITE_POLICIES } from "@/config/siteConfig";
import {
  formatInr,
  calculateDiscountPercent,
  calculateEmiEstimate,
} from "@/lib/utils";
import {
  Heart,
  Scale,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Cable,
  Plug,
  AlertTriangle,
  Volume2,
  Mic,
  Sliders,
  Headphones,
  ArrowRight,
  ArrowDown,
  Layers,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const {
    addToCart,
    addToCompare,
    isInCompare,
    toggleWishlist,
    isInWishlist,
  } = useCommerce();

  // Active Variant State
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.defaultVariantId || product.variants[0].id
  );

  // Active Image Gallery State
  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Pincode Estimator State
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  // Active Tab State (Overview, Features, Specifications, Compatibility, WhatsIncluded, Reviews)
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "specifications" | "compatibility" | "whats-included" | "reviews"
  >("specifications");

  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = calculateDiscountPercent(
    activeVariant.mrpInr,
    activeVariant.sellingPriceInr
  );
  const inCompare = isInCompare(product.id);
  const inWishlist = isInWishlist(product.id);

  // Pincode validation check
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeResult(
        `Verified: Free Insured Express Delivery to ${pincode} within 2–3 business days.`
      );
    } else {
      setPincodeResult("Please enter a valid 6-digit Indian Postal Pincode.");
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, activeVariant.id, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  // Dynamically extract category-specific specification groups from product data
  const specGroups = Array.from(new Set(product.specifications.map((s) => s.group)));

  // Breadcrumbs
  const category = CATEGORIES.find((c) => c.slug === product.categorySlug);
  const breadcrumbItems = [
    { label: "Categories", href: "/categories" },
    {
      label: category ? category.name : "Products",
      href: `/categories/${product.categorySlug}`,
    },
    {
      label: product.subCategorySlug.replace("-", " "),
      href: `/categories/${product.categorySlug}?sub=${product.subCategorySlug}`,
    },
    { label: product.title },
  ];

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, 4);

  return (
    <div className="py-6 sm:py-10 bg-canvas min-h-screen">
      <Container size="wide">
        {/* Breadcrumb Trail */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Main Product Stage: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Image Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-border rounded-xl p-6 sm:p-10 flex items-center justify-center relative aspect-square shadow-subtle overflow-hidden">
              <img
                src={activeVariant.images[selectedImageIndex] || activeVariant.images[0]}
                alt={`${product.title} - ${activeVariant.title}`}
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-300"
              />

              {/* Status Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {discountPercent > 0 && (
                  <Badge variant="accent" size="md">
                    Save {discountPercent}% (₹{activeVariant.mrpInr - activeVariant.sellingPriceInr} Off)
                  </Badge>
                )}
                {product.tags.includes("pro-choice") && (
                  <Badge variant="brand" size="sm">
                    Studio Reference Grade
                  </Badge>
                )}
              </div>

              {/* Quick action buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addToCompare(product.id)}
                  className={cn(
                    "p-2 rounded-lg border transition-colors shadow-sm",
                    inCompare
                      ? "bg-accent text-white border-accent"
                      : "bg-white text-text-secondary border-border hover:text-text-primary"
                  )}
                  title={inCompare ? "Remove from comparison" : "Add to side-by-side comparison"}
                >
                  <Scale size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "p-2 rounded-lg border transition-colors shadow-sm",
                    inWishlist
                      ? "bg-red-50 text-accent border-red-200"
                      : "bg-white text-text-secondary border-border hover:text-text-primary"
                  )}
                  title="Save to Wishlist"
                >
                  <Heart size={18} className={inWishlist ? "fill-accent text-accent" : ""} />
                </button>
              </div>
            </div>

            {/* Thumbnail Carousel Rail */}
            {activeVariant.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {activeVariant.images.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "w-20 h-20 rounded-lg bg-white border p-1.5 flex-shrink-0 transition-all overflow-hidden",
                      selectedImageIndex === index
                        ? "border-accent ring-2 ring-accent/30"
                        : "border-border hover:border-border-strong opacity-80 hover:opacity-100"
                    )}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buying Controls & Technical Metadata (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-border rounded-xl p-6 sm:p-7 shadow-subtle space-y-5">
              {/* Brand and SKU */}
              <div className="flex items-center justify-between text-xs text-text-muted">
                <Link
                  href={`/brands/${product.brand.slug}`}
                  className="font-bold text-accent uppercase tracking-wider hover:underline font-mono"
                >
                  {product.brand.name} Hardware
                </Link>
                <span className="font-mono">SKU: {activeVariant.sku}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight leading-snug">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-normal">
                  {product.subtitle}
                </p>
              </div>

              {/* Ratings & Reviews */}
              <div className="flex items-center gap-3 pb-4 border-b border-border-subtle">
                <RatingStars
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
                <span className="text-text-muted">&bull;</span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>{SITE_POLICIES.authenticity.badgeText} &bull; Valid Serial</span>
                </span>
              </div>

              {/* Price & Savings Block */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-text-primary font-mono tabular-nums">
                    {formatInr(activeVariant.sellingPriceInr)}
                  </span>
                  {activeVariant.mrpInr > activeVariant.sellingPriceInr && (
                    <span className="text-sm text-text-muted line-through font-mono">
                      MRP {formatInr(activeVariant.mrpInr)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-accent font-mono bg-accent-subtle px-2 py-0.5 rounded">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-text-muted">
                  Includes all applicable Indian GST. Official tax invoice provided with company GSTIN on request.
                </div>
              </div>

              {/* 0% No Cost EMI Banner */}
              <div className="bg-canvas border border-border-subtle rounded-lg p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-[#171717] text-white text-[10px] font-bold font-mono px-1.5 py-0.5 rounded">
                    0% EMI
                  </span>
                  <span className="text-text-secondary">
                    No-Cost EMI from <strong className="text-text-primary font-mono">{formatInr(calculateEmiEstimate(activeVariant.sellingPriceInr, 6))}/mo</strong> for 6 months
                  </span>
                </div>
                <Link href="#emi-plans" className="text-accent font-semibold hover:underline text-[11px]">
                  View Tiers
                </Link>
              </div>

              {/* Separate Product Variants Architecture (Color, Size, Key Count, Options) */}
              {product.variants.length > 1 && (
                <div className="pt-2 border-t border-border-subtle space-y-2.5">
                  <div className="text-xs font-bold text-text-primary flex items-center justify-between">
                    <span>Select Configuration / Finish:</span>
                    <span className="text-text-secondary font-normal font-mono text-[11px]">
                      {activeVariant.title}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variants.map((v) => {
                      const isSelected = v.id === selectedVariantId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => {
                            setSelectedVariantId(v.id);
                            setSelectedImageIndex(0);
                          }}
                          className={cn(
                            "p-2.5 rounded-lg border text-left text-xs transition-all flex flex-col justify-between",
                            isSelected
                              ? "border-accent bg-accent-subtle/40 ring-1 ring-accent text-text-primary"
                              : "border-border hover:border-border-strong bg-white text-text-secondary"
                          )}
                        >
                          <div className="font-semibold">{v.title}</div>
                          <div className="mt-1 text-[11px] font-mono font-bold text-text-primary">
                            {formatInr(v.sellingPriceInr)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stock Status Notification */}
              <div className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-2.5 h-2.5 rounded-full inline-block animate-pulse",
                      activeVariant.stockStatus === "in-stock" && "bg-emerald-600",
                      activeVariant.stockStatus === "low-stock" && "bg-amber-500",
                      activeVariant.stockStatus === "pre-order" && "bg-blue-500"
                    )}
                  />
                  <span className="font-bold text-text-primary">
                    {activeVariant.stockStatus === "in-stock" && "In Stock — Ready to Dispatch"}
                    {activeVariant.stockStatus === "low-stock" && `Low Stock: Only ${activeVariant.stockCount} Units Left`}
                    {activeVariant.stockStatus === "pre-order" && "Pre-Order: Dispatch in 7-10 Days"}
                  </span>
                </div>
                <span className="text-text-muted font-mono text-[11px]">
                  Warehouse: Mumbai Central Hub
                </span>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={cn(
                    "w-full py-3.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-subtle active:scale-[0.99]",
                    addedAnimation
                      ? "bg-emerald-700 text-white"
                      : "bg-accent hover:bg-accent-hover text-white"
                  )}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} className="stroke-[3]" />
                      <span>Added to Studio Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Cart &bull; {formatInr(activeVariant.sellingPriceInr)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart();
                    window.location.href = "/cart";
                  }}
                  className="w-full py-3 px-4 rounded-lg font-bold text-sm bg-[#171717] hover:bg-[#2C2C2C] text-white flex items-center justify-center gap-2 transition-all shadow-subtle"
                >
                  <Zap size={16} className="text-amber-400" />
                  <span>Instant Studio Checkout</span>
                </button>
              </div>

              {/* Indian Pincode Delivery Estimator */}
              <div className="pt-4 border-t border-border-subtle">
                <form onSubmit={handleCheckPincode} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-primary flex items-center gap-1">
                      <MapPin size={13} className="text-accent" />
                      <span>Check Delivery SLA</span>
                    </span>
                    <span className="text-[11px] text-text-muted font-mono">e.g. 560001, 400001</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.trim())}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-1 bg-canvas border border-border px-3 py-2 text-xs rounded-md text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 text-xs font-semibold bg-[#171717] text-white rounded-md hover:bg-black transition-colors"
                    >
                      Check
                    </button>
                  </div>

                  {pincodeResult && (
                    <div className="text-xs p-2.5 rounded-md bg-canvas-muted text-text-secondary border border-border-subtle mt-1.5 flex items-start gap-1.5">
                      <Info size={14} className="text-accent flex-shrink-0 mt-0.5" />
                      <span>{pincodeResult}</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Service Badges */}
              <div className="pt-4 border-t border-border-subtle grid grid-cols-3 gap-2 text-center text-[10px] text-text-secondary">
                <div className="p-2 bg-canvas rounded">
                  <ShieldCheck size={16} className="mx-auto text-accent mb-1" />
                  <span>{SITE_POLICIES.warranty.badgeText}</span>
                </div>
                <div className="p-2 bg-canvas rounded">
                  <Truck size={16} className="mx-auto text-accent mb-1" />
                  <span>{SITE_POLICIES.transit.badgeText}</span>
                </div>
                <div className="p-2 bg-canvas rounded">
                  <RotateCcw size={16} className="mx-auto text-accent mb-1" />
                  <span>{SITE_POLICIES.returns.badgeText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Technical & Product Information Architecture */}
        <div className="bg-white border border-border rounded-xl shadow-subtle overflow-hidden mb-16">
          {/* Navigation Tabs Header */}
          <div className="flex items-center border-b border-border overflow-x-auto bg-[#FAFAF9]">
            {[
              { id: "specifications", label: "Technical Specifications" },
              ...(product.compatibility ? [{ id: "compatibility", label: "Signal Chain & Compatibility" }] : []),
              { id: "overview", label: "Overview" },
              { id: "features", label: "Key Features" },
              { id: "whats-included", label: "What's in the Box" },
              { id: "reviews", label: `Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-5 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5",
                  activeTab === tab.id
                    ? "border-accent text-accent bg-white"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:bg-canvas"
                )}
              >
                {tab.id === "specifications" && <Scale size={14} />}
                {tab.id === "compatibility" && <Cable size={14} />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="p-6 sm:p-8">
            {/* 1. Structured Technical Specifications Table */}
            {activeTab === "specifications" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">
                    Structured Technical Specification Matrix
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Engineering parameters verified against manufacturer calibration benchmarks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {specGroups.map((group) => {
                    const specsInGroup = product.specifications.filter((s) => s.group === group);
                    if (specsInGroup.length === 0) return null;

                    return (
                      <div key={group} className="border border-border rounded-lg overflow-hidden">
                        <div className="bg-canvas-muted px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-text-primary border-b border-border">
                          {group}
                        </div>
                        <table className="w-full text-xs text-left">
                          <tbody>
                            {specsInGroup.map((spec, idx) => (
                              <tr
                                key={spec.label}
                                className={cn(
                                  "border-b border-border-subtle last:border-b-0",
                                  idx % 2 === 0 ? "bg-white" : "bg-canvas/50"
                                )}
                              >
                                <td className="py-2.5 px-4 font-medium text-text-secondary w-1/2">
                                  {spec.label}
                                </td>
                                <td className="py-2.5 px-4 font-semibold text-text-primary font-mono w-1/2">
                                  {spec.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 1B. Signal Chain & Compatibility Pane */}
            {activeTab === "compatibility" && product.compatibility && (() => {
              const getChainData = () => {
                if (product.categorySlug === "microphones") {
                  return {
                    stage1: { role: "Source Transducer", name: product.title, isCurrent: true, icon: Mic },
                    cable1: "Balanced 3-Pin XLR Cable",
                    stage2: { role: "Audio Interface / Preamp", name: "High-Gain Mic Preamp", isCurrent: false, icon: Sliders },
                    cable2: "Balanced 1/4\" TRS Line Out",
                    stage3: { role: "Monitoring Output", name: "Studio Monitors & Headphones", isCurrent: false, icon: Volume2 },
                  };
                } else if (product.subCategorySlug === "audio-interfaces") {
                  return {
                    stage1: { role: "Audio Input Source", name: "Mics, Instruments, Line Gear", isCurrent: false, icon: Mic },
                    cable1: "XLR (+48V) / 1/4\" TRS",
                    stage2: { role: "Central Hub / Interface", name: product.title, isCurrent: true, icon: Sliders },
                    cable2: "Balanced Line Out & USB-C",
                    stage3: { role: "DAW & Acoustic System", name: "Computer DAW & Active Monitors", isCurrent: false, icon: Volume2 },
                  };
                } else if (product.subCategorySlug === "studio-monitors") {
                  return {
                    stage1: { role: "Playback / DAC Source", name: "Audio Interface Line Outs", isCurrent: false, icon: Sliders },
                    cable1: "Balanced XLR / 1/4\" TRS Cable",
                    stage2: { role: "Active Acoustic Transducer", name: product.title, isCurrent: true, icon: Volume2 },
                    cable2: "Direct Acoustic Soundfield",
                    stage3: { role: "Monitoring Position", name: "Control Room Sweet Spot", isCurrent: false, icon: Headphones },
                  };
                } else if (product.subCategorySlug === "studio-headphones") {
                  return {
                    stage1: { role: "Interface / DAC Output", name: "Headphone Preamp Stage", isCurrent: false, icon: Sliders },
                    cable1: "3.5mm TRS / 6.35mm Adapter",
                    stage2: { role: "Acoustic Enclosure", name: product.title, isCurrent: true, icon: Headphones },
                    cable2: "Direct Binaural Seal",
                    stage3: { role: "Critical Listening", name: "Tracking / Stereo Placement", isCurrent: false, icon: Volume2 },
                  };
                } else {
                  return {
                    stage1: { role: "Input Controller", name: product.title, isCurrent: true, icon: Cpu },
                    cable1: "USB-C MIDI / DIN Cable",
                    stage2: { role: "Host Processing / DAW", name: "Computer DAW & Hardware Synths", isCurrent: false, icon: Sliders },
                    cable2: "Interface Analog Line Out",
                    stage3: { role: "Acoustic Output", name: "Studio Monitors & Cans", isCurrent: false, icon: Volume2 },
                  };
                }
              };

              const chain = getChainData();

              return (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-1">
                      Signal Chain & Hardware Compatibility
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Visual signal routing path showing hardware relationships, interconnect cables, and electrical compatibility parameters.
                    </p>
                  </div>

                  {/* Visual Signal Flow Diagram */}
                  <div className="bg-canvas border border-border rounded-xl p-5 sm:p-6 shadow-subtle">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono mb-4 flex items-center justify-between">
                      <span>Signal Routing Flow</span>
                      <span className="text-accent">Analog &bull; Digital Interconnect</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                      {/* Node 1 */}
                      <div
                        className={cn(
                          "w-full md:w-1/3 p-4 rounded-lg border text-center transition-all flex flex-col items-center justify-between min-h-[120px]",
                          chain.stage1.isCurrent
                            ? "bg-white border-accent ring-2 ring-accent/20 shadow-sm"
                            : "bg-white border-border text-text-secondary"
                        )}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                          <chain.stage1.icon size={13} className={chain.stage1.isCurrent ? "text-accent" : "text-text-muted"} />
                          <span>{chain.stage1.role}</span>
                        </div>
                        <div className="my-2 text-xs font-bold text-text-primary leading-snug line-clamp-2">
                          {chain.stage1.name}
                        </div>
                        {chain.stage1.isCurrent && (
                          <span className="text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded font-mono">
                            This Product
                          </span>
                        )}
                      </div>

                      {/* Cable Connector 1 */}
                      <div className="flex md:flex-col items-center justify-center gap-1 text-center py-1">
                        <span className="text-[10px] font-mono font-semibold text-text-secondary bg-white px-2 py-1 rounded border border-border-subtle shadow-subtle">
                          {chain.cable1}
                        </span>
                        <ArrowRight size={14} className="hidden md:block text-accent" />
                        <ArrowDown size={14} className="md:hidden text-accent" />
                      </div>

                      {/* Node 2 */}
                      <div
                        className={cn(
                          "w-full md:w-1/3 p-4 rounded-lg border text-center transition-all flex flex-col items-center justify-between min-h-[120px]",
                          chain.stage2.isCurrent
                            ? "bg-white border-accent ring-2 ring-accent/20 shadow-sm"
                            : "bg-white border-border text-text-secondary"
                        )}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                          <chain.stage2.icon size={13} className={chain.stage2.isCurrent ? "text-accent" : "text-text-muted"} />
                          <span>{chain.stage2.role}</span>
                        </div>
                        <div className="my-2 text-xs font-bold text-text-primary leading-snug line-clamp-2">
                          {chain.stage2.name}
                        </div>
                        {chain.stage2.isCurrent && (
                          <span className="text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded font-mono">
                            This Product
                          </span>
                        )}
                      </div>

                      {/* Cable Connector 2 */}
                      <div className="flex md:flex-col items-center justify-center gap-1 text-center py-1">
                        <span className="text-[10px] font-mono font-semibold text-text-secondary bg-white px-2 py-1 rounded border border-border-subtle shadow-subtle">
                          {chain.cable2}
                        </span>
                        <ArrowRight size={14} className="hidden md:block text-accent" />
                        <ArrowDown size={14} className="md:hidden text-accent" />
                      </div>

                      {/* Node 3 */}
                      <div
                        className={cn(
                          "w-full md:w-1/3 p-4 rounded-lg border text-center transition-all flex flex-col items-center justify-between min-h-[120px]",
                          chain.stage3.isCurrent
                            ? "bg-white border-accent ring-2 ring-accent/20 shadow-sm"
                            : "bg-white border-border text-text-secondary"
                        )}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                          <chain.stage3.icon size={13} className={chain.stage3.isCurrent ? "text-accent" : "text-text-muted"} />
                          <span>{chain.stage3.role}</span>
                        </div>
                        <div className="my-2 text-xs font-bold text-text-primary leading-snug line-clamp-2">
                          {chain.stage3.name}
                        </div>
                        {chain.stage3.isCurrent && (
                          <span className="text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded font-mono">
                            This Product
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Compatibility Status Badges */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono mb-3">
                      Verified Compatibility Checkpoints
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {/* Phantom Power */}
                      {product.compatibility.requiresPhantomPower ? (
                        <div className="p-3 bg-white border border-border rounded-lg flex items-start gap-2 shadow-subtle">
                          <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-bold text-text-primary">Requires +48V Phantom Power</div>
                            <div className="text-text-secondary text-[11px] mt-0.5">Ensure interface or preamp delivers standard 48V.</div>
                          </div>
                        </div>
                      ) : product.compatibility.connectorsIn?.some(c => c.phantomPowerCapable) ? (
                        <div className="p-3 bg-white border border-border rounded-lg flex items-start gap-2 shadow-subtle">
                          <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-bold text-text-primary">Provides +48V Phantom Power</div>
                            <div className="text-text-secondary text-[11px] mt-0.5">Built-in 48V power rail for condenser microphones.</div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-white border border-border rounded-lg flex items-start gap-2 shadow-subtle">
                          <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-bold text-text-primary">Passive / +48V Safe</div>
                            <div className="text-text-secondary text-[11px] mt-0.5">Protected against inadvertent phantom power engagement.</div>
                          </div>
                        </div>
                      )}

                      {/* Preamp Gain */}
                      {product.compatibility.recommendedGainMinDb !== undefined && (
                        <div className={cn(
                          "p-3 rounded-lg border flex items-start gap-2 shadow-subtle",
                          product.compatibility.recommendedGainMinDb >= 60
                            ? "bg-amber-50/50 border-amber-200"
                            : "bg-white border-border"
                        )}>
                          {product.compatibility.recommendedGainMinDb >= 60 ? (
                            <AlertTriangle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="text-xs">
                            <div className="font-bold text-text-primary">
                              Gain Requirement: ≥ {product.compatibility.recommendedGainMinDb} dB
                            </div>
                            <div className="text-text-secondary text-[11px] mt-0.5">
                              {product.compatibility.recommendedGainMinDb >= 60
                                ? "Low-output dynamic mic; high-gain preamp or inline booster advised."
                                : "Standard gain range provides adequate headroom."}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Headphone Impedance */}
                      {product.compatibility.headphoneImpedanceMinOhms !== undefined && (
                        <div className="p-3 bg-white border border-border rounded-lg flex items-start gap-2 shadow-subtle">
                          <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-bold text-text-primary">
                              Impedance: {product.compatibility.headphoneImpedanceMinOhms}Ω – {product.compatibility.headphoneImpedanceMaxOhms || 300}Ω
                            </div>
                            <div className="text-text-secondary text-[11px] mt-0.5">
                              Calibrated for clean playback without amp distortion.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Power */}
                      {product.compatibility.powerRequirement && (
                        <div className="p-3 bg-white border border-border rounded-lg flex items-start gap-2 shadow-subtle">
                          <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-bold text-text-primary capitalize">
                              Power: {product.compatibility.powerRequirement.replace(/-/g, " ")}
                            </div>
                            <div className="text-text-secondary text-[11px] mt-0.5">
                              {product.compatibility.powerRequirement === "bus-powered"
                                ? "Operates via host USB cable without separate AC wall adapter."
                                : "Includes standard Indian 230V AC power cord."}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Connectors */}
                      <div className="p-3 bg-white border border-border rounded-lg flex items-start gap-2 shadow-subtle">
                        <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <div className="font-bold text-text-primary">
                            Interconnect: {product.compatibility.connectorsIn ? "Standard Balanced XLR / TRS" : "Balanced Audio Line"}
                          </div>
                          <div className="text-text-secondary text-[11px] mt-0.5">
                            Fully compliant with professional studio interconnect standards.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Input / Output Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.compatibility.connectorsIn && (
                      <div className="p-4 bg-white rounded-lg border border-border shadow-subtle space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary font-mono pb-2 border-b border-border-subtle">
                          <Plug size={14} className="text-accent" />
                          <span>Input Connectors & Capabilities</span>
                        </div>
                        <ul className="text-xs text-text-secondary space-y-1.5 pt-1">
                          {product.compatibility.connectorsIn.map((conn, i) => (
                            <li key={i} className="flex justify-between items-center">
                              <span className="capitalize">{conn.type.replace(/-/g, " ")}</span>
                              <span className="font-mono font-bold text-text-primary bg-canvas px-2 py-0.5 rounded border border-border-subtle">
                                {conn.count}x {conn.phantomPowerCapable ? "(+48V Capable)" : ""}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {product.compatibility.connectorsOut && (
                      <div className="p-4 bg-white rounded-lg border border-border shadow-subtle space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary font-mono pb-2 border-b border-border-subtle">
                          <Cable size={14} className="text-accent" />
                          <span>Output Connectors & Feeds</span>
                        </div>
                        <ul className="text-xs text-text-secondary space-y-1.5 pt-1">
                          {product.compatibility.connectorsOut.map((conn, i) => (
                            <li key={i} className="flex justify-between items-center">
                              <span className="capitalize">{conn.type.replace(/-/g, " ")}</span>
                              <span className="font-mono font-bold text-text-primary bg-canvas px-2 py-0.5 rounded border border-border-subtle">
                                {conn.count}x
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 2. Overview */}
            {activeTab === "overview" && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-text-primary">
                  Engineering Overview & Application
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {product.fullDescription}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
            )}

            {/* 3. Features */}
            {activeTab === "features" && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-text-primary">
                  Key Technical Features
                </h3>
                <ul className="space-y-3">
                  {product.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                      <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. What's Included */}
            {activeTab === "whats-included" && (
              <div className="max-w-2xl space-y-4">
                <h3 className="text-lg font-bold text-text-primary">
                  Package Contents & Documentation
                </h3>
                <div className="border border-border rounded-lg divide-y divide-border-subtle">
                  {product.whatsInTheBox.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center gap-3 text-xs sm:text-sm text-text-secondary">
                      <span className="w-5 h-5 rounded-full bg-canvas text-accent text-[11px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Verified Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      Verified Producer & Engineer Feedback
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert("Review submission form opens after product purchase verification.")}
                    className="text-xs font-bold text-white bg-[#171717] hover:bg-black px-4 py-2 rounded-md transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="space-y-4">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-canvas rounded-lg border border-border-subtle space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-text-primary">{rev.author}</span>
                            <span className="text-text-muted">&bull;</span>
                            <span className="text-text-secondary">{rev.role}</span>
                            {rev.verifiedBuyer && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-text-muted font-mono">{rev.date}</span>
                        </div>
                        <div className="font-semibold text-sm text-text-primary">{rev.headline}</div>
                        <p className="text-xs text-text-secondary leading-relaxed">{rev.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-text-secondary py-4">
                      No customer reviews submitted yet. Be the first Indian audio engineer to review this model.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Gear in Same Signal Chain */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                  Compatible Signal Chain
                </span>
                <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                  Frequently Paired Equipment
                </h2>
              </div>
              <Link
                href={`/categories/${product.categorySlug}`}
                className="text-xs font-bold text-accent hover:underline"
              >
                Browse category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
