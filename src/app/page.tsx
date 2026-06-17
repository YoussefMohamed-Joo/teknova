"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Providers } from "./providers";

const LoadingScreen = dynamic(() => import("@/components/loading-screen"), { ssr: false });
const Cursor = dynamic(() => import("@/components/cursor"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });
const Hero3D = dynamic(() => import("@/components/hero-3d"), { ssr: false });
const Services = dynamic(() => import("@/components/services"), { ssr: false });
const DashboardPreview = dynamic(() => import("@/components/dashboard-preview"), { ssr: false });
const Portfolio = dynamic(() => import("@/components/portfolio"), { ssr: false });
const Wizard = dynamic(() => import("@/components/wizard"), { ssr: false });
const Pricing = dynamic(() => import("@/components/pricing"), { ssr: false });
const Team = dynamic(() => import("@/components/team"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/testimonials"), { ssr: false });
const ContactForm = dynamic(() => import("@/components/contact-form"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const done = useCallback(() => {
    setLoading(false);
    setTimeout(() => setReady(true), 150);
  }, []);

  useEffect(() => { if (!loading) document.body.style.overflow = ""; }, [loading]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {loading && <LoadingScreen onComplete={done} />}
      {ready && (
        <>
          <Cursor />
          <Navbar />

          {/* Hero — Split Screen */}
          <section className="min-h-screen flex flex-col lg:flex-row pt-14">
            <div className="flex-1 flex items-center px-6 lg:px-16 py-16 lg:py-0">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-6">TEKNOVA — DIGITAL SOLUTIONS</p>
                <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                  {["نحن", "نبني", "المنتجات", "الرقمية"].map((word, i) => (
                    <span
                      key={word}
                      className="block"
                      style={{ animation: `fadeUp 0.6s ${i * 0.12}s both` }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm">
                  نحول أفكارك إلى منتجات رقمية متكاملة — مواقع، تطبيقات، وأنظمة بأعلى معايير الجودة
                </p>
                <div className="flex gap-3" style={{ animation: "fadeUp 0.6s 0.8s both" }}>
                  <button onClick={() => scrollTo("quote")} className="btn-primary px-6 py-2.5 text-sm">ابدأ مشروعك</button>
                  <button onClick={() => scrollTo("projects")} className="btn-ghost px-6 py-2.5 text-sm">أعمالنا</button>
                </div>
              </div>
            </div>
            <Hero3D />
          </section>

          <main>
            <Services />
            <DashboardPreview />
            <Portfolio />
            <Wizard />
            <Pricing />
            <Team />
            <Testimonials />
            <ContactForm />
            <Footer />
          </main>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default function Page() {
  return (
    <Providers>
      <HomePage />
    </Providers>
  );
}
