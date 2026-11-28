"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false, // Native 120Hz hardware momentum on mobile/touch screens (zero touch lag)
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
    // lagSmoothing(0) ensures no artificial time dilation or sudden position jumps during Lenis RAF chaining
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
