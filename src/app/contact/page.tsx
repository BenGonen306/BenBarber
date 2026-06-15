"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";

const C = {
  red: "#96031a", charcoal: "#1a1a1a", surface: "#232323",
  gold: "#d4af37", goldHi: "#e9d2a6", goldLo: "#aa7c11",
  white: "#ffffff", muted: "#c8c8c8", dim: "#777777",
};

const inp: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12, padding: "14px 16px", fontFamily: "var(--font-heebo)", fontSize: 15,
  color: C.white, outline: "none", boxSizing: "border-box", direction: "rtl", transition: "border-color 0.2s",
};

const experienceOptions = [
  { value: "", label: "האם יש לך ניסיון קודם בעולם הברברינג?" },
  { value: "none", label: "אין לי ניסיון בכלל, רוצה להתחיל מאפס!" },
  { value: "basic", label: "יש לי קצת ניסיון בסיסי" },
  { value: "pro", label: "אני ספר פעיל ומנוסה (רוצה השתלמויות מתקדמות)" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", experience: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = C.gold);
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = "rgba(255,255,255,0.12)");

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "55dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1.5rem 60px", textAlign: "center", overflow: "hidden" }}>
        <motion.div aria-hidden animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.62, 0.4] }} transition={{ duration: 11, repeat: Infinity }}
          style={{ position: "absolute", top: "5%", right: "5%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,3,26,0.5) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            style={{ display: "inline-block", padding: "7px 20px", borderRadius: 999, background: "rgba(212,175,55,0.11)", border: "1px solid rgba(212,175,55,0.32)", color: C.goldHi, fontSize: 13, fontFamily: "var(--font-heebo)", fontWeight: 600, marginBottom: 28 }}>
            💬 אני כאן בשבילך
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(2rem, 5.5vw, 4rem)", lineHeight: 1.1, color: C.white, marginBottom: 20 }}>
            דברו איתי –{" "}
            <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold}, ${C.goldLo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              אני כאן לכל שאלה
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            style={{ fontFamily: "var(--font-heebo)", fontSize: "clamp(1rem, 2vw, 1.12rem)", color: C.muted, lineHeight: 1.8, maxWidth: 620, margin: "0 auto" }}>
            רוצה לתאם תור? מתלבט איזה קורס יקפיץ לך את הקריירה? או שבא לך פשוט לבוא לשבת איתי על קפה טוב בסטודיו? תרגיש בבית, אני זמין עבורך בכל דרך שתבחר.
          </motion.p>
        </div>
      </section>

      {/* FORM + INFO GRID */}
      <section style={{ padding: "40px 1.5rem 120px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "start" }}>

          {/* FORM */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ background: C.surface, border: "1px solid rgba(212,175,55,0.2)", borderRadius: 24, padding: "40px 36px" }}>
            <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>טופס יצירת קשר</div>
            <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 22, color: C.white, marginBottom: 8 }}>השאר פרטים ונחזור אליך בהקדם</h2>
            <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, marginBottom: 28, lineHeight: 1.7 }}>כל הפניות מקבלות מענה תוך יום עסקים אחד.</p>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: 22, color: C.white, marginBottom: 10 }}>ההודעה נשלחה!</h3>
                  <p style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.8 }}>בן גונן יחזור אליך תוך יום עסקים אחד. תודה!</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit}
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 7 }}>שם מלא *</label>
                    <input type="text" placeholder="ישראל ישראלי" value={form.name} onChange={set("name")} required style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 7 }}>מספר טלפון *</label>
                    <input type="tel" placeholder="050-0000000" value={form.phone} onChange={set("phone")} required style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 7 }}>דואר אלקטרוני</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} style={{ ...inp, direction: "ltr" }} onFocus={focusBorder} onBlur={blurBorder} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 7 }}>ניסיון קודם בברברינג</label>
                    <select value={form.experience} onChange={set("experience")} style={{ ...inp, cursor: "pointer", appearance: "none" }} onFocus={focusBorder} onBlur={blurBorder}>
                      {experienceOptions.map(o => <option key={o.value} value={o.value} style={{ background: C.surface, color: o.value ? C.white : C.dim }}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 7 }}>הודעה / בקשה מיוחדת</label>
                    <textarea placeholder="ספר לנו במה נוכל לעזור..." value={form.message} onChange={set("message")} rows={4}
                      style={{ ...inp, resize: "vertical", minHeight: 110 }} onFocus={focusBorder} onBlur={blurBorder} />
                  </div>
                  <button type="submit" disabled={loading}
                    style={{ background: loading ? "rgba(212,175,55,0.5)" : `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, border: "none", borderRadius: 12, padding: "15px 24px", fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", transition: "transform 0.18s" }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "")}>
                    {loading ? "שולח..." : "שלח הודעה ←"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* INFO */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>פרטי התקשרות</div>
            <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: C.white, margin: "0 0 8px" }}>
              איפה אני{" "}
              <span style={{ background: `linear-gradient(135deg, ${C.goldHi}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>יושב?</span>
            </h2>

            {/* Contact chips */}
            {[
              { icon: <Phone size={16} />, label: "טלפון ליצירת קשר", value: "[מספר הטלפון של בן]", href: "tel:+972500000000" },
              { icon: <MessageCircle size={16} />, label: "וואטסאפ מהיר", value: "שלח הודעה ב-WhatsApp", href: "https://wa.me/972500000000" },
              { icon: <MapPin size={16} />, label: "כתובת הסטודיו", value: "חולון, ישראל", href: "https://maps.google.com/?q=חולון" },
            ].map((item, i) => (
              <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(212,175,55,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 600, fontSize: 12, color: C.dim, marginBottom: 4, letterSpacing: "0.05em" }}>{item.label}</div>
                  <div style={{ fontFamily: "var(--font-heebo)", fontWeight: 700, fontSize: 15, color: C.white }}>{item.value}</div>
                </div>
              </a>
            ))}

            {/* How to get there */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 18, padding: "24px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 13, color: C.goldHi }}>איך מגיעים?</div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>🚗</span>
                <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0 }}>הסטודיו ממוקם במיקום נגיש במיוחד בחולון. לבאים עם רכב, עומד לרשותכם מגרש חנייה מרווח וחינמי הממוקם ממש מאחורי המתחם שלנו.</p>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>🚌</span>
                <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0 }}>קווי אוטובוס מרכזיים רבים עוצרים במרחק של פחות מ-3 דקות הליכה מהסטודיו.</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(212,175,55,0.15)", height: 220, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
              <MapPin size={32} style={{ color: C.gold }} />
              <div style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted }}>חולון, ישראל</div>
              <a href="https://maps.google.com/?q=חולון" target="_blank" rel="noopener noreferrer"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`, color: C.charcoal, borderRadius: 10, padding: "9px 20px", fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                פתח ב-Google Maps ←
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
