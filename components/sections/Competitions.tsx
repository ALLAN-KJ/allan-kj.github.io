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

    let headingSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      headingSplit = new SplitType(".competitions-heading", { types: "chars" });
      gsap.from(headingSplit.chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        y: 50,
        opacity: 0,
        stagger: 0.05,
        ease: "power4.out",
        duration: 0.8,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      headingSplit?.revert();
    };
  }, []);

  const competitions = [
    {
      title: "Smart India Hackathon (SIH) 2026",
      date: "2026",
      events: ["National Hackathon — PS 26160"],
      description: "Built and deployed a full-stack web and backend solution for Problem Statement 26160."
    },
    {
      title: "Mindkraft 2026",
      date: "27–28 March 2026",
      events: ["Hashes over Roses 3.0", "Crypto Crime 2.0", "IoT Inferno – The MindKraft Challenge"],
      description: "International Level Techno-Management Fest, Karunya Institute of Technology and Sciences. Took part in three cybersecurity- and IoT-focused events."
    },
    {
      title: "Conesta Forge",
      date: "June 2026",
      events: ["5-Day AI Build Sprint"],
      description: "Shipped a working web application solo under a 5-day deadline, finishing #33 on the leaderboard."
    },
    {
      title: "Hacknex Hackathon",
      date: "2026",
      events: ["Hackathon Challenge"],
      description: "Participated in high-intensity software build and problem-solving competition."
    },
    {
      title: "Aurelion Hackathon",
      date: "2026",
      events: ["24-Hour Hackathon"],
      description: "Participated as part of a small team."
    },
  ];

  return (
    <section id="competitions" ref={containerRef} className="py-32 w-full bg-[#0A0B0F] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 
          className="competitions-heading spider-glitch text-[clamp(2.5rem,8vw,5rem)] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.03em] leading-[0.92]"
          data-text="Competitions."
        >
          Competitions<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((comp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className={`bg-[#0F111A]/90 border border-white/10 rounded-2xl p-7 md:p-8 shadow-lg relative overflow-hidden group hover:border-[#D9A15C]/40 hover:-translate-y-1 transition-all duration-300 ease-out cursor-default flex flex-col justify-between ${
                idx === 0 ? "md:col-span-2 md:p-10" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D9A15C]">
                    {comp.date}
                  </span>
                  {idx === 0 && (
                    <span className="font-mono text-xs uppercase tracking-wider text-[#D9A15C] px-2.5 py-0.5 rounded-full bg-[#D9A15C]/10 border border-[#D9A15C]/20">
                      Featured Hackathon
                    </span>
                  )}
                </div>

                <h3 className={`font-bold font-heading text-[#EDEDF2] mb-4 tracking-tight group-hover:text-white transition-colors ${
                  idx === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                }`}>
                  {comp.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {comp.events.map((event, eIdx) => (
                    <span 
                      key={eIdx}
                      className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[#D4D4D8] text-xs font-mono tracking-wide group-hover:border-[#D9A15C]/30 transition-colors"
                    >
                      {event}
                    </span>
                  ))}
                </div>

                {comp.description && (
                  <p className="text-[#D1D5DB] text-sm md:text-base leading-[1.7] font-normal">
                    {comp.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#9A9AA5] font-mono">
                <span>Entry #{String(idx + 1).padStart(2, "0")}</span>
                <span className="group-hover:text-[#D9A15C] transition-colors">Competitive Record →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
