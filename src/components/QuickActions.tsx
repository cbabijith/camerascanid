"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Globe,
  MapPin,
  Share2,
  Download,
  UserPlus,
} from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { downloadVCard, saveContactNative, isContactsAPISupported, shareBusiness } from "@/lib/vcard";
import { useToast } from "./ToastProvider";

type ActionItem = {
  icon: typeof Phone;
  label: string;
  color: string;
  action: (showToast: (m: string) => void) => void;
};

const ACTIONS: ActionItem[] = [
  {
    icon: Phone,
    label: "Call",
    color: "bg-blue-500",
    action: () => window.location.assign(`tel:${BUSINESS.phoneRaw}`),
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    color: "bg-green-500",
    action: () =>
      window.open(
        `${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`,
        "_blank"
      ),
  },
  {
    icon: Mail,
    label: "Email",
    color: "bg-orange-500",
    action: () => window.location.assign(`mailto:${BUSINESS.email}`),
  },
  {
    icon: Instagram,
    label: "Instagram",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    action: () => window.open(BUSINESS.instagram, "_blank"),
  },
  {
    icon: Globe,
    label: "Website",
    color: "bg-gray-700",
    action: () => window.open(BUSINESS.website, "_blank"),
  },
  {
    icon: MapPin,
    label: "Maps",
    color: "bg-red-500",
    action: () => window.open(BUSINESS.mapsUrl, "_blank"),
  },
  {
    icon: Share2,
    label: "Share",
    color: "bg-indigo-500",
    action: async (showToast: (m: string) => void) => {
      const ok = await shareBusiness();
      showToast(ok ? "Shared!" : "Share cancelled");
    },
  },
  {
    icon: Download,
    label: "Download",
    color: "bg-teal-600",
    action: (showToast: (m: string) => void) => {
      downloadVCard();
      showToast("Contact downloaded!");
    },
  },
  {
    icon: UserPlus,
    label: "Save",
    color: "bg-brand",
    action: async (showToast: (m: string) => void) => {
      if (isContactsAPISupported()) {
        const ok = await saveContactNative();
        showToast(ok ? "Contact saved!" : "Downloaded instead");
        if (!ok) downloadVCard();
      } else {
        downloadVCard();
        showToast("Contact downloaded!");
      }
    },
  },
];

export function QuickActions() {
  const { showToast } = useToast();

  return (
    <section className="px-4 py-6">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 px-1"
      >
        Quick Actions
      </motion.h3>
      <div className="grid grid-cols-3 gap-3">
        {ACTIONS.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => action.action(showToast)}
            className="ripple flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-accent border border-gray-100 dark:border-gray-800 shadow-premium active:scale-95 transition-transform"
          >
            <div
              className={`w-11 h-11 rounded-xl ${action.color} flex items-center justify-center shadow-premium`}
            >
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
