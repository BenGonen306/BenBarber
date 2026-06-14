"use client";

import { siteContent } from "@/lib/content";
import { useModal } from "@/context/ModalContext";

export function Footer() {
  const { footer, brand } = siteContent;
  const { openModal } = useModal();

  // Links that should open the modal instead of scrolling
  const MODAL_HREFS = new Set(["#contact"]);

  return (
    <footer className="relative border-t border-gray-200 bg-gray-50 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-72 w-[60rem] bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <div className="container-padded relative py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center font-display font-black text-white text-xl">
                ג
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold text-base">
                  {brand.name}
                </div>
                <div className="text-[11px] text-muted tracking-wide">
                  {brand.tagline}
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground/65 leading-relaxed max-w-sm">
              {footer.description}
            </p>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-display font-bold text-sm tracking-widest text-primary uppercase mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {column.links.map((link) =>
                    MODAL_HREFS.has(link.href) ? (
                      <li key={link.label}>
                        <button
                          onClick={() => openModal()}
                          className="text-sm text-foreground/70 hover:text-primary transition-colors text-right"
                        >
                          {link.label}
                        </button>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-foreground/70 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">{footer.legal}</p>
          <p className="text-xs text-muted">
            עוצב ונבנה באהבה לדור הבא של הנדסאי ישראל
          </p>
        </div>
      </div>
    </footer>
  );
}
