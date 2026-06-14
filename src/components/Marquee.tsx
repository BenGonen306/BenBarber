"use client";

import { siteContent } from "@/lib/content";

// Duplicate items so the CSS loop is seamless
const ITEMS = [...siteContent.marquee, ...siteContent.marquee];

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative py-10 border-y border-gray-200 bg-surface/30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-background pointer-events-none z-10" />
      {/* CSS animation — runs entirely on the compositor thread (no JS jank) */}
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: "marquee-rtl 20s linear infinite",
          willChange: "transform",
        }}
      >
        {ITEMS.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="flex items-center gap-5 md:gap-12 text-base md:text-2xl font-display font-bold text-gray-400"
          >
            <span>{label}</span>
            <span aria-hidden className="text-primary/60">
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
