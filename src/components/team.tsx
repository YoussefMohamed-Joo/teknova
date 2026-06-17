"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { team } from "@/lib/constants";

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <section className="py-12 md:py-20">
      <motion.div ref={ref} style={{ opacity, y }} className="mx-4 md:mx-8 lg:mx-16">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">TEAM</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            فريق <span className="text-neon">TEKNOVA</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass p-5 text-center group hover:border-white/10 transition-all"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{m.icon}</div>
              <h3 className="font-display text-xs font-bold text-white mb-0.5">{m.name}</h3>
              <p className="text-neon text-[10px] mb-1">{m.role}</p>
              <p className="text-zinc-600 text-[10px] leading-relaxed">{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
