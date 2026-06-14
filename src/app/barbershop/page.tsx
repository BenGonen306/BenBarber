"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const C = {
  red: "#96031a", charcoal: "#1a1a1a", surface: "#232323",
  gold: "#d4af37", goldHi: "#e9d2a6", goldLo: "#aa7c11",
  white: "#ffffff", muted: "#c8c8c8", dim: "#777777",
};

function SectionHeading({ eyebrow, title, highlight, sub }: { eyebrow?: string; title: string; highlight?: string; sub?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      {eyebrow && <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{eyebrow}</div>}
      <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: C.white, lineHeight: 1.15, margin: "0 0 16px" }}>
        {title}{" "}{highlight && <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{highlight}</span>}
      </h2>
      {sub && <p style={{ fontFamily: "var(--font-heebo)", fontSize: 17, color: C.muted, maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}>{sub}</p>}
    </div>
  );
}

/* ── TidyCal modal ──────────────────────────────────────── */
function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const loaded = useRef(false);
  useEffect(() => {
    if (open && !loaded.current) {
      const s = document.createElement("script"); s.src = "https://tidycal.com/js/embed.js"; s.async = true; document.body.appendChild(s);
      loaded.current = true;
    }
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <motion.div initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ duration: 0.24 }} onClick={e => e.stopPropagation()}
            style={{ background: C.surface, borderRadius: 24, border: "1px solid rgba(212,175,55,0.25)", width: "100%", maxWidth: 740, maxHeight: "90dvh", overflow: "auto", padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 20, color: C.white }}>קביעת תור</div>
                <div style={{ fontFamily: "var(--font-heebo)", fontSize: 13, color: C.dim }}>BenBarber · מספרת בוטיק · חולון</div>
              </div>
              <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 38, height: 38, cursor: "pointer", color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
            </div>
            <div className="tidycal-embed" data-path="bengon306" style={{ minHeight: 520 }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const services = [
  {
    icon: "✂️",
    name: "תספורת בלי זקן",
    desc: "תספורת ללא זקן / זקן צרפתי. כל הסגנונות החמים – קרופ, פייד, אנדרקט, טייפר ועוד.",
    duration: "50 דקות",
    price: "₪100",
  },
  {
    icon: "💈",
    name: "תספורת עם זקן",
    desc: "תספורת עם זקן מלא / איטלקי. דירוג + עיצוב זקן אדריכלי מושלם.",
    duration: "שעה",
    price: "₪120",
  },
  {
    icon: "✂️",
    name: "תספורת עם גזירות",
    desc: "תספורת עם שיער ארוך. מולט, מיד פארט, שכבות, טקסטורה – מדויק לאורך.",
    duration: "שעה ו-10 דקות",
    price: "₪130",
  },
  {
    icon: "⏰",
    name: "לא הסתפרתי מעל לחודש",
    desc: "אתה צריך טיפול. נסדר הכל מהיסוד – דירוג, ניקוי ועיצוב מחדש.",
    duration: "שעה ו-10 דקות",
    price: "₪130",
  },
  {
    icon: "🚨",
    name: "תור חירום",
    desc: "אין תורים פנויים ואתה חייב להסתפר? כניסה מיידית לרשימת ההמתנה.",
    duration: "בהתאם לזמינות",
    price: "₪150",
    highlight: true,
  },
];

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function BarbershopPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [bookingOpen]);

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "80dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1.5rem", textAlign: "center", overflow: "hidden" }}>
        <motion.div aria-hidden animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.68, 0.45] }} transition={{ duration: 11, repeat: Infinity }}
          style={{ position: "absolute", top: "8%", right: "4%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,3,26,0.52) 0%, transparent 70%)", filter: "blur(65px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            style={{ display: "inline-block", padding: "7px 20px", borderRadius: 999, background: "rgba(212,175,55,0.11)", border: "1px solid rgba(212,175,55,0.32)", color: C.goldHi, fontSize: 13, fontFamily: "var(--font-heebo)", fontWeight: 600, marginBottom: 28 }}>
            ✂️ מספרת בוטיק יוקרתית · חולון
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 4.4rem)", lineHeight: 1.1, color: C.white, marginBottom: 22 }}>
            המספרה של בן גונן בחולון:{" "}
            <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold}, ${C.goldLo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              תספורת ברמה אחרת.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            style={{ fontFamily: "var(--font-heebo)", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: C.muted, lineHeight: 1.8, maxWidth: 680, margin: "0 auto 40px" }}>
            דירוג נקי, עיצוב זקן בלתי מתפשר, קפה טוב ואווירה שכולה גבריות וסטייל. כנס, שב על הכיסא, ותן לצוות ה-All-Stars שלנו להביא אותך לגרסה הכי חדה ונקייה שלך.
          </motion.p>
          <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }} onClick={() => setBookingOpen(true)}
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 13, padding: "16px 40px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, cursor: "pointer", boxShadow: "0 6px 28px rgba(212,175,55,0.42)" }}>
            לקביעת תור ביומן הדיגיטלי ←
          </motion.button>
        </div>
      </section>

      {/* WHY EXPERIENCE */}
      <section style={{ padding: "100px 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="החוויה" title="למה הלקוחות שלנו מגיעים אלינו" highlight="מכל הארץ?" />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { icon: "📍", title: "המקום", body: "הסטודיו שלנו ממוקם במיקום מרכזי ונוח בחולון, עם גישה קלה ומגרש חנייה צמוד ומרווח מאחורי המספרה – כי הדבר האחרון שבא לך לעשות לפני תספורת זה לחפש חנייה ברחובות." },
            { icon: "💪", title: "הצוות", body: "הספרים בצוות שלנו הם לא סתם עובדים, הם מוסמכי האקדמיה שעברו את סינוני האיכות המחמירים ביותר של בן גונן. כל אחד מהם מחזיק באישיות ייחודית, ידע מעשי רחב והבנה עמוקה של צורות פנים וסוגי שיער." },
            { icon: "✨", title: "האני מאמין", body: 'אנחנו לא סתם "מורידים שיער". אנחנו מתאימים את התספורת באופן הוליסטי לאופי שלך, למבנה הראש ולצמיחה הטבעית של השערה. אצלנו כל ביקור כולל ייעוץ קצר, פינוק אמיתי, מגבות חמות במידת הצורך, ואפס פשרות על הפיניש.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 22, padding: "36px 30px" }} whileHover={{ scale: 1.015 }}>
              <div style={{ fontSize: 40, marginBottom: 18 }}>{item.icon}</div>
              <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 19, color: C.white, marginBottom: 14 }}>{item.title}</h3>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.85 }}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES & PRICING */}
      <section style={{ padding: "0 1.5rem 100px", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="מחירון שירותים" title="השירותים" highlight="שלנו" />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: s.highlight ? "rgba(150,3,26,0.18)" : "rgba(255,255,255,0.03)", border: `1px solid ${s.highlight ? "rgba(150,3,26,0.55)" : "rgba(212,175,55,0.1)"}`, borderRadius: 20, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 14 }}
              whileHover={{ scale: 1.015 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{s.icon}</span>
                {s.highlight && (
                  <span style={{ background: "rgba(150,3,26,0.6)", border: "1px solid rgba(255,100,100,0.4)", borderRadius: 999, padding: "3px 12px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 11, color: "#ffb3b3", letterSpacing: "0.08em" }}>
                    חירום
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, color: C.white, margin: 0 }}>{s.name}</h3>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0, flex: 1 }}>{s.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.dim, fontSize: 13, fontFamily: "var(--font-heebo)" }}>
                <span>⏱</span> {s.duration}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <span style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 26, background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.price}</span>
                <button onClick={() => setBookingOpen(true)} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 10, padding: "9px 18px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  לתור ←
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "0 1.5rem 120px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "60px 40px", background: "linear-gradient(135deg, rgba(150,3,26,0.28) 0%, rgba(26,26,26,0.65) 100%)", border: "1px solid rgba(212,175,55,0.22)", borderRadius: 24 }}>
          <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: C.white, marginBottom: 16 }}>מוכן לגרסה הכי חדה שלך?</h2>
          <p style={{ fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, marginBottom: 32 }}>קבע תור עכשיו ותצא מהמספרה אחר.</p>
          <button onClick={() => setBookingOpen(true)}
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 13, padding: "16px 44px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 18, cursor: "pointer", boxShadow: "0 6px 28px rgba(212,175,55,0.42)", transition: "transform 0.18s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={e => (e.currentTarget.style.transform = "")}>
            לקביעת תור ←
          </button>
        </motion.div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
