import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ArrowRight, Sliders } from "lucide-react";

export default function CategoriesIndexPage() {
  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "All Categories" }]} className="mb-6" />

        <div className="bg-white border border-border rounded-lg p-6 sm:p-8 mb-8 shadow-subtle">
          <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
            Navigation Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-1">
            Browse Audio Equipment by Category
          </h1>
          <p className="text-sm text-text-secondary mt-1 max-w-2xl">
            Explore Sound Supply&apos;s complete catalog taxonomy across studio recording, microphones, monitoring, instruments, and live sound.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-border rounded-lg p-5 flex flex-col justify-between hover:border-border-strong hover:shadow-card transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <h2 className="font-bold text-lg text-text-primary">{cat.name}</h2>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <p className="text-xs text-text-secondary mt-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                {cat.groups && (
                  <div className="space-y-3">
                    {cat.groups.map((group) => (
                      <div key={group.name} className="text-xs">
                        <div className="font-bold text-text-primary uppercase tracking-wider text-[11px] mb-1 text-text-muted">
                          {group.name}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.id}
                              href={`/categories/${cat.slug}?sub=${item.slug}`}
                              className="text-xs bg-canvas hover:bg-canvas-muted text-text-secondary hover:text-text-primary px-2.5 py-1 rounded border border-border-subtle transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
