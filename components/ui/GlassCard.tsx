import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  strong?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = false,
  strong = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 sm:p-6",
        strong ? "glass-strong" : "glass",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_16px_48px_rgba(107,78,140,0.22)]",
        className
      )}
    >
      {children}
    </div>
  );
}
