"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [logged, setLogged] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLogged(!!localStorage.getItem("token"));
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-sm font-bold tracking-wider">
          TEK<span className="text-neon">NOVA</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {["services", "projects", "quote", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-zinc-500 hover:text-white transition-colors text-xs tracking-wider uppercase"
            >
              {id === "services" ? "الخدمات" : id === "projects" ? "المشاريع" : id === "quote" ? "اطلب مشروعك" : "اتصل بنا"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {logged ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full hover:bg-white/20 transition-all"
            >
              لوحة التحكم
            </button>
          ) : (
            <>
              <Link href="/login" className="text-zinc-500 hover:text-white text-xs transition-colors">
                دخول
              </Link>
              <Link href="/register" className="bg-white text-black text-xs px-4 py-1.5 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                اشتراك
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
