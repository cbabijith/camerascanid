"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { BUSINESS } from "@/lib/utils";

export function QRCodeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="ripple flex items-center justify-center gap-2 w-full bg-accent text-foreground rounded-2xl py-3 font-semibold text-sm border border-gray-200 dark:border-gray-800 active:scale-95 transition-transform"
      >
        <QrCode className="w-4 h-4" />
        QR Code
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 shadow-premium-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="ripple absolute top-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <h4 className="text-lg font-bold text-black mt-2">Scan to Visit</h4>
              <div className="bg-white p-4 rounded-2xl border-2 border-gray-100">
                <QRCodeSVG
                  value={BUSINESS.website}
                  size={200}
                  level="M"
                  bgColor="#FFFFFF"
                  fgColor="#111111"
                />
              </div>
              <p className="text-sm text-gray-500 text-center max-w-[200px]">
                Scan this code to open Camera Scan on your device
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
