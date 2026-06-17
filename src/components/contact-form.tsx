"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { site } from "@/lib/constants";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const initial: FormData = {
  name: "يوسف محمد",
  phone: "01033558125",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initial);

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      axios.post("/api/contact", data).then((r) => r.data),
  });

  const update = (field: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="section-glass p-8 md:p-12 lg:p-16 max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-3">
              CONTACT
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              تواصل <span className="text-neon">معنا</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {mutation.isSuccess ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-display text-lg font-bold text-white mb-1">تم استلام طلبك</p>
                <p className="text-zinc-500 text-xs">سنتواصل معك قريبًا</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={submit}
                className="space-y-6"
              >
                <InputField
                  label="الاسم"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                />
                <InputField
                  label="رقم الهاتف"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                />
                <InputField
                  label="البريد الإلكتروني"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                />
                <div className="relative">
                  <textarea
                    id="msg"
                    placeholder=" "
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={3}
                    className="peer w-full bg-transparent border-b border-zinc-800 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                  <label
                    htmlFor="msg"
                    className={`absolute right-0 transition-all cursor-text ${
                      form.message
                        ? "top-0 text-[10px] text-zinc-400"
                        : "top-5 text-xs text-zinc-600 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-zinc-400"
                    }`}
                  >
                    رسالتك
                  </label>
                </div>

                {mutation.isError && (
                  <p className="text-red-800 text-xs text-center">حدث خطأ، حاول مرة أخرى</p>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {mutation.isPending ? (
                    <>
                      <div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />
                      جاري الإرسال…
                    </>
                  ) : (
                    "إرسال"
                  )}
                </button>

                <div className="text-center pt-2">
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost inline-flex items-center gap-2 px-4 py-1.5 text-[10px]"
                  >
                    📞 تواصل عبر واتساب
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <input
        id={label}
        type="text"
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full bg-transparent border-b border-zinc-800 text-white pt-5 pb-1.5 text-sm focus:outline-none focus:border-white/30 transition-colors"
      />
      <label
        htmlFor={label}
        className={`absolute right-0 transition-all cursor-text ${
          value
            ? "top-0 text-[10px] text-zinc-400"
            : "top-5 text-xs text-zinc-600 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-zinc-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
