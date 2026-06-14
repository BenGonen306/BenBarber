# מכללת גורדון — אתר מסלול הנדסאי י״ג י״ד

Landing page for Gordon Academy's Electronics / Mechatronics Technician
program (י״ג י״ד) — a 2-year track that combines a recognized Technician
certificate, a Bachelor's degree (B.Ed) and a Teaching certificate.

## Stack

- **Next.js 14** with the App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide** for icons
- **RTL Hebrew** layout, full dark theme

## Local Development

```bash
npm install
npm run dev
```

The dev server will be available at <http://localhost:3000>.

### Production build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout (Heebo + Rubik fonts, RTL)
│   ├── page.tsx         # Home page composition
│   └── globals.css      # Tailwind + custom CSS layers
├── components/          # Section components (Hero, About, ...)
└── lib/
    ├── content.ts       # All page copy in one place
    └── utils.ts         # cn() helper
```

## Editing Content

All on-page copy lives in `src/lib/content.ts`. Update that single file to
change titles, descriptions, FAQ, contact details, etc.
