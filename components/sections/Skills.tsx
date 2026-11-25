"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    let headingSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      headingSplit = new SplitType(".skills-heading", { types: "chars" });
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

  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "C", "Java", "TypeScript", "HTML", "CSS", "JavaScript"],
    },
    {
      title: "APIs & Tools",
      skills: ["ElevenLabs API", "Groq API", "Antigravity", "Docker", "Git", "VS Code"],
    },
    {
      title: "Domains",
      skills: ["Cybersecurity", "System Design", "IoT", "Linux System Administration"],
    },
  ];

  return (
    <section id="skills" ref={containerRef} className="py-48 w-full bg-[#0C0D12] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 
          className="skills-heading spider-glitch text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.05em] leading-[0.9]"
          data-text="Skills."
        >
          Skills<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="group bg-[#0F111A]/90 border border-white/10 rounded-2xl p-7 md:p-8 hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(217,161,92,0.08)] cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D9A15C]">
                    // 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-[#9A9AA5] tracking-wider uppercase">
                    {category.skills.length} Capabilities
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-[#EDEDF2] mb-6 tracking-tight">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-medium text-[#D4D4D8] group-hover:border-[#D9A15C]/20 hover:!border-[#D9A15C]/60 hover:!text-[#EDEDF2] hover:!bg-[#D9A15C]/10 transition-all duration-200 select-none inline-flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A15C]/40" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#9A9AA5]">
                <span className="font-mono">Status: Verified</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
