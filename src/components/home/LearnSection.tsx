import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GEAR_GUIDES } from "@/data/guides";
import { BookOpen, ArrowRight, Clock, CheckCircle2 } from "lucide-react";

export function LearnSection() {
  return (
    <section className="py-16 bg-canvas border-b border-border">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
              Sound Supply Academy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Buying Guides & Gear Explainers
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Spec breakdowns, room acoustics insights, and impedance matching guides written by working audio engineers.
            </p>
          </div>

          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
          >
            <span>Read All Studio Guides</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Guide Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GEAR_GUIDES.map((guide) => (
            <article
              key={guide.id}
              className="bg-white border border-border rounded-lg overflow-hidden flex flex-col justify-between hover:border-border-strong hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                {/* Article Header Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-canvas-muted">
                  <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#171717]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                      {guide.category}
                    </span>
                  </div>
                </div>

                {/* Article Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-text-muted font-mono">
                    <Clock size={12} />
                    <span>{guide.readTime}</span>
                    <span>&bull;</span>
                    <span>{guide.publishedDate}</span>
                  </div>

                  <h3 className="font-bold text-base text-text-primary hover:text-accent transition-colors leading-snug">
                    <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {guide.summary}
                  </p>

                  {/* Bullet Takeaways */}
                  <div className="pt-2 border-t border-border-subtle space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Key Engineering Insights
                    </div>
                    {guide.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-text-secondary leading-tight">
                        <CheckCircle2 size={13} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-4 pt-0">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="w-full py-2 text-xs font-semibold text-text-primary hover:text-accent flex items-center justify-between border-t border-border-subtle group"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
