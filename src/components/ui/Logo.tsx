import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  size = "md",
  variant = "light",
  showTagline = true,
  className,
  href = "/",
}: LogoProps) {
  const isDark = variant === "dark";

  const markSize = size === "sm" ? 28 : size === "md" ? 36 : 44;
  const textSize = size === "sm" ? "text-base" : size === "md" ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl";

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      {/* Bespoke Geometric Fader & Waveform Brand Mark */}
      <div
        style={{ width: markSize, height: markSize }}
        className="relative bg-accent rounded-lg flex items-center justify-center p-2 text-white shadow-subtle group-hover:bg-accent-hover transition-colors flex-shrink-0"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Signal Level 1 */}
          <line x1="6" y1="4" x2="6" y2="20" opacity="0.4" />
          <circle cx="6" cy="14" r="2.2" fill="currentColor" />

          {/* Signal Level 2 (Center peak) */}
          <line x1="12" y1="3" x2="12" y2="21" />
          <circle cx="12" cy="8" r="2.5" fill="currentColor" />

          {/* Signal Level 3 */}
          <line x1="18" y1="4" x2="18" y2="20" opacity="0.4" />
          <circle cx="18" cy="16" r="2.2" fill="currentColor" />
        </svg>
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col text-left">
        <div
          className={cn(
            "font-extrabold tracking-tight font-sans leading-none",
            textSize,
            isDark ? "text-white" : "text-text-primary"
          )}
        >
          SOUND<span className="text-accent">SUPPLY</span>
        </div>

        {showTagline && (
          <span
            className={cn(
              "text-[9px] uppercase tracking-widest font-bold font-mono mt-0.5",
              isDark ? "text-gray-400" : "text-text-muted"
            )}
          >
            Pro Audio &bull; India
          </span>
        )}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Sound Supply Homepage">
      {content}
    </Link>
  );
}
