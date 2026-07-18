"use client";

import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

export function BusinessHours() {
  return (
    <section className="px-4 py-8">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4"
      >
        Business Hours
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-accent rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-premium space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-brand" />
            </div>
            <span className="text-sm font-semibold">Monday – Saturday</span>
          </div>
          <span className="text-sm font-bold text-brand">{BUSINESS.hours.weekdays}</span>
        </div>
        <div className="h-px bg-gray-100 dark:bg-gray-800" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <X className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-sm font-semibold">Sunday</span>
          </div>
          <span className="text-sm font-bold text-gray-400">{BUSINESS.hours.sunday}</span>
        </div>
      </motion.div>
    </section>
  );
}
