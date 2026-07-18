import Image from "next/image";
import { Smartphone } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { downloadContent } from "@/lib/content";

export function StoreBadges() {
  return (
    <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-0 scale-110 rounded-[2.5rem] bg-gradient-to-br from-gradient-start/20 via-gradient-mid/10 to-gradient-end/10 blur-2xl" />
        <GlassCard strong className="relative overflow-hidden rounded-[1.5rem] p-6 sm:rounded-[2rem] sm:p-12">
          <div className="mx-auto flex max-w-xs flex-col items-center">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start/30 to-gradient-mid/20 sm:mb-6 sm:h-14 sm:w-14">
              <Smartphone className="h-6 w-6 text-gradient-mid sm:h-7 sm:w-7" />
            </div>
            <Image
              src="/images/logo-no-background.png"
              alt="Ghazl app preview"
              width={120}
              height={120}
              className="mb-5 h-24 w-24 bg-transparent object-contain sm:mb-6 sm:h-28 sm:w-28"
            />
            <p className="text-center text-sm text-text-muted">
              {downloadContent.comingSoon}
            </p>
          </div>
        </GlassCard>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <a
          href="#"
          aria-label="Download on the App Store (coming soon)"
          className="btn-glass flex min-h-12 w-full items-center justify-center gap-3 rounded-xl px-6 py-3 font-semibold sm:w-auto"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-current" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="text-left">
            <p className="text-[10px] leading-none text-text-muted">Download on the</p>
            <p className="text-base font-semibold leading-tight">App Store</p>
          </div>
        </a>

        <a
          href="#"
          aria-label="Get it on Google Play (coming soon)"
          className="btn-glass flex min-h-12 w-full items-center justify-center gap-3 rounded-xl px-6 py-3 font-semibold sm:w-auto"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-current" aria-hidden="true">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.372.214-.693.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.637 1.49a.82.82 0 010 1.423l-2.637 1.49-2.465-2.465 2.465-2.465zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
          </svg>
          <div className="text-left">
            <p className="text-[10px] leading-none text-text-muted">Get it on</p>
            <p className="text-base font-semibold leading-tight">Google Play</p>
          </div>
        </a>
      </div>
    </div>
  );
}
