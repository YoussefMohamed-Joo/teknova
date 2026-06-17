"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      if (data.user.role === "admin") router.push("/admin");
      else router.push("/dashboard");
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.error : "حدث خطأ";
      setError(msg || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(24px)" }}
      >
        <h1 className="font-display text-2xl font-bold text-white text-center mb-6">
          تسجيل <span className="text-neon">الدخول</span>
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          {error && <p className="text-red-700 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-xl py-2.5 text-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all disabled:opacity-40"
          >
            {loading ? "جاري..." : "دخول"}
          </button>
        </form>

        <p className="text-center text-zinc-600 text-xs mt-6">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-white hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
