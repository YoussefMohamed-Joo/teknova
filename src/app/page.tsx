"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Providers } from "./providers";

const LoadingScreen = dynamic(() => import("@/components/loading-screen"), { ssr: false });
const Cursor = dynamic(() => import("@/components/cursor"), { ssr: false });
const Hero = dynamic(() => import("@/components/hero"), { ssr: false });
const StorySection = dynamic(() => import("@/components/story-section"), { ssr: false });
const Services = dynamic(() => import("@/components/services"), { ssr: false });
const WhyTeknova = dynamic(() => import("@/components/why-teknova"), { ssr: false });
const Projects = dynamic(() => import("@/components/projects"), { ssr: false });
const QuoteWizard = dynamic(() => import("@/components/quote-wizard"), { ssr: false });
const ContactForm = dynamic(() => import("@/components/contact-form"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const done = useCallback(() => {
    setLoading(false);
    setTimeout(() => setReady(true), 200);
  }, []);

  useEffect(() => {
    if (!loading) document.body.style.overflow = "";
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={done} />}
      {ready && (
        <>
          <Cursor />
          <main>
            <Hero />
            <StorySection />
            <Services />
            <WhyTeknova />
            <Projects />
            <QuoteWizard />
            <ContactForm />
            <Footer />
          </main>
        </>
      )}
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
