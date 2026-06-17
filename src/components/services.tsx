"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/constants";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">SERVICES</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            خدمات <span className="text-neon">TEKNOVA</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc, icon, index }: { title: string; desc: string; icon: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass p-4 md:p-5 text-center group hover:border-white/10 transition-all cursor-default"
    >
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-display text-[10px] md:text-xs font-bold text-white mb-1">{title}</h3>
      <p className="text-zinc-600 text-[10px] leading-relaxed hidden md:block">{desc}</p>
    </motion.div>
  );
}
