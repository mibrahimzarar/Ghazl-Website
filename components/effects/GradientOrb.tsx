"use client";

export function GradientOrb({
  className,
  color = "purple",
}: {
  className?: string;
  color?: "purple" | "rose" | "gold";
}) {
  const colors = {
    purple: "bg-gradient-start/55",
    rose: "bg-gradient-mid/50",
    gold: "bg-gradient-end/40",
  };

  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[90px] ${colors[color]} animate-pulse-glow ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
