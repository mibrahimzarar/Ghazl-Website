"use client";

import { motion } from "framer-motion";
import { Compass, Heart, MessageCircle, User } from "lucide-react";
import { homeContent } from "@/lib/content";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientOrb } from "@/components/effects/GradientOrb";

const iconMap = {
  compass: Compass,
  heart: Heart,
  message: MessageCircle,
  user: User,
};

export function Features() {
  const { features } = homeContent;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      <GradientOrb className="-left-24 top-10 h-72 w-72 opacity-80" color="purple" />
      <GradientOrb className="-right-20 bottom-10 h-64 w-64 opacity-70" color="rose" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading title={features.title} subtitle={features.subtitle} />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover className="h-full">
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-gradient-start/20 to-gradient-mid/10 p-3">
                    <Icon className="h-6 w-6 text-gradient-mid" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
