"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";
import { useModal } from "@/context/ModalContext";

export function Certificates() {
  const { certificates } = siteContent;
  const { openModal } = useModal();

  return (
    <section
      id="certificates"
      className="relative section-padding overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 h-72 w-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 bg-sky-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 bg-accent/12 rounded-full blur-3xl" />
      </div>

      <div className="container-padded relative">
        <SectionEyebrow
          eyebrow={certificates.eyebrow}
          title={certificates.title}
          titleAccent={certificates.titleAccent}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {certificates.items.map((item, index) => {
            const isBlue = index === 1;
            return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.12 }}
              className={`relative rounded-3xl bg-white p-7 overflow-hidden group border ${isBlue ? "border-accent/30 bg-gradient-to-b from-sky-50/60 to-white hover:border-accent/50" : "border-gray-200 hover:border-primary/40"}`}
            >
              <div className="absolute -top-6 -left-6 font-display text-8xl font-black text-white/[0.025] tracking-tighter">
                {item.number}
              </div>

              <div className="relative">
                <div className="flex items-baseline justify-between mb-5">
                  <span className={`text-xs font-bold tracking-widest ${isBlue ? "text-accent" : "text-primary"}`}>
                    {item.number}
                  </span>
                  <span className="text-xs text-muted">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="heading-sm mb-2.5">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-6 text-[15px]">
                  {item.description}
                </p>

                <ul className="space-y-2.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <span className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${isBlue ? "bg-accent/10 border border-accent/30" : "bg-primary/15 border border-primary/30"}`}>
                        <Check size={12} className={isBlue ? "text-accent" : "text-primary"} />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* CTA after certificates */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/70 mb-5 text-lg">
            רוצה לדעת איך להגיע לכל 3 התעודות האלו?
          </p>
          <button
            onClick={() => openModal()}
            className="btn-primary text-lg px-10 py-4"
          >
            בדוק זכאות ומסלול מתאים »
          </button>
        </motion.div>
      </div>
    </section>
  );
}
