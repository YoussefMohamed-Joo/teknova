"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 10 + 3;
      if (p >= 100) { p = 100; clearInterval(interval); setTimeout(onComplete, 350); }
      if (bar.current) bar.current.style.width = `${Math.min(p, 100)}%`;
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="font-display text-5xl md:text-7xl font-bold tracking-[0.15em]">
        TEK<span className="text-neon">NOVA</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-mono text-xs text-zinc-700 mt-4 mb-5 tracking-[0.3em]">LOADING</motion.p>
      <div className="w-36 h-[1px] bg-zinc-900"><div ref={bar} className="h-full bg-white transition-all duration-150 ease-out" style={{ width: "0%" }} /></div>
    </motion.div>
  );
}
