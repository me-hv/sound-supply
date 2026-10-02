import Link from "next/link";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function BrandsDirectoryPage() {
  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Authorized Brands" }]} className="mb-4" />

        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              Authorized Manufacturer Index
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Authorized Pro Audio Brands
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Sound Supply is an authorized retail distributor for global recording industry manufacturers in India. All purchases carry certified serial registration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {BRANDS.map((brand) => {
            const productCount = PRODUCTS.filter((p) => p.brand.slug === brand.slug).length;
            return (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group bg-white border border-border rounded-lg p-5 flex flex-col justify-between hover:border-border-strong hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <span className="font-extrabold text-lg text-text-primary group-hover:text-accent transition-colors font-mono">
                      {brand.logoText}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      {productCount > 0 ? `${productCount} Models` : "Catalog"}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="text-xs font-bold text-text-primary">{brand.name}</div>
                    <div className="text-[11px] text-text-secondary">Country: {brand.originCountry}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-text-muted group-hover:text-accent transition-colors">
                  <span className="flex items-center gap-1 text-emerald-700 text-[11px]">
                    <ShieldCheck size={13} />
                    <span>{brand.warrantyPeriodMonths}M Warranty</span>
                  </span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
