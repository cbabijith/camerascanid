"use client";

import { motion } from "framer-motion";

const BRANDS = ["Canon", "Nikon", "Sony", "Panasonic", "GoPro", "Godox", "Sigma", "Tamron"];

export function Brands() {
  return (
    <section id="brands" className="py-8 overflow-hidden">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4 px-4"
      >
        Authorized Brands
      </motion.h3>
      <div className="relative">
        <div className="flex gap-3 animate-marquee w-max">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-4 rounded-2xl bg-white dark:bg-accent border border-gray-100 dark:border-gray-800 shadow-premium min-w-[140px] flex items-center justify-center"
            >
              <span className="text-lg font-bold tracking-tight text-foreground/80">
                {brand}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
