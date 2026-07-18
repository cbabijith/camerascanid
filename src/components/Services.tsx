"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Camera,
  Wrench,
  Recycle,
  Sparkles,
  Focus,
  Package,
  BadgeCheck,
} from "lucide-react";

const SERVICES = [
  { icon: ShoppingCart, title: "Camera Sales", desc: "New cameras from leading brands" },
  { icon: Camera, title: "Camera Rentals", desc: "Rent professional gear for any shoot" },
  { icon: Wrench, title: "Camera Repair", desc: "Expert repair for all camera models" },
  { icon: Recycle, title: "Used Camera Sales", desc: "Quality pre-owned cameras at great prices" },
  { icon: Sparkles, title: "Sensor Cleaning", desc: "Professional sensor cleaning service" },
  { icon: Focus, title: "Lens Repair", desc: "Precision lens repair and calibration" },
  { icon: Package, title: "Accessories", desc: "Wide range of camera accessories" },
  { icon: BadgeCheck, title: "Authorized Service", desc: "Official service for top brands" },
];

export function Services() {
  return (
    <section id="services" className="px-4 py-8">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4"
      >
        Our Services
      </motion.h3>
      <div className="grid grid-cols-2 gap-3">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="group bg-white dark:bg-accent rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-premium transition-shadow hover:shadow-premium-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-3 group-hover:bg-brand group-hover:scale-110 transition-all">
              <service.icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-sm font-bold mb-1">{service.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
