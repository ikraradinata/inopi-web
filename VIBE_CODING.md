# VIBE CODING GUIDE — INOPI Website

> Panduan prompt-by-prompt untuk membangun www.inopi.id dengan pendekatan AI-assisted vibe coding.
> Tech stack: Next.js 14 + TailwindCSS + shadcn/ui + Sanity CMS

---

## Urutan Pengerjaan (Fase 1 — 10 Hari)

```
Day 1 → Project setup + Design system
Day 2 → Layout: Navbar + Footer
Day 3 → Homepage: Hero + Stats + About snippet
Day 4 → Homepage: Program cards + Event list + CTA
Day 5 → Tentang: Sejarah + Visi Misi
Day 6 → Tentang: Struktur Organisasi + Founders
Day 7 → Sanity CMS setup + Berita listing
Day 8 → Keanggotaan: Benefit + Pricing + Form
Day 9 → SEO + meta tags + sitemap
Day 10 → Responsiveness audit + Deploy Docker
```

---

## Day 1 — Project Setup

### Prompt: Init Project

```
Buat project Next.js 14 dengan konfigurasi berikut:
- App Router (bukan Pages Router)
- TypeScript strict mode
- TailwindCSS
- shadcn/ui (init dengan style "default", baseColor "neutral")
- ESLint + Prettier
- Font: Syne (display/headings) dan Figtree (body) dari next/font/google

Setelah setup, buat file globals.css dengan CSS variables berikut:
[tempel konten dari DESIGN_SYSTEM.md bagian CSS Variables]

Juga buat tailwind.config.ts yang mengextend warna dan font sesuai design system INOPI.
```

### Prompt: Folder Structure

```
Buat struktur folder berikut untuk project Next.js 14 INOPI:
[tempel struktur dari README.md]

Buat file placeholder index untuk setiap folder agar TypeScript tidak error.
Tambahkan path aliases di tsconfig.json: @/components, @/lib, @/styles
```

---

## Day 2 — Layout Components

### Prompt: Navbar

```
Buat komponen Navbar untuk website INOPI (www.inopi.id) dengan spesifikasi:

VISUAL:
- Height: 56px
- Background: rgba(255,255,255,0.96) + backdrop-filter blur(8px)
- Position: sticky top-0 z-50
- Border bottom: 1px solid #e0e8ef
- Logo "INOPI" kiri: font Syne, weight 800, size 20px, color #071422
- Nav links tengah: Research | Programs | Membership | About | Innovation Hub
  font Figtree 13px, weight 500, color #4a6070
  hover: color #0d9488, border-bottom 2px #0d9488
  active state via usePathname()
- Button kanan "Join Membership": bg #083344, text white, radius 8px
  hover: bg #0d4a61, translateY(-1px)

BEHAVIOR:
- Mobile: hamburger icon → slide-in drawer dari kiri
- Drawer overlay: bg hitam 40% opacity
- Drawer berisi semua nav links + Join Membership button
- Tutup drawer: klik overlay atau tombol X

PROPS:
interface NavbarProps { transparent?: boolean }

Gunakan framer-motion untuk animasi drawer (x: -100% → 0).
Gunakan next/link untuk semua links.
```

### Prompt: Footer

```
Buat komponen Footer untuk website INOPI dengan layout:

STRUKTUR (4 kolom grid, responsive):
Col 1 (1.5fr): Logo INOPI + deskripsi singkat (2 kalimat) + icon sosmed (globe, linkedin, twitter)
Col 2: Navigasi - Research Portal | Strategic Programs | Membership Benefits
Col 3: Informasi - News & Insights | Privacy Policy | Contact Support  
Col 4: Newsletter - label "Newsletter" + input email + tombol "Langganan"

WARNA:
- Background: #071422
- Text: #6b8599
- Headings: #ffffff
- Link hover: #5dd4c8
- Bottom bar: border-top 1px #1a2e40, text #445566
- Bottom text: "© 2024 INOPI, Advancing Academic Excellence through Technology."

Newsletter form:
- Input: bg #1a2e40, text white, placeholder gray, radius kiri
- Button: bg #0d9488, text white, radius kanan
- On submit: toast success "Terima kasih telah berlangganan!"

Tambahkan komponen ke app/layout.tsx.
```

---

## Day 3 — Homepage: Hero, Stats, About

