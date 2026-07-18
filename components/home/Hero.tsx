"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { homeContent } from "@/lib/content";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientOrb } from "@/components/effects/GradientOrb";

export function Hero() {
  const { hero } = homeContent;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
      <GradientOrb className="top-1/4 -left-32 h-[520px] w-[520px] sm:-left-48" color="purple" />
      <GradientOrb className="top-1/3 -right-28 h-[420px] w-[420px] sm:-right-48" color="rose" />
      <GradientOrb className="bottom-1/4 left-1/4 h-[320px] w-[320px] sm:left-1/3" color="gold" />

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-0 flex justify-center"
        >
          <div className="animate-float relative">
            {/* Soft glow lives on a separate layer — CSS filter drop-shadow on
                transparent PNGs paints a dim square on Safari during load. */}
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,123,138,0.55)_0%,rgba(107,78,140,0.28)_42%,transparent_70%)] blur-2xl"
              aria-hidden="true"
            />
            <Image
              src="/images/logo-no-background.png"
              alt={`${SITE.name} logo`}
              width={180}
              height={180}
              preload
              className="relative h-32 w-32 bg-transparent object-contain sm:h-44 sm:w-44 md:h-52 md:w-52"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          dir="rtl"
          lang="ar"
          className="font-arabic hero-arabic -mt-3 mb-2 text-5xl sm:-mt-4 sm:mb-3 sm:text-6xl md:text-7xl"
          aria-label={SITE.nameArabic}
        >
          <span className="hero-arabic__shade" aria-hidden="true">
            {SITE.nameArabic}
          </span>
          <span className="hero-arabic__face">{SITE.nameArabic}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display relative mx-auto max-w-4xl text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="hero-slogan inline-block">
            Two Threads
            <br />
            One Beautiful Story
          </span>
          <span
            className="mx-auto mt-3 block h-px w-28 bg-gradient-to-r from-transparent via-gradient-end/70 to-transparent sm:mt-4 sm:w-40"
            aria-hidden="true"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-5 max-w-xl text-[0.95rem] font-medium leading-relaxed text-text-primary/75 sm:mt-6 sm:text-lg"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <GradientButton href="/download" className="min-w-[10.5rem] px-7">
            {hero.primaryCta}
          </GradientButton>
          <GradientButton href="/about" variant="outline" className="min-w-[10.5rem] px-7">
            {hero.secondaryCta}
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
