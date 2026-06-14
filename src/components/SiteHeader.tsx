"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const C = {
  red: "#96031a",
  gold: "#d4af37",
  goldHi: "#e9d2a6",
  goldLo: "#aa7c11",
  charcoal: "#1a1a1a",
  white: "#ffffff",
  muted: "#c8c8c8",
};

const navLinks = [
  { label: "דף הבית", href: "/" },
  { label: "המספרה", href: "/barbershop" },
  { label: "האקדמיה", href: "/academy" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        background: scrolled
          ? "rgba(26,26,26,0.94)"
          : "linear-gradient(to bottom, rgba(26,26,26,0.88), transparent)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(150,3,26,0.35)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${C.red}, #6b0213)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-rubik), sans-serif",
              fontWeight: 900,
              fontSize: 22,
              color: C.gold,
              boxShadow: "0 4px 18px rgba(150,3,26,0.5)",
              flexShrink: 0,
            }}
          >
            ב
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: C.white,
              }}
            >
              BenBarber
            </div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.05em" }}>
              Academy & Shop
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: 28 }}
          className="bb-desktop-nav"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-rubik), sans-serif",
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? C.goldHi : C.muted,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  borderBottom: active ? `2px solid ${C.gold}` : "2px solid transparent",
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = C.goldHi)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = active ? C.goldHi : C.muted)
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/barbershop"
            className="bb-desktop-cta"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
              color: C.charcoal,
              borderRadius: 10,
              padding: "10px 22px",
              fontFamily: "var(--font-rubik), sans-serif",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(212,175,55,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            לקביעת תור
          </Link>

          {/* Hamburger */}
          <button
            className="bb-hamburger"
            aria-label="פתח תפריט"
            onClick={() => setOpen((v) => !v)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: C.white,
            }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              overflow: "hidden",
              background: "rgba(22,22,22,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(150,3,26,0.3)",
            }}
          >
            <nav
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "1.25rem 1.5rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-rubik), sans-serif",
                      fontSize: 18,
                      fontWeight: active ? 800 : 500,
                      color: active ? C.goldHi : C.white,
                      textDecoration: "none",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                <Link
                  href="/barbershop"
                  style={{
                    background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
                    color: C.charcoal,
                    borderRadius: 12,
                    padding: "14px 24px",
                    fontFamily: "var(--font-rubik), sans-serif",
                    fontWeight: 800,
                    fontSize: 16,
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  לקביעת תור עכשיו ←
                </Link>
                <Link
                  href="/academy"
                  style={{
                    background: "transparent",
                    color: C.white,
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    borderRadius: 12,
                    padding: "14px 24px",
                    fontFamily: "var(--font-rubik), sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  לאקדמיה
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) { .bb-hamburger { display: none !important; } }
        @media (max-width: 1023px) {
          .bb-desktop-nav { display: none !important; }
          .bb-desktop-cta { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
