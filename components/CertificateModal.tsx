"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

export interface CertificateData {
  title: string;
  issuer: string;
  description: string;
  image: string;
  credentialId?: string;
  date?: string;
}

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  onClose,
}: CertificateModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!certificate) return;

    // Lock smooth scroll and window scrolling
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      lenis?.start();
    };
  }, [certificate, handleKeyDown]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      style={{ willChange: "opacity, transform" }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0F111A] border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0B0F]/80">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D9A15C] animate-pulse" />
            <span className="text-[#D9A15C] font-mono text-xs uppercase tracking-widest font-semibold">
              {certificate.issuer}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close certificate modal"
            className="group flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Certificate Display Area */}
        <div className="relative flex-1 min-h-[300px] max-h-[64vh] overflow-y-auto bg-[#07080C] flex items-center justify-center p-4 md:p-6 group">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={certificate.image}
              alt={certificate.title}
              width={1400}
              height={950}
              className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg border border-white/5 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              priority
              quality={95}
            />
          </div>
        </div>

        {/* Details & Actions Footer */}
        <div className="px-6 py-5 bg-[#0F111A] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold font-heading text-[#EDEDF2] mb-1 tracking-tight">
              {certificate.title}
            </h3>
            <p className="text-xs md:text-sm text-[#9A9AA5] leading-relaxed line-clamp-2">
              {certificate.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={certificate.image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#D9A15C]/15 border border-white/10 hover:border-[#D9A15C]/40 text-xs md:text-sm font-medium text-[#EDEDF2] hover:text-[#D9A15C] transition-all duration-200 cursor-pointer"
            >
              <span>View Full Resolution</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#ED2024]/10 hover:bg-[#ED2024]/20 border border-[#ED2024]/30 text-xs md:text-sm font-medium text-[#ED2024] transition-all duration-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

