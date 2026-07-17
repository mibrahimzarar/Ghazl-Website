import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="glass-strong relative mx-auto max-w-6xl overflow-hidden rounded-2xl">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden="true"
        />

        <div className="relative px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="max-w-xs">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <Image
                  src="/images/logo-no-background.png"
                  alt={`${SITE.brandName} logo`}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="font-display text-base font-semibold tracking-wide text-text-primary">
                  {SITE.brandName}
                </span>
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-text-muted">
                {SITE.slogan}
              </p>
            </div>

            <div className="flex gap-10 sm:gap-14">
              <div>
                <h3 className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold/90">
                  Product
                </h3>
                <ul className="space-y-1.5">
                  {FOOTER_LINKS.product.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-text-muted transition-colors hover:text-text-primary sm:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold/90">
                  Legal
                </h3>
                <ul className="space-y-1.5">
                  {FOOTER_LINKS.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-text-muted transition-colors hover:text-text-primary sm:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-center sm:flex-row sm:text-left">
            <p className="text-[0.7rem] text-text-muted">
              &copy; {new Date().getFullYear()} {SITE.publisher}
            </p>
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="text-[0.7rem] text-text-muted transition-colors hover:text-text-primary"
            >
              {SITE.supportEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
