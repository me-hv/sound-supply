import Link from "next/link";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ShieldCheck, ArrowRight, Tag } from "lucide-react";
import { SITE_POLICIES } from "@/config/siteConfig";

export default function BrandsDirectoryPage() {
  // Group brands by starting letter
  const groupedBrands = BRANDS.reduce((acc, brand) => {
    const letter = brand.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {} as Record<string, typeof BRANDS>);

  const letters = Object.keys(groupedBrands).sort();

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Brand Catalogs" }]} className="mb-4" />

        {/* Header Banner */}
        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-6 shadow-subtle">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              Hardware Manufacturer Directory
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Pro Audio Brands & Manufacturers
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Explore official hardware catalogs for recording, monitoring, synthesizers, and instruments in India. All gear is sourced through authorized distribution channels and carries genuine manufacturer warranties.
            </p>
          </div>
        </div>

        {/* Letter Jump Rail */}
        <div className="bg-white border border-border rounded-lg p-3 mb-8 shadow-subtle flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold uppercase text-text-muted font-mono mr-2">
            Jump to:
          </span>
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-7 h-7 flex items-center justify-center text-xs font-mono font-bold rounded bg-canvas hover:bg-accent hover:text-white border border-border-subtle transition-colors text-text-secondary"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* A-Z Sections */}
        <div className="space-y-8">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-border mb-4">
                <span className="w-8 h-8 rounded bg-[#171717] text-white flex items-center justify-center font-mono font-bold text-sm">
                  {letter}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono">
                  {groupedBrands[letter].length} Manufacturers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groupedBrands[letter].map((brand) => {
                  const productCount = PRODUCTS.filter((p) => p.brand.slug === brand.slug).length;
                  return (
                    <Link
                      key={brand.id}
                      href={`/brands/${brand.slug}`}
                      className="group bg-white border border-border rounded-lg p-4 flex flex-col justify-between hover:border-border-strong hover:shadow-card hover:-translate-y-0.5 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-2.5 border-b border-border-subtle">
                          <span className="font-extrabold text-base text-text-primary group-hover:text-accent transition-colors font-mono">
                            {brand.logoText}
                          </span>
                          <span className="text-[10px] font-mono text-text-muted bg-canvas px-1.5 py-0.5 rounded border border-border-subtle">
                            {productCount > 0 ? `${productCount} Models` : "Catalog"}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1">
                          <div className="text-xs font-bold text-text-primary">{brand.name}</div>
                          <div className="text-[11px] text-text-secondary">
                            Origin: {brand.originCountry}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-text-muted group-hover:text-accent transition-colors">
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
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
