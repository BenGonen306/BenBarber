"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FAQ() {
  const { faq } = siteContent;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative section-padding bg-gray-50 border-y border-gray-200 overflow-hidden"
    >
      <div className="container-padded">
        <SectionEyebrow eyebrow={faq.eyebrow} title={faq.title} align="center" />

        <div className="max-w-3xl mx-auto space-y-3">
          {faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={cn(
                  "rounded-2xl border transition-colors overflow-hidden",
                  isOpen
                    ? "border-primary/40 bg-primary/5"
                    : "border-gray-200 bg-white",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right group"
                >
                  <span className="font-display font-semibold text-base sm:text-lg flex-1">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "h-8 w-8 rounded-full border flex items-center justify-center transition-all flex-shrink-0",
                      isOpen
                        ? "bg-primary text-white border-primary rotate-45"
                        : "border-gray-300 text-foreground/60 group-hover:border-primary group-hover:text-primary",
                    )}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-foreground/75 leading-relaxed text-[15px]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
