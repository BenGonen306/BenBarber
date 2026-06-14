"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { ContactForm } from "./ContactForm";

const DEFAULT_TITLE = "בדיקת זכאות בחינם";
const DEFAULT_SUBTITLE =
  "מלאו פרטים ונציג יחזור אליכם תוך יום עסקים אחד עם כל הפרטים.";

export function ContactModal() {
  const { isOpen, config, closeModal } = useModal();

  const title = config.title ?? DEFAULT_TITLE;
  const subtitle = config.subtitle ?? DEFAULT_SUBTITLE;

  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/65 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />

          {/* Modal panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal
            aria-label={title}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                aria-label="סגור"
                className="absolute top-4 left-4 z-10 h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>

              {/* Green header strip */}
              <div className="bg-[#2f983e] px-8 pt-8 pb-6 text-white">
                <h2 className="font-display font-black text-2xl leading-tight mb-2">
                  {title}
                </h2>
                <p className="text-white/85 text-sm leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Form */}
              <div className="px-8 py-7">
                <ContactForm compact onSuccess={closeModal} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
