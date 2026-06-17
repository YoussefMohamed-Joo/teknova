"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/constants";

export default function Services() {
  const [selected, setSelected] = useState<(typeof services)[0] | null>(null);

  return (
    <section id="services" className="py-12 md:py-20">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">
            WHAT WE DO
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            خدمات <span className="text-neon">TEKNOVA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} onClick={() => setSelected(s)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelected(null)} />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="card-glass p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 left-4 text-zinc-600 hover:text-white text-lg"
            >
              ✕
            </button>
            <div className="text-3xl mb-4">{selected.icon}</div>
            <h3 className="font-display text-xl font-bold text-white mb-2">{selected.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">{selected.desc}</p>
            <button
              onClick={() => {
                setSelected(null);
                document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary w-full py-2.5 text-sm"
            >
              اطلب الخدمة
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function ServiceCard({
  service,
  index,
  onClick,
}: {
  service: (typeof services)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [40, 0]);

  // 3D tilt logic
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setRotate({ x: y, y: x });
  };
  const resetTilt = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      onClick={onClick}
      className="card-glass p-6 cursor-pointer group"
    >
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
      >
        <div className="text-2xl mb-3">{service.icon}</div>
        <h3 className="font-display text-sm font-bold text-white mb-2">
          {service.title}
        </h3>
        <p className="text-zinc-500 text-xs leading-relaxed">{service.desc}</p>
      </motion.div>
    </motion.div>
  );
}