### Prompt: Hero Section

```
Buat HeroSection komponen untuk homepage INOPI:

LAYOUT: 2 kolom (55/45 split) — kiri konten, kanan visual box

KIRI:
- Badge pill atas: "⬡ Inovasi EduTech · Indonesia" (bg teal-light, text teal)
- Headline: "Transformasi Digital, Inovasi Masa Depan Pendidikan Indonesia"
  font Syne, clamp(28px,5vw,44px), weight 800, color #071422
  Kata "Pendidikan Indonesia" beri warna #0b7b8a
- Sub-teks: "Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional untuk mencetak generasi unggul di era Industri 5.0."
  font Figtree 14px, color #4a6070
- Dua tombol: "Gabung Anggota →" (primary) + "Pelajari Program" (outline)

KANAN: 
- Box rounded-[12px] bg #eef2f7, height 280px
- Live badge (top-left): "● LIVE RESEARCH" dengan dot hijau pulse animation
- Caption overlay (bottom-right): "Implementasi Osmatika-AI di Kurikulum Nasional"
  bg rgba(255,255,255,0.95), padding, border, rounded

ANIMASI (framer-motion):
- Konten kiri: slide-in dari kiri, opacity 0→1, duration 0.5s
- Box kanan: slide-in dari kanan, delay 0.2s
- Badge: fade-in, delay 0.1s

RESPONSIVE:
- Mobile: single column, hero height auto
- Image box: height 200px di mobile

Padding section: pt-12 pb-10 lg:pt-16
```

### Prompt: Stats Bar

```
Buat StatsBar komponen yang menampilkan angka-angka kunci INOPI.

DATA:
- 26 Founders
- 4 Divisi Utama
- 5 Program Prioritas
- 1 Visi Nasional

VISUAL:
- Background: #f7f9fb
- Layout: flex row, justify-center, gap 48px (mobile: grid 2x2)
- Setiap stat: angka besar (Syne 32px bold, color teal-btn) + label kecil (Figtree 13px, muted)
- Divider vertikal antar stat (hidden di mobile)

ANIMASI:
- Gunakan react-countup dengan useInView trigger
- Duration: 2 detik, easing: easeOut
```

### Prompt: About Snippet

```
Buat EkosistemSection untuk homepage INOPI:

Wrapper: bg-white, border border-border, rounded-[12px], padding 28px
Max-width 860px, centered

KONTEN:
- Title: "Ekosistem Inovasi Nasional" (Syne 20px bold)
- Sub: "INOPI (Asosiasi Inovasi Pembelajaran Indonesia) hadir sebagai katalisator yang menghubungkan akademisi, industri, dan pemerintah. Kami percaya bahwa masa depan pendidikan indonesia terbaik pada pada integrasi teknologi yang humanis dan berkelanjutan."
- 3 fitur dalam grid (border-top 2px sebagai accent):
  1. Riset Terapan — ikon microscope — deskripsi
  2. Kolaborasi Aktif — ikon handshake — deskripsi
  3. Advokasi Kebijakan — ikon file-text — deskripsi
  Border-top colors: teal-light | teal-2 | teal-btn (left to right)

Gunakan @tabler/icons-react untuk ikon.
```

---

## Day 4 — Homepage: Programs, Events, Partners, CTA

### Prompt: Program Highlights

```
Buat ProgramHighlights section untuk homepage dengan:

Title: "Program Strategis Kami"
Subtitle: "Lima pilar program yang mendorong inovasi pembelajaran nasional"

5 Program cards dalam grid 3+2 (asymmetric):
1. Riset & Inovasi — ikon beaker
2. Implementasi & Pilot Project — ikon rocket
3. Pelatihan & Sertifikasi — ikon certificate
4. Kolaborasi & Kemitraan — ikon network
5. Kebijakan & Standarisasi — ikon file-invoice

Setiap card:
- Ikon 20px dalam rounded bg teal-light
- Title (Figtree 14px bold)
- Deskripsi 1 kalimat (13px muted)
- Link teks "Selengkapnya →" (teal, hover underline)
- hover: border-teal-2, shadow-hover

Pada baris bawah (2 card terakhir), beri max-width lebih besar untuk balance layout.
```

### Prompt: Event List

