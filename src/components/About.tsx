"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/utils";

export function About() {
  return (
    <section className="px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-3">About Camera Scan</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {BUSINESS.about}
        </p>
      </motion.div>
    </section>
  );
}
