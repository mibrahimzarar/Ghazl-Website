import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SITE } from "@/lib/constants";
import { aboutContent } from "@/lib/content";

export function PublisherSection() {
  return (
    <div className="gradient-border relative overflow-hidden rounded-2xl sm:rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/10 via-transparent to-gradient-end/10" />
      <div className="glass-strong relative p-6 text-center sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold/80">
          {aboutContent.publisher.eyebrow}
        </p>

        <Link
          href={SITE.publisherUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto mt-6 inline-flex flex-col items-center transition-opacity hover:opacity-90"
        >
          <div className="relative mb-5">
            <div className="absolute inset-0 scale-110 rounded-2xl bg-gradient-to-br from-gradient-start/15 via-gradient-mid/10 to-gradient-end/10 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg-deep/60 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-4">
              <Image
                src="/images/Intellibud.png"
                alt={`${SITE.publisher} logo`}
                width={120}
                height={120}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              />
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold text-text-primary sm:text-3xl">
            {SITE.publisher}
          </h2>

          <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors group-hover:text-gradient-mid">
            {SITE.publisherDomain}
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </span>
        </Link>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-text-muted sm:text-base">
          {aboutContent.publisher.description}
        </p>
      </div>
    </div>
  );
}