```
Buat EventList section dengan:

Header: "Agenda & Forum Nasional" (label kecil, uppercase, spaced) 

Tampilkan 2 event mendatang dalam rows:
- Kiri: date circle (day besar Syne bold, month kecil uppercase teal)
- Tengah: title (14px bold) + venue (12px muted)
- Kanan: location icon + text + button "Daftar" (teal small)
- Border-bottom antar row

Data statis untuk sekarang:
1. 15 Okt 2024 | National Learning Innovation Forum (NLIF) | Jakarta Convention Center | Jakarta
2. 22 Okt 2024 | EduTech Asia Roadshow: Indonesia Chapter | Bandung Institute of Technology | Bandung

Background section: #f7f9fb
```

### Prompt: CTA Dark Section

```
Buat CtaDark komponen reusable:

Props:
interface CtaDarkProps {
  eyebrow?: string    // optional small text atas
  title: string       // required
  description: string // required
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

VISUAL:
- Background: #071422
- Border-radius: 16px
- Padding: 48px 32px
- Text-center
- Title: Syne 28px bold, color #ffffff
- Description: Figtree 14px, color #8fa5b5
- Eyebrow: 11px uppercase spaced, color #5dd4c8
- Primary button: bg teal-2, text white
- Secondary button: transparent, border #1a2e40, text #8fa5b5

Homepage usage:
title="Menjadi Bagian dari Gerakan Nasional"
description="Bergabunglah dengan ribuan pendidik dan inovator di seluruh Indonesia..."
primaryCta={{ label: "Daftar Sekarang", href: "/keanggotaan/daftar" }}
secondaryCta={{ label: "Bicara dengan Tim", href: "/kontak" }}
```

---

## Day 5 — Halaman Tentang

### Prompt: Sejarah Page

```
Buat halaman /tentang/sejarah untuk INOPI:

HERO: title "Latar Belakang & Sejarah", badge "Ekosistem Inovasi", sub-teks

KONTEN (dua kolom di desktop):

Kiri — Timeline vertikal 5 tahap dengan connecting line:
1. ✅ Nama Disetujui AHU — "INOPI resmi terdaftar di Administrasi Hukum Umum"
2. ✅ Inisiasi & Diskusi Founders — "11 April 2026 — pertemuan perdana 26 founders"
3. 📝 Penyusunan Visi, Misi & AD/ART — "Merumuskan landasan hukum..."
4. 📝 Pembentukan Struktur Organisasi — "Menetapkan pengurus..."
5. 🚀 Legalisasi → Soft Launch → Grand Launch — "Target Q3-Q4 2026"

Timeline dot: completed = bg-teal-2, pending = bg-border
Connecting line: 2px dashed border-border

Kanan — 3 challenge cards:
Gelombang Transformasi (AI, Digital ecosystem, Society 5.0, dst)
Tantangan Utama Indonesia (5 poin)
Peran INOPI

Data dari dokumen pembentukan INOPI halaman Latar Belakang.
```

### Prompt: Visi Misi Page

```
Buat halaman /tentang/visi-misi:

VISI BLOCK: full-width, bg #071422, padding 40px
- Label: "VISI INOPI"
- Quote besar: "Menjadi pusat kolaborasi dan inovasi pembelajaran terdepan di Indonesia yang berdaya saing global."
- Font Syne 24px italic white

5 MISI CARDS dalam numbered list:
01 Ekosistem Berkelanjutan
02 Riset & Teknologi
03 Jembatan Lintas Sektor
04 Peningkatan Kapasitas SDM
05 Standar dan Best Practices

Setiap card:
- Nomor besar teal di kiri
- Title bold (Syne 16px)
- Deskripsi (Figtree 13px muted)
- Border-bottom divider
- Hover: bg-surface-2

NILAI ORGANISASI grid 5 kolom (nilai utama INOPI):
Inklusif | Adaptif | Berkelanjutan | Inovatif | Kolaboratif
Setiap: ikon + kata + 1 kalimat deskripsi
```

---

## Day 6 — Struktur Organisasi & Founders

### Prompt: Org Chart

