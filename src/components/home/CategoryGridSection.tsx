import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

interface CategoryCardItem {
  title: string;
  subtitle: string;
  itemCount: string;
  href: string;
  imageUrl: string;
}

const FEATURED_CATEGORIES: CategoryCardItem[] = [
  {
    title: "Audio Interfaces",
    subtitle: "USB-C, Thunderbolt & ADAT Converters",
    itemCount: "42 Models",
    href: "/categories/studio-recording?sub=audio-interfaces",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Studio Microphones",
    subtitle: "Cardioid Dynamics & Large-Diaphragm Condensers",
    itemCount: "86 Models",
    href: "/categories/microphones",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Studio Monitors",
    subtitle: "5\" to 8\" Active Bi-Amped Reference Speakers",
    itemCount: "38 Models",
    href: "/categories/studio-recording?sub=studio-monitors",
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Studio Headphones",
    subtitle: "Closed-Back Tracking & Open-Back Mixing Cans",
    itemCount: "54 Models",
    href: "/categories/studio-recording?sub=studio-headphones",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Keyboards & Synths",
    subtitle: "Analog Synths, MIDI Keyboards & Workstations",
    itemCount: "68 Models",
    href: "/categories/keyboards-synths",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Electric & Acoustic Guitars",
    subtitle: "Solid-body Stratocasters, Acoustics & Tube Amps",
    itemCount: "120 Models",
    href: "/categories/guitars",
    imageUrl: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Electronic Drums",
    subtitle: "Mesh-Head Kits, Trigger Multipads & Cymbals",
    itemCount: "28 Models",
    href: "/categories/drums",
    imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "DJ Controllers & Mixers",
    subtitle: "Multi-Deck Controllers, Media Players & Turntables",
    itemCount: "24 Models",
    href: "/categories/dj",
    imageUrl: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=600&q=80",
  },
];

export function CategoryGridSection() {
  return (
    <section className="py-16 bg-canvas border-b border-border">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
              Product Taxonomy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Shop by Core Category
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Browse dedicated equipment categories with specialized audio parameter filtering.
            </p>
          </div>

          <Link
            href="/categories/studio-recording"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
          >
            <span>View All Department Trees</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 8-Card Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative bg-white border border-border rounded-lg overflow-hidden flex flex-col justify-between hover:border-border-strong hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-canvas-muted">
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-[10px] font-bold font-mono px-2 py-0.5 rounded text-text-primary shadow-sm">
                  {cat.itemCount}
                </span>
              </div>

              {/* Title & subtitle content */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-sm text-text-primary group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-semibold text-text-muted group-hover:text-accent transition-colors">
                  <span>Browse Hardware</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
