"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/constants";

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">CASE STUDIES</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            مشاريع <span className="text-neon">TEKNOVA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onClick={() => setSelected(i)} />
          ))}
        </div>
      </div>

      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelected(null)} />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass p-8 max-w-lg w-full relative"
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 left-4 text-zinc-600 hover:text-white text-lg">✕</button>
            <p className="font-mono text-[10px] text-zinc-500 tracking-wider mb-3">{projects[selected].category}</p>
            <h3 className="font-display text-xl font-bold text-white mb-4">{projects[selected].title}</h3>

            <div className="space-y-4">
              <div>
                <p className="text-zinc-500 text-[10px] font-mono mb-1">المشكلة</p>
                <p className="text-zinc-300 text-sm">{projects[selected].problem}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-mono mb-1">الحل</p>
                <p className="text-zinc-300 text-sm">{projects[selected].solution}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-mono mb-1">النتيجة</p>
                <p className="text-neon text-sm font-semibold">{projects[selected].result}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-mono mb-1">التقنيات</p>
                <p className="text-zinc-400 text-xs">{projects[selected].tech}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} transition={{ duration: 0.4, delay: index * 0.08 }} onClick={onClick} className="glass p-6 cursor-pointer group relative overflow-hidden">
      <div className="absolute -top-6 -right-6 text-7xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity font-display font-bold">{`0${index + 1}`}</div>
      <span className="font-mono text-[10px] text-zinc-600 tracking-wider">{project.category}</span>
      <h3 className="font-display text-base font-bold text-white mt-1 mb-2 group-hover:text-neon transition-colors">{project.title}</h3>
      <p className="text-zinc-500 text-xs leading-relaxed mb-3">{project.problem}</p>
      <div className="flex gap-1 flex-wrap">
        {project.tech.split(", ").slice(0, 2).map((t) => (
          <span key={t} className="text-[8px] text-zinc-600 bg-white/[0.03] px-1.5 py-0.5 rounded">{t}</span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
    </motion.div>
  );
}
