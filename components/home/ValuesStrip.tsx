"use client";

import { motion } from "framer-motion";
import { VALUES } from "@/lib/constants";

export function ValuesStrip() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3 sm:gap-y-6 md:gap-x-4"
        >
          {VALUES.map((value, index) => (
            <motion.li
              key={value}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="flex items-center justify-center gap-3 sm:gap-3 md:gap-4"
            >
              <span className="gradient-text font-display text-center text-2xl font-semibold tracking-[0.04em] sm:text-3xl md:text-4xl">
                {value}
              </span>
              {index < VALUES.length - 1 && (
                <span
                  className="hidden h-2 w-2 shrink-0 rounded-full bg-gradient-mid/80 shadow-[0_0_12px_rgba(184,123,138,0.55)] sm:mx-2 sm:block md:mx-3"
                  aria-hidden="true"
                />
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
