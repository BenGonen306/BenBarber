"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ShoppingCart } from "lucide-react";

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
  dim: "#777777",
};

/* ── TidyCal Booking Modal ─────────────────────────────── */
function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      const existing = document.querySelector('script[src="https://tidycal.com/js/embed.js"]');
      if (existing) existing.remove();
      const s = document.createElement("script");
      s.src = "https://tidycal.com/js/embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.24 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.surface, borderRadius: 24,
              border: "1px solid rgba(212,175,55,0.25)",
              width: "100%", maxWidth: 740, maxHeight: "90dvh",
              overflow: "auto", padding: 28,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 20, color: C.white }}>קביעת תור</div>
                <div style={{ fontFamily: "var(--font-heebo)", fontSize: 13, color: C.dim }}>BenBarber · מספרת בוטיק · חולון</div>
              </div>
              <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 38, height: 38, cursor: "pointer", color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={18} />
              </button>
            </div>
            <div className="tidycal-embed" data-path="bengon306" style={{ minHeight: 520 }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Celebrity Carousel ────────────────────────────────── */
const celebs = [
  { name: "סטפן", role: "שחקן כדורגל", emoji: "⚽", file: "stefan.webp" },
  { name: "בן אל תבורי", role: "זמר ואמן", emoji: "🎤", file: "ben-el.webp" },
  { name: "שחקן כדורגל", role: "נבחרת ישראל", emoji: "⚽", file: "football-1.webp" },
  { name: "כוכב רשת", role: "אינפלואנסר", emoji: "📱", file: "influencer-1.webp" },
  { name: "ספורטאי", role: "אתלט מקצועי", emoji: "🏆", file: "athlete.webp" },
  { name: "לקוח VIP", role: "לקוח פרמיום", emoji: "⭐", file: "vip.webp" },
];

function CelebCarousel() {
  const all = [...celebs, ...celebs]; // duplicate for seamless loop
  return (
    <section style={{ padding: "60px 0 80px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", marginBottom: 40, textAlign: "center" }}>
        <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          הגברים שלי
        </div>
        <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: C.white, lineHeight: 1.15, margin: 0 }}>
          סלבס, ספורטאים{" "}
          <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            וכוכבי רשת:
          </span>
        </h2>
      </div>
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* fade edges */}
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 80, background: "linear-gradient(to left, rgba(26,26,26,0.85), transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 80, background: "linear-gradient(to right, rgba(26,26,26,0.85), transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div className="bb-celeb-track">
          {all.map((cel, i) => (
            <div key={i} className="bb-celeb-card">
              <div style={{
                width: 190, height: 250, borderRadius: 18,
                background: `linear-gradient(155deg, rgba(150,3,26,0.38) 0%, rgba(26,26,26,0.92) 100%)`,
                border: "1px solid rgba(212,175,55,0.15)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 8, position: "relative", overflow: "hidden", flexShrink: 0,
                /* Replace the line below with: <img src={`/celebs/${cel.file}`} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}} alt={cel.name} /> */
              }}>
                <span style={{ fontSize: 42, opacity: 0.28 }}>{cel.emoji}</span>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px", background: "linear-gradient(to top, rgba(20,20,20,0.96) 0%, transparent 100%)" }}>
                  <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 14, color: C.white }}>{cel.name}</div>
                  <div style={{ fontFamily: "var(--font-heebo)", fontSize: 11, color: C.dim }}>{cel.role}</div>
                </div>
                <div style={{ position: "absolute", top: 10, insetInlineEnd: 10, width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>★</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .bb-celeb-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: bb-scroll 30s linear infinite;
          padding: 8px 10px;
        }
        .bb-celeb-track:hover { animation-play-state: paused; }
        .bb-celeb-card { flex-shrink: 0; }
        @keyframes bb-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ── Shared section heading ────────────────────────────── */
function SectionHeading({ eyebrow, title, highlight, center = true }: { eyebrow?: string; title: string; highlight?: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "right", marginBottom: 52 }}>
      {eyebrow && (
        <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: C.white, lineHeight: 1.15, margin: 0 }}>
        {title}{" "}
        {highlight && (
          <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
}

/* ── Products data ─────────────────────────────────────── */
const products = [
  { name: "פומייד לעיצוב שיער", desc: "אחיזה חזקה, ברק טבעי. מחזיק לאורך כל היום.", price: "₪69" },
  { name: "שמן זקן פרמיום", desc: "לחות, ריח טוב ועיצוב זקן מושלם. פורמולת BenBarber.", price: "₪89" },
  { name: "קיט טיפוח מלא", desc: "פומייד + שמן זקן + קרם פנים. הכל בקופסת מתנה.", price: "₪199" },
];

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [bookingOpen]);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section
        style={{
          position: "relative", minHeight: "100dvh",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "80px 1.5rem 80px", textAlign: "center", overflow: "hidden",
        }}
      >
        {/* Blobs */}
        <motion.div aria-hidden
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.72, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "10%", right: "5%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,3,26,0.55) 0%, transparent 70%)", filter: "blur(65px)", pointerEvents: "none" }}
        />
        <motion.div aria-hidden
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{ position: "absolute", bottom: "8%", left: "3%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none" }}
        />

        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 20px", borderRadius: 999, background: "rgba(212,175,55,0.11)", border: "1px solid rgba(212,175,55,0.32)", color: C.goldHi, fontSize: 13, fontFamily: "var(--font-heebo)", fontWeight: 600, marginBottom: 28, letterSpacing: "0.04em" }}
          >
            <Star size={13} style={{ color: C.gold }} />
            מספרת בוטיק ואקדמיה לספרות גברים | חולון
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(2rem, 6.5vw, 4.6rem)", lineHeight: 1.1, color: C.white, marginBottom: 22 }}
          >
            אהלן גבר, ברוך הבא לטופ
            <br />
            <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold}, ${C.goldLo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              של סצנת הברברינג בישראל.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            style={{ fontFamily: "var(--font-heebo)", fontSize: "clamp(1rem, 2.2vw, 1.18rem)", color: C.muted, lineHeight: 1.9, maxWidth: 700, margin: "0 auto 44px" }}
          >
            במספרת הבוטיק היוקרתית שלי בחולון תקבל תספורת ברמה שלא ראית — דירוגים חדים, עיצוב זקן אדריכלי, צ׳ייסר וקפה שחור חזק, ואווירה שכולה גבריות אמיתית.
            <br />
            ובאקדמיית BenBarber תלמד ברברינג אמיתי ישירות ממני — על לקוחות חיים, מהיום הראשון.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              onClick={() => setBookingOpen(true)}
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 13, padding: "16px 38px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, cursor: "pointer", boxShadow: "0 6px 28px rgba(212,175,55,0.42)", transition: "transform 0.18s, box-shadow 0.18s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(212,175,55,0.58)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 28px rgba(212,175,55,0.42)"; }}
            >
              לקביעת תור ←
            </button>
            <Link href="/academy"
              style={{ background: "transparent", color: C.white, border: "1.5px solid rgba(255,255,255,0.22)", borderRadius: 13, padding: "16px 38px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 17, textDecoration: "none", transition: "border-color 0.2s, color 0.2s", display: "inline-block" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.goldHi; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = C.white; }}
            >
              לאקדמיית הספרות
            </Link>
          </motion.div>
        </div>
      </section>

      <CelebCarousel />

      {/* ── TWO WORLDS ────────────────────────────────── */}
      <section style={{ padding: "100px 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="מה היעד שלך?" title="מה היעד שלך" highlight="היום?" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {[
            {
              icon: "✂️",
              tag: "המספרה בחולון",
              title: "לבוא להסתפר",
              body: "חוויית תספורת וטיפוח ברמה הגבוהה ביותר. דירוגים חדים, עיצוב זקן אדריכלי, קפה שחור חזק, צ׳ייסר ואווירה גברית אותנטית.",
              cta: "לקביעת תור ביומן >>>",
              href: "/barbershop",
              accent: C.red,
            },
            {
              icon: "🎓",
              tag: "אקדמיית BenBarber",
              title: "ללמוד את המקצוע",
              body: "להפוך את התשוקה שלך לקריירה רווחית ומבוקשת. קורסי ספרות פרונטליים ודיגיטליים למתחילים ולמתקדמים, עם תרגול מעשי על לקוחות אמיתיים מהיום הראשון.",
              cta: "לכל הקורסים וההשתלמויות >>>",
              href: "/academy",
              accent: C.goldLo,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 24, padding: "40px 36px",
                display: "flex", flexDirection: "column", gap: 20,
                transition: "border-color 0.25s, background 0.25s",
              }}
              whileHover={{ scale: 1.015 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(212,175,55,0.3)`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.08)`; }}
            >
              <div style={{ fontSize: 44 }}>{card.icon}</div>
              <div>
                <div style={{ fontFamily: "var(--font-rubik)", fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{card.tag}</div>
                <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: C.white, marginBottom: 14 }}>{card.title}</h3>
                <p style={{ fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, lineHeight: 1.8 }}>{card.body}</p>
              </div>
              <Link href={card.href}
                style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 15, color: C.goldHi, textDecoration: "none", marginTop: "auto", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.goldHi)}
              >
                {card.cta}
              </Link>

              {/* Photo placeholder grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
                {[0, 1].map((j) => (
                  <div key={j} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(212,175,55,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <span style={{ fontSize: 22, opacity: 0.35 }}>{i === 0 ? "✂️" : "🎓"}</span>
                    <span style={{ fontFamily: "var(--font-heebo)", fontSize: 10, color: C.dim, letterSpacing: "0.08em" }}>
                      {i === 0 ? "תמונת מספרה" : "תמונת אקדמיה"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────── */}
      <section style={{ padding: "100px 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="למה אני?" title="הסטנדרט שלא תמצא" highlight="בשום מקום אחר" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {[
            { num: "01", title: "דיוק בינלאומי וטרנדים חמים", body: "אני מביא את טכניקות הגזירה והדירוג המתקדמות ביותר ישירות מהבירות המובילות בעולם, ומנגיש אותן בהתאמה מושלמת למרקם השיער ולשוק הישראלי המהיר." },
            { num: "02", title: "מודל למידה מעשי (לא על בובות)", body: "הדרך היחידה לבנות ביטחון אמיתי בידיים היא לספר אנשים אמיתיים. באקדמיה שלי התלמידים מתרגלים על מודליסטים תחת השגחה ופידבק צמוד בזמן אמת." },
            { num: "03", title: "שומרים על קשר וחברות", body: "הלימודים אצלי הם כרטיס כניסה לקהילת הבוגרים והתלמידים הסגורה בוואטסאפ. התייעצויות, שיתוף עבודות, טיפים עסקיים וליווי מקצועי גם שנים אחרי סיום הקורס." },
            { num: "04", title: "חוויה גברית אקסקלוסיבית", body: "בין אם הגעת לקורס ובין אם הגעת להתרענן בתספורת – הסטודיו שלי בחולון מציע סביבה מרווחת, מוזיקה נכונה, אנרגיות שיא ואווירה שחיה ונושמת ברברינג בכל רגע." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 20, padding: "32px 28px" }}
            >
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 36, color: "rgba(212,175,55,0.2)", marginBottom: 16 }}>{item.num}</div>
              <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, color: C.white, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.8 }}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS PREVIEW ──────────────────────────── */}
      <section style={{ padding: "100px 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="חנות המוצרים" title="לשמור על המראה החד" highlight="גם בבית" />
          <p style={{ textAlign: "center", fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, maxWidth: 560, margin: "-32px auto 52px", lineHeight: 1.8 }}>
            אותם החומרים והכלים שאני משתמש בהם יום-יום במספרה ובאקדמיה, זמינים עבורך לעיצוב מושלם ושמירה על בריאות השיער והזקן.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: C.surface, border: "1px solid rgba(212,175,55,0.12)", borderRadius: 20, overflow: "hidden" }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ height: 200, background: `linear-gradient(145deg, rgba(150,3,26,0.3) 0%, rgba(26,26,26,0.7) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>
                🧴
              </div>
              <div style={{ padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, color: C.white }}>{p.name}</div>
                  <span style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.35)", borderRadius: 999, padding: "3px 10px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 11, color: C.goldHi, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>
                    בקרוב
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, marginBottom: 18, lineHeight: 1.7 }}>{p.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 22, background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{p.price}</div>
                  <button disabled style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", color: C.dim, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "9px 18px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 13, cursor: "not-allowed" }}>
                    <ShoppingCart size={14} /> בקרוב
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PLAYLIST ──────────────────────────────────── */}
      <section style={{ padding: "80px 1.5rem 120px", maxWidth: 800, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="הויב שלי" title="תן האזנה לויב" highlight="שלי" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ background: C.surface, border: "1px solid rgba(212,175,55,0.15)", borderRadius: 20, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: "linear-gradient(135deg, #1db954, #157a36)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>♫</div>
            <div>
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, color: C.white }}>BenBarber Vibes 🔥</div>
              <div style={{ fontFamily: "var(--font-heebo)", fontSize: 13, color: C.dim }}>הפלייליסט הרשמי של הסטודיו · Spotify</div>
            </div>
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
              style={{ marginInlineStart: "auto", background: "#1db954", color: "#fff", borderRadius: 999, padding: "9px 20px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
              ▶ האזן
            </a>
          </div>
          {["Urban Barbershop Anthem", "Mediterranean Swagger", "Tel Aviv Fade", "Gold Rush Groove", "חולון בלילה"].map((track, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-rubik)", fontSize: 12, color: C.dim, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-rubik)", fontSize: 14, color: C.white, fontWeight: 600 }}>{track}</div>
                <div style={{ fontFamily: "var(--font-heebo)", fontSize: 12, color: C.dim }}>BenBarber Curated</div>
              </div>
              <div style={{ fontFamily: "var(--font-heebo)", fontSize: 12, color: C.dim }}>3:{String(i * 7 + 22).padStart(2, "0")}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
