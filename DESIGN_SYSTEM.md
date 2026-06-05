# INOPI Design System

> Sumber kebenaran tunggal untuk warna, tipografi, spacing, dan komponen visual website inopi.id.

---

## Brand Identity

Logo INOPI (Konsep 4 — Minimalis Geometris) menggunakan:
- **Bentuk**: Belah ketupat (diamond) dengan garis diagonal dan lingkaran kecil di puncak
- **Filosofi**: Keseimbangan, integritas, inovasi terbuka
- **Warna Logo**: Taupe/coklat lembut dan abu-abu hangat (netral, elegan)

---

## Color Tokens

### CSS Variables — `styles/globals.css`

```css
:root {
  /* === PRIMARY PALETTE === */
  --color-dark:        #071422;   /* Main dark — headlines, nav active */
  --color-dark-2:      #0e2235;   /* Dark secondary — card backgrounds */
  --color-teal:        #0b7b8a;   /* Teal mid — accents, borders */
  --color-teal-2:      #0d9488;   /* Teal bright — icons, badges */
  --color-teal-btn:    #083344;   /* Teal dark — primary buttons */
  --color-teal-light:  #e0f7f5;   /* Teal lightest — subtle backgrounds */

  /* === BACKGROUNDS === */
  --color-bg:          #ffffff;
  --color-bg-2:        #f7f9fb;   /* Section alternating */
  --color-bg-3:        #eef2f7;   /* Image placeholders, subtle fills */

  /* === TEXT === */
  --color-text:        #0d1e2e;   /* Body text */
  --color-text-2:      #4a6070;   /* Secondary / muted */
  --color-text-3:      #8fa5b5;   /* Placeholder, disabled */

  /* === BORDERS === */
  --color-border:      #e0e8ef;

  /* === SEMANTIC === */
  --color-success:     #22c55e;
  --color-warning:     #f59e0b;
  --color-error:       #ef4444;
  --color-info:        #3b82f6;

  /* === LAYOUT === */
  --radius:     12px;
  --radius-sm:   8px;
  --radius-lg:  16px;
}
```

### Tailwind Config Extension — `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark:      { DEFAULT: '#071422', 2: '#0e2235' },
        teal:      { DEFAULT: '#0b7b8a', 2: '#0d9488', btn: '#083344', light: '#e0f7f5' },
        muted:     { DEFAULT: '#4a6070', light: '#8fa5b5' },
        surface:   { DEFAULT: '#f7f9fb', 2: '#eef2f7' },
        border:    '#e0e8ef',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],   // Headings
        body:    ['Figtree', 'sans-serif'], // Body text
      },
      fontSize: {
        'hero':   ['clamp(28px, 5vw, 44px)', { lineHeight: '1.1', fontWeight: '800' }],
        'h1':     ['clamp(24px, 4vw, 36px)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2':     ['clamp(20px, 3vw, 28px)', { lineHeight: '1.25', fontWeight: '700' }],
        'h3':     ['18px', { lineHeight: '1.35', fontWeight: '600' }],
        'body':   ['14px', { lineHeight: '1.65', fontWeight: '400' }],
        'sm':     ['13px', { lineHeight: '1.5' }],
        'xs':     ['11px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        DEFAULT: '12px',
        sm:      '8px',
        lg:      '16px',
        xl:      '20px',
      },
      boxShadow: {
        card:  '0 1px 4px rgba(7,20,34,0.07)',
        hover: '0 4px 16px rgba(13,148,136,0.12)',
        nav:   '0 1px 0 #e0e8ef',
      },
    }
  }
} satisfies Config
```

---

## Typography

### Fonts — Load in `app/layout.tsx`

```typescript
import { Syne, Figtree } from 'next/font/google'

export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
```

### Type Scale

| Token | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| `.font-hero` | Syne | clamp(28px→44px) | 800 | Homepage hero headline |
| `.font-h1` | Syne | clamp(24px→36px) | 700 | Page titles |
| `.font-h2` | Syne | clamp(20px→28px) | 700 | Section titles |
| `.font-h3` | Syne | 18px | 600 | Card titles, sub-sections |
| `.font-h4` | Figtree | 15px | 600 | Component headings |
| `.font-body` | Figtree | 14px | 400 | All body text |
| `.font-sm` | Figtree | 13px | 400/500 | Captions, meta, labels |
| `.font-xs` | Figtree | 11px | 600/700 | Badges, overlines, chips |

---

## Spacing

```
4px   — micro gap (icon-to-text)
8px   — tight (badge inner, input padding compact)
12px  — small (list item gap, button gap)
16px  — base (card padding small, inline gap)
20px  — medium (card padding)
24px  — comfortable (section horizontal padding)
32px  — section gap
40px  — section padding vertical
56px  — large section padding
80px  — hero padding
```

---

## Buttons

```tsx
// Primary — Dark teal, white text
<Button variant="primary">Gabung Anggota →</Button>

