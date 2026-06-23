"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const C = {
  gold: "#d4af37",
  goldLo: "#aa7c11",
  charcoal: "#1a1a1a",
};

export function InfiniteCarousel({ children, repeat = 3 }: { children: React.ReactNode[]; repeat?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const all: React.ReactNode[] = [];
  for (let r = 0; r < repeat; r++) all.push(...children);

  const scrollByAmount = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        aria-label="הקודם"
        onClick={() => scrollByAmount(-1)}
        className="bb-carousel-arrow bb-carousel-arrow-prev"
        style={{
          position: "absolute",
          left: -4,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
          border: "none",
          color: C.charcoal,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
        }}
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={trackRef}
        className="bb-scroll-track"
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          padding: "8px 10px",
          background: "transparent",
        }}
      >
        {all.map((child, i) => (
          <div key={i} style={{ flexShrink: 0, scrollSnapAlign: "start" }}>
            {child}
          </div>
        ))}
      </div>

      <button
        aria-label="הבא"
        onClick={() => scrollByAmount(1)}
        className="bb-carousel-arrow bb-carousel-arrow-next"
        style={{
          position: "absolute",
          right: -4,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
          border: "none",
          color: C.charcoal,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
        }}
      >
        <ChevronRight size={20} />
      </button>

      <style>{`
        .bb-scroll-track::-webkit-scrollbar { display: none; }
        .bb-scroll-track { scrollbar-width: none; -ms-overflow-style: none; }
        @media (max-width: 767px) {
          .bb-carousel-arrow { display: none !important; }
        }
      `}</style>
    </div>
  );
}
