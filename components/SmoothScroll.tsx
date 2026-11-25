"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9, // Snappy, zero-float 60/120Hz responsiveness on trackpads and wheels
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false, // 100% native hardware 60/120Hz momentum on touch devices (zero touch lag)
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      autoResize: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const rafHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandler);
    // Crucial: lagSmoothing(0) ensures GSAP ticker timestamps are strictly monotonic.
    // This completely eliminates scroll position jumps and time-dilation stutters.
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once DOM layout stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("load", handleLoad);
      gsap.ticker.remove(rafHandler);
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
