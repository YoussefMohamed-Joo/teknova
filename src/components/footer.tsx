"use client";

import { site } from "@/lib/constants";

const links = [["الخدمات", "#services"], ["المشاريع", "#projects"], ["اطلب مشروعك", "#quote"], ["تواصل معنا", "#contact"]];
const socials = [
  { icon: "📞", href: site.whatsapp },
  { icon: "📘", href: "#" },
  { icon: "📸", href: "#" },
  { icon: "💼", href: "#" },
];

export default function Footer() {
  return (
    <footer className="py-12 md:py-16">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="glass p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-display text-base font-bold tracking-wide mb-2">TEK<span className="text-neon">NOVA</span></h3>
              <p className="text-zinc-600 text-xs leading-relaxed">{site.tagline}</p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] text-zinc-500 tracking-wider mb-3">روابط</h4>
              <ul className="space-y-1">
                {links.map(([l, h]) => <li key={l}><a href={h} className="text-zinc-600 hover:text-white transition-colors text-xs">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] text-zinc-500 tracking-wider mb-3">تواصل</h4>
              <p className="text-zinc-600 text-xs mb-3">{site.phone}</p>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border border-zinc-800 rounded-full px-4 py-1.5 text-[10px] text-zinc-400 hover:border-zinc-600 transition-all">📞 واتساب</a>
            </div>
          </div>
          <div className="flex justify-center gap-3 mb-4">
            {socials.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] hover:border-zinc-600 transition-all">{s.icon}</a>
            ))}
          </div>
          <div className="border-t border-zinc-900 pt-4 text-center">
            <p className="text-zinc-700 text-[10px]">&copy; {new Date().getFullYear()} TEKNOVA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
