# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Website Resmi INOPI — www.inopi.id
**Versi 2.0 · Diperbarui: 28 Mei 2026**

---

## DAFTAR ISI

1. [Executive Summary](#1-executive-summary)
2. [Profil Organisasi INOPI](#2-profil-organisasi-inopi)
3. [Struktur Organisasi & Pengurus](#3-struktur-organisasi--pengurus)
4. [Program Kerja Divisi](#4-program-kerja-divisi)
5. [Information Architecture](#5-information-architecture)
6. [Page Requirements](#6-page-requirements)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Design System](#9-design-system)
10. [Technical Architecture](#10-technical-architecture)
11. [Content Requirements](#11-content-requirements)
12. [Development Phases](#12-development-phases)
13. [Out of Scope](#13-out-of-scope)
14. [Glossary](#14-glossary)

---

## 1. Executive Summary

Dokumen ini merupakan **Product Requirements Document (PRD) versi 2.0** untuk pengembangan website resmi Asosiasi Inovasi Pembelajaran Indonesia (INOPI) di domain **www.inopi.id**.

Website ini berfungsi sebagai wajah digital resmi INOPI — menampilkan identitas, visi-misi, program kerja, struktur organisasi, keanggotaan, riset, dan menjadi hub kolaborasi bagi seluruh pemangku kepentingan ekosistem pendidikan Indonesia.

### Perubahan dari v1.0 ke v2.0

| Item | Versi 1.0 (April 2026) | Versi 2.0 (Mei 2026) |
|------|------------------------|----------------------|
| Tanggal dokumen acuan | 11 April 2026 | 28 Mei 2026 |
| Program Kerja Divisi | Belum tersedia | **Ditambahkan (4 divisi, Sem 1 & 2)** |
| Daftar Founders | 26 nama (parsial) | **26 nama lengkap & terverifikasi** |
| Nama founders | Nama singkat | Nama lengkap resmi |

> **Catatan Kritis:** Data Program Kerja per Divisi dari dokumen terbaru (Slide 20–23) merupakan konten website yang sangat berharga dan harus diimplementasikan di halaman masing-masing divisi.

---

## 2. Profil Organisasi INOPI

### 2.1 Identitas

| Atribut | Detail |
|---------|--------|
| Nama Resmi | Asosiasi Inovasi Pembelajaran Indonesia |
| Akronim | INOPI |
| Status Legalitas | Nama disetujui AHU (Administrasi Hukum Umum) ✅ |
| Tanggal Pembentukan | 11 April 2026 (pertemuan perdana founders) |
| Domain Website | www.inopi.id |
| Jumlah Founders | 26 orang |
| Tagline | *Menuju Ekosistem Pembelajaran Inovatif yang Terintegrasi dan Berdaya Saing Global* |

### 2.2 Visi

> **"Menjadi pusat kolaborasi dan inovasi pembelajaran terdepan di Indonesia yang berdaya saing global."**

### 2.3 Misi Strategis

| # | Misi | Deskripsi |
|---|------|-----------|
| 01 | **Ekosistem Berkelanjutan** | Mengembangkan ekosistem inovasi pembelajaran yang inklusif, adaptif, dan berkelanjutan di seluruh Indonesia |
| 02 | **Riset & Teknologi** | Mendorong riset dan implementasi teknologi pendidikan yang relevan dengan kebutuhan zaman |
| 03 | **Jembatan Lintas Sektor** | Menjadi jembatan strategis antara akademisi, industri, dan pemerintah dalam merancang masa depan pendidikan |
| 04 | **Peningkatan Kapasitas SDM** | Meningkatkan kompetensi dan kapasitas SDM di bidang pembelajaran digital |
| 05 | **Standar dan Best Practices** | Menciptakan standar dan best practices inovasi pembelajaran |

### 2.4 Posisi Organisasi

INOPI berperan sebagai tiga hal sekaligus:

- **Think Tank Nasional** — Pusat pemikiran dan pengembangan inovasi pembelajaran berbasis riset dan praktik terbaik
- **Hub Multi-Stakeholder** — Platform kolaborasi akademisi, industri, pemerintah, dan komunitas profesional
- **Driver Transformasi** — Penggerak digitalisasi dan modernisasi pendidikan Indonesia

### 2.5 Urgensi Pembentukan

| Aspek | Kondisi Saat Ini | Peran INOPI |
|-------|-----------------|-------------|
| Inovasi | Terpisah-pisah, tidak terintegrasi | Integrasi & orkestrasi lintas sektor |
| Teknologi | Adopsi belum merata | Akselerasi adopsi teknologi |
| SDM | Gap kompetensi digital lebar | Upskilling & reskilling pendidik |
| Kolaborasi | Minim, sektoral, parsial | Platform kolaborasi nasional terstruktur |
| Kebijakan | Belum sinkron pusat-daerah | Advocacy & rekomendasi berbasis data |

### 2.6 Tujuan Strategis

1. **Ekosistem Nasional** — Membangun ekosistem inovasi pembelajaran nasional yang terintegrasi
2. **Model Inovatif** — Menghasilkan model pembelajaran berbasis teknologi yang dapat direplikasi
3. **Digitalisasi** — Mendorong digitalisasi pendidikan di seluruh jenjang dan sektor
4. **Knowledge Hub** — Menjadi pusat knowledge sharing dan riset unggulan
5. **Koneksi Global** — Menghubungkan Indonesia dengan ekosistem pendidikan internasional

---

## 3. Struktur Organisasi & Pengurus

### 3.1 Hierarki Organisasi

```
DEWAN PEMBINA
    │
DEWAN PENGAWAS
    │
DEWAN PAKAR
    │
KETUA UMUM ─── WAKIL KETUA
    │
    ├── SEKRETARIS
    ├── BENDAHARA
    │
    ├── DIVISI RISET & INOVASI
    ├── DIVISI PROGRAM & IMPLEMENTASI
    ├── DIVISI KEMITRAAN & KERJASAMA
    └── DIVISI PELATIHAN & SERTIFIKASI
```

### 3.2 Pengurus Resmi

#### Dewan Pembina
*Fungsi: Menjaga visi jangka panjang, membuka akses ke ekosistem kebijakan pendidikan nasional*

| Nama |
|------|
| Pony Halim |
| Gogot Suharwoto |
| M. Aditya Warman |
| Boni Pujianto |
| Subchan Gatot |
| Heru Dewanto |

#### Dewan Pengawas
*Fungsi: Memastikan program dan keuangan sesuai AD/ART dan regulasi*

| Nama |
|------|
| Prof. Paulina Pannen |
| Tutut Handayani |
| Daniel Adhinugraha W. |
| Bambang Yapri |

#### Dewan Pakar
*Fungsi: Memberikan legitimasi akademik dan arah inovasi berbasis evidence*

| Nama |
|------|
| Stephen Budiman |
| Setyo Guritno |
| Kun Wardana |
| Ferry Sutanto |
| Jahja |

#### Ketua & Wakil Ketua

| Jabatan | Nama |
|---------|------|
| **Ketua Umum** | **Prof. Meyliana** |
| **Wakil Ketua** | **Sunardi** |

#### Sekretariat & Keuangan

| Jabatan | Nama |
|---------|------|
| Sekretaris | Idha Kristiana |
| Bendahara | **Ikrar Adinata Arin** |

#### Divisi-Divisi

| Divisi | PIC | Peran | Orientasi |
|--------|-----|-------|-----------|
| **Riset & Inovasi** | Bobi Kurniawan Soegoto, Nunik Afriliana | Think tank asosiasi | Akademik & Ilmiah |
| **Program & Implementasi** | Nita Felia, Yasser M. Syaiful | Executor asosiasi | Operasional |
| **Kemitraan & Kerjasama** | Victor Osman, Siti Elda Hiererra | Network builder | Relasional & Strategis |
| **Pelatihan & Sertifikasi** | Andy Febrico Bintoro | Capacity builder | Profesional & Kompetensi |

### 3.3 Daftar 26 Founders INOPI
*(Diurutkan alfabetis — nama lengkap resmi per 28 Mei 2026)*

| # | Nama Lengkap | # | Nama Lengkap |
|---|------|---|------|
| 1 | Andy Febrico Bintoro | 14 | Kun Wardana |
| 2 | Bambang Yapri | 15 | M. Aditya Warman |
| 3 | Bobi Kurniawan Soegoto | 16 | Meyliana |
| 4 | Bonifasius W. Pudjianto | 17 | Nita Felia |
| 5 | Daniel Adhinugraha W. | 18 | Nunik Afriliana |
| 6 | Ferry Sutanto | 19 | Paulina Pannen |
| 7 | Gogot Suharwoto | 20 | Pony Halim |
| 8 | Heru Dewanto | 21 | Setyo Guritno |
| 9 | Idha Kristiana | 22 | Siti Elda Hiererra |
| 10 | Ikrar Adinata Arin | 23 | Stephen Budiman |
| 11 | Jahja | 24 | Subchan Gatot |
| 12 | Jahja | 25 | Sunardi |
| 13 | Kun Wardana | 26 | Tutut Handayani |

> *Catatan: Daftar di atas sesuai dokumen 28 Mei 2026. Victor Osman dan Yasser Muhammad Syaiful termasuk dalam 26 founders.*

**Daftar final 26 founders (dari slide 26 dokumen terbaru):**

Meyliana, Paulina Pannen, Bambang Yapri, Bobi Kurniawan Soegoto, Bonifasius W. Pudjianto, Daniel Adhinugraha W., Andy Febrico Bintoro, Ferry Sutanto, Gogot Suharwoto, Heru Dewanto, Idha Kristiana, Ikrar Adinata Arin, Jahja, Kun Wardana, M. Aditya Warman, Nita Felia, Nunik Afriliana, Pony Halim, Siti Elda Hiererra, Stephen Budiman, Subchan Gatot, Sunardi, Tutut Handayani, Victor Osman, Setyo Guritno, Yasser Muhammad Syaiful

---

## 4. Program Kerja Divisi

> **Ini adalah data baru di v2.0** — berisi rencana program kerja masing-masing divisi untuk tahun pertama (Semester 1 & 2). Data ini menjadi konten utama halaman-halaman divisi di website.

### 4.1 Divisi Riset & Inovasi
**PIC:** Bobi Kurniawan Soegoto, Nunik Afriliana | **Orientasi:** Akademik & Ilmiah

#### Semester 1

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 1 | **Pemetaan Inovasi Pembelajaran Indonesia** | Survei online ke anggota & institusi mitra untuk memetakan inovasi yang sedang berjalan | Laporan 15–20 halaman sebagai baseline asosiasi |
| 2 | **Agenda Riset Tahunan INOPI** | Workshop 1 hari bersama Dewan Pakar untuk menyepakati 3–5 tema riset prioritas | Dokumen Research Agenda 2026/2027 |
| 3 | **INOPI Insight Brief** | Policy brief/artikel/infografis singkat per bulan dari kurasi riset anggota, dipublikasikan di website & LinkedIn | Konten media sosial bulanan |

#### Semester 2

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 4 | **Repositori Inovasi Pembelajaran** | Database online sederhana berisi karya, riset, dan praktik inovatif anggota INOPI (Resource & Knowledge Base) | Platform digital knowledge base |
| 5 | **White Paper Perdana INOPI** | 1 white paper unggulan tentang tema prioritas (mis. AI in Education Indonesia), disusun kolaboratif 4–6 anggota | Peluncuran di Forum Nasional |
| 6 | **Joint Research Pilot** | 1 pilot riset bersama 2–3 perguruan tinggi/sekolah mitra, skala kecil 4–6 bulan, fokus smart learning | Case study & laporan riset |

---

### 4.2 Divisi Program & Implementasi
**PIC:** Nita Felia, Yasser M. Syaiful | **Orientasi:** Operasional

#### Semester 1

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 1 | **Kalender Program INOPI 2026/2027** | Menyusun kalender kegiatan tahunan yang tercantum di website: webinar bulanan, 1 forum nasional, 1 pilot project | Kalender digital di website |
| 2 | **Webinar Bulanan INOPI Talks** | 1 webinar/bulan via Zoom (60–90 menit), narasumber dari anggota & mitra, recording diunggah ke YouTube | Aset konten YouTube & website |
| 3 | **Launching INOPI** | Acara peluncuran untuk founders & anggota, fokus pada dokumentasi & press release (termasuk website) | Press release & dokumentasi |

#### Semester 2

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 4 | **Forum Nasional INOPI** | 1 forum nasional tahunan, tema AI in Learning Technology, target 200–300 peserta, hybrid | Impact & dokumentasi forum |
| 5 | **Implementasi Project dari Anggota** | 1 pilot project di 1–2 sekolah/kampus mitra, skala kecil (1 kelas/prodi), 1 semester | Case study + laporan dampak |
| 6 | **Monitoring & Impact Report** | Laporan dampak program akhir tahun (10–15 halaman): metrik peserta, output, testimoni. Disajikan di website | Impact report online |

---

### 4.3 Divisi Kemitraan & Kerjasama
**PIC:** Victor Osman, Siti Elda Hiererra | **Orientasi:** Relasional & Strategis

#### Semester 1

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 1 | **Database Mitra Strategis** | Direktori 30–50 calon mitra (kampus, edtech, kementerian, asosiasi), format spreadsheet dengan PIC & status | Direktori mitra digital |
| 2 | **MoU Perdana (3 Mitra Prioritas)** | Menargetkan 3 MoU: 1 kampus besar, 1 perusahaan edtech, 1 kementerian/lembaga | 3 MoU aktif |
| 3 | **Courtesy Visit Founders** | Kunjungan/audiensi founders ke 5–7 institusi mitra potensial untuk perkenalan INOPI & kerjasama | Laporan kunjungan |

#### Semester 2

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 4 | **INOPI Partner Day** | 1 acara networking mempertemukan mitra strategis & anggota (~80 orang). Format: panel + networking | Dokumentasi event |
| 5 | **Outreach Internasional** | Pengajuan kemitraan ke 2–3 organisasi internasional (SEAMEO, UNESCO regional, asosiasi Asia) | LoI/MoU internasional |
| 6 | **Sponsorship Pack INOPI** | Sponsorship deck dengan 3 tier (Gold/Silver/Bronze), target 2–3 sponsor untuk Forum Nasional & operasional | Paket sponsorship aktif |

---

### 4.4 Divisi Pelatihan & Sertifikasi
**PIC:** Andy Febrico Bintoro | **Orientasi:** Profesional & Kompetensi

#### Semester 1

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 1 | **Training Needs Assessment** | Survei singkat ke anggota: topik pelatihan yang paling dibutuhkan. Output: top-5 tema + persona peserta | Dokumen TNA |
| 2 | **Workshop AI Literacy untuk Pendidik** | 1 workshop daring 1 hari (4 jam), target 50–100 peserta, materi: prompt engineering & AI tools di kelas | Recording & materi workshop |
| 3 | **Modul Digital Pedagogy** | 1 modul self-paced (5–6 video pendek + handout PDF) di Google Classroom/LMS gratis, dapat diakses anggota kapan saja | Modul e-learning |

#### Semester 2

| # | Program | Deskripsi | Output |
|---|---------|-----------|--------|
| 4 | **Training of Trainers (ToT) Perdana** | Bootcamp 2 hari untuk 20–30 fasilitator anggota, sertifikat dari INOPI, mereka menjadi multiplier | Database fasilitator bersertifikat |
| 5 | **Sertifikasi Inovasi Pembelajaran (Pilot)** | Skema sertifikasi internal INOPI, asesmen portofolio + presentasi, 1 batch pilot 30 peserta, pondasi menuju BNSP | Sistem sertifikasi INOPI |
| 6 | **Komunitas Alumni Pelatihan** | WhatsApp/Telegram group + 1 meetup online per kuartal untuk retensi alumni & rekrut narasumber | Komunitas alumni aktif |

---

## 5. Information Architecture

### 5.1 Sitemap

```
www.inopi.id
├── / (Homepage)
├── /tentang
│   ├── /tentang/sejarah
│   ├── /tentang/visi-misi
│   ├── /tentang/struktur-organisasi
│   └── /tentang/founders
├── /program
│   ├── /program/riset-inovasi
│   │   └── Program Kerja Sem 1 & 2
│   ├── /program/implementasi
│   │   └── Program Kerja Sem 1 & 2
│   ├── /program/kemitraan
│   │   └── Program Kerja Sem 1 & 2
│   └── /program/pelatihan-sertifikasi
│       └── Program Kerja Sem 1 & 2
├── /keanggotaan
│   └── /keanggotaan/daftar
├── /riset
│   └── /riset/[slug]
├── /event
│   └── /event/[slug]
├── /berita
│   └── /berita/[slug]
└── /kontak
```

### 5.2 URL & Komponen

| URL | Halaman | Fetch Strategy | Update |
|-----|---------|----------------|--------|
| `/` | Homepage | ISR 1 jam | Tidak berubah |
| `/tentang/founders` | 26 Founders | Static | **Updated — nama lengkap** |
| `/program/riset-inovasi` | Divisi Riset | Static | **Baru — Program Kerja** |
| `/program/implementasi` | Divisi Program | Static | **Baru — Program Kerja** |
| `/program/kemitraan` | Divisi Kemitraan | Static | **Baru — Program Kerja** |
| `/program/pelatihan-sertifikasi` | Divisi Pelatihan | Static | **Baru — Program Kerja** |
| `/riset` | Publikasi listing | ISR 1 jam | Tidak berubah |
| `/event` | Event listing | ISR 30 menit | Tidak berubah |
| `/berita` | Berita listing | ISR 1 jam | Tidak berubah |

---

## 6. Page Requirements

### 6.1 Homepage (`/`)

**Sections (urut atas ke bawah):**

| # | Section | Konten | Prioritas |
|---|---------|--------|-----------|
| 1 | **Hero** | Badge, headline, sub-teks, 2 CTA, visual box "LIVE RESEARCH" | P1 |
| 2 | **Stats Bar** | 26 Founders, 4 Divisi, 5 Program, 1 Visi | P1 |
| 3 | **Ekosistem Snippet** | Think Tank + Hub + Driver (3 pillar) | P1 |
| 4 | **Program Highlights** | 5 program cards dengan ikon | P1 |
| 5 | **Research Highlights** | 3 publikasi terbaru dari Sanity | P1 |
| 6 | **Event List** | 2 event mendatang dari Sanity | P1 |
| 7 | **Partner Strip** | Logo mitra strategis | P2 |
| 8 | **CTA Dark** | "Menjadi Bagian dari Gerakan Nasional" | P1 |

**Copy Hero:**
```
Badge: "⬡ Inovasi EduTech · Indonesia"
Headline: "Transformasi Digital, Inovasi Masa Depan Pendidikan Indonesia"
Sub: "Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional 
      untuk mencetak generasi unggul di era Industri 5.0."
CTA1: "Gabung Anggota →" → /keanggotaan/daftar
CTA2: "Pelajari Program" → /program
```

---

### 6.2 Tentang INOPI

#### `/tentang/sejarah`
- Timeline 5 tahap (AHU ✅ → Diskusi Founders → AD/ART → Struktur → Launching)
- Latar belakang gelombang transformasi global
- 5 tantangan utama Indonesia
- Tabel Urgensi: Kondisi Saat Ini vs Peran INOPI

#### `/tentang/visi-misi`
- Block visi besar (dark background)
- 5 misi strategis (numbered 01–05)
- 5 nilai organisasi: Inklusif, Adaptif, Berkelanjutan, Inovatif, Kolaboratif

#### `/tentang/struktur-organisasi`
- Org chart interaktif (react-flow atau SVG)
- Data node lengkap sesuai Bagian 3.2 dokumen ini
- Klik node → panel detail dengan nama & deskripsi fungsi
- Mobile fallback: accordion

#### `/tentang/founders`
- Grid 6 kolom (desktop) → 3 kolom (tablet) → 2 kolom (mobile)
- 26 founder cards dengan nama lengkap resmi (lihat Bagian 3.3)
- Avatar dengan inisial auto-generate dari nama
- Klik → modal bio (placeholder untuk sekarang)

---

### 6.3 Program — **HALAMAN TERUPDATE (v2.0)**

#### `/program` (Landing)
- Overview 5 divisi dalam program card besar

#### `/program/riset-inovasi`

**Hero:**
```
Judul: "Divisi Riset & Inovasi"
Peran: Think tank asosiasi | Orientasi: Akademik & Ilmiah
PIC: Bobi Kurniawan Soegoto, Nunik Afriliana
```

**Tugas & Tanggung Jawab (7 poin):**
1. Merancang dan melaksanakan agenda riset tahunan
2. Mengembangkan model, framework, dan metodologi pembelajaran
3. Menerbitkan hasil riset (jurnal, prosiding, white paper)
4. Mengelola repositori inovasi pembelajaran
5. Berkolaborasi untuk joint research
6. Mengidentifikasi tren global
7. Menjadi reviewer internal

**Section Program Kerja (Semester 1 & 2):**

*Gunakan tab atau toggle Semester 1 / Semester 2*

| Program | Deskripsi | Output |
|---------|-----------|--------|
| Pemetaan Inovasi Pembelajaran Indonesia | Survei online ke anggota & institusi | Laporan 15–20 halaman |
| Agenda Riset Tahunan | Workshop 1 hari bersama Dewan Pakar | Research Agenda 2026/2027 |
| INOPI Insight Brief | Policy brief/infografis bulanan | Konten sosmed bulanan |
| Repositori Inovasi Pembelajaran | Database karya & riset anggota | Knowledge base digital |
| White Paper Perdana INOPI | White paper AI in Education Indonesia | Peluncuran di Forum Nasional |
| Joint Research Pilot | Pilot riset bersama 2–3 PT/sekolah mitra | Case study & laporan |

#### `/program/implementasi`

**Hero:**
```
Judul: "Divisi Program & Implementasi"
Peran: Executor asosiasi | Orientasi: Operasional
PIC: Nita Felia, Yasser M. Syaiful
```

**Program Kerja (6 program):**

| Program | Deskripsi | Output |
|---------|-----------|--------|
| Kalender Program INOPI 2026/2027 | Kalender kegiatan tahunan di website | Kalender digital |
| Webinar Bulanan INOPI Talks | 1 webinar/bulan, 60–90 menit via Zoom | Rekaman di YouTube |
| Launching INOPI | Acara peluncuran resmi & press release | Dokumentasi & press release |
| Forum Nasional INOPI | Forum tahunan AI in Learning Technology, 200–300 peserta hybrid | Dokumentasi forum |
| Implementasi Project Anggota | Pilot project di 1–2 sekolah/kampus mitra | Case study & laporan dampak |
| Monitoring & Impact Report | Laporan dampak tahunan di website | Impact report online |

#### `/program/kemitraan`

**Hero:**
```
Judul: "Divisi Kemitraan & Kerjasama"
Peran: Network builder | Orientasi: Relasional & Strategis
PIC: Victor Osman, Siti Elda Hiererra
```

**Program Kerja (6 program):**

| Program | Deskripsi | Output |
|---------|-----------|--------|
| Database Mitra Strategis | Direktori 30–50 calon mitra | Direktori digital |
| MoU Perdana (3 Mitra Prioritas) | 1 kampus + 1 edtech + 1 kementerian | 3 MoU aktif |
| Courtesy Visit Founders | Kunjungan ke 5–7 institusi potensial | Laporan kunjungan |
| INOPI Partner Day | Networking event ~80 orang | Dokumentasi event |
| Outreach Internasional | Kemitraan ke SEAMEO, UNESCO, Asia | LoI/MoU internasional |
| Sponsorship Pack INOPI | Deck sponsorship Gold/Silver/Bronze | 2–3 sponsor aktif |

#### `/program/pelatihan-sertifikasi`

**Hero:**
```
Judul: "Divisi Pelatihan & Sertifikasi"
Peran: Capacity builder | Orientasi: Profesional & Kompetensi
PIC: Andy Febrico Bintoro
```

**Program Kerja (6 program):**

| Program | Deskripsi | Output |
|---------|-----------|--------|
| Training Needs Assessment | Survei kebutuhan pelatihan anggota | Dokumen TNA |
| Workshop AI Literacy untuk Pendidik | Workshop daring 4 jam, 50–100 peserta | Recording & materi |
| Modul Digital Pedagogy | Modul self-paced 5–6 video + handout PDF | Modul e-learning |
| Training of Trainers (ToT) Perdana | Bootcamp 2 hari, 20–30 fasilitator | Database fasilitator |
| Sertifikasi Inovasi Pembelajaran (Pilot) | Skema sertifikasi internal, 30 peserta pilot | Sistem sertifikasi |
| Komunitas Alumni Pelatihan | WhatsApp/Telegram group + meetup quarterly | Komunitas aktif |

---

### 6.4 Keanggotaan (`/keanggotaan`)

**Sections:**

1. **Hero** — "Bergabung dengan Ekosistem Inovasi", badge, deskripsi, 2 CTA
2. **6 Benefit Cards** — Global Networking, Sertifikasi, Akses Riset, Inkubasi, Event, Analisis Pasar
3. **5 Alasan sebagai Founder** — Pioneer, Pengaruh Kebijakan, Network, Kolaborasi Riset, Thought Leader
4. **3 Pricing Tiers:**

| Tier | Harga | Fitur Utama | Style |
|------|-------|-------------|-------|
| Individu | Rp 500k/tahun | Akses Portal, Sertifikasi Digital, E-Library | Default |
| **Institusi** | **Rp 5.5jt/tahun** | **Semua Individu + Lisensi 50 orang + Priority Matching** | **FEATURED** |
| Korporat | Custom | Custom Partnership, Akses Talenta, Konsultasi | Default |

5. **Alur Pendaftaran** — 3 langkah: Pilih Paket → Lengkapi Data → Verifikasi
6. **Quick Form** — Nama, Email, Telepon, Kategori, Submit
7. **FAQ Accordion** — 5 pertanyaan umum

---

### 6.5 Riset & Publikasi (`/riset`)

- Listing dengan filter kategori & tahun
- Search bar dengan debounce
- Komponen utama: INOPI Insight Brief (bulanan), White Paper, Laporan Riset, Joint Research
- Detail page per publikasi dengan abstrak, metadata, download
- ISR 1 jam

---

### 6.6 Event & Kegiatan (`/event`)

**Event dari Program Kerja yang harus masuk kalender:**
- Webinar Bulanan INOPI Talks (rutin, bulanan)
- Workshop AI Literacy untuk Pendidik
- Launching INOPI
- Forum Nasional INOPI (tahunan)
- INOPI Partner Day
- Training of Trainers (ToT) Perdana

---

### 6.7 Berita & Artikel (`/berita`)

Kategori konten:
- Berita INOPI (kegiatan, milestone)
- Artikel Opini (dari anggota & dewan pakar)
- Press Release
- Research Digest (ringkasan INOPI Insight Brief)

---

## 7. Functional Requirements

### 7.1 Navigasi

```
[INOPI logo]   [Research · Programs · Membership · About · Innovation Hub]   [Join Membership btn]
```

- Sticky top navbar, height 60px
- Background: `rgba(255,255,255,0.97)` + `backdrop-filter: blur(12px)`
- Active indicator: border-bottom 2px teal pada item aktif
- Mobile: hamburger → slide-in drawer
- Breadcrumb pada sub-halaman

### 7.2 Program Kerja — Komponen Baru

Setiap halaman divisi harus memiliki:
- **Semester toggle** (Semester 1 / Semester 2) — tab atau button group
- **Program cards** dalam grid 2×3: nomor urut, nama program, deskripsi, badge output
- **Progress indicator** (opsional Fase 2): status program (Belum Mulai / Berjalan / Selesai)

### 7.3 Form & Interaktivitas

- Formulir pendaftaran anggota (multi-step, react-hook-form + zod)
- Formulir kontak dengan reCAPTCHA v3
- Formulir pendaftaran event
- Newsletter subscription
- Semua form: validasi frontend + backend, email konfirmasi otomatis (Resend)

### 7.4 Search & Filter

- Search global (berita + riset + event)
- Filter riset: kategori, tahun
- Filter event: tipe, status (mendatang/selesai)
- Filter berita: kategori, tanggal

### 7.5 CMS (Sanity)

Schema yang dibutuhkan:
- `berita` — artikel & berita
- `event` — kegiatan & webinar
- `publikasi` — riset & white paper
- `founder` — profil 26 founders
- `programKerja` — opsional (Fase 2): status program kerja divisi

### 7.6 SEO

- Meta title + description unik per halaman
- Open Graph tags (thumbnail + deskripsi)
- JSON-LD: Organization, Event, Article, BreadcrumbList
- Sitemap.xml otomatis
- Core Web Vitals LCP ≤ 2.5s

---

## 8. Non-Functional Requirements

### 8.1 Performa

| Metrik | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | ≤ 2.5 detik |
| INP (Interaction to Next Paint) | ≤ 200ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |
| Lighthouse Score (Desktop) | ≥ 85 |
| Lighthouse Score (Mobile) | ≥ 75 |
| Uptime SLA | ≥ 99.5% |

### 8.2 Aksesibilitas

- WCAG 2.1 Level AA
- Keyboard navigation penuh
- Screen reader compatible (ARIA labels, semantic HTML)
- Color contrast ratio ≥ 4.5:1 untuk teks normal

### 8.3 Responsivitas

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | ≤ 640px | Single column |
| Tablet | 641–1024px | 2 kolom |
| Desktop | ≥ 1025px | Full layout |
| Wide | ≥ 1440px | Dibatasi max-width 1100px |

### 8.4 Keamanan

- HTTPS wajib (Let's Encrypt)
- CSRF protection pada semua form
- Input sanitization & XSS prevention
- reCAPTCHA v3 pada form publik
- Rate limiting pada API endpoints
- Content Security Policy headers

---

## 9. Design System

### 9.1 Color Tokens

```css
:root {
  /* Primary */
  --color-dark:        #071422;   /* Heading, nav, hero dark */
  --color-teal:        #0b7b8a;   /* Accent mid */
  --color-teal-2:      #0d9488;   /* Accent bright, icons */
  --color-teal-btn:    #083344;   /* Primary button bg */
  --color-teal-light:  #e0f7f5;   /* Subtle backgrounds */

  /* Backgrounds */
  --color-bg:          #ffffff;
  --color-bg-2:        #f7f9fb;   /* Alternating sections */
  --color-bg-3:        #eef2f7;   /* Image placeholder */

  /* Text */
  --color-text:        #0d1e2e;
  --color-text-2:      #4a6070;   /* Muted */
  --color-text-3:      #8fa5b5;   /* Placeholder */

  /* Borders & Radius */
  --color-border:      #e0e8ef;
  --radius:            12px;
  --radius-lg:         18px;
}
```

### 9.2 Typography

| Token | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| Display | Syne | clamp(28px→44px) | 800 | Hero headline |
| H1 | Syne | clamp(24px→36px) | 700 | Page title |
| H2 | Syne | clamp(20px→28px) | 700 | Section title |
| H3 | Syne | 18px | 600 | Card title |
| Body | Figtree | 15px | 400 | Paragraf |
| Small | Figtree | 13px | 400/500 | Caption, meta |
| Label | Figtree | 11px | 700 | Badge, overline |

**Load di `app/layout.tsx`:**
```typescript
import { Syne, Figtree } from 'next/font/google'
export const syne = Syne({ subsets: ['latin'], weight: ['400','600','700','800'] })
export const figtree = Figtree({ subsets: ['latin'], weight: ['300','400','500','600'] })
```

### 9.3 Components

- **Buttons:** primary (teal-btn), teal (teal-2), outline, ghost
- **Cards:** base card, research card, event card, team card, program card, founder card
- **Program Card (baru):** nomor + judul + deskripsi + output badge + semester toggle
- **Badge/Chip:** pill (teal light), conference (blue), workshop (amber), webinar (green)
- **Accordion:** FAQ, semester toggle
- **Org Chart:** react-flow nodes atau SVG custom
- **Stats Bar:** 4 angka besar dengan counter animation

---

## 10. Technical Architecture

### 10.1 Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | SSR/SSG, SEO, performance |
| Styling | TailwindCSS + shadcn/ui | Rapid development, konsisten |
| CMS | Sanity.io | Headless, flexible, GROQ |
| Font | next/font (Syne + Figtree) | Zero layout shift |
| Form | React Hook Form + Zod | Validasi type-safe |
| Animation | Framer Motion | Smooth transitions |
| Org Chart | React Flow (@xyflow/react) | Interaktif + kustomisasi |
| Email | Resend | Konfirmasi otomatis |
| Hosting | Vercel | Zero-config, CDN global |
| Database (opsional) | Supabase | Member portal Fase 2 |
| Analytics | GA4 + Vercel Analytics | User behavior tracking |

### 10.2 Docker Setup

**`Dockerfile.dev`:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000 3333
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "dev"]
```

**`docker-compose.yml`:**
```yaml
version: '3.9'
services:
  app:
    build: { context: ., dockerfile: Dockerfile.dev }
    container_name: inopi-app
    ports: ["3000:3000"]
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    env_file: .env.local
    environment:
      - WATCHPACK_POLLING=true  # untuk MacBook M1/M2
```

### 10.3 Environment Variables

```bash
# .env.example

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_WEBHOOK_SECRET=your_webhook_secret

# Email
RESEND_API_KEY=re_xxxxxxxxxxxx
NOTIFICATION_EMAIL=info@inopi.id

# Google
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_key
RECAPTCHA_SECRET_KEY=your_secret
```

### 10.4 Rendering Strategy

| Halaman | Strategy | Revalidate |
|---------|----------|------------|
| Homepage | ISR | 1 jam |
| Tentang (semua) | Static | Manual (webhook) |
| Program (semua) | Static | Manual (webhook) |
| Keanggotaan | Static | Manual |
| Riset listing | ISR | 1 jam |
| Event listing | ISR | 30 menit |
| Berita listing | ISR | 1 jam |
| Article/Event detail | ISR | 1 jam |

---

## 11. Content Requirements

### 11.1 Konten yang Harus Disediakan INOPI

| Konten | Format | Prioritas | Status |
|--------|--------|-----------|--------|
| Logo INOPI final (Konsep 4) | SVG, PNG transparent | P1 — sebelum dev | Tersedia di PPTX |
| Foto/avatar 26 founders | JPG/PNG 400×400px | P1 — sebelum launch | Belum tersedia |
| Bio singkat 26 founders | Teks max 100 kata/orang | P1 | Belum tersedia |
| Narasi Sejarah & Latar Belakang | Dokumen 500–800 kata | P1 | Dari PPTX ✅ |
| Visi, Misi, Nilai (final) | Teks final disetujui | P1 | Dari PPTX ✅ |
| Deskripsi 4 Divisi | Teks dari PPTX | P1 | Dari PPTX ✅ |
| Program Kerja 4 Divisi | Tabel Sem 1 & 2 | P1 — **Data baru v2.0** | Dari PPTX ✅ |
| Info keanggotaan & iuran | Setelah diskusi founders | P2 | Belum final |
| Publikasi/riset pertama | PDF + metadata | P2 | Belum tersedia |
| Foto event & kegiatan | JPG resolusi tinggi | P2 | Belum tersedia |
| 3 artikel berita pembuka | Teks + gambar | P2 | Belum tersedia |
| Kontak resmi | Email, no. telp, alamat | P1 | Belum tersedia |

### 11.2 Data Founders — Siap Pakai

*(26 nama lengkap dari dokumen 28 Mei 2026)*

```typescript
// lib/constants/founders.ts
export const FOUNDERS = [
  { name: "Andy Febrico Bintoro",    role: "Pelatihan & Sertifikasi", initials: "AB" },
  { name: "Bambang Yapri",           role: "Dewan Pengawas",          initials: "BY" },
  { name: "Bobi Kurniawan Soegoto",  role: "Riset & Inovasi",         initials: "BK" },
  { name: "Bonifasius W. Pudjianto", role: "Dewan Pembina",           initials: "BP" },
  { name: "Daniel Adhinugraha W.",   role: "Dewan Pengawas",          initials: "DA" },
  { name: "Ferry Sutanto",           role: "Dewan Pakar",             initials: "FS" },
  { name: "Gogot Suharwoto",         role: "Dewan Pembina",           initials: "GS" },
  { name: "Heru Dewanto",            role: "Dewan Pembina",           initials: "HD" },
  { name: "Idha Kristiana",          role: "Sekretaris",              initials: "IK" },
  { name: "Ikrar Adinata Arin",      role: "Bendahara",               initials: "IA" },
  { name: "Jahja",                   role: "Dewan Pakar",             initials: "JA" },
  { name: "Kun Wardana",             role: "Dewan Pakar",             initials: "KW" },
  { name: "M. Aditya Warman",        role: "Dewan Pembina",           initials: "MA" },
  { name: "Meyliana",                role: "Ketua Umum",              initials: "ME" },
  { name: "Nita Felia",              role: "Program & Implementasi",  initials: "NF" },
  { name: "Nunik Afriliana",         role: "Riset & Inovasi",         initials: "NA" },
  { name: "Paulina Pannen",          role: "Dewan Pengawas",          initials: "PP" },
  { name: "Pony Halim",              role: "Dewan Pembina",           initials: "PH" },
  { name: "Setyo Guritno",           role: "Dewan Pakar",             initials: "SG" },
  { name: "Siti Elda Hiererra",      role: "Kemitraan & Kerjasama",   initials: "SE" },
  { name: "Stephen Budiman",         role: "Dewan Pakar",             initials: "SB" },
  { name: "Subchan Gatot",           role: "Dewan Pembina",           initials: "SC" },
  { name: "Sunardi",                 role: "Wakil Ketua",             initials: "SU" },
  { name: "Tutut Handayani",         role: "Dewan Pengawas",          initials: "TH" },
  { name: "Victor Osman",            role: "Kemitraan & Kerjasama",   initials: "VO" },
  { name: "Yasser Muhammad Syaiful", role: "Program & Implementasi",  initials: "YS" },
]
```

---

## 12. Development Phases

### Fase 1 — MVP Soft Launch (Target: 4–6 Minggu)

**Tujuan:** Kehadiran digital INOPI yang layak diperlihatkan publik.

- [ ] Setup Next.js 14 + TailwindCSS + shadcn/ui + Docker
- [ ] Design system (CSS variables, komponen dasar)
- [ ] Navbar + Footer
- [ ] Homepage lengkap (Hero → Stats → Ekosistem → Program → CTA)
- [ ] `/tentang` (Sejarah + Visi Misi)
- [ ] `/tentang/struktur-organisasi` (static, bukan interaktif dulu)
- [ ] `/tentang/founders` (26 founders grid dengan nama resmi)
- [ ] Sanity CMS setup + schema berita & event dasar
- [ ] Halaman `/berita` listing (ISR)
- [ ] Formulir kontak
- [ ] SEO dasar (meta, OG, sitemap)
- [ ] Deploy Vercel + domain inopi.id

### Fase 2 — Feature Complete (Target: +4 Minggu)

- [ ] Semua halaman divisi program dengan **section Program Kerja Sem 1 & 2**
- [ ] Org chart interaktif (react-flow)
- [ ] Halaman keanggotaan + form pendaftaran multi-step
- [ ] Halaman `/riset` dengan filter & search
- [ ] Halaman `/event` dengan kalender
- [ ] Newsletter subscription
- [ ] GA4 integration
- [ ] Performance audit (Core Web Vitals)

### Fase 3 — Grand Launch (Target: Q4 2026)

- [ ] Member portal (login, dashboard anggota)
- [ ] Status tracker Program Kerja per divisi
- [ ] LMS integration untuk modul pelatihan
- [ ] Multilingual toggle (ID/EN)
- [ ] Advanced search (Algolia)

---

## 13. Out of Scope (Fase 1 & 2)

- Member portal dengan login/dashboard
- Payment gateway untuk iuran keanggotaan online
- LMS terintegrasi
- Forum diskusi / komunitas
- Mobile app native (iOS/Android)
- Integrasi Zoom otomatis untuk event
- Versi bahasa Inggris
- Advanced analytics dashboard admin
- Status tracker Program Kerja realtime

---

## 14. Glossary

| Term | Definisi |
|------|----------|
| **INOPI** | Asosiasi Inovasi Pembelajaran Indonesia |
| **PRD** | Product Requirements Document |
| **ISR** | Incremental Static Regeneration — halaman di-refresh berkala |
| **CMS** | Content Management System (Sanity.io) |
| **Founders** | 26 tokoh pendiri INOPI |
| **Program Kerja** | Rencana kegiatan per divisi, Semester 1 & 2 tahun pertama |
| **Forum Nasional** | Event tahunan INOPI bertema AI in Learning Technology |
| **ToT** | Training of Trainers — program fasilitator bersertifikat |
| **INOPI Talks** | Webinar bulanan rutin INOPI |
| **INOPI Insight Brief** | Publikasi singkat bulanan dari Divisi Riset |
| **Sanity Studio** | Panel admin CMS di `/studio` |
| **React Flow** | Library untuk org chart interaktif |
| **BNSP** | Badan Nasional Sertifikasi Profesi |
| **SEAMEO** | Southeast Asian Ministers of Education Organization |

---

*PRD v2.0 — INOPI Asosiasi Inovasi Pembelajaran Indonesia*  
*Dokumen acuan: Pembentukan INOPI Final, 28 Mei 2026*  
*Website: www.inopi.id*