// Teal — Medium teal (CTAs on dark backgrounds)
<Button variant="teal">Daftar Sekarang</Button>

// Outline — Transparent, bordered
<Button variant="outline">Pelajari Program</Button>

// Ghost — Text only
<Button variant="ghost">Lihat Semua →</Button>
```

```typescript
// components/ui/Button.tsx
const variants = {
  primary: 'bg-teal-btn text-white hover:bg-[#0d4a61] active:scale-95',
  teal:    'bg-teal-2 text-white hover:bg-teal active:scale-95',
  outline: 'bg-transparent text-dark border border-border hover:border-teal-2 hover:text-teal-2',
  ghost:   'bg-transparent text-teal-2 hover:underline p-0',
}
const sizes = {
  sm:  'px-4 py-2 text-xs',
  md:  'px-5 py-2.5 text-sm',     // default
  lg:  'px-6 py-3 text-base',
}
```

---

## Badges & Chips

```tsx
// Category badge (teal light)
<Badge>⬡ Inovasi EduTech · Indonesia</Badge>

// Chip variants
<Chip variant="conference">CONFERENCE</Chip>  // blue
<Chip variant="workshop">WORKSHOP</Chip>      // amber
<Chip variant="webinar">WEBINAR</Chip>        // green
<Chip variant="live">LIVE RESEARCH</Chip>     // green pulse
```

---

## Cards

### Base Card
```tsx
<Card>
  {/* bg-white border border-border rounded-[12px] p-5
      hover:border-teal-2 hover:shadow-hover transition-all */}
</Card>
```

### Research Card
```
[Image 120px dark gradient] 
[Padding 14px]
  Chip | H4 title | P excerpt
  ─────────────────
  Avatar + Author name
```

### Event Card
```
[Date circle: Day bold, Month small teal]
[Title bold] [Location muted]
[Right: Location icon + Button]
```

### Pricing Card
```
Normal:  bg-white border border-border
Featured: bg-dark border-teal-btn + "PALING POPULER" badge
```

### Team Card
```
[Photo area 140px dark gradient]
[Name bold] [Role teal] [Description muted]
```

---

## Navigation

```
[INOPI logo]   [Research · Programs · Membership · About · Innovation Hub]   [Join Membership btn]
```

- Height: **56px**
- Background: `rgba(255,255,255,0.96)` + `backdrop-filter: blur(8px)`
- Position: `sticky top-0 z-50`
- Border bottom: `1px solid var(--color-border)`
- Active indicator: `border-bottom: 2px solid var(--color-teal-2)`
- Mobile: hamburger → slide-in drawer

---

## Section Patterns

### Light Section
```
bg: #fff  padding: 56px 0
```

### Alt Section (stripe)
```
bg: #f7f9fb  padding: 40px 0
```

### Dark CTA Section
```
bg: #071422  padding: 48px 0
rounded-[16px]  text-center  color: #fff
```

### Full Dark (footer/roadmap)
```
bg: #071422  padding: 40px 0
```

---

## Motion Guidelines

```css
/* Transitions — all interactive elements */
transition: all 0.2s ease;

/* Card hover lift */
.card:hover { 
  border-color: var(--color-teal-2);
  box-shadow: 0 4px 16px rgba(13,148,136,0.12);
}

/* Button active press */
.btn:active { transform: scale(0.97); }

/* Framer Motion — page entrance */
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: 'easeOut' }}

/* Stats counter — on scroll */
/* Use react-countup with IntersectionObserver */

/* Live dot (pulse) */
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
```

---

## Responsive Breakpoints

```typescript
// Tailwind defaults (use these consistently)
sm:   640px   // Mobile landscape
md:   768px   // Tablet portrait
lg:   1024px  // Tablet landscape / small desktop
xl:   1280px  // Desktop
2xl:  1536px  // Wide desktop

// Container max-width
.container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
```

### Grid Patterns
| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Program cards | 3-col | 2-col | 1-col |
| Benefit cards | 3-col | 2-col | 1-col |
| Team cards | 4-col | 2-col | 2-col |
| Pricing cards | 3-col | 3-col | 1-col |
| Footer | 4-col | 2-col | 1-col |

---

## Icon System

Using **Tabler Icons** (React package):

```bash
npm install @tabler/icons-react
```

```tsx
import { IconBrandResearch, IconUsers, IconCertificate } from '@tabler/icons-react'

// Usage
<IconUsers size={20} stroke={1.5} className="text-teal-2" />
```

Key icons per section:
- Riset Terapan: `IconMicroscope`
- Kolaborasi: `IconHandshake`  
- Kebijakan: `IconFileText`
- Networking: `IconNetwork`
- Sertifikasi: `IconCertificate`
- Publikasi: `IconBook`
- Event: `IconCalendar`
- Location: `IconMapPin`
