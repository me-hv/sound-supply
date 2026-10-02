import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRANDS } from "@/data/brands";
import { ArrowRight, Tag } from "lucide-react";

export function BrandsSection() {
  return (
    <section className="py-16 bg-canvas border-b border-border">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
              Manufacturer Index
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Featured Audio Brands
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Browse world-renowned hardware manufacturers across studio converters, monitoring, synthesizers, and instruments.
            </p>
          </div>

          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
          >
            <span>View All Brand Catalogs</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group bg-white border border-border rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-border-strong hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Brand logo typographic mark */}
              <div className="h-12 flex items-center justify-center">
                <span className="font-extrabold text-lg sm:text-xl tracking-tighter text-text-primary group-hover:text-accent transition-colors font-mono">
                  {brand.logoText}
                </span>
              </div>

              {/* Warranty badge */}
              <div className="mt-2 flex items-center gap-1 text-[11px] text-text-muted">
                <Tag size={11} className="text-accent" />
                <span>{brand.name} Gear</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
