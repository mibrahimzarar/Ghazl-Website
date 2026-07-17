import { GradientOrb } from "@/components/effects/GradientOrb";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <GradientOrb className="top-16 -left-20 h-72 w-72 sm:-left-32 sm:h-96 sm:w-96" color="purple" />
      <GradientOrb className="top-48 -right-16 h-64 w-64 sm:top-60 sm:-right-32 sm:h-80 sm:w-80" color="rose" />
      <GradientOrb className="bottom-20 left-1/3 hidden h-56 w-56 md:block" color="gold" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <header className="mb-8 text-center sm:mb-12">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-text-muted sm:mt-4 sm:text-lg">
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}
