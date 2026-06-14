"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { ContactForm } from "./ContactForm";
import { siteContent } from "@/lib/content";

const iconMap = {
  מייל: Mail,
  כתובת: MapPin,
} as const;

export function Contact() {
  const { contact } = siteContent;

  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 h-96 w-96 bg-primary/8 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 h-96 w-96 bg-accent/8 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container-padded relative">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Form — first on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="w-full lg:col-span-7 lg:order-2"
          >
            <div className="relative rounded-3xl glass-card glow-border p-7 md:p-10 overflow-hidden">
              <ContactForm />
            </div>
          </motion.div>

          {/* Contact details — second on mobile, left column on desktop */}
          <div className="w-full lg:col-span-5 lg:order-1">
            <SectionEyebrow
              eyebrow={contact.eyebrow}
              title={contact.title}
              titleAccent={contact.titleAccent}
              titleEnd={contact.titleEnd}
              description={contact.description}
            />

            <ul className="space-y-3 mt-2">
              {contact.contacts.map((entry) => {
                const Icon =
                  iconMap[entry.label as keyof typeof iconMap] ?? Mail;
                return (
                  <li key={entry.label}>
                    <a
                      href={entry.href}
                      className="flex items-center gap-4 glass-card px-5 py-4 hover:border-accent/30 transition-colors"
                    >
                      <span className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block text-xs text-muted">
                          {entry.label}
                        </span>
                        <span className="block font-display font-semibold text-base">
                          {entry.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
