"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Wrench, ShoppingBag, Sparkles, Users, Film } from "lucide-react";

const GALLERY = [
  { icon: ShoppingBag, label: "Store", color: "from-blue-400 to-blue-600", span: "row-span-2" },
  { icon: Wrench, label: "Service Center", color: "from-orange-400 to-orange-600", span: "" },
  { icon: Camera, label: "Products", color: "from-purple-400 to-purple-600", span: "" },
  { icon: Sparkles, label: "Repairs", color: "from-teal-400 to-teal-600", span: "row-span-2" },
  { icon: Users, label: "Customers", color: "from-pink-400 to-pink-600", span: "" },
  { icon: Film, label: "Rental Equipment", color: "from-indigo-400 to-indigo-600", span: "" },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="px-4 py-8">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4"
      >
        Gallery
      </motion.h3>
      <div className="grid grid-cols-2 gap-3 auto-rows-[120px]">
        {GALLERY.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} ${item.span} shadow-premium group`}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
              <item.icon className="w-8 h-8 text-white" />
              <span className="text-sm font-bold text-white text-center">
                {item.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br ${GALLERY[selected].color} flex flex-col items-center justify-center gap-4 shadow-premium-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="ripple absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
              {(() => {
                const Icon = GALLERY[selected].icon;
                return <Icon className="w-20 h-20 text-white" />;
              })()}
              <span className="text-2xl font-bold text-white">
                {GALLERY[selected].label}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
