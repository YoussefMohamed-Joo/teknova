"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, tx = 0, ty = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.current?.style.setProperty("transform", `translate(${mx}px, ${my}px)`);
    };

    const follow = () => {
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      trail.current?.style.setProperty("transform", `translate(${tx - 12}px, ${ty - 12}px)`);
      requestAnimationFrame(follow);
    };

    const onHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const c = t.tagName === "A" || t.tagName === "BUTTON" || !!t.closest("a, button");
      dot.current?.style.setProperty("width", c ? "32px" : "4px");
      dot.current?.style.setProperty("height", c ? "32px" : "4px");
      dot.current?.style.setProperty("background", c ? "transparent" : "white");
      dot.current?.style.setProperty("border", c ? "1px solid rgba(255,255,255,0.4)" : "none");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onHover);
    follow();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-[width,height,background,border] duration-200" style={{ width: 4, height: 4, background: "white" }} />
      <div ref={trail} className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-white/10" style={{ width: 24, height: 24 }} />
    </>
  );
}
