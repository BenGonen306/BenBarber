import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#111827",
        primary: {
          DEFAULT: "#2f983e",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#4CAF50",
          500: "#2f983e",
          600: "#1B5E20",
          700: "#145214",
          800: "#0D3D0D",
          900: "#062906",
        },
        accent: {
          DEFAULT: "#1565C0",
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#1565C0",
          600: "#0D47A1",
          700: "#0A3880",
          800: "#06285E",
          900: "#03153D",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          50: "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
        },
        muted: "#6B7280",
        border: "rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
        display: ["var(--font-rubik)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "glow": "glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient": "gradient 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(47, 152, 62, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(47, 152, 62, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 40% 20%, hsla(133, 52%, 39%, 0.10) 0px, transparent 50%), radial-gradient(at 80% 70%, hsla(213, 80%, 45%, 0.07) 0px, transparent 50%), radial-gradient(at 20% 80%, hsla(133, 52%, 39%, 0.06) 0px, transparent 50%)",
        "hero-pattern": "radial-gradient(circle at 50% 0%, rgba(47, 152, 62, 0.08), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
