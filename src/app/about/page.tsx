"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
      {sub && <p style={{ fontFamily: "var(--font-heebo)", fontSize: 17, color: C.muted, maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>{sub}</p>}
    </div>
  );
}

const stats = [
  { num: "10+", label: "שנות ניסיון" },
  { num: "5K+", label: "לקוחות מרוצים" },
  { num: "1,000+", label: "בוגרי אקדמיה" },
  { num: "100%", label: "מחויבות לדיוק" },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "70dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1.5rem", textAlign: "center", overflow: "hidden" }}>
        <motion.div aria-hidden animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 12, repeat: Infinity }}
          style={{ position: "absolute", top: "5%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,3,26,0.48) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            style={{ display: "inline-block", padding: "7px 20px", borderRadius: 999, background: "rgba(212,175,55,0.11)", border: "1px solid rgba(212,175,55,0.32)", color: C.goldHi, fontSize: 13, fontFamily: "var(--font-heebo)", fontWeight: 600, marginBottom: 28 }}>
            👤 הסיפור מאחורי המותג
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 4.4rem)", lineHeight: 1.1, color: C.white, marginBottom: 22 }}>
            המותג מאחורי הדיוק:{" "}
            <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold}, ${C.goldLo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              נעים להכיר, בן גונן
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            style={{ fontFamily: "var(--font-heebo)", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: C.muted, lineHeight: 1.8, maxWidth: 680, margin: "0 auto" }}>
            הדרך, החזון והתשוקה שהפכו מספרת בוטיק בחולון לאקדמיה משגשגת שמכשירה את הדור הבא של מעצבי השיער לגברים בישראל.
          </motion.p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "20px 1.5rem 80px", maxWidth: 900, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 18, padding: "28px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 36, background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontFamily: "var(--font-heebo)", fontSize: 13, color: C.dim }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* STORY */}
      <section style={{ padding: "0 1.5rem 100px", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionHeading eyebrow="הסיפור שלי" title="איך הכל" highlight="התחיל?" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          {/* Portrait */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ borderRadius: 24, overflow: "hidden", background: `linear-gradient(145deg, #6b0213 0%, ${C.charcoal} 100%)`, border: "1px solid rgba(212,175,55,0.2)", aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 110, fontFamily: "var(--font-rubik)", fontWeight: 900, color: "rgba(212,175,55,0.18)", position: "relative", boxShadow: "0 32px 80px rgba(150,3,26,0.35)" }}>
              ב
              <div style={{ position: "absolute", bottom: 24, right: 24, background: "rgba(26,26,26,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 14, padding: "14px 20px" }}>
                <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 16, color: C.goldHi }}>בן גונן</div>
                <div style={{ fontFamily: "var(--font-heebo)", fontSize: 12, color: C.muted }}>מייסד · ספר ראשי · מנהל אקדמיה</div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, lineHeight: 1.9 }}>
                בן גונן חי ונושם את עולם הברברינג ועיצוב השיער כבר שנים ארוכות. לאחר שרכש את השכלתו המקצועית, התמחה באקדמיות הבינלאומיות המובילות בעולם וספג ללא הרף את הטרנדים הכי חמים מבירות האופנה הגלובליות, הוא הבין שיש פער ענק בשוק הישראלי.
              </p>
            </div>

            <div style={{ borderRight: `3px solid ${C.gold}`, paddingRight: 24 }}>
              <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 18, color: C.goldHi, marginBottom: 14 }}>הקמת הסטודיו והאקדמיה</h3>
              <p style={{ fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, lineHeight: 1.9 }}>
                בן זיהה שמרבית הספרים יוצאים לשטח כשהם חסרי ביטחון מעשי ולא שולטים באמת בכלי החשוב ביותר של מעצב השיער – המספריים. מתוך הרצון להעלות את רמת המקצועיות בארץ, הוא הקים בחולון קומפלקס ייחודי המשלב מספרת בוטיק פעילה ותוססת לצד אקדמיית הדרכה מתקדמת.
              </p>
            </div>

            <div style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16, padding: "24px 28px" }}>
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 13, color: C.gold, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>האני מאמין המקצועי</div>
              <blockquote style={{ fontFamily: "var(--font-heebo)", fontSize: 16, color: C.muted, lineHeight: 1.9, margin: 0, fontStyle: "italic" }}>
                "ההצלחה בתחום הזה מורכבת משני דברים: שליטה טכנית פנומנלית ויכולת עסקית יוצאת דופן. באקדמיה שלנו אנחנו לא רק מלמדים איך להחזיק מכונה, אלא מרחיבים לתלמיד את השריר היצירתי, מעניקים לו תשומת לב מלאה בכיתות קטנות, ומלמדים אותו איך לנהל עסק, למשוך לקוחות ולבנות מותג משגשג מהיום הראשון."
              </blockquote>
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 14, color: C.goldHi, marginTop: 16 }}>— בן גונן</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section style={{ padding: "0 1.5rem 120px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
          style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(135deg, rgba(150,3,26,0.28) 0%, rgba(26,26,26,0.65) 100%)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 28, padding: "clamp(40px, 7vw, 72px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 450, height: 250, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(150,3,26,0.35) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>הקהילה שלנו</div>
            <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: C.white, marginBottom: 20 }}>
              הרבה מעבר למספרה –{" "}
              <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>קהילה אמיתית</span>
            </h2>
            <p style={{ fontFamily: "var(--font-heebo)", fontSize: 17, color: C.muted, lineHeight: 1.85, maxWidth: 620, margin: "0 auto 36px" }}>
              המותג BenBarber הוא קודם כל קהילה של אנשי מקצוע, בוגרים ולקוחות שתומכים זה בזה. אלפי התלמידים שעברו אצלנו לאורך השנים נהנים מבית חם שתמיד פתוח להשתלמויות, התייעצויות וליווי אישי לאורך כל הקריירה המקצועית שלהם.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/academy" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, borderRadius: 12, padding: "14px 32px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
                לאקדמיה ←
              </Link>
              <Link href="/contact" style={{ background: "transparent", color: C.white, border: "1.5px solid rgba(255,255,255,0.22)", borderRadius: 12, padding: "14px 32px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                דברו איתנו
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
