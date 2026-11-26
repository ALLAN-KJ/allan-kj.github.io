"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import CertificateModal, { CertificateData } from "@/components/CertificateModal";

export default function Certifications() {
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
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.4)",
            duration: 0.75,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      headingSplit = new SplitType(".certifications-heading", { types: "chars" });
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

  const certifications: CertificateData[] = [
    {
      title: "Google Cloud Certified — Generative AI Leader",
      issuer: "Google Cloud",
      description: "Professional credential certifying strategic competencies in generative AI architectures, Google Cloud AI infrastructure, enterprise model deployment, and AI solutions.",
      image: "/certificates/google-cloud-genai-leader.png",
      date: "Nov 26, 2026",
      credentialId: "8ce04321d17845e18f3ba98e778c6dac",
    },
    {
      title: "Introduction to IoT",
      issuer: "Cisco Networking Academy",
      description: "Student-level credential verifying course completion for Introduction to Internet of Things, covering IoT architecture, digital transformation, automation, and cybersecurity.",
      image: "/certificates/cisco-iot.png",
      date: "Mar 22, 2026",
    },
    {
      title: "Red Hat System Administration I (RH124 - RHA) - Ver. 10",
      issuer: "Red Hat",
      description: "Official 40-hour certificate of attendance covering core Linux command-line skills, user/group administration, storage, and systemd service management.",
      image: "/certificates/redhat-rh124.png",
      date: "March 22, 2026",
      verifyUrl: "https://www.credly.com/badges/d96a0650-ceea-430e-85cd-f56ea4f194a0",
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM SkillsBuild",
      description: "Professional credential satisfying the requirements for Artificial Intelligence Fundamentals, machine learning methodologies, and ethical AI architectures.",
      image: "/certificates/ibm-ai-fundamentals.png",
      date: "Oct 28, 2026",
      verifyUrl: "https://www.credly.com/badges/49bc6703-d622-46a9-a8c5-1a1a95fdd993",
    },
    {
      title: "Oracle Java Foundations (1Z0-811)",
      issuer: "Oracle",
      description: "Covers core Java fundamentals — data types, operators, control structures, arrays, methods, and object-oriented programming (OOP).",
      image: "/certificates/oracle-java.png",
      credentialId: "ORACLE-1Z0-811",
      date: "Sept 24, 2026",
    },
    {
      title: "EC-Council Cybersecurity Workshop",
      issuer: "EC-Council",
      description: "Certificate of Participation — 1 CPE credit.",
      image: "/certificates/ec-council.png",
    },
    {
      title: "AIORI-3 Workshop on Internet Measurements",
      issuer: "MeitY / NIXI & APNIC Foundation",
      description: "Certificate of Participation — AIORI-3 Student Workshop on Internet Measurements, Karunya Institute of Technology and Sciences, Sept 8, 2026 (ISEA Initiative).",
      image: "/certificates/aiori3-apnic.png",
      date: "Sept 8, 2026",
    },
    {
      title: "Privacy and Security in Online Social Media",
      issuer: "NPTEL (IIIT Hyderabad / IIT Madras)",
      description: "12-week NPTEL online certification (Jul–Oct 2026); scored 67% (Elite badge). Roll No: NPTEL26CS141S1084806030.",
      image: "/certificates/nptel-social-media.png",
      date: "Jul–Oct 2026",
      credentialId: "NPTEL26CS141S1084806030",
      verifyUrl: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL26CS141S1084806030",
    },
  ];

  return (
    <section id="certifications" ref={containerRef} className="py-32 w-full bg-[#0A0B0F] overflow-hidden relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 
          className="certifications-heading spider-glitch text-[clamp(2.5rem,8vw,5rem)] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.03em] leading-[0.92]"
          data-text="Certifications."
        >
          Certifications<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="flex flex-col gap-10 items-center">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              onClick={() => setSelectedCert(cert)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${cert.title} certificate`}
              className="gpu-accel w-full md:w-[85%] bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:shadow-[0_0_35px_rgba(217,161,92,0.15)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9A15C]/50"
            >
              {/* Desktop Hover Pill */}
              <div className="absolute top-8 right-8 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.7rem] text-[#D9A15C] font-mono tracking-wider opacity-80 group-hover:opacity-100 group-hover:bg-[#D9A15C]/15 group-hover:border-[#D9A15C]/40 transition-all duration-300">
                <span>View Certificate</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-xs mb-3">
                  {cert.issuer}
                </p>
                <h3 
                  className="spider-glitch text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-3 tracking-[-0.02em]"
                  data-text={cert.title}
                >
                  {cert.title}
                </h3>
                <p className="text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-normal">
                  {cert.description}
                </p>

                {/* Mobile Tap Pill */}
                <div className="mt-4 flex sm:hidden items-center gap-1.5 text-xs text-[#D9A15C] font-medium">
                  <span>Tap to view certificate</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
