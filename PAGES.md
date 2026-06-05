# PAGES SPECIFICATION — INOPI Website

> Detail konten, layout, dan komponen untuk setiap halaman www.inopi.id

---

## Homepage (/)

### Sections (urut dari atas ke bawah)

| # | Section | Component | Fetch |
|---|---------|-----------|-------|
| 1 | Hero | `HeroSection` | Static |
| 2 | Stats Bar | `StatsBar` | Static |
| 3 | Ekosistem Snippet | `EkosistemSection` | Static |
| 4 | Program Highlights | `ProgramHighlights` | Static |
| 5 | Research Highlights | `ResearchHighlights` | Sanity (3 latest) |
| 6 | Event List | `EventList` | Sanity (2 upcoming) |
| 7 | Partner Strip | `PartnerStrip` | Static |
| 8 | CTA Dark | `CtaDark` | Static |

### Hero Copy
```
Badge: "⬡ Inovasi EduTech · Indonesia"
Headline: "Transformasi Digital, Inovasi Masa Depan Pendidikan Indonesia"
Sub: "Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional untuk mencetak generasi unggul di era Industri 5.0."
CTA1: "Gabung Anggota →" → /keanggotaan/daftar
CTA2: "Pelajari Program" → /program
```

### Stats
```
26 Founders | 4 Divisi Utama | 5 Program Prioritas | 1 Visi Nasional
```

### Partner Logos
```
KEMENDIKBUD · UGM · UI · MICROSOFT · GOOGLE
(Placeholder — replace dengan logo resmi setelah tersedia)
```

---

## Tentang INOPI (/tentang)

### Sub-pages

#### /tentang/sejarah
```
Hero:
  Badge: "📅 Perjalanan INOPI"
  Title: "Sejarah & Latar Belakang"
  Sub: "Dari gagasan kolaboratif menuju asosiasi inovasi pembelajaran terkemuka Indonesia."

Timeline 5 tahap:
1. [✓] Nama Disetujui AHU
2. [✓] Inisiasi & Diskusi Founders — 11 April 2026
3. [○] Penyusunan Visi, Misi & AD/ART
4. [○] Pembentukan Struktur Organisasi  
5. [○] Legalisasi → Soft Launch → Grand Launch

Problem-Solution 2 kolom:
Kolom 1: "Gelombang Transformasi"
  - AI (Artificial Intelligence)
  - Digital learning ecosystem
  - Smart education & adaptive learning
  - Immersive Technology
  - Society 5.0

Kolom 2: "Tantangan Utama Indonesia"
  - Fragmentasi inovasi pembelajaran
  - Kesenjangan akademik-industri-kebijakan
  - Kurangnya platform kolaborasi
  - Minimnya standardisasi
  - Terbatasnya adopsi teknologi
```

#### /tentang/visi-misi
```
Visi Block (full-width dark):
"Menjadi pusat kolaborasi dan inovasi pembelajaran terdepan di Indonesia
yang berdaya saing global."

5 Misi Strategis:
01 Ekosistem Berkelanjutan
   "Mengembangkan ekosistem inovasi pembelajaran yang inklusif, adaptif, dan berkelanjutan."
02 Riset & Teknologi
   "Mendorong riset dan implementasi teknologi pendidikan yang relevan dengan kebutuhan zaman."
03 Jembatan Lintas Sektor
   "Menjadi jembatan strategis antara akademisi, industri, dan pemerintah."
04 Peningkatan Kapasitas SDM
   "Meningkatkan kompetensi dan kapasitas SDM di bidang pembelajaran digital."
05 Standar dan Best Practices
   "Menciptakan standar dan best practices inovasi pembelajaran."
```

#### /tentang/struktur-organisasi
```
Org Chart (interaktif react-flow):

Level 1 (Dewan — dashed border, dark bg):
  [DEWAN PEMBINA]  [DEWAN PENGAWAS]  [DEWAN PAKAR]

Level 2:
  [KETUA: Prof. Meyliana]
  [WAKIL KETUA: Sunardi]

Level 2.5 (horizontal dari Ketua):
  [SEKRETARIS: Idha Kristiana]   [BENDAHARA: Ikrar Adinata Arin]

Level 3 (4 Divisi):
  [RISET & INOVASI]  [PROGRAM & IMPLEMENTASI]  [KEMITRAAN]  [PELATIHAN]

Klik setiap node → Drawer kanan dengan:
  - Nama-nama anggota
  - Deskripsi peran/tugas
  - Fungsi divisi
```

