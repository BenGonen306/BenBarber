"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Instagram, Star, ChevronDown } from "lucide-react";

/* ─── Palette tokens ─────────────────────────────────────── */
const C = {
  red: "#96031a",
  redDeep: "#6b0213",
  charcoal: "#1a1a1a",
  surface: "#232323",
  gold: "#d4af37",
  goldHi: "#e9d2a6",
  goldLo: "#aa7c11",
  white: "#ffffff",
  muted: "#c8c8c8",
  dim: "#888888",
};

/* ─── Smooth-scroll helper ───────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════ */
const navLinks = [
  { label: "המספרה", href: "barbershop" },
  { label: "האקדמיה", href: "academy" },
  { label: "מי אני", href: "about" },
  { label: "צור קשר", href: "contact" },
];

function Navbar({
  onBooking,
  onAcademy,
}: {
  onBooking: () => void;
  onAcademy: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    if (href === "academy") { onAcademy(); return; }
    scrollTo(href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        insetInline: 0,
        zIndex: 50,
        transition: "all 0.4s",
        background: scrolled
          ? "rgba(26,26,26,0.92)"
          : "linear-gradient(to bottom, rgba(26,26,26,0.85), transparent)",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(150,3,26,0.3)` : "1px solid transparent",
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
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${C.red}, ${C.redDeep})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: 22,
              color: C.gold,
              boxShadow: `0 4px 18px rgba(150,3,26,0.45)`,
            }}
          >
            ב
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 16, color: C.white }}>
              בן גונן
            </div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.05em" }}>
              מספרה פרמיום · אקדמיה
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "'Assistant', sans-serif",
                color: C.muted,
                transition: "color 0.2s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.goldHi)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onBooking}
            className="desktop-cta"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
              color: C.charcoal,
              border: "none",
              borderRadius: 10,
              padding: "10px 22px",
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: `0 4px 16px rgba(212,175,55,0.35)`,
            }}
          >
            קביעת תור
          </button>
          {/* Hamburger */}
          <button
            className="hamburger-btn"
            aria-label="פתח תפריט"
            onClick={() => setOpen((v) => !v)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: `1px solid rgba(255,255,255,0.12)`,
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              background: "rgba(26,26,26,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: `1px solid rgba(150,3,26,0.3)`,
              overflow: "hidden",
            }}
          >
            <nav
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    fontFamily: "'Rubik', sans-serif",
                    color: C.white,
                    textAlign: "right",
                    padding: "6px 0",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setOpen(false); onBooking(); }}
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
                  color: C.charcoal,
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 24px",
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  marginTop: 8,
                  alignSelf: "flex-start",
                }}
              >
                קביעת תור עכשיו →
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero({ onBooking, onAcademy }: { onBooking: () => void; onAcademy: () => void }) {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 1.5rem 80px",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Animated blobs */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(150,3,26,0.55) 0%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)`,
          filter: "blur(55px)",
          pointerEvents: "none",
        }}
      />

      {/* Diagonal epoxy streaks overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(120deg, transparent 0px, transparent 80px, rgba(255,255,255,0.018) 80px, rgba(255,255,255,0.018) 81px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 999,
            background: "rgba(212,175,55,0.12)",
            border: `1px solid rgba(212,175,55,0.35)`,
            color: C.goldHi,
            fontSize: 13,
            fontFamily: "'Assistant', sans-serif",
            fontWeight: 600,
            marginBottom: 28,
            letterSpacing: "0.05em",
          }}
        >
          <Star size={14} style={{ color: C.gold }} />
          מספרה פרמיום | חולון
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            lineHeight: 1.1,
            color: C.white,
            marginBottom: 20,
          }}
        >
          אני{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold}, ${C.goldLo})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            בן גונן
          </span>
          ,<br />
          ואני פשוט יודע
          <br />
          מה גבר צריך.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Assistant', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: C.muted,
            lineHeight: 1.75,
            marginBottom: 44,
            maxWidth: 620,
            margin: "0 auto 44px",
          }}
        >
          תספורת היא לא רק שיער — היא הדרך שאתה נכנס לחדר.
          <br />
          בן גונן · מספרה פרמיום · חולון
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={onBooking}
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
              color: C.charcoal,
              border: "none",
              borderRadius: 12,
              padding: "16px 36px",
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 800,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: `0 6px 28px rgba(212,175,55,0.4)`,
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 10px 36px rgba(212,175,55,0.55)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 6px 28px rgba(212,175,55,0.4)`;
            }}
          >
            קביעת תור ←
          </button>
          <button
            onClick={onAcademy}
            style={{
              background: "transparent",
              color: C.white,
              border: `1.5px solid rgba(255,255,255,0.25)`,
              borderRadius: 12,
              padding: "16px 36px",
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.gold;
              e.currentTarget.style.color = C.goldHi;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.color = C.white;
            }}
          >
            לאקדמיה
          </button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginTop: 60, color: C.dim, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}
          onClick={() => scrollTo("barbershop")}
        >
          <ChevronDown size={22} />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MARQUEE / TICKER
═══════════════════════════════════════════════════════════ */
const marqueeItems = [
  "תספורת גברים פרמיום",
  "גילוח ועיצוב זקן",
  "לקוחות סלבריטי",
  "חולון · בית הספר לספרות",
  "שינוי סטייל · שינוי חיים",
  "בן גונן",
];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "16px 0",
        background: `linear-gradient(90deg, ${C.redDeep}, ${C.red}, ${C.redDeep})`,
        borderTop: `1px solid rgba(212,175,55,0.2)`,
        borderBottom: `1px solid rgba(212,175,55,0.2)`,
        whiteSpace: "nowrap",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ display: "inline-flex", gap: 0 }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.1em",
              color: C.goldHi,
              padding: "0 32px",
              textTransform: "uppercase",
            }}
          >
            {item}
            <span style={{ color: C.gold, marginInlineStart: 32, opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GALLERY / CELEBRITY CLIENTS
═══════════════════════════════════════════════════════════ */
const celebrities = [
  { name: "Stefan", role: "שחקן כדורגל", placeholder: "S" },
  { name: "בן אל תבורי", role: "זמר", placeholder: "ב" },
  { name: "VIP Client", role: "יזם טכנולוגיה", placeholder: "V" },
  { name: "אורח כבוד", role: "שחקן", placeholder: "א" },
  { name: "לקוח פרמיום", role: "מוזיקאי", placeholder: "ל" },
  { name: "איש עסקים", role: "מנכ\"ל", placeholder: "מ" },
];

function Gallery() {
  return (
    <section
      id="barbershop"
      style={{ padding: "100px 1.5rem", maxWidth: 1200, margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <div style={{ color: C.gold, fontFamily: "'Assistant', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          הלקוחות שלנו
        </div>
        <h2
          style={{
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: C.white,
            marginBottom: 16,
          }}
        >
          הגברים שבחרו{" "}
          <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            בן גונן
          </span>
        </h2>
        <p style={{ fontFamily: "'Assistant', sans-serif", color: C.muted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
          מסלבריטים, שחקנים ואנשי עסקים — כולם מגיעים למספרה אחת.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {celebrities.map((cel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              background: C.surface,
              border: `1px solid rgba(212,175,55,0.14)`,
              position: "relative",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
          >
            {/* Image placeholder */}
            <div
              style={{
                height: 280,
                background: `linear-gradient(145deg, rgba(150,3,26,0.35) 0%, rgba(26,26,26,0.8) 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 72,
                fontFamily: "'Rubik', sans-serif",
                fontWeight: 900,
                color: "rgba(212,175,55,0.3)",
                position: "relative",
              }}
            >
              {cel.placeholder}
              {/* Gold shimmer overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, transparent 60%, rgba(212,175,55,0.07) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 16, color: C.white }}>
                {cel.name}
              </div>
              <div style={{ fontFamily: "'Assistant', sans-serif", fontSize: 13, color: C.dim, marginTop: 4 }}>
                {cel.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT / MANIFESTO
═══════════════════════════════════════════════════════════ */
function About() {
  return (
    <section
      id="about"
      style={{
        padding: "100px 1.5rem",
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 64,
        alignItems: "center",
      }}
    >
      {/* Portrait placeholder */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ order: 2 }}
      >
        <div
          style={{
            borderRadius: 24,
            overflow: "hidden",
            background: `linear-gradient(145deg, ${C.redDeep} 0%, ${C.charcoal} 100%)`,
            border: `1px solid rgba(212,175,55,0.2)`,
            aspectRatio: "4/5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 900,
            color: "rgba(212,175,55,0.2)",
            position: "relative",
            boxShadow: `0 32px 80px rgba(150,3,26,0.35)`,
          }}
        >
          ב
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              background: "rgba(26,26,26,0.85)",
              backdropFilter: "blur(12px)",
              border: `1px solid rgba(212,175,55,0.3)`,
              borderRadius: 14,
              padding: "12px 18px",
            }}
          >
            <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 800, fontSize: 15, color: C.goldHi }}>
              בן גונן
            </div>
            <div style={{ fontFamily: "'Assistant', sans-serif", fontSize: 12, color: C.muted }}>
              ספר מקצועי | חולון
            </div>
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ order: 1 }}
      >
        <div style={{ color: C.gold, fontFamily: "'Assistant', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          מי אני
        </div>
        <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: C.white, marginBottom: 28, lineHeight: 1.2 }}>
          המטרה שלי היא לשנות
          <br />
          <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            לאנשים את החיים.
          </span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            "בן גונן — אני פשוט יודע מה גבר צריך. לא רק תספורת, אלא תחושה. הדרך שאתה נכנס לחדר, הביטחון שאתה נושא, ה-VIBE שאתה מפיץ — הכל מתחיל מהמראה.",
            "יותר מ-10 שנות ניסיון. לקוחות שהם שחקנים, זמרים, אנשי עסקים. כל גבר שנכנס אליי יוצא אחר. לא רק שיפצוץ — הוא יוצא עם תחושה אחרת על עצמו.",
            "זה לא סלון. זה לא פינת שיער. זאת חוויה — ואני כאן כדי לשנות לך את החיים, תספורת אחת בכל פעם.",
          ].map((text, i) => (
            <p key={i} style={{ fontFamily: "'Assistant', sans-serif", fontSize: 16, color: C.muted, lineHeight: 1.85 }}>
              {text}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 40,
            padding: "24px 28px",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid rgba(212,175,55,0.15)`,
            borderRadius: 16,
          }}
        >
          {[
            { num: "10+", label: "שנות ניסיון" },
            { num: "5K+", label: "לקוחות מרוצים" },
            { num: "100%", label: "מחויבות לסטייל" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: 28, background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.num}
              </div>
              <div style={{ fontFamily: "'Assistant', sans-serif", fontSize: 12, color: C.dim, marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   WHY BEN GONEN
═══════════════════════════════════════════════════════════ */
const whyItems = [
  { icon: "✦", title: "ניסיון אמיתי", body: "מעל עשור של עבודה עם לקוחות מהאליטה — ספורטאים, אמנים, מנהלים בכירים." },
  { icon: "◈", title: "גישה אישית", body: "כל גבר שנכנס לקבל שירות מקבל ייעוץ סטייל מותאם אישית — לא שגרה." },
  { icon: "▲", title: "פרמיום מא' עד ת'", body: "מוצרים ברמה הגבוהה ביותר, ציוד מקצועי, ואווירה שאת לא ישכח." },
  { icon: "✶", title: "אקדמיה לספרות", body: "מאמין בהעברת הידע הלאה — בית ספר לספרות שמכין את הדור הבא." },
];

function WhyBen() {
  return (
    <section
      id="why"
      style={{
        padding: "100px 1.5rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 60 }}
      >
        <div style={{ color: C.gold, fontFamily: "'Assistant', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          למה לבחור בי
        </div>
        <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: C.white }}>
          לא סתם ספר.{" "}
          <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            בן גונן.
          </span>
        </h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
        {whyItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid rgba(212,175,55,0.12)`,
              borderRadius: 20,
              padding: "32px 28px",
              transition: "border-color 0.25s, background 0.25s",
              cursor: "default",
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ fontSize: 32, marginBottom: 18, color: C.gold }}>{item.icon}</div>
            <h3 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 800, fontSize: 18, color: C.white, marginBottom: 12 }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.75 }}>
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACADEMY TEASER
═══════════════════════════════════════════════════════════ */
function AcademyTeaser({ onAcademy }: { onAcademy: () => void }) {
  return (
    <section id="academy" style={{ padding: "100px 1.5rem" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          background: `linear-gradient(135deg, rgba(150,3,26,0.35) 0%, rgba(26,26,26,0.7) 100%)`,
          border: `1px solid rgba(212,175,55,0.25)`,
          borderRadius: 28,
          padding: "clamp(40px, 8vw, 72px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(150,3,26,0.4) 0%, transparent 70%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <div style={{ color: C.gold, fontFamily: "'Assistant', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            בית הספר לספרות
          </div>
          <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 3.2rem)", color: C.white, marginBottom: 20 }}>
            האקדמיה של{" "}
            <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              בן גונן
            </span>
          </h2>
          <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 17, color: C.muted, lineHeight: 1.8, maxWidth: 580, margin: "0 auto 36px" }}>
            תלמד את הטכניקות שאני משתמש בהן על לקוחות פרמיום.
            קורס מעשי, ידע אמיתי, קריירה שמשנה חיים.
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {["טכניקות מתקדמות", "ליווי אישי", "תעודה מוכרת"].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Assistant', sans-serif", fontSize: 14, color: C.goldHi }}>
                <span style={{ color: C.gold }}>✓</span> {f}
              </div>
            ))}
          </div>
          <button
            onClick={onAcademy}
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
              color: C.charcoal,
              border: "none",
              borderRadius: 12,
              padding: "16px 40px",
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 800,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: `0 6px 28px rgba(212,175,55,0.4)`,
              transition: "transform 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            אני רוצה לדעת יותר ←
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════ */
const testimonials = [
  { name: "Stefan", role: "שחקן כדורגל", text: "הכי טוב שקרה לשיער שלי. נראה 10 שנים צעיר יותר ובטוח יותר בכל כניסה למגרש.", stars: 5 },
  { name: "דניאל כ.", role: "מנכ\"ל חברת סטארטאפ", text: "לא סתם תספורת. בן מבין את הסטייל שלי טוב ממני. מגיע כבר 3 שנים.", stars: 5 },
  { name: "מאיר ל.", role: "יזם", text: "החבר'ה בפגישה שאלו אותי מה עשיתי. כלום חוץ מלהיות אצל בן.", stars: 5 },
];

function Testimonials() {
  return (
    <section style={{ padding: "100px 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <div style={{ color: C.gold, fontFamily: "'Assistant', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          מה אומרים עלינו
        </div>
        <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: C.white }}>
          הם כבר{" "}
          <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            בחרו
          </span>
        </h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid rgba(212,175,55,0.12)`,
              borderRadius: 20,
              padding: "32px 28px",
            }}
          >
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} size={14} style={{ color: C.gold, fill: C.gold }} />
              ))}
            </div>
            <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 14, color: C.white }}>
              {t.name}
            </div>
            <div style={{ fontFamily: "'Assistant', sans-serif", fontSize: 12, color: C.dim }}>
              {t.role}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════ */
const faqs = [
  { q: "איך קובעים תור?", a: "לוחצים על כפתור 'קביעת תור' בכל מקום באתר. הזמנות דרך TidyCal — פשוט, מהיר, ממוחשב." },
  { q: "כמה עולה תספורת?", a: "מחירים משתנים לפי סוג השירות. תספורת בסיסית מ-80₪, שירות פרמיום כולל ייעוץ סטייל וגילוח." },
  { q: "היכן המספרה ממוקמת?", a: "חולון — כתובת מדויקת תישלח עם אישור התור." },
  { q: "האם האקדמיה מתאימה למתחילים?", a: "כן. הקורס בנוי מאפס — לא נדרש ניסיון קודם. מלמדים טכניקות מתקדמות מהיום הראשון." },
  { q: "כמה זמן לוקח הקורס?", a: "מסלול אינטנסיבי שמותאם לוח הזמנים שלך. מידע מלא נשלח לאחר מילוי הטופס." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ padding: "100px 1.5rem", maxWidth: 780, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <div style={{ color: C.gold, fontFamily: "'Assistant', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          שאלות ותשובות
        </div>
        <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: C.white }}>
          יש שאלות? יש תשובות.
        </h2>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${open === i ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 16,
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "right",
              }}
            >
              <span style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 15, color: C.white }}>
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 180 : 0 }}
                style={{ color: C.gold, flexShrink: 0, marginInlineStart: 16 }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 24px 20px", fontFamily: "'Assistant', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.75 }}>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT / CTA BAND
═══════════════════════════════════════════════════════════ */
function Contact({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="contact" style={{ padding: "80px 1.5rem 100px" }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          padding: "60px 40px",
          background: `linear-gradient(135deg, rgba(150,3,26,0.25) 0%, rgba(26,26,26,0.6) 100%)`,
          border: `1px solid rgba(212,175,55,0.2)`,
          borderRadius: 24,
        }}
      >
        <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: C.white, marginBottom: 16 }}>
          מוכן לשנות את הסטייל שלך?
        </h2>
        <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 16, color: C.muted, marginBottom: 36 }}>
          קבע תור עכשיו — ותצא אחר.
        </p>
        <button
          onClick={onBooking}
          style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
            color: C.charcoal,
            border: "none",
            borderRadius: 12,
            padding: "16px 44px",
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            cursor: "pointer",
            boxShadow: `0 6px 28px rgba(212,175,55,0.4)`,
            transition: "transform 0.18s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        >
          קביעת תור ←
        </button>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer({ onBooking }: { onBooking: () => void }) {
  return (
    <footer
      style={{
        background: "rgba(0,0,0,0.45)",
        borderTop: `1px solid rgba(212,175,55,0.15)`,
        padding: "48px 1.5rem 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: 22, color: C.white, marginBottom: 10 }}>
              בן גונן
            </div>
            <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 14, color: C.dim, lineHeight: 1.75 }}>
              מספרה פרמיום ואקדמיה לספרות.
              <br />
              חולון, ישראל.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 13, color: C.goldHi, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              ניווט
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Assistant', sans-serif", fontSize: 14, color: C.muted, textAlign: "right", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location + Social */}
          <div>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 13, color: C.goldHi, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              מיקום ויצירת קשר
            </div>
            <a
              href="https://maps.google.com/?q=חולון"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Assistant', sans-serif", fontSize: 14, color: C.muted, textDecoration: "none", marginBottom: 20 }}
            >
              <MapPin size={14} style={{ color: C.gold }} />
              חולון · למפה המלאה ←
            </a>
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href="https://www.instagram.com/ben_gon/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: 10,
                  padding: "9px 16px",
                  fontFamily: "'Assistant', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.white,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              >
                <Instagram size={14} style={{ color: C.gold }} />
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@bengonen"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: 10,
                  padding: "9px 16px",
                  fontFamily: "'Assistant', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.white,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              >
                🎵 TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: `1px solid rgba(255,255,255,0.07)`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ fontFamily: "'Assistant', sans-serif", fontSize: 13, color: C.dim }}>
            © 2025 בן גונן · כל הזכויות שמורות
          </div>
          <button
            onClick={onBooking}
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
              color: C.charcoal,
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            קביעת תור ←
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOKING MODAL (TidyCal)
═══════════════════════════════════════════════════════════ */
declare global {
  interface Window {
    tidycal?: { init?: () => void };
  }
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (open && !scriptLoaded.current) {
      const script = document.createElement("script");
      script.src = "https://tidycal.com/js/embed.js";
      script.async = true;
      document.body.appendChild(script);
      scriptLoaded.current = true;
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.surface,
              borderRadius: 24,
              border: `1px solid rgba(212,175,55,0.25)`,
              width: "100%",
              maxWidth: 720,
              maxHeight: "90dvh",
              overflow: "auto",
              padding: "28px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 800, fontSize: 20, color: C.white }}>
                  קביעת תור
                </div>
                <div style={{ fontFamily: "'Assistant', sans-serif", fontSize: 13, color: C.dim }}>
                  בן גונן · מספרה פרמיום · חולון
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                  cursor: "pointer",
                  color: C.muted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div
              className="tidycal-embed"
              data-path="bengon306"
              style={{ minHeight: 500 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACADEMY LEAD MODAL
═══════════════════════════════════════════════════════════ */
function AcademyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setName(""); setPhone(""); }, 400);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: `1px solid rgba(255,255,255,0.12)`,
    borderRadius: 12,
    padding: "14px 16px",
    fontFamily: "'Assistant', sans-serif",
    fontSize: 16,
    color: C.white,
    outline: "none",
    boxSizing: "border-box",
    direction: "rtl",
    transition: "border-color 0.2s",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.surface,
              borderRadius: 24,
              border: `1px solid rgba(212,175,55,0.25)`,
              width: "100%",
              maxWidth: 480,
              padding: "36px",
              position: "relative",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 20,
                insetInlineStart: 20,
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: 10,
                width: 38,
                height: 38,
                cursor: "pointer",
                color: C.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  style={{ textAlign: "center", padding: "20px 0" }}
                >
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🏆</div>
                  <h3 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: 24, color: C.white, marginBottom: 12 }}>
                    קיבלנו!
                  </h3>
                  <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 16, color: C.muted, lineHeight: 1.75 }}>
                    בן גונן יחזור אליך תוך 24 שעות עם כל הפרטים על האקדמיה.
                    <br />
                    מוכן לשינוי?
                  </p>
                  <button
                    onClick={handleClose}
                    style={{
                      background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
                      color: C.charcoal,
                      border: "none",
                      borderRadius: 12,
                      padding: "14px 32px",
                      fontFamily: "'Rubik', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: "pointer",
                      marginTop: 28,
                    }}
                  >
                    סגור
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ color: C.gold, fontFamily: "'Assistant', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                    הרשמה לאקדמיה
                  </div>
                  <h3 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 900, fontSize: 24, color: C.white, marginBottom: 8 }}>
                    בא לך ללמוד מהטוב ביותר?
                  </h3>
                  <p style={{ fontFamily: "'Assistant', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
                    השאר שם ומספר — בן גונן יחזור אליך עם כל הפרטים.
                  </p>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "'Rubik', sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8 }}>
                        שם מלא
                      </label>
                      <input
                        type="text"
                        placeholder="ישראל ישראלי"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = C.gold)}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "'Rubik', sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8 }}>
                        מספר טלפון
                      </label>
                      <input
                        type="tel"
                        placeholder="050-0000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = C.gold)}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        background: loading ? "rgba(212,175,55,0.5)" : `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
                        color: C.charcoal,
                        border: "none",
                        borderRadius: 12,
                        padding: "15px 24px",
                        fontFamily: "'Rubik', sans-serif",
                        fontWeight: 800,
                        fontSize: 16,
                        cursor: loading ? "not-allowed" : "pointer",
                        marginTop: 4,
                        transition: "background 0.2s",
                      }}
                    >
                      {loading ? "שולח..." : "שלח פרטים ←"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);

  // Disable body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = bookingOpen || academyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [bookingOpen, academyOpen]);

  // Smooth scroll on hash links
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.hash) {
        const el = document.querySelector(target.hash);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const openBooking = () => setBookingOpen(true);
  const openAcademy = () => setAcademyOpen(true);

  return (
    <>
      {/* Global styles injected inline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Assistant:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { direction: rtl; scroll-behavior: smooth; }

        body {
          font-family: 'Assistant', sans-serif;
          background: linear-gradient(135deg, #1a1a1a 0%, #96031a 100%);
          background-attachment: fixed;
          color: #ffffff;
          min-height: 100vh;
          overscroll-behavior-y: none;
        }

        /* Epoxy floor texture */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              120deg,
              transparent 0px,
              transparent 120px,
              rgba(255,255,255,0.012) 120px,
              rgba(255,255,255,0.012) 121px
            ),
            repeating-linear-gradient(
              240deg,
              transparent 0px,
              transparent 90px,
              rgba(255,255,255,0.008) 90px,
              rgba(255,255,255,0.008) 91px
            );
          pointer-events: none;
          z-index: 0;
        }

        body > * { position: relative; z-index: 1; }

        /* Next.js root div */
        #__next, [data-nextjs-scroll-focus-boundary] { isolation: isolate; }

        @media (min-width: 1024px) {
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #96031a; border-radius: 3px; }
      `}</style>

      <Navbar onBooking={openBooking} onAcademy={openAcademy} />

      <main>
        <Hero onBooking={openBooking} onAcademy={openAcademy} />
        <Marquee />
        <Gallery />
        <About />
        <WhyBen />
        <AcademyTeaser onAcademy={openAcademy} />
        <Testimonials />
        <FAQ />
        <Contact onBooking={openBooking} />
      </main>

      <Footer onBooking={openBooking} />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <AcademyModal open={academyOpen} onClose={() => setAcademyOpen(false)} />
    </>
  );
}
