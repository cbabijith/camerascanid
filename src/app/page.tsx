"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  UserPlus,
  Share2,
  QrCode,
  X,
  Camera,
  Wrench,
  Download,
  Star,
  Instagram,
  Facebook,
  Youtube,
  Check,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { ToastProvider, useToast } from "@/components/ToastProvider";
import { Splash } from "@/components/Splash";
import { BUSINESS } from "@/lib/utils";
import {
  downloadVCard,
  saveContactNative,
  isContactsAPISupported,
} from "@/lib/vcard";
import { QRCodeSVG } from "qrcode.react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const SERVICES = [
  { icon: Camera, label: "Sales" },
  { icon: Star, label: "Used Cameras" },
  { icon: Wrench, label: "Service" },
  { icon: Download, label: "Rentals" },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: BUSINESS.instagram },
  { icon: Facebook, label: "Facebook", href: BUSINESS.facebook },
  { icon: Youtube, label: "YouTube", href: BUSINESS.youtube },
  { icon: Globe, label: "Website", href: BUSINESS.website },
];

const PHONE_NUMBERS = [
  { label: "Used & New Cameras", sub: "Sales & Rentals", number: BUSINESS.usedCamera, raw: BUSINESS.usedCamera },
  { label: "Service & Repair", sub: "Fresh & Service", number: BUSINESS.service, raw: BUSINESS.service },
  { label: "Office", sub: "Main Line", number: BUSINESS.phone, raw: BUSINESS.phoneRaw },
];