```
Buat halaman /tentang/struktur-organisasi dengan org chart interaktif.

Gunakan react-flow (@xyflow/react) untuk org chart:

DATA NODES (dari dokumen INOPI):
- Dewan Pembina: Pony Halim, Gogot Suharwoto, M. Aditya Warman, Boni Pujianto, Subchan Gatot, Heru Dewanto
- Dewan Pengawas: Prof Paulina, Tutut Handayani, Daniel Adhinugraha, Bambang Yapri
- Dewan Pakar: Stephen Ng, Setyo Guritno, Kun Wardana, Ferry Sutanto, Jahja
- Ketua: Prof Meyliana | Wakil Ketua: Sunardi
- Sekretaris: Idha Kristiana | Bendahara: Ikrar Adinata Arin
- Riset & Inovasi: Bobi Kurniawan, Nunik Afriliana
- Program & Implementasi: Nita Felia, Yasser M. Syaiful
- Kemitraan & Kerjasama: Victor Osman, Siti Elda Hiererra
- Pelatihan & Sertifikasi: Andy Biantoro

CUSTOM NODE COMPONENT:
- Node biasa: bg-white border, rounded, padding, nama + jabatan
- Node kepala (Ketua/Wakil): bg teal-btn text-white
- Node dewan: bg-dark text-white (dashed border)
- Klik node → sheet/drawer dari kanan dengan detail lengkap

MOBILE fallback: accordion list per kelompok
```

### Prompt: Founders Grid

```
Buat halaman /tentang/founders dengan grid 26 founders:

Layout: grid 4 kolom desktop, 2 kolom tablet, 2 kolom mobile
Setiap card (FounderCard):
- Avatar circle (initials, bg gradient teal) atau foto jika tersedia
- Nama lengkap (Figtree 13px bold)
- Jabatan di INOPI (12px teal)
- Afiliasi/institusi (11px muted)
- hover: shadow-hover, scale(1.02)

DATA (26 founders dari dokumen, diurutkan alfabetis):
1. Andy Biantoro, 2. Bambang Yapri, 3. Bobi Kurniawan,
4. Boni Pudjianto, 5. Daniel Adhinugraha, 6. Dito Eka Cahya,
7. Ferry Sutanto, 8. Gogot Suharwoto, 9. Heru Dewanto,
10. Idha Kristiana, 11. Ikrar Adinata Arin, 12. Jahja Soen,
13. Kun Wardana, 14. M. Aditya Warman, 15. Nita Felia Pambudi,
16. Nunik Afriliana, 17. Pony Halim, 18. Prof. Meyliana,
19. Prof. Paulina Pannen, 20. Siti Elda Hiererra,
21. Stephen Ng, 22. Subchan Gatot, 23. Sunardi,
24. Tutut Handayani, 25. Victor Osman, 26. Yasser Syaiful

Generate inisial otomatis dari nama untuk avatar fallback.
Klik → modal dialog dengan bio lengkap (placeholder: "Bio akan segera ditambahkan").
```

---

## Day 7 — Sanity CMS + Berita

### Prompt: Sanity Setup

```
Setup Sanity CMS untuk project INOPI Next.js:

1. Install: npm install next-sanity @sanity/image-url @sanity/vision

2. Buat lib/sanity/client.ts:
```
import { createClient } from 'next-sanity'
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
```

3. Buat schema untuk konten:
- berita: { title, slug, publishedAt, excerpt, content (portable text), image, category, author }
- event: { title, slug, date, time, location, type (conference/webinar/workshop), description, registrationLink, image, price }
- publikasi: { title, slug, authors[], year, category, abstract, doi, fileUrl }
- founder: { name, slug, role, institution, bio, photo, order }

4. Buat lib/sanity/queries.ts dengan GROQ queries untuk setiap schema

5. Buat app/studio/[[...index]]/page.tsx untuk embedded Sanity Studio

6. Buat ISR halaman berita dengan revalidate: 3600
```

### Prompt: Berita Listing

```
Buat halaman /berita dengan:
- Grid artikel 3 kolom (desktop) → 1 kolom (mobile)
- Filter tabs: Semua | Berita INOPI | Artikel Opini | Press Release
- Search bar dengan debounce 300ms
- ArticleCard: gambar 16:9, kategori badge, judul (2 baris max), tanggal, excerpt (3 baris)
- Pagination: "Muat Lebih Banyak" button (load more pattern, tidak halaman baru)
- Loading skeleton saat fetch

Buat juga halaman /berita/[slug] dengan:
- Cover image full-width
- Title Syne bold large
- Meta: tanggal + kategori + author
- Portable Text renderer (konten CMS)
- Share buttons: WhatsApp + Twitter + LinkedIn + Copy link
- Related articles (3 card di bawah)
```

