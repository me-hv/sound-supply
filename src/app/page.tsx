import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGridSection } from "@/components/home/CategoryGridSection";
import { TrendingGearSection } from "@/components/home/TrendingGearSection";
import { StudioBuilderTeaser } from "@/components/home/StudioBuilderTeaser";
import { BrandsSection } from "@/components/home/BrandsSection";
import { DealsSection } from "@/components/home/DealsSection";
import { LearnSection } from "@/components/home/LearnSection";
import { TrustSection } from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <div>
      {/* 01 — Hero */}
      <HeroSection />

      {/* 02 — Shop by Category */}
      <CategoryGridSection />

      {/* 03 — Trending Gear */}
      <TrendingGearSection />

      {/* 04 — Build Your Studio */}
      <StudioBuilderTeaser />

      {/* 05 — Shop by Brand */}
      <BrandsSection />

      {/* 06 — Deals */}
      <DealsSection />

      {/* 07 — Learn */}
      <LearnSection />

      {/* 08 — Trust / Service */}
      <TrustSection />
    </div>
  );
}
