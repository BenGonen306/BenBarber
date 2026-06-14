"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";

export function Industry() {
  const { industry } = siteContent;

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-72 w-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-padded relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionEyebrow
              eyebrow={industry.eyebrow}
              title={industry.title}
              titleAccent={industry.titleAccent}
              description={industry.description}
            />

            <a href="#contact" className="btn-secondary group">
              לדבר עם רכז הקשרים
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </a>
          </div>

          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-4"
          >
            {industry.bullets.map((bullet, index) => (
              <motion.li
                key={bullet}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card p-5 flex items-start gap-4 hover:border-primary/30 transition-colors"
              >
                <span className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-primary" />
                </span>
                <p className="text-foreground/85 leading-relaxed pt-1.5">
                  {bullet}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
