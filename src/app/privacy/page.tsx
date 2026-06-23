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

export default function PrivacyPage() {
  return (
    <section style={{ padding: "120px 1.5rem 100px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ color: C.gold, fontFamily: "var(--font-rubik)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
        מסמך משפטי
      </div>
      <h1 style={{ fontFamily: "var(--font-rubik)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: C.white, marginBottom: 28 }}>
        מדיניות פרטיות
      </h1>

      <div style={{ background: C.surface, border: "1px solid rgba(212,175,55,0.15)", borderRadius: 20, padding: "36px 32px" }}>
        <p style={{ fontFamily: "var(--font-heebo)", fontSize: 14, color: C.muted, lineHeight: 1.9, marginBottom: 28 }}>
          מדיניות פרטיות זו מפרטת כיצד בנג'י ("אנו", "החברה"), בעלת מספרת בוטיק ואקדמיה לספרות גברים בכתובת הרוקמים 23, חולון, אוספת, משתמשת ומאבטחת מידע אישי שנמסר לה על ידי משתמשי האתר, בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, ותקנותיו.
        </p>

        <Section title="1. מידע שנאסף">
          <p>בעת השימוש באתר אנו עשויים לאסוף את הפרטים הבאים: שם מלא, מספר טלפון, כתובת דואר אלקטרוני, ופרטים נוספים שתבחר למסור בטופס יצירת הקשר, בטופס ההרשמה לאקדמיה, או במערכת קביעת התורים (TidyCal). כן נאסף מידע גלישה אנונימי באמצעות עוגיות אנליטיקס (כגון Google Analytics) לצורך הבנת השימוש באתר ושיפורו.</p>
        </Section>

        <Section title="2. מטרות השימוש במידע">
          <p>המידע הנאסף משמש אותנו לצורך: (א) תיאום וניהול תורים במספרה; (ב) טיפול בפניות ולידים להרשמה לקורסי האקדמיה ויצירת קשר חזרה עם הפונה; (ג) שיפור חוויית המשתמש באתר וניתוח סטטיסטי של תנועת הגולשים; (ד) שליחת עדכונים שיווקיים, בכפוף לקבלת הסכמה מפורשת ובהתאם לחוק התקשורת (בזק ושירותים), התשמ"ב-1982 (חוק הספאם).</p>
        </Section>

        <Section title="3. שירותי צד שלישי">
          <p>האתר משתמש בשירות החיצוני TidyCal לניהול קביעת תורים, ובאמצעי תקשורת חיצוניים כגון WhatsApp, לצורך יצירת קשר ישיר. מידע שתמסור באמצעות שירותים אלו כפוף גם למדיניות הפרטיות של אותם ספקים. אנו עושים שימוש בעוגיות (Cookies) אנליטיות לצורך מדידת ביצועי האתר בלבד, ולא למטרות פרסום צד שלישי.</p>
        </Section>

        <Section title="4. אבטחת מידע">
          <p>החברה נוקטת באמצעי אבטחה סבירים ומקובלים כדי להגן על המידע האישי שנמסר לה מפני גישה, שימוש או חשיפה בלתי מורשים. עם זאת, אין באמצעים אלה כדי להבטיח הגנה מוחלטת, וכל מסירת מידע באינטרנט כרוכה בסיכון מסוים.</p>
        </Section>

        <Section title="5. שמירת מידע ומחיקתו">
          <p>המידע האישי יישמר במשך הזמן הנדרש למימוש המטרות שלשמן נאסף, או בהתאם לדרישות כל דין. כל משתמש זכאי לבקש עיון, תיקון או מחיקה של המידע האישי שנמסר על ידו, בפנייה בכתב לפרטי ההתקשרות המפורטים מטה.</p>
        </Section>

        <Section title="6. זכויותיך">
          <p>בהתאם לחוק הגנת הפרטיות, הינך זכאי לעיין במידע המוחזק עליך, לבקש את תיקונו או מחיקתו, וכן לבקש להימחק מרשימות תפוצה שיווקיות בכל עת, ללא תנאי.</p>
        </Section>

        <Section title="7. יצירת קשר בנושא פרטיות">
          <p>
            לכל שאלה, בקשת עיון או מחיקת מידע, ניתן לפנות אלינו:<br />
            בנג'י · הרוקמים 23, חולון · טלפון: +972 53-620-8925
          </p>
        </Section>

        <p style={{ fontFamily: "var(--font-heebo)", fontSize: 12, color: "#777", marginTop: 8 }}>עודכן לאחרונה: 2026</p>
      </div>
    </section>
  );
}
