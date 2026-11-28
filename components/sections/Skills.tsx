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
          gsap.set(itemsRef.current, { opacity: 1, y: 0, scale: 1 });
          gsap.set(".skills-heading", { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.fromTo(
            itemsRef.current,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.12,
              ease: "back.out(1.6)",
              duration: 0.8,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );

          headingSplit = new SplitType(".skills-heading", { types: "chars" });
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
                  trigger: ".skills-heading",
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

  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "C", "Java", "HTML5 & CSS3"],
    },
    {
      title: "Frameworks & 3D",
      skills: ["Next.js", "React", "Three.js", "Tailwind CSS", "GSAP", "Node.js"],
    },
    {
      title: "Security & Tools",
      skills: ["Cybersecurity", "Linux System Administration", "Docker", "Git", "Groq API", "IoT"],
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="gpu-accel group bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(217,161,92,0.1)] shadow-md cursor-default"
            >
              <h3 className="text-lg md:text-xl font-bold font-heading text-[#EDEDF2] mb-6 flex items-center gap-3 tracking-[0.03em] uppercase transition-transform duration-500 group-hover:translate-x-1">
                <span className="w-5 h-5 rounded-full border border-[#D9A15C]/40 flex items-center justify-center group-hover:border-[#D9A15C]/80 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A15C]/60 group-hover:bg-[#D9A15C] transition-colors" />
                </span>
                <span className="spider-glitch" data-text={category.title}>{category.title}</span>
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-[#9A9AA5] font-normal flex items-start gap-3 text-sm leading-[1.7] transition-colors duration-300 group-hover:text-[#EDEDF2]">
                    <span className="text-[#D9A15C] mt-1 opacity-80 group-hover:opacity-100 transition-opacity text-xs">▹</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