function HomeContent() {
  const { showToast } = useToast();
  const [qrOpen, setQrOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveContact = async () => {
    if (isContactsAPISupported()) {
      const ok = await saveContactNative();
      if (ok) {
        setSaved(true);
        showToast("Contact saved!");
        setTimeout(() => setSaved(false), 2000);
        return;
      }
    }
    downloadVCard();
    showToast("Opening contacts...");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleShare = () => {
    const shareText = `Check out ${BUSINESS.name} — ${BUSINESS.tagline} (Since ${BUSINESS.established})\n${BUSINESS.website}\n\n📞 ${BUSINESS.phone} · ${BUSINESS.usedCamera} · ${BUSINESS.service}\n📍 ${BUSINESS.location.full}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank",
      "noopener,noreferrer"
    );
    showToast("Opening WhatsApp to share...");
  };

  return (
    <div className="responsive-shell fixed inset-0 flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] overflow-hidden h-screen-dvh">
      {/* Ambient gradient */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Main content — scrollable if needed, but compact enough to fit */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 xs:px-5 sm:px-6 overflow-y-auto no-scrollbar min-h-0 z-10 safe-top py-2">
        <div className="responsive-container w-full flex flex-col items-center my-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-2 xs:mb-3 sm:mb-5"
          >
            <div className="absolute inset-0 blur-2xl opacity-20 bg-brand rounded-full" />
            <div className="responsive-logo relative">
              <Image src="/camerasc.svg" alt="Camera Scan" fill className="object-contain" priority />
            </div>
          </motion.div>

          {/* MD name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 xs:gap-2 mb-3 xs:mb-4 sm:mb-6"
          >
            <span className="w-4 xs:w-6 h-px bg-gray-300 dark:bg-gray-700" />
            <p className="text-[9px] xs:text-[11px] text-gray-400 font-semibold tracking-[0.1em] xs:tracking-[0.15em] uppercase">
              MD · {BUSINESS.md}
            </p>
            <span className="w-4 xs:w-6 h-px bg-gray-300 dark:bg-gray-700" />
          </motion.div>

          {/* Services pills */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-1 xs:gap-2 mb-3 xs:mb-5 sm:mb-6 w-full max-w-[340px]"
          >
            {SERVICES.map((s, i) => (
              <motion.span
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-1 px-2 xs:px-3.5 py-1 xs:py-2 rounded-full bg-white dark:bg-[#141414] border border-gray-100 dark:border-gray-800/60 text-[9px] xs:text-xs font-semibold shadow-sm"
              >
                <s.icon className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 text-brand" />
                {s.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Phone numbers — compact on SE */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-[340px] space-y-1 xs:space-y-1.5 sm:space-y-2 mb-1 xs:mb-2"
          >
            {PHONE_NUMBERS.map((p, i) => (
              <motion.a
                key={p.label}
                href={`tel:${p.raw}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="lux-card flex items-center gap-2 xs:gap-3 sm:gap-3.5 w-full py-2 xs:py-2.5 sm:py-3.5 px-2.5 xs:px-4 rounded-lg xs:rounded-xl sm:rounded-2xl"
              >
                <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-lg xs:rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[7px] xs:text-[9px] font-bold tracking-[0.08em] xs:tracking-[0.12em] uppercase text-gray-400 leading-tight">{p.sub}</p>
                  <p className="text-[12px] xs:text-[14px] sm:text-[15px] font-bold tracking-tight leading-tight">{p.number}</p>
                  <p className="text-[8px] xs:text-[10px] text-gray-400 font-medium leading-tight">{p.label}</p>
                </div>
                <ChevronRight className="w-3 xs:w-4 xs:h-4 h-3 text-gray-300 flex-shrink-0" />
              </motion.a>
            ))}
          </motion.div>

          {/* Email card */}
          <motion.a
            href={`mailto:${BUSINESS.email}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lux-card flex items-center gap-2 xs:gap-3 sm:gap-3.5 w-full max-w-[340px] py-2 xs:py-2.5 sm:py-3.5 px-2.5 xs:px-4 rounded-lg xs:rounded-xl sm:rounded-2xl mb-2 xs:mb-4 sm:mb-5"
          >
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-lg xs:rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center flex-shrink-0">
              <Mail className="w-3.5 h-3.5 xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[7px] xs:text-[9px] font-bold tracking-[0.08em] xs:tracking-[0.12em] uppercase text-gray-400 leading-tight">Email</p>
              <p className="text-[12px] xs:text-[14px] sm:text-[15px] font-bold tracking-tight truncate leading-tight">{BUSINESS.email}</p>
            </div>
            <ChevronRight className="w-3 xs:w-4 xs:h-4 h-3 text-gray-300 flex-shrink-0" />
          </motion.a>

          {/* Save contact */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            onClick={handleSaveContact}
            className="lux-btn-primary ripple w-full max-w-[340px] flex items-center justify-center gap-2 text-white rounded-lg xs:rounded-xl sm:rounded-2xl py-2.5 xs:py-3 sm:py-4 font-bold text-[12px] xs:text-[14px] sm:text-[15px] mb-1.5 xs:mb-2.5"
          >
            {saved ? <Check className="w-4 h-4 xs:w-5 xs:h-5" /> : <UserPlus className="w-4 h-4 xs:w-5 xs:h-5" />}
            {saved ? "Saved!" : "Save Contact"}
          </motion.button>

          {/* WhatsApp + Share + QR */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-1.5 xs:gap-2.5 w-full max-w-[340px] mb-3 xs:mb-5 sm:mb-6"
          >
            <a
              href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-outline ripple flex-1 flex items-center justify-center gap-1 xs:gap-2 rounded-lg xs:rounded-xl py-1.5 xs:py-2.5 sm:py-3 text-[10px] xs:text-[13px] sm:text-sm font-semibold"
            >
              <WhatsAppIcon className="w-3 xs:w-4 xs:h-4 h-3 text-[#25D366]" />
              WhatsApp
            </a>
            <button
              onClick={handleShare}
              className="lux-btn-outline ripple flex-1 flex items-center justify-center gap-1 xs:gap-2 rounded-lg xs:rounded-xl py-1.5 xs:py-2.5 sm:py-3 text-[10px] xs:text-[13px] sm:text-sm font-semibold"
            >
              <Share2 className="w-3 xs:w-4 xs:h-4 h-3" />
              Share
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="lux-btn-outline ripple w-8 h-[30px] xs:w-11 xs:h-[42px] sm:w-12 sm:h-[46px] flex items-center justify-center rounded-lg xs:rounded-xl"
              aria-label="QR Code"
            >
              <QrCode className="w-3 xs:w-4 xs:h-4 h-3" />
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="lux-divider w-full max-w-[340px] mb-2 xs:mb-4 sm:mb-5"
          />

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-3"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-social w-8 h-8 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                aria-label={s.label}
              >
                <s.icon className="w-3.5 h-3.5 xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative flex-shrink-0 px-3 xs:px-5 pb-2 xs:pb-4 safe-bottom text-center z-10">
        <p className="text-[8px] xs:text-[10px] text-gray-400 font-medium tracking-wide leading-tight">
          {BUSINESS.location.full} · Since {BUSINESS.established}
        </p>
      </footer>

      {/* QR Modal */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrOpen(false)}
            className="fixed inset-0 z-[80] bg-black/85 -webkit-backdrop-blur-md backdrop-blur-md flex items-center justify-center p-4 xs:p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl xs:rounded-3xl p-5 xs:p-6 sm:p-8 flex flex-col items-center gap-3 xs:gap-4 relative shadow-2xl max-w-[85vw] xs:max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setQrOpen(false)} className="absolute top-3 right-3 xs:top-4 xs:right-4 w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              </button>
              <p className="text-[10px] xs:text-xs font-bold tracking-[0.12em] xs:tracking-[0.15em] uppercase text-gray-400 mt-1.5 xs:mt-2">Scan to Visit</p>
              <div className="bg-white p-2 xs:p-3 sm:p-4 rounded-xl xs:rounded-2xl border border-gray-100">
                <QRCodeSVG value={BUSINESS.website} size={120} level="M" bgColor="#FFFFFF" fgColor="#111111" className="w-[120px] h-[120px] xs:w-[140px] xs:h-[140px] sm:w-[180px] sm:h-[180px]" />
              </div>
              <p className="text-[12px] xs:text-sm text-gray-500 text-center max-w-[180px] xs:max-w-[200px]">Point your camera here</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <Splash />
      <HomeContent />
    </ToastProvider>
  );
}
