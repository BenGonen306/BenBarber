"use client";

import { useEffect, useState } from "react";
import { Accessibility, X, Type, Contrast, Eye, Underline, RotateCcw } from "lucide-react";

const C = {
  charcoal: "#1a1a1a",
  surface: "#232323",
  gold: "#d4af37",
  goldHi: "#e9d2a6",
  goldLo: "#aa7c11",
  white: "#ffffff",
  muted: "#c8c8c8",
};

const STORAGE_KEY = "bb-a11y-prefs";

type Prefs = {
  textSize: boolean;
  grayscale: boolean;
  contrast: boolean;
  underline: boolean;
};

const defaultPrefs: Prefs = { textSize: false, grayscale: false, contrast: false, underline: false };

function applyPrefs(prefs: Prefs) {
  const html = document.documentElement;
  html.classList.toggle("a11y-text-xl", prefs.textSize);
  html.classList.toggle("a11y-underline", prefs.underline);
  const filters: string[] = [];
  if (prefs.grayscale) filters.push("grayscale(1)");
  if (prefs.contrast) filters.push("contrast(1.3)");
  html.style.setProperty("--a11y-filter", filters.length ? filters.join(" ") : "none");
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPrefs(parsed);
        applyPrefs(parsed);
      }
    } catch {}
  }, []);

  const toggle = (key: keyof Prefs) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    applyPrefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const reset = () => {
    setPrefs(defaultPrefs);
    applyPrefs(defaultPrefs);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const options: { key: keyof Prefs; label: string; icon: React.ReactNode }[] = [
    { key: "textSize", label: "הגדלת טקסט", icon: <Type size={16} /> },
    { key: "grayscale", label: "מצב גווני אפור", icon: <Eye size={16} /> },
    { key: "contrast", label: "ניגודיות גבוהה", icon: <Contrast size={16} /> },
    { key: "underline", label: "קו תחתון לקישורים", icon: <Underline size={16} /> },
  ];

  return (
    <div style={{ position: "fixed", bottom: 24, insetInlineStart: 24, zIndex: 300 }}>
      {open && (
        <div
          role="dialog"
          aria-label="אפשרויות נגישות"
          style={{
            position: "absolute",
            bottom: 60,
            insetInlineStart: 0,
            width: 260,
            background: C.surface,
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 18,
            padding: "18px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: "var(--font-rubik), sans-serif", fontWeight: 800, fontSize: 14, color: C.white }}>נגישות</div>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגור"
              style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {options.map((o) => (
              <button
                key={o.key}
                onClick={() => toggle(o.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: prefs[o.key] ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${prefs[o.key] ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  color: prefs[o.key] ? C.goldHi : C.muted,
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: "right",
                  width: "100%",
                }}
              >
                {o.icon}
                {o.label}
              </button>
            ))}

            <button
              onClick={reset}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                color: C.muted,
                fontFamily: "var(--font-heebo), sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textAlign: "right",
                width: "100%",
                marginTop: 4,
              }}
            >
              <RotateCcw size={16} />
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="פתח אפשרויות נגישות"
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
          border: "none",
          boxShadow: "0 6px 24px rgba(212,175,55,0.45)",
          color: C.charcoal,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Accessibility size={24} />
      </button>

      <style>{`
        html.a11y-text-xl body { font-size: 110%; }
        body { filter: var(--a11y-filter, none); }
        html.a11y-underline a { text-decoration: underline !important; }
      `}</style>
    </div>
  );
}
