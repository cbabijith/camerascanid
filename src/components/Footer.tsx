"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="px-4 py-10 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <Logo size="lg" showText={false} />
        <div className="mt-1">
          <p className="text-lg font-bold">Camera Scan</p>
          <p className="text-xs text-gray-500 font-medium">Since 1993</p>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Made with <span className="text-brand">❤</span>
        </p>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Camera Scan. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
