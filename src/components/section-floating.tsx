"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// Wrapper بيحول كل Section إلى "Card عائم" مع glass effect
export default function SectionFloating({ children, className = "", id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <motion.div
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className={`section-glass mx-4 md:mx-8 lg:mx-16 my-8 md:my-12 p-8 md:p-12 lg:p-16 ${className}`}
    >
      {children}
    </motion.div>
  );
}
