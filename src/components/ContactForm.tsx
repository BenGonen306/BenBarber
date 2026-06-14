"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const WEBHOOK_MAKE =
  "https://hook.eu2.make.com/i6mt9y9st1kq5584qcapa877tr6pimcq";
const WEBHOOK_ZAPIER =
  "https://hooks.zapier.com/hooks/catch/15495815/4ojzqr4/";

interface ContactFormProps {
  /** Show only name, phone, and track (for hero / modal) */
  compact?: boolean;
  /** Called ~2.5 s after success — useful for closing a modal */
  onSuccess?: () => void;
}

export function ContactForm({ compact = false, onSuccess }: ContactFormProps) {
  const { contact } = siteContent;
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
      utm_term: params.get("utm_term") ?? "",
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const fd = new FormData(event.currentTarget);

    // Extract every field as a plain string — avoids FormDataEntryValue quirks
    const name    = String(fd.get("name")    ?? "");
    const phone   = String(fd.get("phone")   ?? "");
    const track   = String(fd.get("track")   ?? "");
    const email   = String(fd.get("email")   ?? "");
    const school  = String(fd.get("school")  ?? "");
    const message = String(fd.get("message") ?? "");

    // Active UTM params only (omit empty strings)
    const utms = Object.fromEntries(
      Object.entries(utmParams).filter(([, v]) => v !== ""),
    );

    // Compact (Hero / modal) → 3 core fields + UTMs
    // Full (Contact section) → all fields + UTMs
    const zapierPayload = compact
      ? { name, phone, track, ...utms }
      : { name, phone, track, email, school, message, ...utms };

    // Make webhook always receives everything (mirrors current behaviour)
    const makePayload = { name, phone, track, email, school, message, ...utmParams };

    // Fire both webhooks in parallel; neither can block the UX
    await Promise.allSettled([
      fetch(WEBHOOK_MAKE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(makePayload),
      }),
      fetch(WEBHOOK_ZAPIER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zapierPayload),
      }),
    ]);

    if (
      typeof window !== "undefined" &&
      typeof (window as any).fbq === "function"
    ) {
      (window as any).fbq("track", "Lead");
    }

    setSubmitting(false);
    setSent(true);

    if (onSuccess) {
      setTimeout(onSuccess, 2500);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-12 px-6">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-6">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="heading-sm mb-2">קיבלנו את הפנייה!</h3>
        <p className="text-foreground/70 max-w-md mx-auto">
          נציג יחזור אליך תוך יום עסקים אחד.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field
          label={contact.fields.name}
          name="name"
          required
          placeholder="ישראל ישראלי"
        />
        <Field
          label="מספר פלאפון"
          name="phone"
          type="tel"
          required
          placeholder="050-0000000"
        />
      </div>

      {!compact && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label={contact.fields.email}
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <Field
            label={contact.fields.school}
            name="school"
            placeholder="שם בית הספר"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-muted mb-2">
          {contact.fields.track}
          <span className="text-primary mr-1">*</span>
        </label>
        <div className="flex flex-col gap-2">
          {contact.fields.tracks.map((track) => (
            <label key={track} className="cursor-pointer relative group">
              <input
                type="radio"
                name="track"
                value={track}
                required
                defaultChecked={track === contact.fields.tracks[0]}
                className="peer sr-only"
              />
              <div className="text-sm py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 peer-checked:border-primary peer-checked:bg-primary/8 peer-checked:text-primary transition-all hover:border-gray-300">
                {track}
              </div>
            </label>
          ))}
        </div>
      </div>

      {!compact && (
        <Field
          label={contact.fields.message}
          name="message"
          as="textarea"
          placeholder="ספרו לנו על עצמכם, מה הרקע שלכם ומה השאלות שיש לכם..."
        />
      )}

      {Object.entries(utmParams).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "btn-primary w-full",
          submitting && "opacity-70 pointer-events-none",
        )}
      >
        {submitting ? (
          "שולח..."
        ) : (
          <>
            {contact.fields.submit}
            <Send size={16} />
          </>
        )}
      </button>
      <p className="text-[11px] text-muted text-center">
        בלחיצה על שליחה אתם מאשרים קבלת מידע שיווקי מטעם האקדמית גורדון.
        תוכלו להסיר את עצמכם בכל עת.
      </p>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea";
};

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  as = "input",
}: FieldProps) {
  const className =
    "w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition-all";

  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted mb-1.5">
        {label}
        {required && <span className="text-primary mr-1">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
