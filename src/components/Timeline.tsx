"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";
import { useModal } from "@/context/ModalContext";

export function Timeline() {
  const { timeline } = siteContent;
  const { openModal } = useModal();

  return (
    <section
      id="timeline"
      className="relative section-padding bg-gradient-to-br from-sky-50/60 via-gray-50 to-white border-y border-gray-200 overflow-hidden"
    >
      {/* Atmospheric background image at low opacity */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://upload.wikimedia.org/wikipedia/commons/9/97/Gordon_College_of_Education.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.055,
          mixBlendMode: "multiply",
        }}
      />
      <div className="container-padded">
        <SectionEyebrow
          eyebrow={timeline.eyebrow}
          title={timeline.title}
          titleAccent={timeline.titleAccent}
          description={timeline.description}
        />

        {timeline.notice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-2xl bg-primary/8 border border-primary/25 px-6 py-4"
          >
            <p className="text-sm text-primary font-medium">{timeline.notice}</p>
          </motion.div>
        )}

        <div className="relative">
          <div
            aria-hidden
            className="absolute right-6 lg:right-1/2 top-2 bottom-2 w-px lg:translate-x-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
          />

          <ol className="space-y-10 lg:space-y-16">
            {timeline.steps.map((step, index) => {
              const isRight = index % 2 === 0;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`relative pr-16 lg:pr-0 lg:grid lg:grid-cols-2 lg:gap-12`}
                >
                  <div className="absolute right-2 lg:right-1/2 top-2 h-9 w-9 lg:translate-x-1/2 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_24px_rgba(47,152,62,0.2)]">
                    <Calendar size={14} />
                  </div>

                  <div
                    className={`${
                      isRight
                        ? "lg:col-start-1 lg:text-left lg:pl-16"
                        : "lg:col-start-2 lg:text-right lg:pr-16"
                    }`}
                  >
                    <div className="glass-card p-6 hover:border-primary/30 transition-colors">
                      <div className="inline-flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                        {step.date}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* CTA after timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block rounded-3xl bg-primary/8 border border-primary/25 px-8 py-7 max-w-2xl">
            <p className="font-display font-bold text-xl mb-2">
              אישורי דחיית השירות נסגרים ב-30.6.2026
            </p>
            <p className="text-foreground/70 mb-6">
              אל תחכה לרגע האחרון — תהליך הרישום לוקח זמן.
            </p>
            <button
              onClick={() => openModal()}
              className="btn-primary text-lg px-10 py-4"
            >
              שמור מקום עכשיו ובדוק זכאות למלגות »
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
