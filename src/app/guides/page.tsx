import Link from "next/link";
import { GEAR_GUIDES } from "@/data/guides";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { BookOpen, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function GuidesIndexPage() {
  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Buying Guides" }]} className="mb-4" />

        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              Sound Supply Knowledge Base
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Audio Gear Guides & Studio Explainers
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Cut through marketing jargon. Technical buying advice, impedance calculations, room acoustic treatments, and signal chain optimization written by experienced sound engineers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GEAR_GUIDES.map((guide) => (
            <article
              key={guide.id}
              className="bg-white border border-border rounded-lg overflow-hidden flex flex-col justify-between hover:border-border-strong hover:shadow-card transition-all"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-canvas-muted">
                  <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#171717]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {guide.category}
                  </span>
                </div>

                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-text-muted font-mono">
                    <Clock size={12} />
                    <span>{guide.readTime}</span>
                    <span>&bull;</span>
                    <span>{guide.publishedDate}</span>
                  </div>

                  <h2 className="font-bold text-base text-text-primary hover:text-accent transition-colors leading-snug">
                    <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h2>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {guide.summary}
                  </p>

                  <div className="pt-2 border-t border-border-subtle space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Key Takeaways
                    </div>
                    {guide.keyTakeaways.map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-text-secondary">
                        <CheckCircle2 size={13} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="w-full py-2 text-xs font-semibold text-text-primary hover:text-accent flex items-center justify-between border-t border-border-subtle"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
