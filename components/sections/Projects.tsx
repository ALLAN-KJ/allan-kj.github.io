"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import AnimatedButton from "../AnimatedButton";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;

    if (!container || !pinWrapper || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isReduced: "(prefers-reduced-motion: reduce)",
        isNormal: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isReduced } = context.conditions as { isReduced: boolean; isNormal: boolean };

        let headingSplit: SplitType | null = null;
        if (heading) {
          if (isReduced) {
            gsap.set(heading, { opacity: 1, y: 0 });
          } else {
            headingSplit = new SplitType(".projects-heading", { types: "chars" });
            if (headingSplit.chars) {
              gsap.fromTo(
                headingSplit.chars,
                { y: 60, opacity: 0, scale: 0.75 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  stagger: 0.04,
                  duration: 0.75,
                  ease: "back.out(1.8)",
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    once: true,
                  },
                }
              );
            }
          }
        }

        const cards = track.querySelectorAll(".project-card");
        if (isReduced) {
          gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.fromTo(
            cards,
            { y: 40, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.08,
              duration: 0.75,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: pinWrapper,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        const getScrollAmount = () => {
          const cardList = track.querySelectorAll(".project-card");
          if (cardList.length > 0) {
            const lastCard = cardList[cardList.length - 1] as HTMLElement;
            const firstCard = cardList[0] as HTMLElement;
            const totalDistance = (lastCard.offsetLeft + lastCard.offsetWidth) - firstCard.offsetLeft;
            const endPadding = window.innerWidth < 768 ? 24 : 80;
            return Math.max(0, totalDistance - window.innerWidth + endPadding + firstCard.offsetLeft);
          }
          return Math.max(0, track.scrollWidth - window.innerWidth + 40);
        };

        const horizontalScroll = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 1.3, getScrollAmount() * 1.15)}`,
            pin: true,
            scrub: isReduced ? false : 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          horizontalScroll.kill();
          headingSplit?.revert();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  interface ProjectItem {
    title: string;
    category: string;
    description: string;
    tags?: string[];
    github?: string;
    link: string | null;
    isCurrent?: boolean;
    buttonText: string;
  }

  const projects: ProjectItem[] = [
    {
      title: "Personal Portfolio Website",
      category: "Interactive Portfolio",
      description:
        "Personal portfolio with smooth momentum scrolling, dynamic typography, and an interactive command terminal emulator.",
      github: "https://github.com/ALLAN-KJ/allan-kj.github.io",
      link: null,
      isCurrent: true,
      buttonText: "Currently Viewing",
    },
    {
      title: "Smart India Hackathon 2026",
      category: "IPsec Sentinel • PS 26160",
      description:
        "AI-powered IPsec VPN analyzer with XGBoost risk classification and Merkle tree audit trails.",
      github: "https://github.com/ALLAN-KJ/SIH-2026",
      link: "https://sih-2026-frontend-eight.vercel.app",
      buttonText: "View Live",
    },
    {
      title: "Student LMS Platform",
      category: "Full-Stack Web App",
      description:
        "Full-stack learning management platform with API integration, developed during a software engineering internship.",
      github: "https://github.com/ALLAN-KJ/Quaro-internship",
      link: "https://student-lms-vds8.onrender.com/",
      buttonText: "View Live",
    },
    {
      title: "GHOST",
      category: "AI Voice Assistant",
      description:
        "Desktop AI voice assistant capable of automated messaging and voice-driven web navigation.",
      github: "https://github.com/ALLAN-KJ/GHOST2",
      link: null,
      buttonText: "In Progress",
    },
    {
      title: "Education-Themed 3D Website",
      category: "Interactive 3D Web (In Progress)",
      description:
        "Interactive 3D educational web project featuring custom book geometry and animated page flipping.",
      github: "https://github.com/ALLAN-KJ/BOOK",
      link: null,
      buttonText: "In Progress",
    },
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="w-full relative bg-[#0C0D12] z-[30] overflow-hidden"
    >
      {/* 1. Giant Headline Section: At the top separately, exactly like yesterday */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24 text-center md:text-left">
        <h2
          ref={headingRef}
          aria-label="Selected Works."
          className="projects-heading group text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.9] cursor-pointer"
        >
          <span className="spider-glitch block" data-text="Selected">Selected </span>
          <span className="spider-glitch block" data-text="Works.">
            Works<span className="text-[#D9A15C]">.</span>
          </span>
        </h2>
        <p className="mt-6 text-xs md:text-sm text-[#9A9AA5] tracking-widest uppercase font-mono">
          Scroll down to explore projects →
        </p>
      </div>

      {/* 2. Pinned Horizontal Track: Viewport-height showcase on all devices */}
      <div
        ref={pinWrapperRef}
        className="w-full h-screen min-h-screen flex flex-col justify-between relative overflow-hidden pt-24 md:pt-28 pb-6 md:pb-8"
      >
        {/* Top Status & Progress Bar (In-flow flex row, never overlaps cards) */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 z-40 flex items-center justify-between text-xs md:text-sm font-mono tracking-widest text-[#9A9AA5] uppercase select-none pointer-events-none mb-2 md:mb-4">
          <span className="text-[#EDEDF2] font-semibold tracking-wider">
            Selected work
          </span>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-24 md:w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="w-full h-full bg-[#D9A15C] origin-left transform scale-x-0 transition-transform duration-75"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Track: Seamless horizontal glide across all cards */}
        <div
          ref={trackRef}
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2 + 2rem))",
          }}
          className="gpu-accel flex items-stretch gap-5 md:gap-8 lg:gap-10 w-max overflow-visible select-none will-change-transform my-auto"
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card gpu-accel group flex-shrink-0 w-[82vw] max-w-[340px] md:w-[440px] lg:w-[460px] xl:w-[480px] md:max-w-none h-[450px] md:h-[480px] bg-[#0F111A] border border-[#D9A15C]/15 rounded-[1.75rem] p-6 md:p-8 lg:p-9 flex flex-col justify-between hover:border-[#D9A15C]/50 transition-all duration-300 ease-out md:hover:-translate-y-2 shadow-xl cursor-default relative overflow-hidden backdrop-blur-sm will-change-transform"
            >
              <div>
                {/* Card Header: Category Tag */}
                <div className="flex items-start justify-between gap-3 mb-5 md:mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#D9A15C]/10 border border-[#D9A15C]/20 text-[#D9A15C] font-medium tracking-[0.1em] uppercase text-[0.65rem] md:text-[0.7rem] transition-transform duration-300 group-hover:translate-x-1">
                    {project.category}
                  </span>
                </div>

                {/* Title with uniform min-height */}
                <h3 
                  className="text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-3 md:mb-4 tracking-normal [word-spacing:0.25em] leading-tight transition-colors duration-300 group-hover:translate-x-1 group-hover:text-[#D9A15C] min-h-[3.8rem] md:min-h-[4.5rem] flex items-start"
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-normal">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 md:mt-8 flex items-center gap-3 flex-wrap transition-transform duration-300 group-hover:translate-y-[-2px]">
                {project.isCurrent ? (
                  <div className="px-5 py-2.5 rounded-full border border-[#D9A15C]/40 bg-[#D9A15C]/10 text-[#D9A15C] inline-flex items-center justify-center text-xs md:text-sm font-semibold uppercase tracking-[0.12em] min-h-[40px] cursor-default">
                    Currently Viewing
                  </div>
                ) : project.link ? (
                  <AnimatedButton
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.buttonText}
                  </AnimatedButton>
                ) : (
                  <div className="px-5 py-2.5 rounded-full border border-white/10 text-[#9A9AA5] inline-flex items-center text-xs md:text-sm font-medium cursor-not-allowed uppercase tracking-[0.12em] min-h-[40px]">
                    {project.buttonText}
                  </div>
                )}

                {/* GitHub link button if present */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 text-[#9A9AA5] hover:text-[#D9A15C] hover:border-[#D9A15C]/40 transition-colors inline-flex items-center justify-center min-w-[40px] min-h-[40px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15C]/50"
                    aria-label={`GitHub repository for ${project.title}`}
                    title="View GitHub Repository"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Concluding Card: Explore More on GitHub & Contact */}
          <div
            className="project-card gpu-accel group flex-shrink-0 w-[82vw] max-w-[340px] md:w-[440px] lg:w-[460px] xl:w-[480px] md:max-w-none h-[450px] md:h-[480px] bg-[#0F111A] border border-[#D9A15C]/25 rounded-[1.75rem] p-6 md:p-8 lg:p-9 flex flex-col justify-between hover:border-[#D9A15C]/60 transition-all duration-300 ease-out md:hover:-translate-y-2 shadow-xl cursor-default relative overflow-hidden backdrop-blur-sm will-change-transform"
          >
            <div>
              {/* Card Header: Category Tag & GitHub SVG Link */}
              <div className="flex items-start justify-between gap-3 mb-5 md:mb-6">
                <span className="px-3 py-1 rounded-full bg-[#D9A15C]/15 border border-[#D9A15C]/30 text-[#D9A15C] font-medium tracking-[0.1em] uppercase text-[0.65rem] md:text-[0.7rem] transition-transform duration-300 group-hover:translate-x-1">
                  Open Source &amp; More
                </span>
                <a
                  href="https://github.com/ALLAN-KJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#EDEDF2] hover:text-[#D9A15C] hover:border-[#D9A15C]/40 transition-colors flex-shrink-0"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>

              {/* Title with uniform min-height */}
              <h3 
                className="text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-3 md:mb-4 tracking-normal [word-spacing:0.25em] leading-tight transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white min-h-[3.8rem] md:min-h-[4.5rem] flex items-start"
              >
                More on GitHub
              </h3>

              {/* Description */}
              <p className="text-[#9A9AA5] text-sm leading-[1.7] font-light">
                Explore open-source repositories, ongoing builds, and technical experiments on GitHub.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 md:mt-8 flex items-center gap-4 flex-wrap">
              <AnimatedButton
                href="https://github.com/ALLAN-KJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub
              </AnimatedButton>
              <a
                href="#contact"
                className="text-xs md:text-sm text-[#9A9AA5] hover:text-[#D9A15C] font-mono tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
              >
                <span>Contact</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
