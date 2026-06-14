"use client";

import { ChevronLeft } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export function AnnouncementBar() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() => openModal()}
      className="fixed top-0 left-0 right-0 z-[100] w-full h-12 bg-[#2f983e] hover:bg-[#268034] transition-colors flex items-center justify-center gap-2 px-4 cursor-pointer group"
      aria-label="פתח טופס בדיקת זכאות"
    >
      <span className="text-white text-sm md:text-base font-bold text-center leading-tight">
        חוסכים שנתיים מהחיים: 3 תעודות יוקרה במסלול אחד.{" "}
        <span className="underline underline-offset-2 group-hover:no-underline">
          בדוק זכאות למימון
        </span>
      </span>
      <ChevronLeft
        size={16}
        className="text-white flex-shrink-0 group-hover:-translate-x-0.5 transition-transform"
      />
    </button>
  );
}
