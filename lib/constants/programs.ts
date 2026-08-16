// lib/constants/programs.ts
// Data Program Kerja 4 Divisi INOPI — Semester 1 & 2 (PRD v2.0 Section 4)

export interface ProgramItem {
  no: number
  name: string
  description: string
  output: string
}

export interface DivisionProgram {
  slug: string
  title: string
  role: string
  orientation: string
  pic: string[]
  responsibilities?: string[]
  semester1: ProgramItem[]
  semester2: ProgramItem[]
}

export const DIVISION_PROGRAMS: DivisionProgram[] = [
  {
    slug: 'riset-inovasi',
    title: 'Divisi Riset & Inovasi',
    role: 'Think tank asosiasi',
    orientation: 'Akademik & Ilmiah',
    pic: ['Bobi Kurniawan Soegoto', 'Nunik Afriliana'],
    responsibilities: [
      'Merancang dan melaksanakan agenda riset tahunan',
      'Mengembangkan model, framework, dan metodologi pembelajaran',
      'Menerbitkan hasil riset (jurnal, prosiding, white paper)',
      'Mengelola repositori inovasi pembelajaran',
      'Berkolaborasi untuk joint research',
      'Mengidentifikasi tren global',
      'Menjadi reviewer internal',
    ],
    semester1: [
      {
        no: 1,
        name: 'Pemetaan Inovasi Pembelajaran Indonesia',
        description: 'Survei online ke anggota & institusi mitra untuk memetakan inovasi yang sedang berjalan.',
        output: 'Laporan 15–20 halaman sebagai baseline asosiasi',
      },
      {
        no: 2,
        name: 'Agenda Riset Tahunan INOPI + Publisher Jurnal',
        description: 'Workshop 1 hari bersama Dewan Pakar untuk menyepakati 3–5 tema riset prioritas.',
        output: 'Dokumen Research Agenda 2026/2027 & persiapan menjadi publisher jurnal',
      },
      {
        no: 3,
        name: 'INOPI Insight Brief',
        description: 'Policy brief/artikel/infografis singkat per bulan dari kurasi riset anggota, dipublikasikan di website & LinkedIn.',
        output: 'Konten media sosial bulanan',
      },
    ],
    semester2: [
      {
        no: 4,
        name: 'Repositori Inovasi Pembelajaran',
        description: 'Database online sederhana berisi karya, riset, dan praktik inovatif anggota INOPI (Resource & Knowledge Base).',
        output: 'Platform digital knowledge base',
      },
      {
        no: 5,
        name: 'Jurnal dalam Bidang LearnTech',
        description: 'Publikasi ilmiah unggulan tentang tema prioritas terpilih (mis. AI in Education Indonesia). Disusun kolaboratif 4–6 anggota, peluncuran di Forum Nasional.',
        output: 'Peluncuran di Forum Nasional',
      },
      {
        no: 6,
        name: 'Joint Research Pilot',
        description: '1 pilot riset bersama 2–3 perguruan tinggi/sekolah mitra, skala kecil 4–6 bulan, fokus smart learning.',
        output: 'Case study & laporan riset',
      },
    ],
  },
  {
    slug: 'implementasi',
    title: 'Divisi Program & Implementasi',
    role: 'Executor asosiasi',
    orientation: 'Operasional',
    pic: ['Nita Felia', 'Yasser Muhammad Syaiful'],
    semester1: [
      {
        no: 1,
        name: 'Kalender Program INOPI 2026/2027',
        description: 'Menyusun kalender kegiatan tahunan yang tercantum di website: webinar bulanan, 1 forum nasional, 1 pilot project.',
        output: 'Kalender digital di website',
      },
      {
        no: 2,
        name: 'Webinar Bulanan INOPI Talks',
        description: '1 webinar/bulan via Zoom (60–90 menit), narasumber dari anggota & mitra, recording diunggah ke YouTube.',
        output: 'Aset konten YouTube & website',
      },
      {
        no: 3,
        name: 'Launching INOPI',
        description: 'Acara peluncuran untuk founders & anggota, fokus pada dokumentasi & press release (termasuk website).',
        output: 'Press release & dokumentasi',
      },
    ],
    semester2: [
      {
        no: 4,
        name: 'Forum Nasional INOPI',
        description: '1 forum nasional tahunan, tema AI in Learning Technology, target 200–300 peserta, hybrid.',
        output: 'Impact & dokumentasi forum',
      },
      {
        no: 5,
        name: 'Implementasi Project dari Anggota',
        description: '1 pilot project di 1–2 sekolah/kampus mitra, skala kecil (1 kelas/prodi), 1 semester.',
        output: 'Case study + laporan dampak',
      },
      {
        no: 6,
        name: 'Monitoring & Impact Report',
        description: 'Laporan dampak program akhir tahun (10–15 halaman): metrik peserta, output, testimoni. Disajikan di website.',
        output: 'Impact report online',
      },
    ],
  },
  {
    slug: 'kemitraan',
    title: 'Divisi Kemitraan & Kerjasama',
    role: 'Network builder',
    orientation: 'Relasional & Strategis',
    pic: ['Victor Osman', 'Siti Elda Hiererra'],
    semester1: [
      {
        no: 1,
        name: 'Database Mitra Strategis',
        description: 'Direktori 30–50 calon mitra (kampus, edtech, kementerian, asosiasi), format spreadsheet dengan PIC & status.',
        output: 'Direktori mitra digital',
      },
      {
        no: 2,
        name: 'MoU Perdana (3 Mitra Prioritas)',
        description: 'Menargetkan 3 MoU: 1 kampus besar, 1 perusahaan edtech, 1 kementerian/lembaga.',
        output: '3 MoU aktif',
      },
      {
        no: 3,
        name: 'Courtesy Visit Founders',
        description: 'Kunjungan/audiensi founders ke 5–7 institusi mitra potensial untuk perkenalan INOPI & kerjasama.',
        output: 'Laporan kunjungan',
      },
    ],
    semester2: [
      {
        no: 4,
        name: 'INOPI Partner Day',
        description: '1 acara networking mempertemukan mitra strategis & anggota (~80 orang). Format: panel + networking.',
        output: 'Dokumentasi event',
      },
      {
        no: 5,
        name: 'Outreach Internasional',
        description: 'Pengajuan kemitraan ke 2–3 organisasi internasional (SEAMEO, UNESCO regional, asosiasi Asia).',
        output: 'LoI/MoU internasional',
      },
      {
        no: 6,
        name: 'Sponsorship Pack INOPI',
        description: 'Sponsorship deck dengan 3 tier (Gold/Silver/Bronze), target 2–3 sponsor untuk Forum Nasional & operasional.',
        output: 'Paket sponsorship aktif',
      },
    ],
  },
  {
    slug: 'pelatihan-sertifikasi',
    title: 'Divisi Pelatihan & Sertifikasi',
    role: 'Capacity builder',
    orientation: 'Profesional & Kompetensi',
    pic: ['Andy Febrico Bintoro'],
    semester1: [
      {
        no: 1,
        name: 'Training Needs Assessment',
        description: 'Survei singkat ke anggota: topik pelatihan yang paling dibutuhkan. Output: top-5 tema + persona peserta.',
        output: 'Dokumen TNA',
      },
      {
        no: 2,
        name: 'Workshop AI Literacy untuk Pendidik',
        description: '1 workshop daring 1 hari (4 jam), target 50–100 peserta, materi: prompt engineering & AI tools di kelas.',
        output: 'Recording & materi workshop',
      },
      {
        no: 3,
        name: 'Modul Digital Pedagogy',
        description: '1 modul self-paced (5–6 video pendek + handout PDF) di Google Classroom/LMS gratis, dapat diakses anggota kapan saja.',
        output: 'Modul e-learning',
      },
    ],
    semester2: [
      {
        no: 4,
        name: 'Training of Trainers (ToT) Perdana',
        description: 'Bootcamp 2 hari untuk 20–30 fasilitator anggota, sertifikat dari INOPI, mereka menjadi multiplier.',
        output: 'Database fasilitator bersertifikat',
      },
      {
        no: 5,
        name: 'Sertifikasi Inovasi Pembelajaran (Pilot)',
        description: 'Skema sertifikasi internal INOPI, asesmen portofolio + presentasi, 1 batch pilot 30 peserta, pondasi menuju BNSP.',
        output: 'Sistem sertifikasi INOPI',
      },
      {
        no: 6,
        name: 'Komunitas Alumni Pelatihan',
        description: 'WhatsApp/Telegram group + 1 meetup online per kuartal untuk retensi alumni & rekrut narasumber.',
        output: 'Komunitas alumni aktif',
      },
    ],
  },
]
