"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "על המסלול", href: "#about" },
  { label: "למה גורדון", href: "#why-gordon" },
  { label: "תעודות", href: "#certificates" },
  { label: "מלגות", href: "#scholarships" },
  { label: "שאלות נפוצות", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-padded h-[72px] flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center font-display font-black text-white text-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
            ג
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-bold text-base">האקדמית גורדון</div>
            <div className="text-[11px] text-muted tracking-wide">
              בית הספר להנדסאים
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/70 hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 left-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5"
          >
            הרשמה
          </a>
          <button
            type="button"
            aria-label="פתח תפריט"
            onClick={() => setOpen((value) => !value)}
            className="lg:hidden h-10 w-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-foreground"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl"
          >
            <nav className="container-padded py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 self-start"
              >
                להרשמה למסלול
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
