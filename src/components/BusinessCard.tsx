"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Phone,
  Smartphone,
  Wrench,
  Mail,
  Globe,
  Copy,
} from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { copyToClipboard } from "@/lib/vcard";
import { useToast } from "./ToastProvider";

const INFO = [
  {
    icon: Calendar,
    label: "Established",
    value: BUSINESS.established,
    copyable: false,
  },
  {
    icon: MapPin,
    label: "Location",
    value: BUSINESS.location.full,
    copyable: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: BUSINESS.phone,
    href: `tel:${BUSINESS.phoneRaw}`,
    copyable: true,
  },
  {
    icon: Smartphone,
    label: "Used Camera",
    value: BUSINESS.usedCamera,
    href: `tel:${BUSINESS.usedCamera}`,
    copyable: true,
  },
  {
    icon: Wrench,
    label: "Service",
    value: BUSINESS.service,
    href: `tel:${BUSINESS.service}`,
    copyable: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
    copyable: true,
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.camerascan.org",
    href: BUSINESS.website,
    copyable: true,
  },
];

export function BusinessCard() {
  const { showToast } = useToast();

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    showToast(ok ? `${label} copied!` : "Failed to copy");
  };

  return (
    <section className="px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-5 shadow-glass"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
          Business Information
        </h3>
        <div className="space-y-1">
          {INFO.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-foreground hover:text-brand transition-colors truncate block"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-foreground truncate">
                    {item.value}
                  </p>
                )}
              </div>
              {item.copyable && (
                <button
                  onClick={() => handleCopy(item.value, item.label)}
                  className="ripple w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors opacity-0 group-hover:opacity-100 active:scale-90"
                  aria-label={`Copy ${item.label}`}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
