import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: RatingStarsProps) {
  const iconSize = size === "sm" ? 13 : 16;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;

          return (
            <Star
              key={star}
              size={iconSize}
              className={cn(
                "fill-current",
                filled ? "text-amber-500" : half ? "text-amber-400 opacity-80" : "text-gray-300 fill-transparent"
              )}
            />
          );
        })}
      </div>

      {showCount && (
        <span className="text-xs text-text-secondary font-mono">
          <strong className="text-text-primary font-semibold">{rating.toFixed(1)}</strong>
          {reviewCount !== undefined && <span className="text-text-muted ml-1">({reviewCount})</span>}
        </span>
      )}
    </div>
  );
}