#### /tentang/founders
```
Heading: "Para Pendiri INOPI"
Sub: "26 tokoh terkemuka dari akademik, industri, dan komunitas profesional"

Grid 4-col, 26 founder cards:
[Foto/Avatar]
[Nama]
[Jabatan di INOPI]
[Institusi/Afiliasi]

Semua 26 nama (alfabet):
Andy Biantoro, Bambang Yapri, Bobi Kurniawan, Boni Pudjianto,
Daniel Adhinugraha, Dito Eka Cahya, Ferry Sutanto, Gogot Suharwoto,
Heru Dewanto, Idha Kristiana, Ikrar Adinata Arin, Jahja Soen,
Kun Wardana, M. Aditya Warman, Nita Felia Pambudi, Nunik Afriliana,
Pony Halim, Prof. Meyliana, Prof. Paulina Pannen, Siti Elda Hiererra,
Stephen Ng, Subchan Gatot, Sunardi, Tutut Handayani,
Victor Osman, Yasser Syaiful
```

---

## Program (/program)

### Landing page overview
```
Hero: "Program & Kegiatan Strategis"
5 Program Overview Cards (large, icon + title + deskripsi + CTA link)
```

### /program/riset-inovasi
```
Hero: Divisi Riset & Inovasi
Peran: Think Tank Asosiasi | Orientasi: Akademik & Ilmiah

7 Tugas & Tanggung Jawab (numbered):
1. Merancang agenda riset tahunan
2. Mengembangkan model, framework, metodologi pembelajaran
3. Menerbitkan hasil riset (jurnal, prosiding, white paper)
4. Mengelola repositori inovasi pembelajaran
5. Berkolaborasi untuk joint research
6. Mengidentifikasi tren global
7. Menjadi reviewer internal

Output Utama:
Laporan riset, publikasi ilmiah, policy brief, database inovasi

Tim:
- Bobi Kurniawan
- Nunik Afriliana

Publikasi terbaru: ISR dari Sanity (3 latest by division)
```

### /program/implementasi
```
Divisi Program & Implementasi
Peran: Executor Asosiasi | Orientasi: Operasional

7 Tugas & Tanggung Jawab
Output: Kalender program, laporan monev, dokumentasi, impact report
Tim: Nita Felia, Yasser M. Syaiful
Kegiatan mendatang: ISR dari Sanity
```

### /program/pelatihan
```
Divisi Pelatihan & Sertifikasi
Peran: Capacity Builder | Orientasi: Profesional & Kompetensi

Katalog pelatihan (cards dengan tanggal, harga, deskripsi)
Proses sertifikasi
Koordinasi BNSP
Tim: Andy Biantoro
```

### /program/kemitraan
```
Divisi Kemitraan & Kerjasama
Peran: Network Builder | Orientasi: Relasional & Strategis

Mitra terbagi 4 kategori:
- Universitas & Lembaga Riset
- Industri & Teknologi
- Pemerintah Pusat & Daerah
- Mitra Internasional

Form ajukan kemitraan
Tim: Victor Osman, Siti Elda Hiererra
```

---

## Keanggotaan (/keanggotaan)

### Section Breakdown

| Section | Komponen |
|---------|----------|
| Hero | `MembershipHero` |
| 6 Manfaat | `BenefitGrid` |
| 5 Alasan Founder | `FounderReasons` |
| 3 Pricing Tiers | `PricingSection` |
| Alur Pendaftaran | `RegistrationFlow` |
| Quick Form | `MembershipQuickForm` |
| FAQ | `FaqAccordion` |

### Pricing Data
```typescript
const plans = [
  {
    name: "Individu",
    desc: "Untuk peneliti, dosen, dan pelajar",
    price: "Rp 500k",
    period: "/tahun",
    features: ["Akses Portal Riset", "Sertifikasi Digital", "E-Library Premium"],
    cta: "Pilih Paket",
    featured: false,
  },
  {
    name: "Institusi",
    desc: "Untuk universitas dan lab riset.",
    price: "Rp 5.5jt",
    period: "/tahun",
    badge: "PALING POPULER",
    features: ["Semua Benefit Individu", "Lisensi untuk 50 Orang", "Priority Project Matching", "Sponsor di Jurnal INOPI"],
    cta: "Pilih Paket",
    featured: true,
  },
  {
    name: "Korporat",
    desc: "Untuk perusahaan skala besar.",
    price: "Hubungi Kami",
    period: "Custom pricing",
    features: ["Custom Partnership", "Akses Talenta Global", "Konsultasi Inovasi Dikaitif"],
    cta: "Kontak Sales",
    featured: false,
  },
]
```

