'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  useEffect(() => {
    // If arriving from legacy /Allan-portfolio path or subpaths, immediately forward to root
    if (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('allan-portfolio')) {
      window.location.replace('https://allan-kj.github.io/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="font-mono text-cyan-400 text-xs sm:text-sm tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30">
        404 // Protocol Deviation
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
        Destination Not Found
      </h1>
      <p className="text-neutral-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        The requested path does not exist or has migrated to the root domain.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-sm tracking-wider hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-200"
      >
        RETURN TO PORTFOLIO &rarr;
      </Link>
    </div>
  );
}

