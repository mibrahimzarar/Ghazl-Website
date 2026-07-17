import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export function GradientButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: GradientButtonProps) {
  const baseClasses =
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gradient-mid focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep";

  const variantClasses = variant === "primary" ? "btn-3d" : "btn-glass text-text-primary";

  const classes = cn(baseClasses, variantClasses, className);

  const content = <span>{children}</span>;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
