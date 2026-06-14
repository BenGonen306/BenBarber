"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { siteContent } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
      <div className="absolute inset-0 bg-hero-pattern pointer-events-none" />

      {/* Atmospheric campus background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          aria-hidden
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=60"
          alt=""
          className="w-full h-full object-cover opacity-[0.055] mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />
      </div>

      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[10%] h-72 w-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[5%] h-80 w-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container-padded relative w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Text — first on mobile, left column on desktop */}
          <div className="w-full lg:col-span-5 order-1 lg:order-1 lg:sticky lg:top-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-7"
            >
              <Sparkles size={16} />
              {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-xl mb-7 text-balance"
            >
              <span className="block">{hero.title}</span>
              <span className="block gradient-text">{hero.titleHighlight}</span>
              <span className="block text-foreground/95">{hero.titleEnd}</span>
              <span className="block sm:hidden text-2xl font-black text-foreground/80 mt-0.5">
                — באקדמית גורדון
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="body-text max-w-2xl mb-8 text-pretty"
            >
              {hero.subtitle}
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="space-y-3 mb-3"
            >
              {hero.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Check size={13} className="text-primary" />
                  </span>
                  <span className="font-display font-semibold text-base text-foreground/90">
                    {benefit}
                  </span>
                </li>
              ))}
            </motion.ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs text-muted mt-3"
            >
              * כולל 2x קיץ
            </motion.p>
          </div>

          {/* Form — second on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:col-span-7 order-2 lg:order-2"
          >
            <div className="relative rounded-3xl glass-card glow-border p-7 md:p-10 overflow-hidden">
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-1">
                  השאירו פרטים — נחזור אליכם
                </h2>
                <p className="text-sm text-muted">
                  נציג יחזור אליך תוך יום עסקים אחד עם כל הפרטים.
                </p>
              </div>
              {/* Compact form — 3 fields only (name, phone, track) */}
              <ContactForm compact />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
