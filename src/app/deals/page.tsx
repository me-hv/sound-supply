import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Flame, Clock, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { formatInr } from "@/lib/utils";

export default function DealsPage() {
  const dealProducts = PRODUCTS;

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Deals & Promotions" }]} className="mb-4" />

        {/* Header Banner - Light-first with subtle red accent */}
        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent font-mono">
              <Flame size={14} />
              <span>Studio Incentives & Savings</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Hardware Promotions & Bundles
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Manufacturer rebates, bundled cables and stands, and promotional pricing across recording interfaces, reference monitors, microphones, and keys.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-canvas px-3.5 py-2.5 rounded-lg border border-border text-xs font-mono text-text-secondary flex-shrink-0">
            <Clock size={15} className="text-accent" />
            <span>Batch Inventory Pricing</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dealProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </div>
  );
}
