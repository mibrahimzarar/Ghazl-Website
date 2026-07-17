"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/lib/content";
import { GradientButton } from "@/components/ui/GradientButton";

export function FinalCTA() {
  const { cta } = homeContent;

  return (
    <section className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="gradient-border relative overflow-hidden rounded-2xl p-8 text-center sm:rounded-3xl sm:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/20 via-gradient-mid/10 to-gradient-end/20" />
          <div className="absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-gradient-mid/25 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-[1.75rem] font-semibold text-text-primary sm:text-4xl md:text-5xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.95rem] text-text-muted sm:text-lg">
              {cta.description}
            </p>
            <div className="mt-8 flex justify-center">
              <GradientButton href="/download" className="w-full sm:w-auto">
                {cta.button}
              </GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
