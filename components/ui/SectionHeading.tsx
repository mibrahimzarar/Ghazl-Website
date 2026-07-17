import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 max-w-2xl sm:mb-12",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[0.95rem] leading-relaxed text-text-muted sm:mt-4 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
