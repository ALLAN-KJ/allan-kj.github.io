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
      itemsRef.current.forEach((item, idx) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.4)",
            duration: 0.75,
            delay: idx * 0.05,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
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
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="competitions-heading spider-glitch text-[clamp(2.5rem,7.5vw,5.5rem)] md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.05em] leading-[0.9]"
          data-text="Competitions."
        >
          <span className="inline-block whitespace-nowrap">
            Competitions<span className="text-[#D9A15C]">.</span>
          </span>
        </h2>

        <div className="flex flex-col gap-16 items-center">
          {competitions.map((comp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="gpu-accel will-change-transform w-full md:w-[85%] bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 md:p-12 shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:shadow-[0_0_35px_rgba(217,161,92,0.1)] cursor-default"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                <span className="text-[10rem] text-[#D9A15C] font-black leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[#D9A15C] font-semibold tracking-[0.14em] uppercase text-xs md:text-sm mb-4">
                  {comp.date}
                </p>
                <h3 
                  className="spider-glitch text-2xl md:text-3xl lg:text-[2.25rem] font-bold font-heading text-[#EDEDF2] mb-3 md:mb-4 tracking-[-0.02em] leading-tight"
                  data-text={comp.title}
                >
                  {comp.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {comp.events.map((event, eIdx) => (
                    <span 
                      key={eIdx}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/8 text-[#EDEDF2]/80 text-xs md:text-sm font-medium tracking-wide group-hover:border-[#D9A15C]/20 transition-colors duration-300"
                    >
                      {event}
                    </span>
                  ))}
                </div>
                {comp.description && (
                  <p className="mt-5 text-[#9A9AA5] text-base md:text-lg lg:text-xl leading-[1.8] font-light">
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
