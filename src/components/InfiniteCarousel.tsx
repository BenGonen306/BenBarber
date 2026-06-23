"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

export function InfiniteCarousel({ children, speed = 40 }: { children: React.ReactNode[]; speed?: number }) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const ready = useRef(false);

  const all = [...children, ...children, ...children]; // 3x buffer for seamless wrap

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const setWidth = trackRef.current.scrollWidth / 3;
      setWidthRef.current = setWidth;
      x.set(-setWidth);
      ready.current = true;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationFrame((_, delta) => {
    if (isDragging.current || isHovering.current || !ready.current) return;
    const setWidth = setWidthRef.current;
    if (!setWidth) return;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -setWidth * 2) next += setWidth;
    x.set(next);
  });

  const wrap = () => {
    const setWidth = setWidthRef.current;
    if (!setWidth) return;
    let val = x.get();
    while (val <= -setWidth * 2) val += setWidth;
    while (val > 0) val -= setWidth;
    x.set(val);
  };

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        ref={trackRef}
        drag="x"
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={() => {
          isDragging.current = false;
          wrap();
        }}
        onMouseEnter={() => {
          isHovering.current = true;
        }}
        onMouseLeave={() => {
          isHovering.current = false;
        }}
        style={{
          display: "flex",
          gap: 20,
          width: "max-content",
          x,
          cursor: "grab",
          padding: "8px 10px",
        }}
      >
        {all.map((child, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
