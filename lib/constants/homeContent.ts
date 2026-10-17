// Konten section baru beranda (dan Program Prioritas di /program).
// Sumber: docs/02_KONTEN_BARU_P0.md, bagian A dan C.

export const WHY_INOPI = {
  eyebrow: 'Mengapa INOPI',
  title: 'Inovasi pembelajaran Indonesia tumbuh di banyak tempat, tetapi belum terhubung',
  body: 'Inovasi pembelajaran di Indonesia lahir di kampus, sekolah, industri, dan lembaga pemerintah. Sayangnya, sebagian besar berjalan sendiri-sendiri: riset berhenti di jurnal, teknologi tidak sampai ke ruang kelas, dan kebutuhan industri tidak terdengar oleh dunia pendidikan. INOPI hadir untuk menghubungkan semuanya dalam satu ekosistem, agar gagasan dapat diuji, diterapkan, dan memberi dampak nyata.',
  cards: [
    {
      title: 'Untuk anggota',
      desc: 'Jejaring lintas sektor, pengembangan kompetensi, serta ruang untuk menguji dan memperluas gagasan.',
    },
    {
      title: 'Untuk mitra',
      desc: 'Jalur kolaborasi yang jelas untuk riset bersama, proyek percontohan, dan pengembangan SDM.',
    },
    {
      title: 'Untuk Indonesia',
      desc: 'Praktik pembelajaran yang terdokumentasi, terukur, dan dapat direplikasi di berbagai daerah.',
    },
  ],
} as const

export type PriorityStatus = 'Berlangsung 26 Okt 2026' | 'Direncanakan' | 'Terbuka untuk kolaborasi'

export const PRIORITY_PROGRAMS: readonly {
  no: number
  title: string
  desc: string
  status: PriorityStatus
}[] = [
  {
    no: 1,
    title: 'Launching & Deklarasi',
    desc: 'Peluncuran resmi INOPI dan deklarasi nasional sebagai tonggak lahirnya asosiasi inovasi pembelajaran Indonesia.',
    status: 'Berlangsung 26 Okt 2026',
  },
  {
    no: 2,
    title: 'Roadmap Nasional',
    desc: 'Penyusunan peta jalan inovasi pembelajaran berbasis teknologi yang komprehensif dan terukur.',
    status: 'Direncanakan',
  },
  {
    no: 3,
    title: 'Forum Nasional & EduTech Asia',
    desc: 'Forum nasional bertema AI dalam pendidikan dan partisipasi di EduTech Asia untuk visibilitas internasional.',
    status: 'Direncanakan',
  },
  {
    no: 4,
    title: 'Pilot Project',
    desc: 'Implementasi pembelajaran cerdas di institusi pendidikan terpilih sebagai model percontohan.',
    status: 'Terbuka untuk kolaborasi',
  },
  {
    no: 5,
    title: 'Platform & Kolaborasi',
    desc: 'Platform berbagi pengetahuan dan kolaborasi internasional dengan negara mitra.',
    status: 'Direncanakan',
  },
]

export const COLLAB_ECOSYSTEM = [
  { title: 'Akademisi & Peneliti', desc: 'Dosen, peneliti, dan ilmuwan yang mengembangkan riset pembelajaran.' },
  { title: 'Institusi Pendidikan', desc: 'Sekolah, perguruan tinggi, dan lembaga vokasi di seluruh Indonesia.' },
  {
    title: 'Industri & Perusahaan Teknologi',
    desc: 'Pelaku industri yang mendorong adopsi solusi pembelajaran modern.',
  },
  { title: 'Startup EdTech', desc: 'Perusahaan rintisan yang membangun solusi pendidikan inovatif.' },
  { title: 'Pemerintah & Regulator', desc: 'Kementerian, dinas pendidikan, dan badan yang membentuk kebijakan.' },
  { title: 'Komunitas Profesional', desc: 'Asosiasi dan jaringan praktisi pendidikan dan teknologi.' },
] as const
