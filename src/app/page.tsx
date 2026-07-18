"use client";

import { useState } from "react";
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
  Star,
  Briefcase,
  Instagram,
  Facebook,
  Youtube,
  Check,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { ToastProvider, useToast } from "@/components/ToastProvider";
import { BUSINESS } from "@/lib/utils";
import {
} from "@/lib/vcard";
import { QRCodeSVG } from "qrcode.react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const SERVICES = [
  { icon: Camera, label: "Sales" },
  { icon: Star, label: "Used Cameras" },
  { icon: Wrench, label: "Service" },
  { icon: Briefcase, label: "Rentals" },
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Main content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-5 sm:px-6 pt-10 pb-2 overflow-y-auto no-scrollbar min-h-0 z-10 safe-top">
        <div className="responsive-container w-full flex flex-col items-center">
          {/* Logo */}
          <div className="relative mb-4">
            <div className="absolute inset-0 blur-2xl opacity-15 bg-brand rounded-full" />
            <div className="responsive-logo relative">
              <Image src="/camerasc.svg" alt="Camera Scan" fill className="object-contain" priority sizes="100%" />
            </div>
          </div>

          {/* MD name */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-gray-300 dark:bg-gray-700" />
            <p className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-[0.12em] uppercase">
              MD · {BUSINESS.md}
            </p>
            <span className="w-5 h-px bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* Services chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-5 w-full max-w-[340px]">
            {SERVICES.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-br from-white to-gray-50 dark:from-[#161616] dark:to-[#121212] border border-gray-200/60 dark:border-gray-700/40 text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <s.icon className="w-3.5 h-3.5 text-brand" />
                {s.label}
              </span>
            ))}
          </div>

          {/* Phone numbers */}
          <div className="w-full max-w-[340px] space-y-2 mb-2">
            {PHONE_NUMBERS.map((p) => (
              <a
                key={p.label}
                href={`tel:${p.raw}`}
                className="lux-card flex items-center gap-3 w-full py-3 px-4 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-[18px] h-[18px] text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-0.5">{p.sub}</p>
                  <p className="text-[14px] font-bold tracking-tight">{p.number}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{p.label}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              </a>
            ))}
          </div>

          {/* Email card */}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="lux-card flex items-center gap-3 w-full max-w-[340px] py-3 px-4 rounded-2xl mb-4"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center flex-shrink-0">
              <Mail className="w-[18px] h-[18px] text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-0.5">Email</p>
              <p className="text-[14px] font-bold tracking-tight truncate">{BUSINESS.email}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </a>

          {/* Save contact — real <a> link for iOS Safari compatibility */}
          <a
            href="/contact.vcf"
            onClick={() => { setSaved(true); showToast("Opening contacts..."); setTimeout(() => setSaved(false), 2000); }}
            className="lux-btn-primary ripple w-full max-w-[340px] flex items-center justify-center gap-2.5 text-white rounded-2xl py-3.5 font-bold text-[14px] mb-2.5"
          >
            {saved ? <Check className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {saved ? "Opening..." : "Save Contact"}
          </a>

          {/* WhatsApp + Share + QR */}
          <div className="flex items-center gap-2.5 w-full max-w-[340px] mb-5">
            <a
              href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-outline ripple flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-semibold"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              WhatsApp
            </a>
            <button
              onClick={handleShare}
              className="lux-btn-outline ripple flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-semibold"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="lux-btn-outline ripple w-12 h-[46px] flex items-center justify-center rounded-xl"
              aria-label="QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="lux-divider w-full max-w-[340px] mb-5" />

          {/* Social links */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-social w-12 h-12 rounded-full flex items-center justify-center"
                aria-label={s.label}
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative flex-shrink-0 px-5 pb-4 safe-bottom text-center z-10">
        <p className="text-[10px] text-gray-400 font-medium tracking-wide">
          {BUSINESS.location.full} · Since {BUSINESS.established}
        </p>
      </footer>

      {/* QR Modal */}
      {qrOpen && (
        <div
          onClick={() => setQrOpen(false)}
          className="fixed inset-0 z-[80] bg-black/85 -webkit-backdrop-blur-md backdrop-blur-md flex items-center justify-center p-6"
        >
          <div
            className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 relative shadow-2xl max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setQrOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 mt-2">Scan to Visit</p>
            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <QRCodeSVG value={BUSINESS.website} size={180} level="M" bgColor="#FFFFFF" fgColor="#111111" />
            </div>
            <p className="text-sm text-gray-500 text-center max-w-[200px]">Point your camera here</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
