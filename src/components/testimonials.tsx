"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { testimonials } from "@/lib/constants";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <section className="py-12 md:py-20">
      <motion.div ref={ref} style={{ opacity, y }} className="mx-4 md:mx-8 lg:mx-16">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">TESTIMONIALS</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            آراء <span className="text-neon">العملاء</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass p-5 md:p-6"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-neon text-xs">★</span>
                ))}
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed mb-4">{t.content}</p>
              <div>
                <p className="font-display text-xs font-bold text-white">{t.name}</p>
                <p className="text-zinc-600 text-[10px]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
