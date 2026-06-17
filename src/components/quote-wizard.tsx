"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteTypes, addons } from "@/lib/constants";

const steps = ["النوع", "الصفحات", "الإضافات", "السعر"];

function PriceAnimated({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let start = display;
    const diff = value - start;
    const duration = 500;
    const steps = 15;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const prog = step / steps;
      const eased = 1 - Math.pow(1 - prog, 3);
      setDisplay(Math.round(start + diff * eased));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

export default function QuoteWizard() {
  const [current, setCurrent] = useState(0);
  const [type, setType] = useState(siteTypes[1].id);
  const [pages, setPages] = useState(5);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const selectedType = siteTypes.find((t) => t.id === type)!;
  const total = selectedType.base + (pages - 1) * 50 + selectedAddons.reduce((sum, id) => {
    const a = addons.find((x) => x.id === id);
    return sum + (a?.price ?? 0);
  }, 0);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const next = () => setCurrent((p) => Math.min(p + 1, steps.length - 1));
  const prev = () => setCurrent((p) => Math.max(p - 1, 0));

  return (
    <section id="quote" className="py-12 md:py-20">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="section-glass p-8 md:p-12 lg:p-16 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">
              BUILD YOUR PROJECT
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              <span className="text-neon">اطلب</span> مشروعك
            </h2>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={`h-[2px] w-8 transition-colors duration-300 ${
                    i <= current ? "bg-white" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>
            <p className="text-zinc-600 text-xs mt-2">{steps[current]}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: النوع */}
              {current === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {siteTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`card-glass p-4 text-center text-sm transition-all ${
                        type === t.id
                          ? "border-white/20 bg-white/5"
                          : ""
                      }`}
                    >
                      <div className="font-display font-bold text-white mb-0.5">{t.label}</div>
                      <div className="text-zinc-600 text-xs">ابتداءً من ${t.base}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: الصفحات */}
              {current === 1 && (
                <div className="text-center">
                  <p className="text-zinc-400 text-sm mb-4">
                    عدد الصفحات: <span className="text-white font-bold">{pages}</span>
                  </p>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-700 mt-1">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>
              )}

              {/* Step 3: الإضافات */}
              {current === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {addons.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`card-glass p-3 text-sm text-right transition-all ${
                        selectedAddons.includes(a.id)
                          ? "border-white/20 bg-white/5"
                          : ""
                      }`}
                    >
                      <span className="text-white text-xs">{a.label}</span>
                      <span className="block text-zinc-600 text-[10px]">+${a.price}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 4: السعر */}
              {current === 3 && (
                <div className="text-center py-8">
                  <p className="text-zinc-500 text-xs mb-3">السعر التقديري</p>
                  <div className="font-display text-6xl md:text-7xl font-bold text-white">
                    $<PriceAnimated value={total} />
                  </div>
                  <p className="text-zinc-700 text-[10px] mt-4 mb-8">
                    سعر تقديري — للعرض الدقيق تواصل معنا
                  </p>
                  <button
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="btn-primary px-8 py-3 text-sm"
                  >
                    تواصل معنا
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* التنقل بين الخطوات */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prev}
              disabled={current === 0}
              className="btn-ghost px-5 py-2 text-xs disabled:opacity-20"
            >
              السابق
            </button>
            {current < steps.length - 1 && (
              <button onClick={next} className="btn-primary px-5 py-2 text-xs">
                التالي
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
