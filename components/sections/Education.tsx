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
            const textElement = item.querySelector(".reveal-text");
            const dotElement = item.querySelector(".timeline-dot");
            if (textElement) gsap.set(textElement, { opacity: 1, y: 0, scale: 1 });
            if (dotElement) gsap.set(dotElement, { opacity: 1, scale: 1, backgroundColor: "#D9A15C" });
          });
          gsap.set(".education-heading", { opacity: 1, y: 0, scale: 1 });
        } else {
          itemsRef.current.forEach((item) => {
            if (!item) return;

            const textElement = item.querySelector(".reveal-text");
            const dotElement = item.querySelector(".timeline-dot");

            if (textElement && dotElement) {
              gsap.fromTo(
                textElement,
                { opacity: 0, y: 30, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  ease: "back.out(1.3)",
                  duration: 0.75,
                  scrollTrigger: {
                    trigger: item,
                    start: "top 88%",
                    once: true,
                  },
                }
              );

              gsap.fromTo(
                dotElement,
                { scale: 0, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  backgroundColor: "#D9A15C",
                  ease: "back.out(2.2)",
                  duration: 0.6,
                  scrollTrigger: {
                    trigger: item,
                    start: "top 88%",
                    once: true,
                  },
                }
              );
            }
          });

          headingSplit = new SplitType(".education-heading", { types: "chars" });
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
                  trigger: ".education-heading",
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

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-12">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="gpu-accel mb-24 relative pl-10 md:pl-16 group"
            >
              <div className="timeline-dot absolute -left-[11px] top-2 w-4 h-4 rounded-full border-2 border-[#D9A15C]/60 bg-[#0A0B0F] z-10 transition-all duration-500 group-hover:border-[#D9A15C] group-hover:bg-[#D9A15C]/20" />

              <div className="reveal-text transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-xs mb-4">
                  {edu.location}
                </p>
                <h3 
                  className="spider-glitch text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-3 tracking-[-0.02em]"
                  data-text={edu.institution}
                >
                  {edu.institution}
                </h3>
                <p className="text-[#EDEDF2] text-lg font-medium leading-[1.7] mb-2">{edu.degree}</p>
                <p className="text-[#9A9AA5] text-sm md:text-base font-normal leading-[1.7] mb-2">{edu.specialization}</p>
                <p className="text-[#D9A15C]/90 text-sm font-medium tracking-wide">{edu.cgpa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
