"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

export function Location() {
  return (
    <section className="px-4 py-8">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4"
      >
        Location
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl overflow-hidden shadow-premium-lg border border-gray-100 dark:border-gray-800"
      >
        <div className="relative h-48 bg-accent">
          <iframe
            src={BUSINESS.mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Camera Scan Location"
            className="grayscale-[20%]"
          />
        </div>
        <div className="p-4 bg-white dark:bg-accent">
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium">{BUSINESS.location.full}</p>
          </div>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ripple flex items-center justify-center gap-2 w-full bg-brand text-white rounded-xl py-3 font-semibold text-sm active:scale-95 transition-transform"
          >
            <ExternalLink className="w-4 h-4" />
            Open Google Maps
          </a>
        </div>
      </motion.div>
    </section>
  );
}