### FAQ Content
```
Q: Berapa lama masa aktif keanggotaan?
A: Keanggotaan INOPI aktif selama 1 tahun sejak tanggal aktivasi dan dapat diperpanjang.

Q: Apakah saya bisa mengubah kategori membership di tengah jalan?
A: Ya, upgrade kategori dapat dilakukan kapan saja dengan membayar selisih biaya keanggotaan.

Q: Bagaimana cara mendapatkan sertifikat INOPI?
A: Sertifikat diterbitkan setelah menyelesaikan program pelatihan yang diakui INOPI dan memenuhi syarat kehadiran minimal 80%.

Q: Apakah ada uji coba gratis sebelum mendaftar?
A: Ya, tersedia akses trial 30 hari untuk kategori Individu dan Institusi.

Q: Bagaimana cara membayar iuran keanggotaan?
A: Pembayaran dapat dilakukan melalui transfer bank atau payment gateway yang tersedia di halaman pendaftaran.
```

---

## Riset & Publikasi (/riset)

```
Listing page:
- Search bar (debounce 300ms)
- Filter: Semua | AI in Education | Adaptive Learning | Smart Classroom | Policy Brief | White Paper
- Sort: Terbaru | Terlama | Paling Sering Diunduh
- Grid 3 kolom: PublicationCard
- Load more pagination (ISR, revalidate: 3600)

PublicationCard:
- Title (2 baris max)
- Authors (comma-separated, 2 first + "et al.")
- Year + Category badge
- Abstract truncated (3 baris)
- Download/DOI CTA

Detail page /riset/[slug]:
- Full title + authors
- Abstract lengkap
- Metadata: tahun, kategori, keywords, DOI
- Citation format: APA, MLA, BibTeX
- Download PDF (jika ada)
- Related publications (3 card)
```

---

## Event & Kegiatan (/event)

```
Listing:
- View toggle: Calendar | List
- Filter: Semua | Webinar | Conference | Workshop | Networking
- Status: Mendatang | Selesai
- EventCard: date + title + venue + type chip + harga + CTA

Detail /event/[slug]:
- Cover image
- Title + type badge
- Date, time, location
- Description panjang
- Pembicara (SpeakerCard: foto + nama + jabatan)
- Agenda/rundown (jika ada)
- Lokasi embed peta atau online link
- Registration CTA
- Harga (atau "Gratis")
```

---

## Berita & Artikel (/berita)

```
Listing:
- Kategori tabs: Semua | Berita INOPI | Artikel Opini | Press Release | Research Digest
- Search
- Grid 3 kolom: ArticleCard
- ArticleCard: gambar 16:9 | kategori chip | title | tanggal | excerpt 3 baris

Detail /berita/[slug]:
- Cover image (full-width)
- Kategori chip + estimasi baca
- Title (Syne large)
- Meta: tanggal + author (foto kecil)
- Body: Portable Text (Sanity)
- Share: WhatsApp | Twitter | LinkedIn | Copy URL
- Related: 3 artikel terkait
```

---

## Kontak (/kontak)

```
Layout 2 kolom:
Kiri:
  - Alamat: Jakarta Innovation District, Level 14 (placeholder)
  - Email: info@inopi.id
  - Telepon: +62 21 555 1234 (placeholder)
  - Jam: Senin–Jumat 09:00–17:00 WIB
  - Sosmed icons

Kanan: Contact Form
  Nama | Email | Subjek | Pesan (textarea) | Submit
  Validation: react-hook-form + zod
  Submit → POST /api/contact → Resend email
  Success: "Pesan Anda berhasil terkirim. Tim kami akan merespons dalam 1×24 jam."
```

---

## SEO Meta per Halaman

| Halaman | Title | Description |
|---------|-------|-------------|
| / | INOPI — Asosiasi Inovasi Pembelajaran Indonesia | Membangun ekosistem inovasi pembelajaran berbasis AI... |
| /tentang | Tentang INOPI | INOPI adalah asosiasi profesional... |
| /tentang/struktur-organisasi | Struktur Organisasi INOPI | Kenali pengurus dan struktur organisasi... |
| /tentang/founders | Para Pendiri INOPI | 26 tokoh terkemuka pendiri INOPI... |
| /program | Program & Kegiatan Strategis INOPI | Rangkaian program terstruktur... |
| /keanggotaan | Bergabung dengan INOPI | Jadilah bagian dari ekosistem inovasi... |
| /riset | Riset & Publikasi INOPI | Database publikasi dan hasil riset... |
| /event | Event & Kegiatan INOPI | Kalender kegiatan dan event... |
| /berita | Berita & Artikel INOPI | Berita terkini dan artikel opini... |
| /kontak | Kontak INOPI | Hubungi tim INOPI... |
