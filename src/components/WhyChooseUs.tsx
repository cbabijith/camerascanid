"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Award,
  Users,
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Wallet,
  Zap,
  CheckCircle2,
} from "lucide-react";

const REASONS = [
  { icon: Award, title: "30+ Years Experience" },
  { icon: Users, title: "Professional Technicians" },
  { icon: ShieldCheck, title: "Trusted by Thousands" },
  { icon: BadgeCheck, title: "Authorized Service" },
  { icon: Wrench, title: "Genuine Parts" },
  { icon: Wallet, title: "Affordable Pricing" },
  { icon: Zap, title: "Fast Service" },
  { icon: CheckCircle2, title: "Quality Guarantee" },
];

const STATS = [
  { value: 30, suffix: "+", label: "Years" },
  { value: 10000, suffix: "+", label: "Customers" },
  { value: 5000, suffix: "+", label: "Repairs" },
  { value: 100, suffix: "%", label: "Trusted" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="text-3xl font-bold text-brand">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function WhyChooseUs() {
  return (
    <section className="px-4 py-8">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4"
      >
        Why Choose Us
      </motion.h3>

      <div className="grid grid-cols-2 gap-2.5 mb-6">
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-accent border border-gray-100 dark:border-gray-800"
          >
            <reason.icon className="w-4 h-4 text-brand flex-shrink-0" />
            <span className="text-xs font-semibold leading-tight">{reason.title}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-4 text-center shadow-premium"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
