"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { packages } from "@/lib/constants";

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <section className="py-12 md:py-20">
      <motion.div ref={ref} style={{ opacity, y }} className="mx-4 md:mx-8 lg:mx-16">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">PRICING</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            <span className="text-neon">باقات</span> الأسعار
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <div key={pkg.name} className={`glass p-6 md:p-8 ${i === 1 ? "border-white/10 md:scale-105" : ""}`}>
              <p className="font-mono text-[10px] text-zinc-500 tracking-wider mb-1">{pkg.name}</p>
              <p className="font-display text-3xl font-bold text-white mb-4">${pkg.price}</p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="text-zinc-400 text-xs flex items-center gap-2">
                    <span className="text-neon">✦</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className={`w-full py-2 text-xs rounded-full font-semibold transition-all ${i === 1 ? "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "border border-zinc-800 text-zinc-300 hover:border-zinc-600"}`}>
                اختر الباقة
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
