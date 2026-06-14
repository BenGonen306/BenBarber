"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Check } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function WhyGordon() {
  const { whyGordon } = siteContent;
  const [playing, setPlaying] = useState(false);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${whyGordon.youtubeId}?autoplay=1&rel=0&modestbranding=1&hl=he&cc_lang_pref=he`;

  return (
    <section
      id="why-gordon"
      className="relative section-padding overflow-hidden bg-[#f8fafc]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 h-80 w-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-72 w-72 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-10 h-56 w-56 bg-sky-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container-padded relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <SectionEyebrow
              eyebrow={whyGordon.eyebrowAlt ?? whyGordon.eyebrow}
              title={whyGordon.titleAlt ?? whyGordon.title}
              titleAccent={whyGordon.titleAccentAlt ?? whyGordon.titleAccent}
              description={whyGordon.description}
            />

            <ul className="space-y-4">
              {whyGordon.bullets.map((bullet, index) => (
                <motion.li
                  key={bullet.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                    <Check size={16} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-lg leading-snug">
                      {bullet.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mt-0.5">
                      {bullet.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden glass-card glow-border aspect-video group">
              {playing ? (
                <iframe
                  src={embedUrl}
                  title={whyGordon.posterAlt}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="הפעלת סרטון תדמית"
                  className={cn(
                    "absolute inset-0 w-full h-full text-right",
                    "transition-transform duration-500 group-hover:scale-[1.02]",
                  )}
                >
                  <img
                    src={whyGordon.poster}
                    alt={whyGordon.posterAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-background shadow-[0_0_40px_rgba(255,184,0,0.55)] group-hover:scale-110 transition-transform">
                      <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                      <Play size={26} className="relative translate-x-0.5" fill="currentColor" />
                    </span>
                  </span>
                  <span className="absolute bottom-5 right-5 left-5 text-right">
                    <span className="block text-xs tracking-widest text-primary mb-1">
                      סרטון תדמית
                    </span>
                    <span className="font-display font-bold text-lg sm:text-xl text-foreground">
                      הסיפור של אקדמית גורדון
                    </span>
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
