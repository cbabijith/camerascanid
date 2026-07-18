"use client";

import { motion } from "framer-motion";
import { Phone, Download, Camera, Aperture, Focus, Film } from "lucide-react";
import Image from "next/image";
import { BUSINESS } from "@/lib/utils";
import { downloadVCard } from "@/lib/vcard";
import { useToast } from "./ToastProvider";

const floatingIcons = [
  { Icon: Camera, delay: 0, x: "8%", y: "15%", size: 28 },
  { Icon: Aperture, delay: 1.5, x: "82%", y: "20%", size: 24 },
  { Icon: Focus, delay: 0.8, x: "15%", y: "70%", size: 22 },
  { Icon: Film, delay: 2.2, x: "85%", y: "65%", size: 26 },
];

export function Hero() {
  const { showToast } = useToast();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-24 pb-8 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-accent via-background to-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand/10 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] bg-brand/5 rounded-full blur-[60px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating camera icons */}
      {floatingIcons.map(({ Icon, delay, x, y, size }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ delay: delay, duration: 0.8 }}
          className="absolute text-brand pointer-events-none"
          style={{ left: x, top: y }}
        >
          <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
            <Icon style={{ width: size, height: size }} />
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-brand/20 rounded-3xl blur-2xl" />
          <div className="relative w-48 h-20">
            <Image
              src="/camerasc.svg"
              alt="Camera Scan"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-2"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Camera Scan
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-1">
          {BUSINESS.tagline}
        </p>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          Since {BUSINESS.established}
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-bold text-center leading-tight max-w-xs mt-6 mb-3"
      >
        {BUSINESS.headline}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-gray-500 text-center max-w-xs leading-relaxed mb-8"
      >
        {BUSINESS.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <a
          href="#contact"
          className="ripple flex items-center justify-center gap-2 bg-brand text-white rounded-2xl py-4 font-semibold shadow-premium-lg active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          Contact Now
        </a>
        <button
          onClick={() => {
            downloadVCard();
            showToast("Contact downloaded!");
          }}
          className="ripple flex items-center justify-center gap-2 bg-accent text-foreground rounded-2xl py-4 font-semibold border border-gray-200 dark:border-gray-800 active:scale-95 transition-transform"
        >
          <Download className="w-5 h-5" />
          Download Contact
        </button>
      </motion.div>
    </section>
  );
}
