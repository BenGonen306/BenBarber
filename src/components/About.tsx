"use client";

import { motion } from "framer-motion";
import { Cpu, GraduationCap, BookOpen } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { ImageCarousel } from "./ImageCarousel";
import { siteContent } from "@/lib/content";

const icons = [Cpu, GraduationCap, BookOpen];

export function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50/40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 h-72 w-72 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 h-56 w-56 bg-primary/8 rounded-full blur-3xl" />
      </div>

      {/* Image Carousel — above the section title for immediate visual impact */}
      <div className="container-padded pt-16 pb-10 relative">
        <ImageCarousel />
      </div>

      {/* Section content */}
      <div className="container-padded pb-20 md:pb-28 lg:pb-32 relative">
        <SectionEyebrow
          eyebrow={about.eyebrow}
          title={about.title}
          titleAccent={about.titleAccent}
          description={about.description}
        />

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {about.points.map((point, index) => {
            const Icon = icons[index] ?? Cpu;
            const isBlue = index === 1;
            return (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative glass-card glow-border p-7 group ${isBlue ? "border-accent/30" : ""}`}
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform ${isBlue ? "bg-accent/10 border border-accent/30 text-accent" : "bg-primary/15 border border-primary/30 text-primary"}`}>
                  <Icon size={26} />
                </div>
                <h3 className="heading-sm mb-3">{point.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {point.description}
                </p>
                {"note" in point && point.note && (
                  <p className="text-xs text-muted mt-3 italic leading-relaxed">
                    {(point as { note: string }).note}
                  </p>
                )}
                <div
                  aria-hidden
                  className="absolute top-5 left-5 font-display text-xs text-muted/60 tracking-widest"
                >
                  0{index + 1}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
