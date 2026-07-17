"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRICING_TIERS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { cn } from "@/lib/utils";

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {PRICING_TIERS.map((tier, index) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={cn(tier.highlighted && "md:-mt-4 md:mb-4")}
        >
          <div
            className={cn(
              "h-full",
              tier.highlighted && "gradient-border rounded-2xl"
            )}
          >
            <GlassCard
              strong={tier.highlighted}
              className={cn(
                "relative h-full",
                tier.highlighted && "mt-3 border-0 bg-bg-charcoal sm:mt-0"
              )}
            >
              {tier.highlighted && "badge" in tier && tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-4 py-1 text-xs font-medium text-white">
                  {tier.badge}
                </span>
              )}

              <h3 className="font-display text-2xl font-semibold text-text-primary">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-text-muted">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold gradient-text">
                  {tier.price}
                </span>
                <span className="text-sm text-text-muted">/ {tier.period}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gradient-mid" />
                    <span className="text-sm text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <GradientButton
                  href="/download"
                  variant={tier.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  {tier.cta}
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
