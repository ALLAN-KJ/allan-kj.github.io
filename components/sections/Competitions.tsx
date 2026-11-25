"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import CertificateModal, { CertificateData } from "@/components/CertificateModal";

export default function Competitions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);

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
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      headingSplit = new SplitType(".competitions-heading", { types: "chars" });
      gsap.from(headingSplit.chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
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
      description: "Built and deployed a full-stack web and backend solution for Problem Statement 26160.",
    },
    {
      title: "Mindkraft 2026",
      date: "27–28 March 2026",
      events: ["Hashes over Roses 3.0", "Crypto Crime 2.0", "IoT Inferno – The MindKraft Challenge"],
      description: "International Level Techno-Management Fest, Karunya Institute of Technology and Sciences. Took part in three cybersecurity- and IoT-focused events.",
      image: "/certificates/mindkraft.png",
      issuer: "Karunya Institute of Technology and Sciences",
    },
    {
      title: "Conesta Forge",
      date: "June 2026",
      events: ["5-Day AI Build Sprint"],
      description: "Shipped a working web application solo under a 5-day deadline, finishing #33 on the leaderboard.",
      image: "/certificates/conesta-forge.png",
      issuer: "Conesta Forge (powered by Fludigo)",
    },
    {
      title: "Hacknex Hackathon",
      date: "2026",
      events: ["Hackathon Challenge"],
      description: "Participated in high-intensity software build and problem-solving competition.",
      image: "/certificates/hacknex.png",
      issuer: "Hacknex Hackathon",
    },
    {
      title: "Aurelion Hackathon",
      date: "2026",
      events: ["24-Hour Hackathon"],
      description: "Participated as part of a small team.",
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

        <div className="flex flex-col gap-16 items-center">
          {competitions.map((comp, idx) => {
            const hasCertificate = Boolean(comp.image);
            return (
              <div
                key={idx}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
                onClick={() => {
                  if (hasCertificate && comp.image && comp.issuer) {
                    setSelectedCert({
                      title: comp.title,
                      issuer: comp.issuer,
                      description: comp.description,
                      image: comp.image,
                    });
                  }
                }}
                onKeyDown={(e) => {
                  if (hasCertificate && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    if (comp.image && comp.issuer) {
                      setSelectedCert({
                        title: comp.title,
                        issuer: comp.issuer,
                        description: comp.description,
                        image: comp.image,
                      });
                    }
                  }
                }}
                role={hasCertificate ? "button" : undefined}
                tabIndex={hasCertificate ? 0 : undefined}
                aria-label={hasCertificate ? `View ${comp.title} certificate` : undefined}
                className={`w-full md:w-[85%] bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 md:p-12 shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:shadow-[0_0_35px_rgba(217,161,92,0.1)] ${
                  hasCertificate ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9A15C]/50" : "cursor-default"
                }`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                  <span className="text-[10rem] text-[#D9A15C] font-black leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {hasCertificate && (
                  <div className="absolute top-8 right-8 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.7rem] text-[#D9A15C] font-mono tracking-wider opacity-80 group-hover:opacity-100 group-hover:bg-[#D9A15C]/15 group-hover:border-[#D9A15C]/40 transition-all duration-300">
                    <span>View Certificate</span>
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}
                
                <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                  <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.65rem] mb-4">
                    {comp.date}
                  </p>
                  <h3 
                    className="spider-glitch text-3xl md:text-4xl font-bold font-heading text-[#EDEDF2] mb-7 tracking-[-0.02em]"
                    data-text={comp.title}
                  >
                    {comp.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {comp.events.map((event, eIdx) => (
                      <span 
                        key={eIdx}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/8 text-[#9A9AA5] text-xs font-medium tracking-wide group-hover:border-[#D9A15C]/20 transition-colors duration-300"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                  {comp.description && (
                    <p className="mt-5 text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-light">
                      {comp.description}
                    </p>
                  )}

                  {hasCertificate && (
                    <div className="mt-5 flex sm:hidden items-center gap-1.5 text-xs text-[#D9A15C] font-medium">
                      <span>Tap to view certificate</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
