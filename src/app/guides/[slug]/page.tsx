import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GEAR_GUIDES } from "@/data/guides";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Clock, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function GuideDetailPage({ params }: GuideDetailPageProps) {
  const resolvedParams = use(params);
  const guide = GEAR_GUIDES.find((g) => g.slug === resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="tight">
        <Breadcrumbs
          items={[
            { label: "Buying Guides", href: "/guides" },
            { label: guide.title },
          ]}
          className="mb-4"
        />

        <article className="bg-white border border-border rounded-xl p-6 sm:p-10 shadow-subtle space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono bg-accent-subtle px-2 py-0.5 rounded">
              {guide.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              {guide.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-text-muted font-mono pt-1">
              <span>Published {guide.publishedDate}</span>
              <span>&bull;</span>
              <span>{guide.readTime}</span>
              <span>&bull;</span>
              <span>Sound Supply Technical Advisory</span>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-lg overflow-hidden border border-border-subtle bg-canvas-muted">
            <img
              src={guide.imageUrl}
              alt={guide.title}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            {guide.summary}
          </p>

          <div className="p-5 bg-canvas rounded-lg border border-border-subtle space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary font-mono">
              Core Technical Summary
            </h3>
            <ul className="space-y-2">
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="prose prose-sm max-w-none text-text-secondary space-y-4 pt-4 border-t border-border-subtle leading-relaxed">
            <h2 className="text-xl font-bold text-text-primary">
              Matching Your Space & Signal Chain
            </h2>
            <p>
              When setting up an Indian home studio, acoustic limitations are frequently the primary obstacle to achieving commercial-sounding mixes. Street noise, wall boundary reflections, and tiled floors dramatically alter what reaches your ears. Selecting the right hardware tailored specifically for untreated or semi-treated rooms produces far better results than simply buying expensive gear blindly.
            </p>
            <p>
              Always prioritize dynamic microphones with tight cardioid or supercardioid pickup patterns if you are recording in an apartment with nearby ambient traffic. Pair these with high-gain clean preamps (such as 4th-generation Focusrite Scarlett or discrete interface lines) to ensure your noise floor remains beneath -90dB.
            </p>
          </div>

          <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-accent"
            >
              <ArrowLeft size={14} />
              <span>Back to All Guides</span>
            </Link>

            <Link
              href="/studio-builder"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-accent hover:bg-accent-hover px-4 py-2 rounded-md transition-colors"
            >
              <span>Build Matching Rig</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}
