"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import AnimatedButton from "../AnimatedButton";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !bgRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop parallax only
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        bgRef.current,
        { y: "-30%" },
        {
          y: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    
    // Massive heading mask reveal
    const headingSplit = new SplitType(".contact-heading", { types: "chars" });
    gsap.fromTo(headingSplit.chars, {
      y: 50,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power4.out",
      duration: 0.8,
    });

    return () => {
      mm.revert();
      headingSplit.revert();
    };
  }, []);

  return (
    <section id="contact" ref={containerRef} className="relative min-h-[100vh] flex flex-col items-center justify-center py-40 overflow-hidden border-t border-white/5 bg-[#0C0D12]">
      {/* Parallax Background */}
      <div 
        ref={bgRef}
        className="absolute inset-[-30%] z-0 bg-[radial-gradient(ellipse_at_center,rgba(217,161,92,0.05)_0%,rgba(10,11,15,1)_65%)] md:block pointer-events-none"
      />


      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        <h2 aria-label="Let's Connect." className="contact-heading group text-[clamp(2.5rem,8vw,5rem)] md:text-[8rem] font-black font-heading text-[#EDEDF2] mb-8 tracking-[-0.04em] leading-[0.92] cursor-pointer">
          <span className="spider-glitch block" data-text="Let's">Let&apos;s </span>
          <span className="spider-glitch block" data-text="Connect.">
            Connect<span className="text-[#D9A15C]">.</span>
          </span>
        </h2>
        
        <p className="text-base md:text-lg text-[#9A9AA5] mb-16 font-light max-w-lg mx-auto leading-[1.7]">
          Always open for a chat about cybersecurity, development, or new opportunities.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-24">
          <AnimatedButton
            href="https://mail.google.com/mail/?view=cm&fs=1&to=allan22kj@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Say hello
          </AnimatedButton>
          <a
            href="/resume.pdf"
            download="Allan_KJ_Resume.pdf"
            className="px-6 py-3.5 rounded-full border border-[#D9A15C]/40 bg-[#D9A15C]/10 text-[#D9A15C] hover:bg-[#D9A15C]/20 hover:border-[#D9A15C] transition-all duration-300 text-xs md:text-sm font-semibold uppercase tracking-[0.12em] inline-flex items-center gap-2 min-h-[48px] shadow-[0_0_20px_rgba(217,161,92,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A15C]"
            aria-label="Download Resume"
          >
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h16" />
            </svg>
            <span>Resume</span>
          </a>
        </div>

        <div className="flex justify-center items-center gap-8 border-t border-white/8 pt-12 w-full max-w-md mx-auto">
          <a
            href="https://linkedin.com/in/allan-k-j-21389838a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-[0.12em] uppercase text-[#9A9AA5] hover:text-[#D9A15C] transition-all duration-300 min-h-[44px] inline-flex items-center focus-visible:text-[#D9A15C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15C]/50 rounded-sm"
          >
            LinkedIn
          </a>
          <span className="w-1 h-1 rounded-full bg-[#D9A15C]/40" />
          <a
            href="https://github.com/ALLAN-KJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-[0.12em] uppercase text-[#9A9AA5] hover:text-[#D9A15C] transition-all duration-300 min-h-[44px] inline-flex items-center focus-visible:text-[#D9A15C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15C]/50 rounded-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