---

## Day 8 — Keanggotaan

### Prompt: Pricing Section

```
Buat halaman /keanggotaan dengan semua section:

SECTION 1 - Hero:
"Bergabung dengan Ekosistem Inovasi"
Badge + headline + deskripsi + 2 CTA tombol

SECTION 2 - Manfaat (6 cards grid):
Global Networking, Sertifikasi Eksklusif, Akses Riset, 
Inkubasi Startup, Undangan Event, Analisis Pasar
Setiap card: icon bg-teal-light + title + deskripsi 2 kalimat

SECTION 3 - Pricing (3 kolom):
Individu: Rp 500k/tahun — 3 fitur — tombol outline
Institusi: Rp 5.5jt/tahun — 4 fitur — FEATURED (bg-dark, popular badge, tombol teal)
Korporat: Custom — "Hubungi Kami" — 3 fitur — tombol outline

SECTION 4 - Alur + Form (2 kolom):
Kiri: 3 timeline steps (Pilih Paket → Lengkapi Data → Verifikasi)
Kanan: Quick Form (nama, email institusi, tipe keanggotaan, tombol submit)
Form menggunakan react-hook-form + zod validation
On submit: POST ke /api/membership, tampilkan success state

SECTION 5 - FAQ Accordion (3 pertanyaan umum)
```

### Prompt: Multi-step Membership Form

```
Buat halaman /keanggotaan/daftar dengan multi-step form:

STEP 1: Pilih Kategori
- 3 card pilihan: Individu / Institusi / Korporat
- Selected state: border-2 border-teal-btn bg-teal-light
- Progress bar di atas (3 steps)

STEP 2: Data Diri/Organisasi (conditional per kategori)
Individu:
- Nama lengkap, Email, No. HP, Institusi/Universitas, Bidang riset
Institusi:
- Nama institusi, Alamat, Contact person, Email resmi, Jumlah pengguna
Korporat:
- Nama perusahaan, Industri, Website, Contact, Kebutuhan khusus

STEP 3: Konfirmasi & Submit
- Summary data yang diisi
- Checkbox persetujuan syarat & ketentuan
- Tombol "Kirim Pendaftaran"
- POST ke /api/membership
- Success: halaman terima kasih + instruksi selanjutnya

Gunakan react-hook-form, zod, framer-motion untuk transisi antar step.
```

---

## Day 9 — SEO

### Prompt: SEO Setup

```
Setup SEO lengkap untuk INOPI website:

1. Buat app/layout.tsx dengan metadata base:
```
export const metadata: Metadata = {
  metadataBase: new URL('https://www.inopi.id'),
  title: { default: 'INOPI — Asosiasi Inovasi Pembelajaran Indonesia', template: '%s | INOPI' },
  description: 'Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional...',
  keywords: ['INOPI', 'inovasi pembelajaran', 'edtech indonesia', 'asosiasi pendidikan'],
  openGraph: { type: 'website', locale: 'id_ID', url: 'https://www.inopi.id', siteName: 'INOPI' },
  twitter: { card: 'summary_large_image', creator: '@inopi_id' },
  robots: { index: true, follow: true },
}
```

2. Buat metadata per halaman (setiap page.tsx punya generateMetadata atau static metadata)

3. Buat app/sitemap.ts — auto-generate sitemap dari halaman statis + CMS content

4. Buat app/robots.ts

5. Buat lib/structured-data.ts dengan JSON-LD untuk:
- Organization schema (INOPI)
- Event schema (untuk halaman event)
- Article schema (untuk berita)
- BreadcrumbList schema

6. Tambahkan Google Analytics 4 via @next/third-parties/google
```

---

## Day 10 — Polish & Deploy

### Prompt: Responsive Audit

```
Lakukan audit responsivitas untuk semua halaman website INOPI.
Periksa dan fix:

1. Navbar: hamburger menu bekerja di mobile, drawer bisa ditutup
2. Homepage hero: stack single column di mobile, font size clamp
3. Cards grid: 3-col → 2-col → 1-col sesuai breakpoint
4. Footer: 4-col → 2-col → 1-col di mobile
5. Pricing cards: scroll horizontal di mobile jika overflow
6. Org chart: fallback accordion di mobile
7. Form: full-width di mobile, label di atas input (bukan samping)
8. Typography: minimum 16px untuk body text di mobile
9. Touch targets: minimum 44×44px untuk semua button/link
10. Images: next/image dengan proper sizes attribute

Gunakan Tailwind breakpoint utilities: sm:, md:, lg:
```

