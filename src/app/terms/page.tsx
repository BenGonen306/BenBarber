const C = {
  gold: "#d4af37", goldHi: "#e9d2a6", muted: "#c8c8c8", white: "#ffffff", surface: "#232323",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 18, color: C.goldHi, marginBottom: 10 }}>{title}</h2>
      <div style={{ fontFamily: "var(--font-heebo)", fontSize: 15, color: C.muted, lineHeight: 1.9 }}>{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <section style={{ padding: "120px 1.5rem 100px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
        מסמך משפטי
      </div>
      <h1 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: C.white, marginBottom: 28 }}>
        תנאי שימוש
      </h1>

      <div style={{ background: C.surface, border: "1px solid rgba(212,175,55,0.15)", borderRadius: 20, padding: "36px 32px" }}>
        <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, lineHeight: 1.9, marginBottom: 28 }}>
          תנאי שימוש אלה ("התנאים") מסדירים את הגלישה והשימוש באתר האינטרנט של בנג'י ("האתר", "אנו", "החברה"), בעל מספרת בוטיק ואקדמיה לספרות גברים, הממוקם בכתובת הרוקמים 23, חולון, ניתן ליצירת קשר בטלפון +972 53-620-8925. כל שימוש באתר, לרבות צפייה, קביעת תורים והשארת פרטים, מהווה הסכמה מלאה לתנאים המפורטים להלן.
        </p>

        <Section title="1. כללי">
          <p>האתר נועד למתן מידע אודות שירותי המספרה והאקדמיה של בנג'י, לרבות אפשרות לקביעת תורים, רישום לקורסים והשתלמויות, ויצירת קשר עם הצוות. השימוש באתר הוא באחריותו הבלעדית של המשתמש, ובכפוף לחוק הגנת הצרכן, התשמ"א-1981, ולכל דין רלוונטי אחר החל על מסחר אלקטרוני בישראל.</p>
        </Section>

        <Section title="2. קביעת תורים והרשמה לקורסים">
          <p>קביעת תורים במספרה מתבצעת באמצעות מערכת חיצונית (TidyCal) המשולבת באתר. הרשמה לקורסי האקדמיה מתבצעת באמצעות טופס השארת פרטים, ולאחריה ייצור הצוות שלנו קשר טלפוני או באמצעות הודעה לתיאום פרטים נוספים. אנו שומרים את הזכות לשנות, לבטל או לדחות תור או רישום בהודעה מוקדמת ובכפוף לכל דין.</p>
        </Section>

        <Section title="3. קניין רוחני">
          <p>כל הזכויות בתוכן האתר, לרבות טקסטים, תמונות, סרטונים, עיצוב גרפי, לוגו ושם המותג "בנג'י", שייכות לבעלי האתר בלבד. אין להעתיק, להפיץ, לשכפל או לעשות כל שימוש מסחרי בתוכן האתר ללא אישור מפורש מראש ובכתב.</p>
        </Section>

        <Section title="4. הגבלת אחריות">
          <p>החברה עושה כמיטב יכולתה לשמור על דיוק המידע המוצג באתר (לרבות מחירים, שעות פעילות ותכני קורסים), אך אינה מתחייבת כי המידע יהיה מלא, מדויק או נקי משגיאות בכל עת. תמונות השירותים והעבודות המוצגות באתר הן להמחשה בלבד.</p>
        </Section>

        <Section title="5. קישורים חיצוניים">
          <p>האתר עשוי להכיל קישורים ואמצעי הטמעה לשירותי צד שלישי (כגון YouTube, WhatsApp, Google Maps ו-Waze). השימוש בשירותים אלו כפוף לתנאי השימוש ולמדיניות הפרטיות של אותם צדדים שלישיים, ואין לחברה אחריות על תוכנם או זמינותם.</p>
        </Section>

        <Section title="6. דין וסמכות שיפוט">
          <p>על תנאים אלה יחולו דיני מדינת ישראל בלבד, וסמכות השיפוט הבלעדית בכל מחלוקת הנוגעת לאתר ולתנאים אלה תהא לבתי המשפט המוסמכים במחוז תל אביב-יפו.</p>
        </Section>

        <Section title="7. יצירת קשר">
          <p>
            לכל שאלה או בקשה הנוגעת לתנאי שימוש אלה, ניתן לפנות אלינו:<br />
            בנג'י · הרוקמים 23, חולון · טלפון: +972 53-620-8925
          </p>
        </Section>

        <p style={{ fontFamily: "var(--font-heebo)", fontSize: 12, color: "#777", marginTop: 8 }}>עודכן לאחרונה: 2026</p>
      </div>
    </section>
  );
}
