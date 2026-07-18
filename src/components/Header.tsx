"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { BUSINESS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Brands", href: "#brands" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 safe-top"
      >
        <div
          className={cn(
            "max-w-md mx-auto rounded-2xl transition-all duration-300",
            scrolled ? "glass-strong shadow-premium-lg" : "glass shadow-premium"
          )}
        >
          <div className="flex items-center justify-between px-4 py-2.5">
            <a href="#home" aria-label="Camera Scan Home">
              <Logo size="sm" />
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="ripple flex items-center gap-1.5 bg-brand text-white rounded-full px-3.5 py-2 text-sm font-semibold shadow-premium active:scale-95 transition-transform"
                aria-label="Call Camera Scan"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xs:inline">Call</span>
              </a>
              <button
                onClick={() => setOpen(true)}
                className="ripple w-10 h-10 flex items-center justify-center rounded-full bg-accent text-foreground active:scale-90 transition-transform"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-background shadow-premium-lg p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo size="sm" />
                <button
                  onClick={() => setOpen(false)}
                  className="ripple w-10 h-10 flex items-center justify-center rounded-full bg-accent active:scale-90 transition-transform"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="ripple text-lg font-semibold px-4 py-3.5 rounded-xl hover:bg-accent transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="ripple flex items-center justify-center gap-2 bg-brand text-white rounded-2xl py-3.5 font-semibold shadow-premium active:scale-95 transition-transform"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
