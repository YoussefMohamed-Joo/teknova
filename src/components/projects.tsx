"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/constants";

export default function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="py-12 md:py-20">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">
            PORTFOLIO
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            مشاريع <span className="text-neon">TEKNOVA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onClick={() => setSelected(p)} />
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-glass p-8 max-w-sm w-full text-center"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 left-4 text-zinc-600 hover:text-white text-lg"
            >
              ✕
            </button>
            <div className="text-4xl mb-4">
              {selected.category === "Web"
                ? "🌐"
                : selected.category === "Mobile"
                  ? "📱"
                  : "⚙️"}
            </div>
            <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
              {selected.category}
            </span>
            <h3 className="font-display text-xl font-bold text-white mt-2 mb-1">
              {selected.title}
            </h3>
            <p className="text-zinc-400 text-sm">{selected.desc}</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setRotate({ x: y, y: x });
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      onClick={onClick}
      className="card-glass p-8 flex flex-col items-center justify-center min-h-[200px] cursor-pointer group"
    >
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
        className="text-center"
      >
        <div className="text-4xl mb-3 opacity-40 group-hover:opacity-80 transition-opacity">
          {project.category === "Web"
            ? "🌐"
            : project.category === "Mobile"
              ? "📱"
              : "⚙️"}
        </div>
        <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
          {project.category}
        </span>
        <h3 className="font-display text-base font-bold text-white mt-2">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-xs mt-0.5">{project.desc}</p>
      </motion.div>
    </motion.div>
  );
}
