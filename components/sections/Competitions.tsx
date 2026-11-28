"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Competitions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(containerRef);

    mm.add(
      {
        isReduced: "(prefers-reduced-motion: reduce)",
        isNormal: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isReduced } = context.conditions as { isReduced: boolean; isNormal: boolean };
        let headingSplit: SplitType | null = null;

        if (isReduced) {
          itemsRef.current.forEach((item) => {
            if (!item) return;
            gsap.set(item, { opacity: 1, y: 0, scale: 1 });
          });
          gsap.set(".competitions-heading", { opacity: 1, y: 0, scale: 1 });
        } else {
          itemsRef.current.forEach((item) => {
            if (!item) return;
            
            gsap.fromTo(
              item,
              { opacity: 0, y: 60, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "back.out(1.6)",
                duration: 0.8,
                scrollTrigger: {
                  trigger: item,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });

          headingSplit = new SplitType(".competitions-heading", { types: "chars" });
          if (headingSplit.chars) {
            gsap.fromTo(
              headingSplit.chars,
              { y: 60, opacity: 0, scale: 0.75 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.04,
                ease: "back.out(1.8)",
                duration: 0.75,
                scrollTrigger: {
                  trigger: ".competitions-heading",
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        }

        return () => {
          headingSplit?.revert();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  const competitions = [
    {
      title: "Smart India Hackathon (SIH) 2026",
      date: "2026",
      events: ["National Hackathon", "Problem Statement 26160", "IPsec Sentinel"],
      description: "Built and deployed IPsec Sentinel for Problem Statement 26160 — an AI-powered IPsec VPN analyzer with XGBoost risk classification, Post-Quantum Cryptography (PQC) readiness scoring, and cryptographic Merkle tree audit trails. Deployed full-stack with a live frontend on Vercel and API backend on Render."
    },
    {
      title: "Mindkraft 2026",
      date: "27–28 March 2026",
      events: ["Hashes over Roses 3.0", "Crypto Crime 2.0", "IoT Inferno – The MindKraft Challenge"],
      description: "International Level Techno-Management Fest, Karunya Institute of Technology and Sciences. Took part in three cybersecurity- and IoT-focused events."
    },
    {
      title: "Hacknex Hackathon",
      date: "2026",
      events: ["Hackathon Challenge"],
      description: "Participated."
    },
    {
      title: "Aurelion Hackathon",
      date: "2026",
      events: ["24-Hour Hackathon"],
      description: "Participated as part of a small team in a 24-hour hackathon."
    },
  ];

  return (
    <section id="competitions" ref={containerRef} className="py-32 w-full bg-[#0A0B0F] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 
          className="competitions-heading spider-glitch text-[clamp(2rem,6.2vw,6.5rem)] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.05em] leading-[0.9] whitespace-nowrap"
          data-text="Competitions."
        >
          Competitions<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="flex flex-col gap-16 items-center">
          {competitions.map((comp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="gpu-accel w-full md:w-[85%] bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 md:p-12 shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:shadow-[0_0_35px_rgba(217,161,92,0.1)] cursor-default"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                <span className="text-[10rem] text-[#D9A15C] font-black leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-xs mb-3">
                  {comp.date}
                </p>
                <h3 
                  className="spider-glitch text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-5 tracking-[-0.02em]"
                  data-text={comp.title}
                >
                  {comp.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {comp.events.map((event, eIdx) => (
                    <span 
                      key={eIdx}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/8 text-[#EDEDF2] text-xs font-medium tracking-wide group-hover:border-[#D9A15C]/20 transition-colors duration-300"
                    >
                      {event}
                    </span>
                  ))}
                </div>
                {comp.description && (
                  <p className="mt-5 text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-normal">
                    {comp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
