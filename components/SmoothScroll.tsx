"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // High-refresh rate optimized Lenis instance (tuned for 120Hz / 144Hz / ProMotion displays)
    const lenis = new Lenis({
      duration: 1.2, // Crisp, velvety smooth deceleration curve tuned for high-refresh monitors
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true, // Smooth touch-based scrolling on mobile 120Hz displays (ProMotion / AMOLED)
      syncTouchLerp: 0.08, // Gliding momentum with instantaneous responsiveness
      touchInertiaExponent: 2.0, // Natural fluid inertia when finger lifts
      wheelMultiplier: 1.0, // 1:1 precision with high-DPI mice and Apple trackpads
      touchMultiplier: 1.5, // Responsive yet silky mobile touch tracking
      autoResize: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Lock Lenis strictly to GSAP's native hardware requestAnimationFrame ticker
    // Runs synchronized with the display's native refresh rate (60Hz, 120Hz, 144Hz, 240Hz)
    const rafHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandler);
    // lagSmoothing(0) prevents GSAP from dropping frames or causing jumpy stutters on 120Hz/144Hz displays
    gsap.ticker.lagSmoothing(0);

    // Initial recalculation to ensure scroll triggers are synced with high-refresh viewport metrics
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
