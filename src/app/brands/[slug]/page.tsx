import { use } from "react";
import { notFound } from "next/navigation";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ShieldCheck } from "lucide-react";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export default function BrandDetailPage({ params }: BrandPageProps) {
  const resolvedParams = use(params);
  const brand = BRANDS.find((b) => b.slug === resolvedParams.slug);

  if (!brand) {
    notFound();
  }

  const brandProducts = PRODUCTS.filter((p) => p.brand.slug === brand.slug);

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs
          items={[
            { label: "Authorized Brands", href: "/brands" },
            { label: brand.name },
          ]}
          className="mb-4"
        />

        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              Official Authorized Indian Dealer
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              {brand.name} Pro Audio
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
              Origin: {brand.originCountry} &bull; All equipment imported through authorized channels with full {brand.warrantyPeriodMonths}-month Indian manufacturer replacement warranty.
            </p>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-4 text-center">
            <span className="font-extrabold text-2xl font-mono text-text-primary block">
              {brand.logoText}
            </span>
            <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
              <ShieldCheck size={14} />
              <span>Certified Dealer</span>
            </div>
          </div>
        </div>

        {brandProducts.length === 0 ? (
          <div className="bg-white border border-border rounded-xl p-12 text-center text-sm text-text-secondary">
            Products for {brand.name} are currently being onboarded to our warehouse catalog.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brandProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
