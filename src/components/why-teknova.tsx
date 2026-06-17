"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    gsap.fromTo(
      node,
      { textContent: 0 },
      {
        textContent: value,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: node, start: "top 85%" },
      }
    );
  }, [value]);

  return (
    <span ref={el} className="font-display text-4xl md:text-5xl text-white">
      0
    </span>
  );
}

export default function WhyTeknova() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <section id="why" className="py-12 md:py-20">
      <motion.div
        ref={ref}
        style={{ opacity, y }}
        className="section-glass mx-4 md:mx-8 lg:mx-16 p-8 md:p-12 lg:p-16"
      >
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">
            WHY TEKNOVA
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            لماذا <span className="text-neon">TEKNOVA</span>؟
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="flex items-center justify-center" dir="ltr">
                <Counter value={s.value} suffix={s.suffix} />
                <span className="font-display text-4xl md:text-5xl text-white">
                  {s.suffix}
                </span>
              </div>
              <p className="text-zinc-500 text-xs mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-zinc-400 text-sm leading-relaxed mb-2">
            في TEKNOVA لا نقدم خدمات تقليدية
          </p>
          <p className="text-white text-lg font-light">
            نبني أنظمة، نطور تطبيقات، ونصنع تجارب رقمية
          </p>
          <div className="w-8 h-[1px] bg-white/20 mx-auto mt-6" />
          <p className="text-zinc-600 text-xs mt-4">
            هدفنا ليس تسليم موقع — هدفنا أن نكون شركاء في نجاحك
          </p>
        </div>
      </motion.div>
    </section>
  );
}
