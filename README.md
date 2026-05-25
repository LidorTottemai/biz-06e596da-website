# מרכז קהילתי יבור — Community Center Website

A production-ready Next.js 14 website for Yavor Community Center (מרכז קהילתי יבור) in Herzliya, Israel.

## Features

- **Bilingual (i18n)**: Hebrew (RTL, default) and English (LTR) via `next-intl`
- **Appointment Booking**: WhatsApp-based booking form with activity selection, date/time picker
- **Fully Responsive**: Mobile-first design from 375px up
- **Password Gate**: Optional site-wide password protection via `SITE_PASSWORD` env var
- **SEO Optimised**: `generateMetadata`, JSON-LD LocalBusiness schema, sitemap, robots.txt, hreflang
- **Design**: shadcn/ui components, Framer Motion animations, 4-color brand palette, WCAG AA contrast

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- next-intl v3
- Framer Motion v11
- React Hook Form
- shadcn/ui (Button, Card, Badge, Input, Label)
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/he` (Hebrew default).

## Environment Variables

Create a `.env.local` file:

```env
# Optional: protect the site with a password
SITE_PASSWORD=your-secret-password

# Required in production: canonical URL for metadata / sitemap
NEXT_PUBLIC_SITE_URL=https://www.javor.org.il
```

When `SITE_PASSWORD` is set, all pages redirect to `/unlock` until the user enters the correct password (stored in a 30-day cookie).

## Project Structure

```
app/
  [locale]/         # Locale-specific pages (he / en)
    layout.tsx      # Root layout with <html dir="rtl/ltr">
    page.tsx        # Home page
    booking/        # Appointment booking page
    contact/        # Contact page
    sitemap.ts      # Dynamic sitemap
  unlock/           # Password gate (outside locale routing)
  api/unlock/       # Password validation API
  layout.tsx        # Root passthrough layout
  robots.ts         # robots.txt
  globals.css       # Global styles

components/
  ui/               # shadcn/ui base components + cn utility
  home/             # Hero, Features, Stats, CTA sections
  booking/          # BookingForm
  Navbar.tsx        # Sticky header with language switcher
  Footer.tsx        # Footer with contact info

i18n/
  routing.ts        # Locale definitions
  request.ts        # Server-side message loading
  navigation.ts     # Typed Link, useRouter, usePathname

messages/
  he.json           # Hebrew content
  en.json           # English translations

lib/
  config.ts         # Business config helpers + WhatsApp URL builder

business.config.json  # Business details (phone, address, coordinates…)
```

## Brand Palette

| Colour | Hex | Usage |
|--------|-----|-------|
| Brand Blue | `#1B4F8A` | Primary actions, headers |
| Brand Amber | `#F5A623` | CTAs, highlights |
| Brand Purple | `#6B3FA0` | Arts accent |
| Brand Teal | `#0D9488` | Fresh accent |

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host. Set `NEXT_PUBLIC_SITE_URL` and optionally `SITE_PASSWORD` in your hosting dashboard.

## Contact

- Phone: 09-9543574
- Fax: 099506877
- Address: בן סרוק 12, הרצליה
- WhatsApp: [wa.me/97299506877](https://wa.me/97299506877)
