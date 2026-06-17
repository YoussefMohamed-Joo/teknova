"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteTypes, addons } from "@/lib/constants";

const steps = ["نوع المشروع", "عدد الصفحات", "الإضافات", "السعر النهائي"];

function PriceAnimated({ value }: { value: number }) {
  const [d, setD] = useState(value);
  useEffect(() => {
    let start = d;
    const diff = value - start;
    let step = 0;
    const max = 15;
    const interval = setInterval(() => {
      step++;
      const p = step / max;
      setD(Math.round(start + diff * (1 - Math.pow(1 - p, 3))));
      if (step >= max) clearInterval(interval);
    }, 600 / max);
    return () => clearInterval(interval);
  }, [value]);
  return <>{d.toLocaleString()}</>;
}

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(siteTypes[1].id);
  const [pages, setPages] = useState(5);
  const [addonIds, setAddonIds] = useState<string[]>([]);

  const selectedType = siteTypes.find((t) => t.id === type)!;
  const total = selectedType.base + (pages - 1) * 50 + addonIds.reduce((s, id) => s + (addons.find((a) => a.id === id)?.price ?? 0), 0);

  const toggle = (id: string) => setAddonIds((p) => (p.includes(id) ? p.filter((a) => a !== id) : [...p, id]));

  return (
    <section id="quote" className="py-12 md:py-20">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="glass p-6 md:p-10 max-w-xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">BUILD YOUR PROJECT</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              <span className="text-neon">اطلب</span> مشروعك
            </h2>
            {/* Step indicators */}
            <div className="flex justify-center gap-1.5 mt-5">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full transition-colors ${i <= step ? "bg-white" : "bg-zinc-800"}`} />
                  {i < steps.length - 1 && <div className={`w-6 h-[1px] transition-colors ${i < step ? "bg-white/30" : "bg-zinc-800"}`} />}
                </div>
              ))}
            </div>
            <p className="text-zinc-600 text-xs mt-2">{steps[step]}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {siteTypes.map((t) => (
                    <button key={t.id} onClick={() => setType(t.id)} className={`glass p-3 text-center text-xs transition-all ${type === t.id ? "border-white/20 bg-white/5" : ""}`}>
                      <div className="font-display font-bold text-white text-sm">{t.label}</div>
                      <div className="text-zinc-600 mt-0.5">من ${t.base}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="text-center">
                  <p className="text-zinc-400 text-sm mb-4">عدد الصفحات: <span className="font-display text-white">{pages}</span></p>
                  <input type="range" min={1} max={20} value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full accent-white" />
                  <div className="flex justify-between text-[10px] text-zinc-700 mt-1"><span>1</span><span>20</span></div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {addons.map((a) => (
                    <button key={a.id} onClick={() => toggle(a.id)} className={`glass p-3 text-xs text-right transition-all ${addonIds.includes(a.id) ? "border-white/20 bg-white/5" : ""}`}>
                      <span className="text-white">{a.label}</span>
                      <span className="block text-zinc-600 text-[10px]">+${a.price}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-6">
                  <p className="text-zinc-600 text-xs mb-3">السعر التقديري</p>
                  <div className="font-display text-5xl md:text-6xl font-bold text-white">
                    $<PriceAnimated value={total} />
                  </div>
                  <p className="text-zinc-700 text-[10px] mt-4 mb-6">سعر تقديري — للعرض الدقيق تواصل معنا</p>
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary px-6 py-2.5 text-sm">
                    تواصل معنا
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep((p) => Math.max(p - 1, 0))} disabled={step === 0} className="btn-ghost px-4 py-1.5 text-xs disabled:opacity-20">السابق</button>
            {step < steps.length - 1 && (
              <button onClick={() => setStep((p) => Math.min(p + 1, steps.length - 1))} className="btn-primary px-4 py-1.5 text-xs">التالي</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
