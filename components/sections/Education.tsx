"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let headingSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const textElement = item.querySelector(".reveal-text");
        const dotElement = item.querySelector(".timeline-dot");

        if (textElement && dotElement) {
          gsap.fromTo(
            textElement,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              ease: "power3.out",
              duration: 0.8,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            dotElement,
            { scale: 0, backgroundColor: "#3f3f46" },
            {
              scale: 1,
              backgroundColor: "#D9A15C",
              ease: "back.out(1.7)",
              duration: 0.6,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });

      headingSplit = new SplitType(".education-heading", { types: "chars" });
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

  const educationList = [
    {
      institution: "Karunya Institute of Technology and Sciences",
      degree: "B.Tech — Computer Science & Engineering",
      specialization: "Specialisation: Cybersecurity",
      location: "Coimbatore, India",
      cgpa: "CGPA: 7.06 / 10",
    },
  ];

  return (
    <section id="education" ref={containerRef} className="py-48 w-full bg-[#0C0D12] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 
          className="education-heading spider-glitch text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] mb-20 tracking-[-0.05em] leading-[0.9]"
          data-text="Education."
        >
          Education<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="bg-[#0F111A]/90 border border-white/10 rounded-2xl p-8 md:p-12 hover:border-[#D9A15C]/40 transition-all duration-300 ease-out shadow-xl relative overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D9A15C] px-3 py-1 rounded-full bg-[#D9A15C]/10 border border-[#D9A15C]/20">
                      B.Tech Undergraduate
                    </span>
                    <span className="font-mono text-xs text-[#9A9AA5] tracking-wide">
                      {edu.location}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold font-heading text-[#EDEDF2] tracking-tight">
                    {edu.institution}
                  </h3>
                </div>

                <div className="flex flex-col items-start md:items-end flex-shrink-0">
                  <span className="font-mono text-xs text-[#9A9AA5] uppercase tracking-wider mb-1">Cumulative Grade</span>
                  <span className="font-mono text-lg md:text-xl font-bold text-[#D9A15C] px-3 py-1 rounded-lg bg-[#D9A15C]/10 border border-[#D9A15C]/30">
                    {edu.cgpa}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#D1D5DB]">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="font-mono text-xs text-[#9A9AA5] uppercase tracking-wider block mb-2">Program</span>
                  <p className="text-base md:text-lg font-medium text-[#EDEDF2]">{edu.degree}</p>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="font-mono text-xs text-[#9A9AA5] uppercase tracking-wider block mb-2">Major Focus</span>
                  <p className="text-base md:text-lg font-medium text-[#D9A15C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D9A15C]" />
                    {edu.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
