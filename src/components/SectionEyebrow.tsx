"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  titleEnd?: string;
  description?: string;
  align?: "right" | "center";
}

export function SectionEyebrow({
  eyebrow,
  title,
  titleAccent,
  titleEnd,
  description,
  align = "right",
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-14",
        align === "center" && "mx-auto text-center",
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-5"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="heading-lg text-balance"
      >
        {title}{" "}
        {titleAccent && (
          <span className="gradient-text">{titleAccent}</span>
        )}{" "}
        {titleEnd && <span>{titleEnd}</span>}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="body-text mt-5 text-pretty"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
