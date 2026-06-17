"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  // Canvas animation للجهة اليمنى (جزيئات متحركة)
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let frame: number;
    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      c.width = c.clientWidth * 2;
      c.height = c.clientHeight * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 40; i++) {
      pts.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[j].x - p.x;
          const dy = pts[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row">
      {/* الناحية اليسرى — النص */}
      <div className="flex-1 flex items-center px-6 lg:px-16 py-20 lg:py-0">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-6"
          >
            TEKNOVA — DIGITAL SOLUTIONS
          </motion.p>

          <h1
            ref={title}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-[-0.02em] mb-6"
          >
            {["WE", "BUILD", "DIGITAL", "PRODUCTS"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm"
          >
            نحول أفكارك إلى منتجات رقمية متكاملة — مواقع، تطبيقات، وأنظمة
            بأعلى معايير الجودة والأداء
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-3"
          >
            <button onClick={() => scrollTo("quote")} className="btn-primary px-6 py-2.5 text-sm">
              ابدأ مشروعك
            </button>
            <button onClick={() => scrollTo("story")} className="btn-ghost px-6 py-2.5 text-sm">
              كيف نعمل
            </button>
          </motion.div>
        </div>
      </div>

      {/* الناحية اليمنى — Canvas */}
      <div className="flex-1 min-h-[40vh] lg:min-h-screen relative">
        <canvas
          ref={canvas}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* سهم التمرير */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-4 h-7 rounded-full border border-zinc-800 flex justify-center pt-1.5">
          <div className="w-[1px] h-2 bg-zinc-500" />
        </div>
      </motion.div>
    </section>
  );
}
