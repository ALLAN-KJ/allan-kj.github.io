"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global ultra-high refresh rate performance configuration (120Hz / 144Hz / 240Hz / 360Hz)
gsap.config({
  force3D: true, // Enforces permanent GPU compositing layers for zero-stutter hardware transforms
  nullTargetWarn: false,
});

ScrollTrigger.config({
  limitCallbacks: true, // Synchronizes trigger callbacks strictly to the hardware display refresh rate
  ignoreMobileResize: true, // Prevents mobile URL-bar collapsing from triggering expensive layout recalculations
});

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Ultra-high refresh rate calibrated Lenis instance
    const lenis = new Lenis({
      duration: 1.15, // Razor-sharp, velvety momentum curve tuned for high-refresh monitors
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true, // Smooth touch-based scrolling on mobile 120Hz displays (ProMotion / AMOLED)
      syncTouchLerp: 0.085, // Gliding momentum with instantaneous responsiveness
      touchInertiaExponent: 1.9, // Natural fluid inertia when finger lifts
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
