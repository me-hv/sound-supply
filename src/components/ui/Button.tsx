import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "subtle" | "dark";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          // Variants
          variant === "primary" && "bg-accent text-white hover:bg-accent-hover shadow-subtle",
          variant === "secondary" && "bg-[#171717] text-white hover:bg-[#2C2C2C] shadow-subtle",
          variant === "outline" && "border border-border bg-white text-text-primary hover:bg-canvas-muted hover:border-border-strong",
          variant === "ghost" && "text-text-secondary hover:text-text-primary hover:bg-canvas-muted",
          variant === "subtle" && "bg-accent-subtle text-accent hover:bg-red-100 font-semibold",
          variant === "dark" && "bg-[#171717] text-[#FAFAF9] hover:bg-[#000000]",
          // Sizes
          size === "sm" && "text-xs px-3 py-1.5 rounded-md gap-1.5",
          size === "md" && "text-sm px-4 py-2.5 rounded-md gap-2",
          size === "lg" && "text-base px-6 py-3 rounded-lg gap-2.5 font-semibold",
          size === "icon" && "p-2 rounded-md aspect-square",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
