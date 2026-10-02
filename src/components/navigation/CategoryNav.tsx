"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types";
import { MegaMenu } from "./MegaMenu";
import { Container } from "@/components/ui/Container";
import { ChevronDown, Wrench, BookOpen, Award, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryNav() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleMouseEnter = (cat: Category) => {
    if (cat.groups && cat.groups.length > 0) {
      setActiveCategory(cat);
    } else {
      setActiveCategory(null);
    }
  };

  return (
    <div
      className="relative bg-white border-b border-border shadow-subtle hidden lg:block z-30"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Main Category List */}
          <nav className="flex items-center space-x-1 py-1">
            {CATEGORIES.map((category) => {
              const isActive = pathname.startsWith(`/categories/${category.slug}`);
              const isMenuOpen = activeCategory?.id === category.id;
              const hasSub = category.groups && category.groups.length > 0;
              const isDeals = category.slug === "deals";

              return (
                <div
                  key={category.id}
                  onMouseEnter={() => handleMouseEnter(category)}
                  className="relative"
                >
                  <Link
                    href={isDeals ? "/deals" : `/categories/${category.slug}`}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap",
                      isActive
                        ? "text-accent bg-accent-subtle"
                        : isMenuOpen
                        ? "text-text-primary bg-canvas"
                        : "text-text-secondary hover:text-text-primary hover:bg-canvas-muted",
                      isDeals && "text-accent font-bold hover:bg-accent-subtle"
                    )}
                  >
                    {isDeals && <Flame size={13} className="text-accent" />}
                    <span>{category.name}</span>
                    {hasSub && (
                      <ChevronDown
                        size={12}
                        className={cn(
                          "transition-transform text-text-muted opacity-70",
                          isMenuOpen && "rotate-180 text-text-primary"
                        )}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Quick Access Utility Actions */}
          <div className="flex items-center gap-3 pl-4 border-l border-border-subtle my-1.5 flex-shrink-0">
            <Link
              href="/studio-builder"
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-md transition-colors",
                pathname === "/studio-builder"
                  ? "bg-accent text-white"
                  : "bg-[#171717] text-white hover:bg-[#2F2F2D]"
              )}
            >
              <Wrench size={13} className="text-amber-400" />
              <span>Studio Builder</span>
            </Link>

            <Link
              href="/guides"
              className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary px-2 py-1.5 rounded-md hover:bg-canvas-muted transition-colors"
            >
              <BookOpen size={13} className="text-text-muted" />
              <span>Buying Guides</span>
            </Link>

            <Link
              href="/brands"
              className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary px-2 py-1.5 rounded-md hover:bg-canvas-muted transition-colors"
            >
              <Award size={13} className="text-text-muted" />
              <span>Brands</span>
            </Link>
          </div>
        </div>
      </Container>

      {/* Mega Menu Dropdown */}
      {activeCategory && (
        <MegaMenu
          category={activeCategory}
          isOpen={!!activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </div>
  );
}
