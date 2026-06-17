"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);

  return (
    <section className="py-12 md:py-20">
      <motion.div ref={ref} style={{ opacity, y }} className="mx-4 md:mx-8 lg:mx-16 glass p-6 md:p-10">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">DASHBOARD</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.02em]">
            نظام <span className="text-neon">إدارة متكامل</span>
          </h2>
        </div>

        {/* Mock Dashboard UI */}
        <div className="rounded-xl overflow-hidden border border-white/5">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-white/[0.02] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <span className="font-mono text-[10px] text-zinc-600">Dashboard / Analytics</span>
          </div>

          {/* Content */}
          <div className="p-5 md:p-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: "المشاريع", value: "12", change: "+3" },
                { label: "العملاء", value: "8", change: "+2" },
                { label: "الإيرادات", value: "$45k", change: "+12%" },
                { label: "النشاط", value: "96%", change: "+5%" },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                  <p className="text-zinc-600 text-[10px] mb-1">{s.label}</p>
                  <p className="font-display text-xl font-bold text-white">{s.value}</p>
                  <p className="text-green-700 text-[10px]">{s.change}</p>
                </div>
              ))}
            </div>

            {/* Chart mock */}
            <div className="bg-white/[0.02] rounded-xl p-5 border border-white/5 mb-6">
              <p className="text-zinc-500 text-xs mb-4">نشاط آخر 30 يوم</p>
              <div className="flex items-end gap-1 h-24">
                {[35, 50, 45, 70, 60, 85, 75, 90, 80, 65, 55, 78].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex-1 bg-white/10 rounded-t-sm hover:bg-neon/30 transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Table mock */}
            <div className="space-y-2">
              {[
                { name: "متجر إلكتروني", status: "قيد التنفيذ", date: "2026-06-15" },
                { name: "تطبيق توصيل", status: "مكتمل", date: "2026-06-10" },
                { name: "نظام إدارة", status: "قيد المراجعة", date: "2026-06-05" },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between bg-white/[0.01] rounded-lg px-4 py-2.5 border border-white/5">
                  <span className="text-white text-xs">{row.name}</span>
                  <span className={`text-[10px] ${row.status === "مكتمل" ? "text-green-500" : row.status === "قيد التنفيذ" ? "text-blue-500" : "text-yellow-500"}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
