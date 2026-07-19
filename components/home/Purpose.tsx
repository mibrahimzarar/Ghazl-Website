"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { homeContent } from "@/lib/content";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientOrb } from "@/components/effects/GradientOrb";

const iconMap = {
  shield: Shield,
  lock: Lock,
  checkCircle: CheckCircle,
};

export function Purpose() {
  const { purpose } = homeContent;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32 bg-bg-charcoal/10 border-y border-white/5">
      <GradientOrb className="-right-24 top-1/4 h-80 w-80 opacity-70" color="purple" />
      <GradientOrb className="-left-20 bottom-1/4 h-72 w-72 opacity-60" color="gold" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Our Purpose
          </p>
          <SectionHeading title={purpose.title} subtitle={purpose.subtitle} />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mt-12">
          {purpose.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlassCard hover className="h-full flex flex-col justify-between border-white/10 hover:border-white/20 transition-all duration-300">
                  <div>
                    <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-gradient-start/25 to-gradient-mid/15 p-3.5 shadow-inner">
                      <Icon className="h-6 w-6 text-gradient-mid" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-text-primary tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className="mt-6 h-px w-12 bg-gradient-to-r from-gradient-start to-transparent"
                    aria-hidden="true"
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
