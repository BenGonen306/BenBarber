"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

const C = {
  red: "#96031a", redDeep: "#6b0213", charcoal: "#1a1a1a", surface: "#232323",
  gold: "#d4af37", goldHi: "#e9d2a6", goldLo: "#aa7c11",
  white: "#ffffff", muted: "#c8c8c8", dim: "#777777",
};

function SectionHeading({ eyebrow, title, highlight, sub }: { eyebrow?: string; title: string; highlight?: string; sub?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      {eyebrow && <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{eyebrow}</div>}
      <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: C.white, lineHeight: 1.15, margin: "0 0 16px" }}>
        {title}{" "}
        {highlight && <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{highlight}</span>}
      </h2>
      {sub && <p style={{ fontFamily: "var(--font-heebo)", fontSize: 17, color: C.muted, maxWidth: 620, margin: "0 auto", lineHeight: 1.8 }}>{sub}</p>}
    </div>
  );
}

/* ── Lead modal ─────────────────────────────────────────── */
function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [done, setDone] = useState(false); const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!name.trim() || !phone.trim()) return;
    setLoading(true); await new Promise(r => setTimeout(r, 900)); setLoading(false); setDone(true);
  };
  const close = () => { onClose(); setTimeout(() => { setDone(false); setName(""); setPhone(""); }, 350); };
  const inp: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 16px", fontFamily: "var(--font-heebo)", fontSize: 16, color: C.white, outline: "none", boxSizing: "border-box", direction: "rtl" };
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <motion.div initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ duration: 0.24 }} onClick={e => e.stopPropagation()}
            style={{ background: C.surface, borderRadius: 24, border: "1px solid rgba(212,175,55,0.25)", width: "100%", maxWidth: 480, padding: "36px", position: "relative" }}>
            <button onClick={close} style={{ position: "absolute", top: 18, insetInlineStart: 18, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>🏆</div>
                  <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 22, color: C.white, marginBottom: 10 }}>קיבלנו!</h3>
                  <p style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.75 }}>בן גונן יחזור אליך תוך 24 שעות עם כל הפרטים על הקורס המתאים לך.</p>
                  <button onClick={close} style={{ marginTop: 24, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 12, padding: "12px 28px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>סגור</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>ייעוץ מקצועי חינם</div>
                  <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 22, color: C.white, marginBottom: 8 }}>השאר פרטים ונחזור אליך</h3>
                  <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>תישאר זמין וחד. השאר פרטים כאן למטה, והצוות המקצועי שלי יחזור אליך כדי להתאים לך את מסלול הלימודים המדויק שיביא אותך לשיא שלך.</p>
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div><label style={{ display: "block", fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 7 }}>שם מלא</label>
                      <input type="text" placeholder="ישראל ישראלי" value={name} onChange={e => setName(e.target.value)} required style={inp} onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.12)")} /></div>
                    <div><label style={{ display: "block", fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 7 }}>מספר טלפון</label>
                      <input type="tel" placeholder="050-0000000" value={phone} onChange={e => setPhone(e.target.value)} required style={inp} onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.12)")} /></div>
                    <button type="submit" disabled={loading} style={{ background: loading ? "rgba(212,175,55,0.5)" : `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 12, padding: "14px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginTop: 4 }}>
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

/* ── Course card ─────────────────────────────────────────── */
function CourseCard({ title, badge, body, type, onCTA, ctaLabel }: { title: string; badge: string; body: string; type: "beginner" | "advanced"; onCTA: () => void; ctaLabel: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 22, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 18 }}
      whileHover={{ scale: 1.015 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: C.white, margin: 0 }}>{title}</h3>
        <span style={{ background: type === "beginner" ? "rgba(150,3,26,0.35)" : "rgba(212,175,55,0.15)", border: `1px solid ${type === "beginner" ? "rgba(150,3,26,0.5)" : "rgba(212,175,55,0.35)"}`, borderRadius: 999, padding: "4px 14px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, color: type === "beginner" ? "#ffb3b3" : C.goldHi, whiteSpace: "nowrap" }}>{badge}</span>
      </div>
      <p style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.8, margin: 0 }}>{body}</p>
      <button onClick={onCTA} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 12, padding: "13px 24px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 15, cursor: "pointer", alignSelf: "flex-start", transition: "transform 0.18s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={e => (e.currentTarget.style.transform = "")}>
        {ctaLabel}
      </button>
    </motion.div>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */
const testimonials = [
  { name: "אבי מ.", role: "בוגר קורס פרונטלי", text: "נכנסתי ללא ניסיון, יצאתי עם מספרה פתוחה. בן גונן לא מלמד תיאוריה על בובות – מהיום הראשון אתה על אנשים אמיתיים." },
  { name: "דניאל ר.", role: "ספר פעיל שעשה השתלמות", text: "עברתי כבר קורסים בעבר. ההשתלמות של BenBarber הייתה אחרת לגמרי – פירוק טכני ברמה שלא ראיתי בשום מקום." },
  { name: "שיר כ.", role: "בוגרת קורס אונליין", text: "עשיתי את הקורס הדיגיטלי בין עבודה לאמא. הקצב, הנגישות, ורמת ההסברים – מושלם לאנשים עם לו\"ז עמוס." },
];

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function AcademyPage() {
  const [modal, setModal] = useState(false);
  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "75dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1.5rem", textAlign: "center", overflow: "hidden" }}>
        <motion.div aria-hidden animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.65, 0.45] }} transition={{ duration: 12, repeat: Infinity }}
          style={{ position: "absolute", top: "5%", right: "5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,3,26,0.5) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            style={{ display: "inline-block", padding: "7px 20px", borderRadius: 999, background: "rgba(212,175,55,0.11)", border: "1px solid rgba(212,175,55,0.32)", color: C.goldHi, fontSize: 13, fontFamily: "var(--font-heebo)", fontWeight: 600, marginBottom: 28 }}>
            🎓 בית הספר לספרות גברים מוביל בישראל
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 4.4rem)", lineHeight: 1.1, color: C.white, marginBottom: 22 }}>
            אקדמיית BenBarber:{" "}
            <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold}, ${C.goldLo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              בית הספר ללימודי ספרות גברים המוביל בישראל
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            style={{ fontFamily: "var(--font-heebo)", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: C.muted, lineHeight: 1.8, maxWidth: 680, margin: "0 auto 40px" }}>
            אל תתפשר על קורס כללי. למד את רזי הברברינג המודרני מהמקצוענים הטובים ביותר. קורסים פרונטליים ודיגיטליים המותאמים למתחילים מאפס ועד למקצוענים שרוצים לשלוט במספריים ולמלא את היומן.
          </motion.p>
          <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            onClick={() => setModal(true)}
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 13, padding: "16px 40px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, cursor: "pointer", boxShadow: "0 6px 28px rgba(212,175,55,0.42)" }}>
            לבחירת מסלול הלימודים שלך ←
          </motion.button>
        </div>
      </section>

      {/* TRACKS */}
      <section style={{ padding: "100px 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="מסלולי לימוד" title="קורסי ספרות שמתאימים" highlight="בדיוק לצרכים שלך" />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { icon: "🏫", title: "קורסים פרונטליים בסטודיו", body: "לימודים אינטנסיביים בקבוצות קטנות ובאווירה בוטיקית, עם דגש ענק על פרקטיקה ויד על הגוזז." },
            { icon: "💻", title: "קורסים דיגיטליים מהבית", body: "למידה עצמאית וגמישה ללא הגבלת זמן, עם סרטוני הדרכה מפורטים באיכות הגבוהה ביותר ופירוק של כל שלבי התספורת לגובה העיניים." },
          ].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.14)", borderRadius: 22, padding: "40px 32px", textAlign: "center" }} whileHover={{ scale: 1.02 }}>
              <div style={{ fontSize: 52, marginBottom: 20 }}>{t.icon}</div>
              <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 20, color: C.white, marginBottom: 14 }}>{t.title}</h3>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.8 }}>{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* METHODOLOGY */}
      <section style={{ padding: "100px 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="המתודולוגיה שלנו" title="איך אנחנו הופכים אותך" highlight="למקצוען בתוך שבועות ספורים?" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.14)", borderRadius: 24, padding: "48px 40px", maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, lineHeight: 1.9, marginBottom: 28 }}>
            ברוב בתי הספר לעיצוב שיער, ספרות גברים היא רק פרק קטן וזניח שנלמד על ראשי בובות מפלסטיק. אצלנו, ספרות גברים היא הלב והנשמה.
          </p>
          <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 18, color: C.goldHi, marginBottom: 14 }}>המודל המעשי</h3>
          <p style={{ fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, lineHeight: 1.9, marginBottom: 28 }}>
            פיתחנו שיטת לימוד ייחודית שבה התיאוריה מתורגמת מיד לפרקטיקה בשטח. מודליסטים ולקוחות אמיתיים מגיעים לסטודיו האקדמיה, ואתה מספר אותם בהדרכה צמודה, צעד-אחר-צעד, של המדריכים המומחים שלנו. המדריך עומד לצדך, מתקן את זווית האחיזה במספריים או במכונה, מסביר את הלוגיקה מאחורי חלוקת הראש, ומעניק לך ביטחון מלא לקראת היציאה לשוק העבודה.
          </p>
          <div style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>🎁</span>
            <div>
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 15, color: C.goldHi, marginBottom: 6 }}>בונוס ייחודי</div>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0 }}>כל תלמיד במסלולים הפרונטליים המקיפים מקבל מאיתנו ערכת ציוד מקצועית במתנה! כלים איכותיים ורציניים שישמשו אותך לתרגול וילוו אותך גם ביום שאחרי קבלת התעודה.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BEGINNER COURSES */}
      <section style={{ padding: "100px 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="מתחילים" title="מסלולי הכשרה" highlight="למתחילים" />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          <CourseCard title="קורס ברברינג מקיף מהיסוד (פרונטלי)" badge="מתחיל · פרונטלי" type="beginner" onCTA={() => setModal(true)} ctaLabel="להשארת פרטים וייעוץ למתחילים"
            body="המסלול המלא שלוקח אותך מאפס ניסיון לרמת ספר מוכן לעבודה בשטח. לימוד יסודות הדירוג, קווי מתאר, עבודה נכונה עם מספריים וארגונומיה." />
          <CourseCard title="סידור ועיצוב זקנים (אונליין)" badge="מתחיל · דיגיטלי" type="beginner" onCTA={() => setModal(true)} ctaLabel="להשארת פרטים וייעוץ למתחילים"
            body="קורס ממוקד לפיצוח הארכיטקטורה של הזקן, התאמה למבנה הלסת, ושימוש נכון בתער ומכונות פיניש." />
        </div>
      </section>

      {/* ADVANCED COURSES */}
      <section style={{ padding: "0 1.5rem 100px", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="מקצוענים" title="קורסים והשתלמויות" highlight="למקצוענים" />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          <CourseCard title="קורס גזירות מתקדם ופיידינג (פרונטלי)" badge="מתקדם · פרונטלי" type="advanced" onCTA={() => setModal(true)} ctaLabel="לתיאום השתלמות"
            body="לחדד את הבייסיקס, למלא את הפערים המקצועיים, וללמוד את טכניקות הדירוג והגזירה הטרנדיות ביותר באירופה שיגרמו ללקוחות לנסוע אליך במיוחד." />
          <CourseCard title="מאסטר קלאס דיגיטלי בגזירות מספריים" badge="מתקדם · דיגיטלי" type="advanced" onCTA={() => setModal(true)} ctaLabel="לתיאום השתלמות"
            body="פירוק שיטתי של תספורות ארוכות ובינוניות, יצירת טקסטורה, דילול מקצועי ושמירה על נפח נכון." />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "0 1.5rem 120px", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="בוגרים" title="הבוגרים של BenBarber" highlight="מספרים" />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 20, padding: "32px 28px" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                {Array.from({ length: 5 }).map((_, j) => <span key={j} style={{ color: C.gold, fontSize: 14 }}>★</span>)}
              </div>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>"{t.text}"</p>
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 14, color: C.white }}>{t.name}</div>
              <div style={{ fontFamily: "var(--font-heebo)", fontSize: 12, color: C.dim }}>{t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <LeadModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
