"use client";

import { motion } from "framer-motion";
import { Compass, HeartHandshake, UserRound } from "lucide-react";
import { homeContent } from "@/lib/content";
import { GradientOrb } from "@/components/effects/GradientOrb";

const stepIcons = [UserRound, Compass, HeartHandshake] as const;

export function HowItWorks() {
  const { howItWorks } = homeContent;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      <GradientOrb className="-left-24 top-1/4 h-72 w-72 opacity-70" color="purple" />
      <GradientOrb className="-right-20 bottom-1/4 h-64 w-64 opacity-60" color="rose" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            The Path
          </p>
          <h2 className="font-display text-[2rem] font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            <span className="gradient-text">{howItWorks.title}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            {howItWorks.subtitle}
          </p>
          <div
            className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gradient-mid to-transparent sm:w-32"
            aria-hidden="true"
          />
        </motion.div>

        <div className="relative">
          <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
            {howItWorks.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? UserRound;

              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: index * 0.14 }}
                  className="relative"
                >
                  <div className="group glass relative h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_16px_40px_rgba(107,78,140,0.22)] sm:p-8">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 scale-125 rounded-2xl bg-gradient-to-br from-gradient-start/30 via-gradient-mid/20 to-gradient-end/15 blur-xl transition-opacity group-hover:opacity-100" />
                        <div className="btn-3d relative flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16">
                          <Icon className="relative z-[1] h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={1.75} />
                        </div>
                      </div>

                      <span className="font-display text-4xl font-semibold leading-none tracking-tight text-white/10 transition-colors group-hover:text-white/18 sm:text-5xl">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-[0.95rem]">
                      {step.description}
                    </p>

                    <div
                      className="mt-6 h-px w-full bg-gradient-to-r from-gradient-start/50 via-gradient-mid/35 to-transparent"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold/80">
                      Step {step.number}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
