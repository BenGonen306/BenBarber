"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";
import { useModal } from "@/context/ModalContext";

export function Scholarships() {
  const { scholarships } = siteContent;
  const { openModal } = useModal();

  return (
    <section
      id="scholarships"
      className="relative section-padding overflow-hidden bg-[#f8fafc]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 h-80 w-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 h-80 w-80 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 h-56 w-56 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="container-padded relative">
        <SectionEyebrow
          eyebrow={scholarships.eyebrow}
          title={scholarships.title}
          titleAccent={scholarships.titleAccent}
          description={scholarships.description}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {scholarships.cards.map((card, index) => (
            <motion.article
              key={card.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 overflow-hidden flex flex-col ${
                index === 0
                  ? "bg-gradient-to-br from-primary/10 via-primary/5 to-white border border-primary/30"
                  : "glass-card hover:border-primary/30 transition-colors"
              }`}
            >
              {index === 0 && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-bold">
                  <Sparkles size={11} /> הכי משתלם
                </div>
              )}

              <div className="text-xs tracking-widest text-muted uppercase mb-3">
                {card.tag}
              </div>
              <div className="font-display text-4xl font-black mb-1 gradient-text">
                {card.amount}
              </div>
              <div className="text-sm text-muted mb-5">{card.period}</div>
              <p className="text-foreground/75 leading-relaxed mb-6 text-[15px]">
                {card.description}
              </p>

              <ul className="space-y-2.5 mt-auto">
                {card.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground/85"
                  >
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display font-bold text-xl mb-2">
              {scholarships.bannerTitle}
            </h3>
          </div>
          <button
            onClick={() => openModal()}
            className="btn-primary self-start md:self-auto"
          >
            לבדיקת זכאות אישית
          </button>
        </motion.div>
      </div>
    </section>
  );
}
