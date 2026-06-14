"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Play } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const TESTIMONIAL_VIDEO_ID = "XqPhcGt4-UY";

export function Testimonials() {
  const { testimonials } = siteContent;
  const [playing, setPlaying] = useState(false);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${TESTIMONIAL_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&hl=he`;
  const posterUrl = `https://i.ytimg.com/vi/${TESTIMONIAL_VIDEO_ID}/maxresdefault.jpg`;

  return (
    <section className="relative section-padding overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-64 w-64 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="container-padded relative">
        <SectionEyebrow
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
        />

        {/* Quote cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.items.map((item, index) => (
            <motion.figure
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative glass-card p-7 flex flex-col gap-6 hover:border-primary/30"
            >
              <Quote
                className="text-primary/40 absolute top-5 left-5"
                size={28}
              />
              <blockquote className="text-foreground/85 leading-relaxed text-[15px]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-gray-200">
                <div className="font-display font-bold">{item.author}</div>
                <div className="text-xs text-muted">{item.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Testimonial video — students speak directly */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <h3 className="font-display font-bold text-2xl md:text-3xl text-center mb-8">
            שמעו מהם{" "}
            <span className="gradient-text">ישירות</span>
          </h3>

          <div className="relative rounded-3xl overflow-hidden glass-card glow-border aspect-video max-w-3xl mx-auto group">
            {playing ? (
              <iframe
                src={embedUrl}
                title="סרטון ממליצים"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="הפעלת סרטון ממליצים"
                className={cn(
                  "absolute inset-0 w-full h-full",
                  "transition-transform duration-500 group-hover:scale-[1.02]",
                )}
              >
                <img
                  src={posterUrl}
                  alt="סרטון ממליצים"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://i.ytimg.com/vi/${TESTIMONIAL_VIDEO_ID}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_40px_rgba(47,152,62,0.55)] group-hover:scale-110 transition-transform">
                    <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                    <Play
                      size={26}
                      className="relative translate-x-0.5"
                      fill="currentColor"
                    />
                  </span>
                </span>
                <span className="absolute bottom-5 right-5 text-right">
                  <span className="block text-xs tracking-widest text-primary mb-1">
                    סרטון ממליצים
                  </span>
                  <span className="font-display font-bold text-lg text-white">
                    מה אומרים עלינו?
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
