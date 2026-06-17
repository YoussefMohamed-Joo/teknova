"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { story } from "@/lib/constants";

export default function StorySection() {
  return (
    <section id="story" className="py-12 md:py-20">
      <div className="mx-4 md:mx-8 lg:mx-16">
        {/* العنوان */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">
            HOW WE WORK
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            من الفكرة إلى <span className="text-neon">الإطلاق</span>
          </h2>
        </div>

        {/* خط زمني بالكاردات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {story.map((s, i) => (
            <StoryCard key={s.step} item={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  item,
  index,
}: {
  item: (typeof story)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-glass p-6 md:p-8 group"
    >
      <span className="font-display text-5xl md:text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors block mb-4">
        {item.step}
      </span>
      <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}
