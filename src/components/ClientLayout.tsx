"use client";

import { useEffect, ReactNode } from "react";
import { ModalProvider, useModal } from "@/context/ModalContext";
import { AnnouncementBar } from "./AnnouncementBar";
import { ContactModal } from "./ContactModal";

const SCROLL_MODAL_TITLE = "3 תעודות יוקרתיות בחיסכון של שנתיים!";
const SCROLL_MODAL_SUBTITLE =
  "המחזור הקרוב כמעט מלא, ואישורי דחיית השירות מול מיטב נסגרים בקרוב - בדוק זכאות ל-3 תעודות יוקרה ועד 80% מימון עכשיו.";
const SESSION_KEY = "gordon_scroll_popup_shown";

/** Listens for 30% scroll and fires the modal once per session. */
function ScrollTrigger() {
  const { openModal, isOpen } = useModal();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleScroll = () => {
      if (isOpen) return;
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;

      if (pct >= 40) {
        sessionStorage.setItem(SESSION_KEY, "1");
        openModal({
          title: SCROLL_MODAL_TITLE,
          subtitle: SCROLL_MODAL_SUBTITLE,
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openModal, isOpen]);

  return null;
}

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <AnnouncementBar />
      <ScrollTrigger />
      <ContactModal />
      {children}
    </ModalProvider>
  );
}