### Prompt: Performance

```
Optimasi performance website INOPI untuk Core Web Vitals:

1. Lazy load semua gambar di bawah fold menggunakan next/image loading="lazy"
2. Preload hero image: priority={true} pada HeroSection image
3. Dynamis import komponen berat:
   - OrgChart: dynamic(() => import('@/components/ui/OrgChart'), { ssr: false })
   - ReactFlow: sama
4. Tambahkan Suspense boundaries dengan skeleton loaders untuk semua fetch
5. Gunakan unstable_cache untuk Sanity queries yang jarang berubah
6. Konfigurasi ISR: revalidate 3600 untuk berita, 86400 untuk halaman statis
7. Bundle analyzer: npm i @next/bundle-analyzer — cek apakah ada dependency besar
8. Pastikan next/font digunakan (bukan @import CSS) untuk zero layout shift
9. Tambahkan rel="preconnect" untuk cdn.sanity.io di layout.tsx
```

---

## Komponen Shared — Quick Prompts

### Loading Skeleton
```
Buat komponen Skeleton untuk loading state:
- SkeletonCard: placeholder untuk ArticleCard, EventCard, ResearchCard
- SkeletonText: placeholder untuk paragraf
- Animasi: pulse CSS animation bg-surface-2
Gunakan untuk Suspense boundaries di semua halaman dengan fetch data.
```

### Toast Notifications
```
Setup toast notifications menggunakan sonner:
npm install sonner

Tambahkan <Toaster /> ke app/layout.tsx.
Gunakan di:
- Form submission: toast.success("Pendaftaran berhasil dikirim!")
- Error: toast.error("Terjadi kesalahan. Silakan coba lagi.")
- Copy link: toast.success("Link berhasil disalin!")
```

### Newsletter Form
```
Buat Newsletter komponen:
- Input email + tombol "Langganan"
- Validasi email format dengan zod
- Submit → POST /api/newsletter (simpan ke Sanity atau Resend list)
- Success state: ganti form dengan "✓ Terima kasih! Cek inbox Anda."
- Gunakan di Footer dan sebagai section tersendiri di homepage
```

---

## Sanity GROQ Queries Reference

```typescript
// lib/sanity/queries.ts

// Semua berita (listing)
export const BERITA_QUERY = `*[_type == "berita"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, excerpt, category,
  "image": image.asset->url,
  "author": author->name
}`

// Berita by slug (detail)
export const BERITA_BY_SLUG = `*[_type == "berita" && slug.current == $slug][0] {
  ..., "image": image.asset->url, "author": author->{ name, photo }
}`

// Event mendatang
export const UPCOMING_EVENTS = `*[_type == "event" && date >= now()] | order(date asc) [0...6] {
  _id, title, slug, date, time, location, type, price,
  "image": image.asset->url
}`

// Publikasi
export const PUBLIKASI_QUERY = `*[_type == "publikasi"] | order(year desc) {
  _id, title, slug, authors, year, category, abstract, doi, fileUrl
}`

// Founders
export const FOUNDERS_QUERY = `*[_type == "founder"] | order(order asc) {
  _id, name, slug, role, institution, bio,
  "photo": photo.asset->url
}`
```

---

## Checklist Deploy

```bash
# Pre-deploy checklist

□ .env.local semua variable terisi
□ Sanity project ID dan dataset benar
□ npm run build → tidak ada error
□ npm run lint → tidak ada warning
□ Lighthouse score ≥ 85 desktop
□ Mobile responsive di Chrome DevTools
□ Form submit bekerja (membership, kontak, newsletter)
□ Semua link internal tidak ada 404
□ OG image muncul di social preview (test: opengraph.xyz)
□ Sitemap.xml accessible: /sitemap.xml
□ Robots.txt accessible: /robots.txt
□ Google Analytics tracking via GA Debugger
□ SSL certificate aktif (HTTPS)

# Docker deploy
docker compose -f docker-compose.prod.yml up -d --build

# AntiGravity deploy
ag deploy --env production
```
