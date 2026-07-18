"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, UserPlus, Share2, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { saveContactNative, isContactsAPISupported, shareBusiness, downloadVCard } from "@/lib/vcard";
import { useToast } from "./ToastProvider";

const ITEMS = [
  {
    icon: Phone,
    label: "Call",
    href: `tel:${BUSINESS.phoneRaw}`,
    color: "text-blue-500",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: `${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`,
    color: "text-green-500",
    external: true,
  },
  {
    icon: UserPlus,
    label: "Save",
    action: "save",
    color: "text-indigo-500",
  },
  {
    icon: Share2,
    label: "Share",
    action: "share",
    color: "text-brand",
  },
  {
    icon: MapPin,
    label: "Directions",
    href: BUSINESS.mapsUrl,
    color: "text-red-500",
    external: true,
  },
];

export function StickyBottomBar() {
  const { showToast } = useToast();

  const handleClick = async (action?: string) => {
    if (action === "save") {
      if (isContactsAPISupported()) {
        const ok = await saveContactNative();
        showToast(ok ? "Contact saved!" : "Downloaded instead");
        if (!ok) downloadVCard();
      } else {
        downloadVCard();
        showToast("Contact downloaded!");
      }
    } else if (action === "share") {
      const ok = await shareBusiness();
      showToast(ok ? "Shared!" : "Share cancelled");
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 safe-bottom"
    >
      <div className="max-w-md mx-auto glass-strong rounded-2xl shadow-premium-lg p-2">
        <div className="flex items-center justify-around">
          {ITEMS.map((item) => {
            const content = (
              <>
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-[10px] font-semibold mt-0.5">{item.label}</span>
              </>
            );
            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="ripple flex flex-col items-center justify-center w-14 h-14 rounded-xl active:scale-90 transition-transform"
                  aria-label={item.label}
                >
                  {content}
                </a>
              );
            }
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.action)}
                className="ripple flex flex-col items-center justify-center w-14 h-14 rounded-xl active:scale-90 transition-transform"
                aria-label={item.label}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
