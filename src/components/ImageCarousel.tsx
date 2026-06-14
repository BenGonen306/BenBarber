"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Gordon Academic College photos — all served locally as WebP
const IMAGES = [
  {
    src: "/campus/gordon.webp",
    alt: "האקדמית גורדון",
    caption: "קמפוס האקדמית גורדון, חיפה",
  },
  {
    src: "/campus/night.webp",
    alt: "האקדמית גורדון בלילה",
    caption: "קמפוס גורדון בשעות הערב",
  },
  {
    src: "/campus/room-vr.webp",
    alt: "כיתת VR וחדשנות",
    caption: "מעבדת VR וחדשנות טכנולוגית",
  },
  {
    src: "/campus/room-pixel.webp",
    alt: "כיתת מחשבים Pixel Me",
    caption: "כיתות מחשוב חדישות",
  },
  {
    src: "/campus/room-color.webp",
    alt: "כיתת לימוד צבעונית",
    caption: "סביבת למידה יצירתית ומחשבת",
  },
];

const AUTOPLAY_MS = 5000;

export function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number, d: 1 | -1) => {
    setDir(d);
    setCurrent((next + IMAGES.length) % IMAGES.length);
  }, []);

  const prev = useCallback(() => go(current - 1, -1), [current, go]);
  const next = useCallback(() => go(current + 1, 1), [current, go]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(current + 1, 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [current, paused, go]);

  // Preload the next image so transitions are instant
  useEffect(() => {
    const nextSrc = IMAGES[(current + 1) % IMAGES.length].src;
    const img = new window.Image();
    img.src = nextSrc;
  }, [current]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/7] bg-gray-100 group select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <img
            src={IMAGES[current].src}
            alt={IMAGES[current].alt}
            className="w-full h-full object-cover"
            loading={current === 0 ? "eager" : "lazy"}
            draggable={false}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
          <p className="absolute bottom-4 right-5 text-white text-sm font-semibold drop-shadow-lg">
            {IMAGES[current].caption}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Arrows — show on hover desktop, always on mobile */}
      <button
        onClick={next}
        aria-label="תמונה הבאה"
        className="absolute top-1/2 left-3 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-lg transition-all sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
      <button
        onClick={prev}
        aria-label="תמונה קודמת"
        className="absolute top-1/2 right-3 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-lg transition-all sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            aria-label={`תמונה ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-7 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
