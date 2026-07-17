"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { GradientButton } from "@/components/ui/GradientButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-5xl overflow-hidden rounded-2xl transition-all duration-500 sm:rounded-full",
          "glass-strong border-white/16",
          scrolled || mobileOpen
            ? "shadow-[0_12px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
            : "shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.16)]"
        )}
      >
        <nav className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-5 sm:py-2.5">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90 sm:gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/images/logo-no-background.png"
              alt={`${SITE.brandName} logo`}
              width={36}
              height={36}
              loading="eager"
              className="h-8 w-8 object-contain drop-shadow-[0_4px_12px_rgba(107,78,140,0.4)] sm:h-9 sm:w-9"
            />
            <span className="font-display text-lg font-semibold tracking-wide text-text-primary sm:text-xl">
              {SITE.brandName}
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold tracking-wide text-text-primary/90 transition-all duration-200 hover:bg-white/10 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
              >
                {link.label}
              </Link>
            ))}
            <GradientButton href="/download" className="ml-2 min-h-9 px-5 py-2 text-sm">
              Download
            </GradientButton>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-white/10 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-white/12 md:hidden">
            <div className="flex max-h-[min(70svh,28rem)] flex-col gap-0.5 overflow-y-auto px-3 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-base font-semibold tracking-wide text-text-primary transition-colors hover:bg-white/10 active:bg-white/12"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <GradientButton
                href="/download"
                className="mt-2 w-full"
                onClick={() => setMobileOpen(false)}
              >
                Download
              </GradientButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
