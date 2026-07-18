"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Download,
  UserPlus,
  Share2,
} from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { downloadVCard, saveContactNative, isContactsAPISupported, shareBusiness } from "@/lib/vcard";
import { useToast } from "./ToastProvider";

export function Contact() {
  const { showToast } = useToast();

  const handleSave = async () => {
    if (isContactsAPISupported()) {
      const ok = await saveContactNative();
      showToast(ok ? "Contact saved!" : "Downloaded instead");
      if (!ok) downloadVCard();
    } else {
      downloadVCard();
      showToast("Contact downloaded!");
    }
  };

  const handleShare = async () => {
    const ok = await shareBusiness();
    showToast(ok ? "Shared!" : "Share cancelled");
  };

  return (
    <section id="contact" className="px-4 py-8">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4"
      >
        Contact Us
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="glass rounded-3xl p-5 shadow-glass space-y-3"
      >
        <a
          href={`tel:${BUSINESS.phoneRaw}`}
          className="ripple flex items-center justify-center gap-2 w-full bg-brand text-white rounded-2xl py-3.5 font-semibold shadow-premium active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ripple flex items-center justify-center gap-2 bg-green-500 text-white rounded-2xl py-3 font-semibold text-sm active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="ripple flex items-center justify-center gap-2 bg-orange-500 text-white rounded-2xl py-3 font-semibold text-sm active:scale-95 transition-transform"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href={BUSINESS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="ripple flex items-center justify-center gap-2 bg-gray-700 text-white rounded-2xl py-3 font-semibold text-sm active:scale-95 transition-transform"
          >
            <Globe className="w-4 h-4" />
            Website
          </a>
          <button
            onClick={() => {
              downloadVCard();
              showToast("Contact downloaded!");
            }}
            className="ripple flex items-center justify-center gap-2 bg-teal-600 text-white rounded-2xl py-3 font-semibold text-sm active:scale-95 transition-transform"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={handleSave}
            className="ripple flex items-center justify-center gap-2 bg-indigo-500 text-white rounded-2xl py-3 font-semibold text-sm active:scale-95 transition-transform"
          >
            <UserPlus className="w-4 h-4" />
            Save Contact
          </button>
          <button
            onClick={handleShare}
            className="ripple flex items-center justify-center gap-2 bg-brand text-white rounded-2xl py-3 font-semibold text-sm active:scale-95 transition-transform"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </motion.div>
    </section>
  );
}
