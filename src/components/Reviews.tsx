"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Rajesh Kumar",
    text: "Excellent service! My Canon camera was repaired perfectly. Trusted place for all camera needs in Kottayam.",
    rating: 5,
  },
  {
    name: "Priya Menon",
    text: "Been coming here for years. Best place for camera rentals and accessories. Very professional team.",
    rating: 5,
  },
  {
    name: "Arun Thomas",
    text: "Got a used Sony camera at a great price. Genuine products and honest service. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sneha Varghese",
    text: "Sensor cleaning was done perfectly. The technicians really know their craft. 30 years of experience shows.",
    rating: 5,
  },
  {
    name: "Mohammed Faizal",
    text: "Authorized service center for multiple brands. Fast turnaround and fair pricing. Trusted since 1993.",
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section className="py-8 overflow-hidden">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4 px-4"
      >
        Customer Reviews
      </motion.h3>
      <div className="relative">
        <div className="flex gap-3 animate-marquee w-max">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 p-5 rounded-2xl bg-white dark:bg-accent border border-gray-100 dark:border-gray-800 shadow-premium"
            >
              <Quote className="w-6 h-6 text-brand/20 mb-2" />
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-brand text-brand" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                "{review.text}"
              </p>
              <p className="text-sm font-bold">— {review.name}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
