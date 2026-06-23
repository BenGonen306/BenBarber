"use client";

import { useEffect, useRef } from "react";

export function InfiniteCarousel({ children, speed = 0.5 }: { children: React.ReactNode[]; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const paused = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  const all = [...children, ...children, ...children]; // 3x buffer for seamless wrap

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setMiddle = () => {
      track.scrollLeft = track.scrollWidth / 3;
    };
    setMiddle();

    const tick = () => {
      if (track) {
        if (!paused.current && !isDragging.current) {
          track.scrollLeft += speed;
        }
        const third = track.scrollWidth / 3;
        if (track.scrollLeft >= third * 2) track.scrollLeft -= third;
        else if (track.scrollLeft <= 0) track.scrollLeft += third;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragMoved.current = false;
    paused.current = true;
    startX.current = e.clientX;
    startScroll.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
    trackRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 3) dragMoved.current = true;
    trackRef.current.scrollLeft = startScroll.current - dx;
  };

  const endDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    setTimeout(() => {
      paused.current = false;
    }, 500);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    // suppress click-through after a drag so links/buttons don't fire on swipe
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onClickCapture={onClickCapture}
      className="bb-infinite-carousel"
      style={{
        display: "flex",
        gap: 20,
        overflowX: "auto",
        cursor: "grab",
        userSelect: "none",
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch",
        padding: "8px 10px",
      }}
    >
      {all.map((child, i) => (
        <div key={i} style={{ flexShrink: 0 }}>
          {child}
        </div>
      ))}
      <style>{`
        .bb-infinite-carousel::-webkit-scrollbar { display: none; }
        .bb-infinite-carousel { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
}
