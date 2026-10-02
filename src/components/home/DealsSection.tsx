import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Flame, ArrowRight, Clock } from "lucide-react";

export function DealsSection() {
  // Grab items with deals or high discounts
  const dealProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="py-14 bg-white border-b border-border">
      <Container size="wide">
        {/* Banner Announcement - Light-First with crisp borders */}
        <div className="bg-canvas border border-border rounded-xl p-6 sm:p-7 text-text-primary mb-8 shadow-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-accent-subtle text-accent text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider font-mono border border-accent/20">
              <Flame size={12} />
              <span>Limited Hardware Allocation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary">
              Studio Promotions & Packaged Bundles
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Take advantage of manufacturer rebates, bundled cables & stands, and no-cost EMI incentives on studio recording hardware.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-border text-xs font-mono text-text-secondary">
              <Clock size={14} className="text-accent" />
              <span>Offers valid while batch lasts</span>
            </div>
            <Link
              href="/deals"
              className="bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors inline-flex items-center gap-1.5 shadow-subtle"
            >
              <span>Explore Deals</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Deals Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dealProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
