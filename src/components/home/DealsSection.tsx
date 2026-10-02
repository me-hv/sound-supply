import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Flame, ArrowRight, Tag, Clock } from "lucide-react";

export function DealsSection() {
  // Grab items with deals or high discounts
  const dealProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-border">
      <Container size="wide">
        {/* Banner Announcement */}
        <div className="bg-gradient-to-r from-[#211210] to-[#171717] rounded-xl border border-red-950/40 p-6 sm:p-8 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-accent/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Flame size={12} />
                <span>Limited Studio Allocation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Studio Gear Promotions & Bundles
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Take advantage of manufacturer rebates, bundled cables & stands, and no-cost EMI incentives on flagship recording equipment.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-2 bg-[#2D1B18] px-3.5 py-2 rounded-lg border border-red-900/50 text-xs font-mono">
                <Clock size={15} className="text-accent" />
                <span>Offers valid while batch inventory lasts</span>
              </div>
              <Link
                href="/deals"
                className="bg-accent hover:bg-accent-hover text-white text-xs font-bold px-5 py-3 rounded-md transition-colors inline-flex items-center gap-1.5"
              >
                <span>Browse All Deals</span>
                <ArrowRight size={14} />
              </Link>
            </div>
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
