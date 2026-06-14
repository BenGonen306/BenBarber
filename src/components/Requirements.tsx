"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";
import { siteContent } from "@/lib/content";

const cardColors = [
  { num: "text-primary", border: "hover:border-primary/40", bg: "" },
  { num: "text-accent", border: "hover:border-accent/40", bg: "bg-gradient-to-b from-sky-50/50 to-white" },
  { num: "text-primary", border: "hover:border-primary/40", bg: "" },
  { num: "text-accent", border: "hover:border-accent/40", bg: "bg-gradient-to-b from-sky-50/50 to-white" },
];

export function Requirements() {
  const { requirements } = siteContent;

  return (
    <section
      id="requirements"
      className="relative section-padding overflow-hidden bg-[#f8fafc]"
    >
      <div className="container-padded">
        <SectionEyebrow
          eyebrow={requirements.eyebrow}
          title={requirements.title}
          titleAccent={requirements.titleAccent}
          description={requirements.description}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {requirements.items.map((item, index) => {
            const colors = cardColors[index] ?? cardColors[0];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={`relative rounded-2xl border border-gray-200 p-6 hover:-translate-y-1 transition-all ${colors.border} ${colors.bg || "bg-white"}`}
              >
                <div className={`font-display font-black text-3xl mb-3 ${colors.num}`}>
                  0{index + 1}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
