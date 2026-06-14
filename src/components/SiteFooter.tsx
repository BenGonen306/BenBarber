"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

const C = {
  red: "#96031a",
  gold: "#d4af37",
  goldHi: "#e9d2a6",
  goldLo: "#aa7c11",
  charcoal: "#1a1a1a",
  white: "#ffffff",
  muted: "#c8c8c8",
  dim: "#777777",
};

const footerNav = [
  { label: "דף הבית", href: "/" },
  { label: "המספרה", href: "/barbershop" },
  { label: "האקדמיה", href: "/academy" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/bengonen", icon: "𝔽" },
  { label: "Instagram", href: "https://www.instagram.com/ben_gon/", icon: "📸" },
  { label: "TikTok", href: "https://www.tiktok.com/@bengonen", icon: "🎵" },
  { label: "YouTube", href: "https://www.youtube.com/@bengonen", icon: "▶" },
];

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "rgba(0,0,0,0.5)",
        borderTop: "1px solid rgba(212,175,55,0.15)",
        padding: "56px 1.5rem 28px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontWeight: 900,
                fontSize: 22,
                color: C.white,
                marginBottom: 8,
              }}
            >
              BenBarber
            </div>
            <div
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontSize: 12,
                color: C.gold,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Academy & Shop
            </div>
            <p
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontSize: 14,
                color: C.dim,
                lineHeight: 1.8,
              }}
            >
              מספרת בוטיק ואקדמיה לספרות גברים.
              <br />
              חולון, ישראל.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: C.goldHi,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              ניווט מהיר
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontSize: 14,
                    color: C.muted,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: C.goldHi,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              שעות פעילות
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { day: "ימים א׳–ה׳", hours: "10:00 – 20:00" },
                { day: "יום ו׳", hours: "10:00 – 13:00" },
                { day: "שבת", hours: "סגור" },
              ].map((row) => (
                <div
                  key={row.day}
                  style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heebo), sans-serif",
                      fontSize: 13,
                      color: C.dim,
                    }}
                  >
                    {row.day}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-rubik), sans-serif",
                      fontSize: 13,
                      color: C.muted,
                      fontWeight: 600,
                    }}
                  >
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: C.goldHi,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              עקבו אחרינו
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontSize: 14,
                    color: C.muted,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.goldHi)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                >
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontSize: 13,
              color: C.dim,
            }}
          >
            © 2026 BenBarber Academy & Shop. כל הזכויות שמורות.
          </div>
          <Link
            href="/barbershop"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLo})`,
              color: C.charcoal,
              borderRadius: 8,
              padding: "8px 20px",
              fontFamily: "var(--font-rubik), sans-serif",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            קביעת תור ←
          </Link>
        </div>
      </div>
    </footer>
  );
}
