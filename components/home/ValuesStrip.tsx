"use client";

import { motion } from "framer-motion";
import { VALUES } from "@/lib/constants";

export function ValuesStrip() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-10"
        >
          {VALUES.map((value, index) => (
            <div
              key={value}
              className="flex items-center justify-center gap-6 sm:gap-10"
            >
              <span className="font-display text-base font-medium tracking-wide text-text-muted sm:text-xl">
                {value}
              </span>
              {index < VALUES.length - 1 && (
                <span
                  className="hidden h-1.5 w-1.5 rounded-full bg-gradient-mid sm:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
