// Data 26 Founder INOPI.
// Jabatan organisasi mengacu pada PRD v2.0; nama lengkap, jabatan profesional,
// institusi, dan pesan bersumber dari formulir profil founder (Oktober 2026).

export interface Founder {
  /** Nama tampilan sesuai pengisian profil masing-masing founder. */
  name: string
  /** Nama lengkap beserta gelar, ditampilkan di dialog profil. */
  fullName?: string
  /** Jabatan di struktur INOPI. */
  role: string
  /** Jabatan profesional saat ini. */
  title?: string
  /** Perusahaan, lembaga, atau institusi saat ini. */
  institution?: string
  /** Pesan singkat untuk calon anggota INOPI. */
  message?: string
  /** Nama berkas di public/founders. Kosong bila foto belum tersedia. */
  photo?: string
  initials: string
}

export const FOUNDERS: Founder[] = [
  // Pengurus Harian
  {
    name: 'Meyliana',
    fullName: 'Prof. Dr. Ir. Meyliana, S.Kom., M.M., IPU, CDMS, CBDMP, CME',
    role: 'Ketua Umum',
    title: 'Guru Besar Sistem Informasi',
    institution: 'BINUS University',
    message:
      'Bergabung dengan INOPI merupakan langkah nyata menuju pembelajaran yang adaptif, terkini, dan menggunakan teknologi tepat guna untuk Indonesia yang lebih baik.',
    photo: 'meyliana',
    initials: 'ME',
  },
  {
    name: 'Sunardi',
    fullName: 'Dr. Sunardi, S.Kom., M.M.S.I.',
    role: 'Wakil Ketua',
    title: 'Co-Founder & CEO',
    institution: 'SUNEDU ID',
    message:
      'Di sinilah Anda berkumpul untuk mendapatkan insight dan best practice bagi inovasi pembelajaran.',
    photo: 'sunardi',
    initials: 'SU',
  },
  {
    name: 'Idha Kristiana',
    fullName: 'Dr. Idha Kristiana, S.Kom., M.M.S.I., SMIEEE',
    role: 'Sekretaris',
    title: 'Founder & CEO',
    institution: 'PT Viktori Aksara Teknologi Indonesia (V-TEKI)',
    message:
      'Don’t just be part of the transformation in education, be the one who helps shape it. At INOPI, we learn, collaborate, innovate, and grow together to create learning that is more relevant, meaningful, and impactful for Indonesia.',
    photo: 'idha-kristiana',
    initials: 'IK',
  },
  {
    name: 'Ikrar Adinata Arin',
    fullName: 'Dr. Ir. Ikrar Adinata Arin, S.T., M.T.I., IPM., ASEAN Eng., SMIEEE',
    role: 'Bendahara',
    title: 'Dosen & Peneliti; Senior Banking Technology Executive',
    institution: 'BINUS University',
    message:
      'Mari membangun bersama ekosistem inovasi pembelajaran Indonesia, bukan sebagai penonton perubahan, tapi sebagai perancangnya.',
    photo: 'ikrar-adinata-arin',
    initials: 'IA',
  },

  // Divisi
  {
    name: 'Bobi Kurniawan',
    fullName: 'Dr. Bobi Kurniawan, S.T., M.Kom.',
    role: 'Riset & Inovasi',
    title: 'Direktur Aplikasi Pengembangan Pelatihan dan Service Center',
    institution: 'UNIKOM',
    message:
      'Ikutilah proses dengan sabar, karena dari proses itulah akan melahirkan banyak hal.',
    photo: 'bobi-kurniawan',
    initials: 'BK',
  },
  {
    name: 'Nunik Afriliana',
    fullName: 'Dr. Nunik Afriliana, S.Kom., M.M.S.I.',
    role: 'Riset & Inovasi',
    title: 'Ketua Program Studi Kecerdasan Buatan',
    institution: 'Universitas Multimedia Nusantara',
    message:
      'Mari bergabung dan bertumbuh bersama INOPI sebagai wadah kolaborasi, berbagi pengetahuan, dan mengembangkan inovasi pembelajaran yang inklusif dan berdampak nyata.',
    photo: 'nunik-afriliana',
    initials: 'NA',
  },
  {
    name: 'Nita Felia Pambudi',
    fullName: 'Nita Felia Pambudi, S.Si., S.Kom., IMScBA',
    role: 'Program & Implementasi',
    title: 'Chief Operating Officer',
    institution: 'GreatNusa by Bina Nusantara',
    message:
      'Indonesia tidak kekurangan orang hebat dan ide bagus. Yang kita butuhkan adalah lebih banyak orang yang punya hati, mau berpikir kritis, berani bergerak, dan bersedia menggabungkan kekuatan untuk menghasilkan perubahan nyata.',
    photo: 'nita-felia-pambudi',
    initials: 'NP',
  },
  {
    name: 'Yasser Muhammad Syaiful',
    fullName: 'Yasser Muhammad Syaiful, S.T., MBA',
    role: 'Program & Implementasi',
    title: 'Chief Commercial Officer Lingotalk; Business Development Manager SEA Duolingo',
    institution: 'Lingotalk & Duolingo',
    message:
      'Terima kasih sudah berkomitmen membangun dan bergabung. Semoga platform ini menjadi wadah nyata untuk membuat dampak serta amal jariah untuk kita semua.',
    photo: 'yasser-muhammad-syaiful',
    initials: 'YS',
  },
  {
    name: 'Siti Elda Hiererra',
    role: 'Kemitraan & Kerjasama',
    initials: 'SE',
  },
  {
    name: 'Victor Osman',
    fullName: 'Victor Osman, S.Kom., MIB',
    role: 'Kemitraan & Kerjasama',
    title: 'Chief Executive Officer',
    institution: 'PT Dreamaxtion Teknologi Internasional',
    message: 'We welcome you, and let’s be part of INOPI.',
    photo: 'victor-osman',
    initials: 'VO',
  },
  {
    name: 'Andy Febrico Bintoro',
    role: 'Pelatihan & Sertifikasi',
    title: 'Co-Founder & CTO',
    institution: 'Maxy AI Holdings',
    message: 'Kontribusi dulu, yang lain mengikuti.',
    photo: 'andy-febrico-bintoro',
    initials: 'AB',
  },

  // Dewan Pembina
  {
    name: 'Bonifasius W. Pudjianto',
    role: 'Dewan Pembina',
    title: 'Kepala Badan Pengembangan SDM Komdigi',
    institution: 'Kementerian Komunikasi dan Digital',
    message: 'Keep fighting and struggling.',
    photo: 'bonifasius-w-pudjianto',
    initials: 'BP',
  },
  {
    name: 'Gogot Suharwoto',
    fullName: 'Gogot Suharwoto, S.Pd., M.Ed., Ph.D.',
    role: 'Dewan Pembina',
    title: 'Direktur Jenderal PAUD, Pendidikan Dasar, dan Pendidikan Nonformal Informal',
    institution: 'Kementerian Pendidikan Dasar dan Menengah RI',
    message:
      'Mari berkolaborasi di INOPI untuk mengubah gagasan menjadi inovasi dan menghadirkan pembelajaran yang lebih bermakna bagi masa depan pendidikan Indonesia.',
    photo: 'gogot-suharwoto',
    initials: 'GS',
  },
  {
    name: 'Heru Dewanto',
    role: 'Dewan Pembina',
    initials: 'HD',
  },
  {
    name: 'M. Aditya Warman',
    fullName: 'Dr. M. Aditya Warman, S.Psi., MBA',
    role: 'Dewan Pembina',
    title: 'Co-Founder',
    institution: 'IRSCHOOL.ID',
    message: 'Menjadikan INOPI sebagai ekosistem bertumbuh bagi inovasi pendidikan Indonesia.',
    initials: 'MA',
  },
  {
    name: 'Pony Halim',
    role: 'Dewan Pembina',
    title: 'VP of Technology',
    institution: 'PCMan',
    message:
      'Yuk bergabung, bersama kita wujudkan gagasan menjadi inovasi yang bermanfaat dan berdampak nyata!',
    photo: 'pony-halim',
    initials: 'PH',
  },
  {
    name: 'Subchan Gatot',
    role: 'Dewan Pembina',
    title: 'Advisor, CEO & Owner',
    institution: 'PT TMMIN; PT Prisma Digital Ambara; PT Perjalanan Para Khalifah',
    message: 'Kolaborasi dan bangun relasi.',
    photo: 'subchan-gatot',
    initials: 'SG',
  },

  // Dewan Pengawas
  {
    name: 'Bambang Yapri',
    role: 'Dewan Pengawas',
    title: 'Professional Coach; Business Transformation Advisor',
    institution: 'Be a Better You',
    message: 'High Tech High Touch Ecosystem for Indonesian’s Human Capability.',
    photo: 'bambang-yapri',
    initials: 'BY',
  },
  {
    name: 'Daniel Adhinugraha W.',
    role: 'Dewan Pengawas',
    title: 'Culture & Performance Catalyst',
    message:
      'Terus memberi dampak positif bagi lingkungan sekitar melalui kepribadian yang memiliki kapabilitas holistik.',
    initials: 'DA',
  },
  {
    name: 'Paulina Pannen',
    role: 'Dewan Pengawas',
    title: 'Guru Besar Pembelajaran, Universitas Terbuka',
    institution: 'ICE Institute, Universitas Terbuka',
    message: 'Berkarya bersama untuk Indonesia.',
    photo: 'paulina-pannen',
    initials: 'PP',
  },
  {
    name: 'Tutut Handayani',
    fullName: 'Dr. Tutut Handayani, M.Psi., Psikolog',
    role: 'Dewan Pengawas',
    title: 'Psikolog',
    institution: 'Matahati Consulting',
    message:
      'Bersama INOPI, kita dapat berkolaborasi menghadirkan pembelajaran digital yang bermakna, memperluas kesempatan belajar, dan mengembangkan potensi manusia Indonesia, dengan tetap menjadikan etika, moral, dan budi luhur sebagai landasan.',
    photo: 'tutut-handayani',
    initials: 'TH',
  },

  // Dewan Pakar
  {
    name: 'Ferry Sutanto',
    role: 'Dewan Pakar',
    title: 'Chief Executive Officer',
    institution: 'Utopiq',
    message:
      'Closing the digital divide is one of the great challenges of our time, and also one of the great opportunities.',
    photo: 'ferry-sutanto',
    initials: 'FS',
  },
  {
    name: 'Jahja',
    role: 'Dewan Pakar',
    title: 'Chief Human Resources Officer',
    institution: 'Meratus Group',
    message:
      'Mari bergabung dan tumbuh bersama. Perubahan besar dalam pembelajaran Indonesia dimulai dari kolaborasi kita hari ini.',
    photo: 'jahja',
    initials: 'JA',
  },
  {
    name: 'Kun Wardana',
    fullName: 'Dr. Ir. R. Kun Wardana Abyoto, M.T.',
    role: 'Dewan Pakar',
    title: 'Dekan',
    institution: 'ISTN',
    message:
      'Mari kita tidak hanya menjadi follower perubahan, tetapi juga pencipta perubahan melalui inovasi pembelajaran.',
    photo: 'kun-wardana',
    initials: 'KW',
  },
  {
    name: 'Stephen Ng',
    role: 'Dewan Pakar',
    title: 'Chief Executive Officer',
    institution: 'PT WIR Asia Tbk.',
    message:
      'Mari bersama-sama membangun ekosistem pembelajaran Indonesia yang lebih inovatif, relevan, dan siap menghadapi masa depan. INOPI bukan hanya sebuah organisasi, tetapi ruang untuk berkolaborasi, berbagi gagasan, dan menciptakan perubahan nyata.',
    photo: 'stephen-ng',
    initials: 'SN',
  },
  {
    name: 'Tyo Guritno',
    role: 'Dewan Pakar',
    title: 'CEO Inspigo.ai; AI Transformation Consultant',
    institution: 'Inspigo',
    message: 'INOPI tempat berjejaring, belajar, dan berinovasi untuk meningkatkan talenta Indonesia.',
    photo: 'tyo-guritno',
    initials: 'TG',
  },
]
