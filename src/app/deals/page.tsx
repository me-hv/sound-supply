import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Flame, Clock, ShieldCheck } from "lucide-react";

export default function DealsPage() {
  const dealProducts = PRODUCTS;

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Deals & Promotions" }]} className="mb-4" />

        <div className="bg-[#171717] text-white border border-[#2C2C2A] rounded-xl p-6 sm:p-10 mb-8 shadow-lg">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent font-mono">
              <Flame size={14} />
              <span>Studio Incentives & Instant Savings</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Promotional Studio Deals & Clearance
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Direct manufacturer rebates, bundled accessories, and exclusive Indian pricing across premier audio recording gear and instruments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dealProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </div>
  );
}
