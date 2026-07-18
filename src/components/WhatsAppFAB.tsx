"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS } from "@/lib/utils";

export function WhatsAppFAB() {
  return (
    <motion.a
      href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.85 }}
      className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-green-500 shadow-premium-lg flex items-center justify-center active:scale-90 transition-transform"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      <WhatsAppIcon className="w-7 h-7 text-white relative" />
    </motion.a>
  );
}
