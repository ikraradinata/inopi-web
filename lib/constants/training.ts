// lib/constants/training.ts
// Katalog Program Training INOPI — 10 program (P1–P10) dalam 3 horizon waktu
// Sumber: 02_INOPI_Framework_Kurikulum_Training.md

export interface ModuleRow {
  no?: number | string
  name: string
  duration: string
  meta?: string
}

export interface ModuleGroup {
  heading: string
  metaLabel?: string
  rows: ModuleRow[]
}

export interface CertificationScheme {
  name: string
  linkedProgram: string
  assessmentStructure: string
}

export type TrainingHorizon = 'short' | 'medium' | 'long'

export interface TrainingProgram {
  code: string
  title: string
  flagship?: boolean
  horizon: TrainingHorizon
  tagline: string
  description: string
  spec: {
    proficiency: string
    jobGrade: string
    skillComposition: string
    format: string
    capacity?: string
    price: string
  }
  moduleGroups: ModuleGroup[]
  totalLabel: string
  customization?: string[]
  trainers: string[]
  targetMarket?: string
  certificationSchemes?: CertificationScheme[]
}

export const HORIZON_LABELS: Record<TrainingHorizon, { label: string; range: string }> = {
  short: { label: 'Jangka Pendek', range: '0–3 Bulan' },
  medium: { label: 'Jangka Menengah', range: '3–6 Bulan' },
  long: { label: 'Jangka Panjang', range: '6–12 Bulan' },
}

// Matriks penempatan program — Proficiency × Job Grade (doc02 §1)
export const PLACEMENT_MATRIX: {
  proficiency: string
  proficiencyDesc: string
  cells: { grade: string; codes: string[] }[]
}[] = [
  {
    proficiency: 'BASIC',
    proficiencyDesc: 'Belum familiar tools digital/AI',
    cells: [
      { grade: 'Staf', codes: ['P4'] },
      { grade: 'Manager', codes: ['P4'] },
      { grade: 'Executive', codes: ['P3 (Awareness ½ hari)'] },
    ],
  },
  {
    proficiency: 'INTERMEDIATE',
    proficiencyDesc: 'Sudah pakai tools digital, ingin optimasi',
    cells: [
      { grade: 'Staf', codes: ['P1 (Track Praktisi)'] },
      { grade: 'Manager', codes: ['P1 (Track Praktisi)', 'P2'] },
      { grade: 'Executive', codes: ['P2', 'P3'] },
    ],
  },
  {
    proficiency: 'ADVANCED',
    proficiencyDesc: 'Power user, siap memimpin transformasi',
    cells: [
      { grade: 'Staf', codes: ['P10'] },
      { grade: 'Manager', codes: ['P2 + Specialization', 'P7 (ToT)'] },
      { grade: 'Executive', codes: ['P3', 'P6 (B2B Advisory)'] },
    ],
  },
]

// Taksonomi skill lengkap — dipakai bersama katalog training (doc02 §2)
export const HARD_SKILLS_FULL: { name: string; desc: string; priority: string }[] = [
  { name: 'AI & Generative AI', desc: 'LLM, prompt engineering, AI agents, GenAI untuk konten & analisis', priority: 'CRITICAL' },
  { name: 'Big Data & Analytics', desc: 'Data literacy, dashboarding, analisis prediktif, data storytelling', priority: 'CRITICAL' },
  { name: 'Cyber Security', desc: 'Security awareness, data privacy (UU PDP), phishing defense, AI security', priority: 'CRITICAL' },
  { name: 'Cloud Computing', desc: 'Cloud fundamentals, SaaS productivity (M365/Google), hybrid cloud strategy', priority: 'HIGH' },
  { name: 'IoT (Internet of Things)', desc: 'Smart sensor, smart factory, monitoring realtime, edge computing', priority: 'HIGH' },
  { name: 'Robotic Process Automation (RPA)', desc: 'Workflow automation, no-code automation (Zapier/Power Automate)', priority: 'HIGH' },
  { name: 'Immersive Technology (AR/VR)', desc: 'VR training simulation, AR untuk operasional, immersive learning', priority: 'GROWING' },
  { name: 'Blockchain & Web3', desc: 'Smart contract, digital credential, supply chain transparency', priority: 'GROWING' },
  { name: 'Low-Code / No-Code Development', desc: 'Citizen developer, app builder, rapid prototyping', priority: 'GROWING' },
  { name: 'Data Engineering & MLOps', desc: 'Pipeline data, model deployment, AI infrastructure (track advanced)', priority: 'NICHE' },
]

export const SOFT_SKILLS_FULL: { name: string; desc: string; priority: string }[] = [
  { name: 'Analytical & Critical Thinking', desc: 'Kemampuan #1 yang dicari industri — evaluasi informasi & argumen di era AI', priority: 'CRITICAL' },
  { name: 'Creative Thinking & Innovation', desc: 'Ideasi, design thinking, kemampuan yang tidak tergantikan AI', priority: 'CRITICAL' },
  { name: 'Problem Solving & Decision Making', desc: 'Structured problem solving, root cause analysis, data-driven decision', priority: 'CRITICAL' },
  { name: 'Adaptability & Change Management', desc: 'Resiliensi, agility, memimpin & menjalani perubahan digital', priority: 'CRITICAL' },
  { name: 'Communication Skill', desc: 'Komunikasi lintas generasi & channel, virtual communication, storytelling', priority: 'HIGH' },
  { name: 'Leadership & People Development', desc: 'Memimpin tim hybrid, coaching, delegasi, empowerment', priority: 'HIGH' },
  { name: 'Collaboration & Teamwork', desc: 'Kolaborasi lintas fungsi & budaya, tools kolaborasi digital', priority: 'HIGH' },
  { name: 'Emotional Intelligence & Empathy', desc: 'Self-awareness, mengelola konflik, human touch di era otomasi', priority: 'HIGH' },
  { name: 'Public Speaking & Presentation', desc: 'Presentasi meyakinkan, executive presence, pitching', priority: 'GROWING' },
  { name: 'Negotiation & Persuasion', desc: 'Negosiasi bisnis, influence without authority, stakeholder management', priority: 'GROWING' },
  { name: 'Curiosity & Lifelong Learning', desc: 'Learning how to learn, growth mindset, self-directed learning', priority: 'GROWING' },
  { name: 'Time & Energy Management', desc: 'Prioritas, fokus di era distraksi, produktivitas personal', priority: 'STABLE' },
]

// Industri use case — bahan materi & kustomisasi (doc02 §3)
export const INDUSTRY_USE_CASES: { industry: string; priority: number; useCase: string; expert: string }[] = [
  { industry: 'Banking', priority: 1, useCase: 'Fraud detection, credit scoring AI, chatbot CS, AI governance & compliance POJK, AML monitoring', expert: 'Idha Kristiana (16 thn banking AI), Daniel Adhinugraha' },
  { industry: 'Finance & Fintech', priority: 1, useCase: 'Robo-advisory, risk analytics, digital lending, RegTech, decision intelligence', expert: 'Idha Kristiana, Subchan Gatot' },
  { industry: 'Education', priority: 1, useCase: 'Adaptive learning, AI tutor, automated assessment, LMS, PJJ', expert: 'Gogot Suharwoto, Prof. Meyliana, Paulina Pannen, Nunik Afriliana, Bobi Kurniawan' },
  { industry: 'Manufacturing', priority: 1, useCase: 'Predictive maintenance, QC computer vision, smart factory, IoT monitoring, digital twin', expert: 'Subchan Gatot, Jahja, Bambang Yapri, Nita Felia' },
  { industry: 'Technology', priority: 1, useCase: 'AI copilot development, MLOps, product analytics, SaaS growth', expert: '12 founders sektor teknologi — pool terbesar' },
  { industry: 'Government & BUMN', priority: 1, useCase: 'Chatbot layanan publik, otomatisasi dokumen, smart city, literasi digital ASN', expert: 'Boni Pudjianto, Gogot Suharwoto, Yasser Syaiful' },
  { industry: 'Healthcare', priority: 2, useCase: 'AI diagnostic support, patient triage, admin automation, telemedicine, health data privacy', expert: 'Nunik Afriliana' },
  { industry: 'Retail & E-Commerce', priority: 2, useCase: 'Recommendation engine, dynamic pricing, inventory AI, customer analytics', expert: 'Siti Elda Hiererra' },
  { industry: 'FMCG', priority: 2, useCase: 'Trade promo optimization, consumer insights, demand forecasting, route-to-market analytics', expert: '—' },
  { industry: 'F&B', priority: 3, useCase: 'Demand forecasting, menu engineering AI, supply chain optimization, food safety monitoring', expert: '—' },
  { industry: 'Mining & Gas', priority: 3, useCase: 'Predictive safety (HSE), geological analysis AI, equipment monitoring IoT, ESG reporting', expert: '—' },
  { industry: 'Creative Industry', priority: 3, useCase: 'GenAI content production, design automation, IP & copyright era AI, media analytics', expert: 'Siti Elda Hiererra' },
]

// Learning path — funnel pengembangan peserta (doc02 §5)
export const LEARNING_PATH: { order: number; level: string; program: string; func: string }[] = [
  { order: 1, level: 'Entry — Basic', program: 'P4 · AI Literacy for Everyone', func: 'Pintu masuk ekosistem, volume tinggi, harga terjangkau' },
  { order: 2, level: 'Core — Basic–Intermediate', program: 'P1 · AI for Business (Flagship)', func: 'Program flagship & revenue utama' },
  { order: 3, level: 'Growth — Intermediate–Advanced', program: 'P2 · Digital Leadership', func: 'Untuk alumni P1 yang naik jabatan' },
  { order: 4, level: 'Premium — Advanced', program: 'P3 · AI Governance Executive', func: 'Puncak jalur individual — direksi & C-Level' },
  { order: 5, level: 'Multiplier', program: 'P7 · Certified Trainer (ToT)', func: 'Alumni terbaik jadi fasilitator bersertifikat' },
]

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    code: 'P1',
    title: 'AI for Business: From Literacy to Productivity',
    flagship: true,
    horizon: 'short',
    tagline: 'Program andalan INOPI — dari literasi AI ke produktivitas kerja harian',
    description:
      'Program andalan INOPI yang mengajarkan profesional cara memanfaatkan AI secara praktis untuk meningkatkan produktivitas kerja — dari literasi dasar hingga implementasi AI tools dalam alur kerja harian, dengan studi kasus industri riil dari para founders.',
    spec: {
      proficiency: 'Basic–Intermediate (Track Basic & Track Praktisi)',
      jobGrade: 'Staf–Manager',
      skillComposition: '70% Hard / 30% Soft — AI/GenAI, Data Literacy, Cyber Aware · Critical Thinking, Problem Solving, Adaptability',
      format: 'Bootcamp 2 hari (16 JP), offline, 30–50 peserta/batch, Sertifikat INOPI',
      capacity: '30–50 peserta/batch',
      price: 'Rp 2,5–5 juta/peserta',
    },
    moduleGroups: [
      {
        heading: 'Hari 1 — Foundation & Core Skills (8 JP)',
        metaLabel: 'Skill',
        rows: [
          { no: 1, name: 'AI & GenAI Fundamentals — apa itu AI/ML/LLM tanpa jargon, cara kerja GenAI, demo ChatGPT/Claude/Gemini/Copilot', duration: '90 mnt', meta: 'AI Literacy, Curiosity' },
          { no: 2, name: 'AI Tools Landscape untuk Produktivitas — peta 20+ tools, kriteria memilih tools', duration: '90 mnt', meta: 'AI/GenAI, Cloud/SaaS' },
          { no: 3, name: 'Prompt Engineering Mastery — anatomi prompt efektif, few-shot, chain-of-thought', duration: '120 mnt', meta: 'Prompt Eng., Critical Thinking' },
          { no: 4, name: 'Hands-on Lab: AI untuk Tugas Harian — email, laporan, ringkasan dokumen, slide', duration: '120 mnt', meta: 'AI Applied, Problem Solving' },
          { name: 'Recap Hari 1 + Q&A', duration: '30 mnt' },
        ],
      },
      {
        heading: 'Hari 2 — Application & Integration (8 JP)',
        metaLabel: 'Skill',
        rows: [
          { no: 5, name: 'AI per Fungsi Kerja — breakout Marketing/HR/Finance/Operations', duration: '120 mnt', meta: 'AI Applied, RPA Basic' },
          { no: 6, name: 'Industry Use Case Deep-Dive — studi kasus sesuai profil peserta', duration: '90 mnt', meta: 'Creative Thinking, Collaboration' },
          { no: 7, name: 'AI Risks, Ethics & Data Security — halusinasi, UU PDP, bias, kebijakan AI kantor', duration: '90 mnt', meta: 'Cyber Security, Critical Thinking' },
          { no: 8, name: 'Capstone: Personal AI Productivity Blueprint', duration: '120 mnt', meta: 'Decision Making, Public Speaking' },
          { name: 'Sertifikasi & Penutupan', duration: '60 mnt' },
        ],
      },
    ],
    totalLabel: 'Total: 2 Hari · 16 JP + Post-Training Assignment 2 Minggu',
    customization: [
      'Banking/Finance — fraud analytics, compliance',
      'Manufacturing — predictive maintenance, QC vision',
      'Education — AI tutor, adaptive learning',
      'Government/BUMN — layanan publik, SPBE',
    ],
    trainers: ['Idha Kristiana', 'Boni Pudjianto', 'Nita Felia', 'Andy Bintoro', 'Prof. Meyliana', 'Tyo Guritno'],
    targetMarket: 'Corporate Staff, Middle Management, BUMN, Startup',
  },
  {
    code: 'P2',
    title: 'Digital Leadership & Future-Ready Skills',
    horizon: 'short',
    tagline: 'Memimpin transformasi digital dengan percaya diri',
    description:
      'Membekali pemimpin organisasi untuk memimpin transformasi digital: mengelola tim hybrid, membuat keputusan berbasis data, dan memimpin adopsi AI dengan percaya diri.',
    spec: {
      proficiency: 'Intermediate–Advanced (prasyarat: memimpin tim min. 2 tahun atau lulusan P1)',
      jobGrade: 'Manager–Executive',
      skillComposition: '35% Hard / 65% Soft — AI Strategy, Data-Driven · Leadership, Change Mgmt, Communication, Decision Making',
      format: 'Workshop 2 hari + 2× Group Coaching, offline, 20–30 peserta, Sertifikat INOPI',
      capacity: '20–30 peserta/batch',
      price: 'Rp 6–9 juta/peserta',
    },
    moduleGroups: [
      {
        heading: 'Hari 1 — Leading Self & Team in Digital Era (8 JP)',
        metaLabel: 'Skill',
        rows: [
          { no: 1, name: 'Leadership in the Age of AI — self-assessment Digital Leadership Readiness', duration: '90 mnt', meta: 'Leadership, Self-awareness' },
          { no: 2, name: 'Digital Mindset & Change Management — ADKAR/Kotter, simulasi kasus', duration: '120 mnt', meta: 'Change Mgmt, Empathy' },
          { no: 3, name: 'Data-Driven Decision Making — data literacy untuk pemimpin', duration: '120 mnt', meta: 'Data Literacy, Decision Making' },
          { no: 4, name: 'Leading Hybrid & Multigenerational Teams', duration: '90 mnt', meta: 'Communication, Collaboration' },
        ],
      },
      {
        heading: 'Hari 2 — Leading Organization & Transformation (8 JP)',
        metaLabel: 'Skill',
        rows: [
          { no: 5, name: 'Digital Strategy & Business Model Innovation', duration: '120 mnt', meta: 'Digital Strategy, Creative Thinking' },
          { no: 6, name: 'AI untuk Leaders: Praktis & Strategis', duration: '90 mnt', meta: 'AI/GenAI, Critical Thinking' },
          { no: 7, name: 'Executive Communication & Influence', duration: '90 mnt', meta: 'Public Speaking, Negotiation' },
          { no: 8, name: 'Capstone: 90-Day Leadership Action Plan', duration: '120 mnt', meta: 'Decision Making, Accountability' },
        ],
      },
      {
        heading: 'Follow-up — Group Coaching (Online)',
        rows: [
          { no: 'C1', name: 'Coaching Session 1 (Minggu ke-3)', duration: '90 mnt' },
          { no: 'C2', name: 'Coaching Session 2 (Minggu ke-8)', duration: '90 mnt' },
        ],
      },
    ],
    totalLabel: 'Total: 2 Hari Workshop (16 JP) + 2× Coaching (3 JP) = 19 JP dalam 8 minggu',
    trainers: ['Victor Osman', 'Tutut Handayani', 'Nita Felia', 'Daniel Adhinugraha', 'Jahja', 'Bambang Yapri'],
    targetMarket: 'Senior Manager, C-Level, Department Head, Pemerintahan',
  },
  {
    code: 'P3',
    title: 'AI Governance & Responsible AI for Executives',
    horizon: 'short',
    tagline: 'Tata kelola AI dan manajemen risiko untuk level direksi',
    description:
      'Program eksklusif level direksi yang membekali pengambil keputusan tertinggi dengan kerangka tata kelola AI, manajemen risiko, dan strategi adopsi AI yang bertanggung jawab.',
    spec: {
      proficiency: 'Intermediate–Advanced (tidak perlu keahlian teknis AI)',
      jobGrade: 'Executive (direksi, C-Level, komisaris, kepala risk/compliance/digital, regulator)',
      skillComposition: '55% Hard / 45% Soft — AI Governance, Risk Mgmt, Cyber/Privacy · Strategic Decision, Critical Thinking',
      format: 'Executive Seminar 1 hari (premium), small group 15–20, roundtable',
      capacity: '15–20 peserta',
      price: 'Rp 10–15 juta/peserta',
    },
    moduleGroups: [
      {
        heading: 'Satu Hari Penuh (8 JP)',
        metaLabel: 'Skill',
        rows: [
          { no: 1, name: 'AI Strategic Landscape for Executives', duration: '75 mnt', meta: 'AI Strategy, Strategic Thinking' },
          { no: 2, name: 'AI Readiness Assessment Framework', duration: '90 mnt', meta: 'AI Readiness, Analytical' },
          { no: 3, name: 'AI Governance & Regulatory Landscape — NIST AI RMF, ISO 42001, EU AI Act, UU PDP, POJK', duration: '105 mnt', meta: 'AI Governance, Regulatory' },
          { no: 4, name: 'AI Risk Management & Responsible AI', duration: '90 mnt', meta: 'Risk Mgmt, Decision Making' },
          { no: 5, name: 'Executive Roundtable: AI Adoption Roadmap', duration: '90 mnt', meta: 'Peer Learning, Networking' },
          { name: 'Executive Toolkit & Penutupan', duration: '30 mnt' },
        ],
      },
    ],
    totalLabel: 'Total: 1 Hari Intensif (8 JP) + 1 Sesi Konsultasi Follow-up',
    trainers: ['Idha Kristiana (lead)', 'Boni Pudjianto', 'Prof. Meyliana', 'Subchan Gatot'],
    targetMarket: 'Direksi, C-Level, Risk/Compliance, Perbankan',
  },
  {
    code: 'P4',
    title: 'AI Literacy for Everyone',
    horizon: 'short',
    tagline: 'Pintu masuk ekosistem INOPI — AI literacy terjangkau untuk semua',
    description:
      'Program AI literacy terjangkau untuk masyarakat luas — mahasiswa, first jobber, UMKM. Fungsi strategis: pintu masuk ekosistem INOPI dan funnel menuju program lanjutan.',
    spec: {
      proficiency: 'Basic (tanpa prasyarat)',
      jobGrade: 'Staf, Mahasiswa, Umum',
      skillComposition: '60% Hard / 40% Soft',
      format: '1 hari (8 JP), online/offline, 50–100 peserta, repeatable bulanan',
      capacity: '50–100 peserta/batch',
      price: 'Rp 350rb–1 juta/peserta',
    },
    moduleGroups: [
      {
        heading: '1 Hari (8 JP) — Repeatable Setiap Bulan',
        rows: [
          { no: 1, name: 'Memahami AI Tanpa Jargon', duration: '60 mnt' },
          { no: 2, name: 'Tools AI Gratis untuk Kehidupan & Kerja', duration: '90 mnt' },
          { no: 3, name: 'Prompt Engineering untuk Pemula', duration: '90 mnt' },
          { no: 4, name: 'AI, Masa Depan Karir & Employability', duration: '60 mnt' },
          { no: 5, name: 'Etika & Keamanan: Jadi Pengguna AI yang Cerdas', duration: '60 mnt' },
          { no: 6, name: 'Mini Project & Showcase', duration: '90 mnt' },
          { name: 'Sertifikasi Digital & Next Steps', duration: '30 mnt' },
        ],
      },
    ],
    totalLabel: 'Total: 1 Hari (8 JP) — Repeatable Setiap Bulan',
    customization: ['Kampus Edition', 'UMKM Edition', 'ASN Edition', 'Guru Edition'],
    trainers: ['Andy Bintoro', 'Yasser Syaiful', 'Tyo Guritno', 'Nunik Afriliana', 'Ikrar Adinata', 'Bobi Kurniawan'],
    targetMarket: 'Mahasiswa, First Jobber, UMKM, Masyarakat Umum',
  },
  {
    code: 'P5',
    title: 'EdTech Innovation & Smart Learning Design',
    horizon: 'medium',
    tagline: 'Program signature INOPI — kombinasi kebijakan, riset, dan teknologi pembelajaran',
    description:
      'Program signature INOPI yang menggabungkan perspektif kebijakan Kemendikbud, riset PJJ, AI in Education, dan teknologi pembelajaran — kombinasi expert yang tidak dimiliki asosiasi manapun di Indonesia.',
    spec: {
      proficiency: 'Intermediate–Advanced',
      jobGrade: 'Staf–Manager (dosen, guru, instructional designer, kaprodi, kepala sekolah, corporate L&D)',
      skillComposition: '50% Hard / 50% Soft',
      format: '3 hari intensif (24 JP), offline, 25–40 peserta, design sprint + showcase',
      capacity: '25–40 peserta/batch',
      price: 'Rp 3,5–6 juta/peserta',
    },
    moduleGroups: [
      {
        heading: 'Hari 1 — Landscape & AI in Education (8 JP)',
        rows: [
          { no: 1, name: 'Learning Innovation Landscape 2026', duration: '90 mnt' },
          { no: 2, name: 'AI in Education Deep-Dive', duration: '120 mnt' },
          { no: 3, name: 'Learning Analytics & Data-Driven Teaching', duration: '90 mnt' },
          { no: 4, name: 'Hands-on Lab: AI untuk Materi Ajar', duration: '150 mnt' },
        ],
      },
      {
        heading: 'Hari 2 — Design & Technology (8 JP)',
        rows: [
          { no: 5, name: 'Modern Instructional Design', duration: '120 mnt' },
          { no: 6, name: 'Immersive Learning: AR/VR & Simulasi', duration: '90 mnt' },
          { no: 7, name: 'LMS & Digital Learning Ecosystem', duration: '90 mnt' },
          { no: 8, name: 'Gamification & Engagement + Assessment Inovatif', duration: '120 mnt' },
        ],
      },
      {
        heading: 'Hari 3 — Design Sprint & Showcase (8 JP)',
        rows: [
          { no: 9, name: 'Design Sprint: Merancang Inovasi Pembelajaran', duration: '240 mnt' },
          { no: 10, name: 'Showcase & Expert Panel Feedback', duration: '150 mnt' },
          { name: 'Sertifikasi & Komunitas Praktisi', duration: '30 mnt' },
        ],
      },
    ],
    totalLabel: 'Total: 3 Hari Intensif (24 JP)',
    customization: ['Higher Education', 'K-12/Sekolah', 'Corporate L&D', 'Dinas/Pemerintah'],
    trainers: ['Gogot Suharwoto', 'Prof. Meyliana', 'Paulina Pannen', 'Nunik Afriliana', 'Bobi Kurniawan', 'Sunardi', 'Pony Halim'],
    targetMarket: 'Dosen, Guru, Dinas Pendidikan, Universitas, EdTech',
  },
  {
    code: 'P6',
    title: 'Enterprise AI Strategy & Digital Transformation (B2B)',
    horizon: 'medium',
    tagline: 'Engagement B2B customized untuk korporasi besar dan BUMN',
    description:
      'Engagement B2B customized untuk korporasi besar dan BUMN: assessment kematangan digital, pemetaan use case AI, roadmap 12–24 bulan siap presentasi direksi, plus advisory 3 bulan.',
    spec: {
      proficiency: 'Intermediate–Advanced',
      jobGrade: 'Manager–Executive (tim transformasi digital + sponsor C-Level, 10–20 orang/engagement)',
      skillComposition: '60% Hard / 40% Soft',
      format: '4 hari modular + advisory 3 bulan, in-house di lokasi klien',
      capacity: '10–20 orang/engagement',
      price: 'Rp 150–300 juta/engagement',
    },
    moduleGroups: [
      {
        heading: 'Fase A — Discover (Hari 1)',
        rows: [
          { no: 1, name: 'Digital & AI Maturity Assessment', duration: '120 mnt' },
          { no: 2, name: 'Industry Disruption & Benchmark', duration: '90 mnt' },
          { no: 3, name: 'Data & Infrastructure Readiness Review', duration: '120 mnt' },
          { no: 4, name: 'Executive Alignment Session', duration: '90 mnt' },
        ],
      },
      {
        heading: 'Fase B — Design (Hari 2–3)',
        rows: [
          { no: 5, name: 'AI Opportunity Mapping Workshop', duration: '150 mnt' },
          { no: 6, name: 'Use Case Prioritization & Business Case', duration: '120 mnt' },
          { no: 7, name: 'Target Operating Model & Talent Strategy', duration: '120 mnt' },
          { no: 8, name: 'AI Governance & Risk Setup + Vendor Landscape', duration: '150 mnt' },
        ],
      },
      {
        heading: 'Fase C — Deliver (Hari 4)',
        rows: [
          { no: 9, name: 'Transformation Roadmap 12–24 Bulan', duration: '150 mnt' },
          { no: 10, name: 'Quick-Win Sprint Planning (30-60-90)', duration: '120 mnt' },
          { no: 11, name: 'Board Presentation Preparation', duration: '90 mnt' },
        ],
      },
      {
        heading: 'Advisory — Pengawalan Eksekusi (3 Bulan)',
        rows: [{ no: 'A', name: 'Monthly Advisory Check-in ×3', duration: '3×90 mnt' }],
      },
    ],
    totalLabel: 'Total: 4 Hari Workshop (32 JP) + Advisory 3 Bulan',
    customization: ['BUMN', 'Perbankan & Finance', 'Manufaktur', 'Holding/Konglomerasi'],
    trainers: ['Idha Kristiana (lead)', 'Pony Halim', 'Ferry Sutanto', 'Kun Wardana', 'Daniel Adhinugraha', 'Ikrar Adinata'],
    targetMarket: 'BUMN, Perbankan & Finance, Manufaktur, Holding/Konglomerasi',
  },
  {
    code: 'P7',
    title: 'INOPI Certified Trainer Program (Training of Trainers)',
    horizon: 'medium',
    tagline: 'Mencetak fasilitator bersertifikat — kunci skalabilitas INOPI',
    description:
      'Mencetak fasilitator bersertifikat INOPI dari alumni terbaik dan praktisi anggota — kunci skalabilitas agar INOPI tidak bergantung pada founders.',
    spec: {
      proficiency: 'Advanced (prasyarat: lulus P1/P5 dengan nilai baik atau praktisi berpengalaman + lolos seleksi portofolio)',
      jobGrade: 'Staf Senior–Manager',
      skillComposition: '30% Hard / 70% Soft',
      format: 'Bootcamp 2 hari + Co-teaching, 20–30 peserta, micro-teaching direkam, sertifikat 2 tahun',
      capacity: '20–30 peserta/batch',
      price: 'Rp 4–6 juta/peserta (subsidi 50% untuk anggota INOPI dengan komitmen mengajar)',
    },
    moduleGroups: [
      {
        heading: 'Hari 1 — Foundations of Facilitation (8 JP)',
        rows: [
          { no: 1, name: 'Adult Learning Principles (Andragogi)', duration: '90 mnt' },
          { no: 2, name: 'INOPI Teaching Standards & Kurikulum', duration: '90 mnt' },
          { no: 3, name: 'Facilitation Skills Lab', duration: '120 mnt' },
          { no: 4, name: 'Digital Classroom Tools', duration: '90 mnt' },
          { no: 5, name: 'Handling Difficult Situations', duration: '90 mnt' },
        ],
      },
      {
        heading: 'Hari 2 — Practice & Assessment (8 JP)',
        rows: [
          { no: 6, name: 'Micro-Teaching Round 1 (direkam & dinilai rubrik)', duration: '150 mnt' },
          { no: 7, name: 'Feedback & Coaching Session', duration: '90 mnt' },
          { no: 8, name: 'Micro-Teaching Round 2 (Perbaikan)', duration: '150 mnt' },
          { no: 9, name: 'Certification Pathway & Komitmen', duration: '60 mnt' },
        ],
      },
      {
        heading: 'Pasca-Bootcamp — Co-Teaching (wajib untuk sertifikat penuh)',
        rows: [{ no: 'C', name: 'Co-Teaching 1 Batch Riil + Evaluasi', duration: '1 batch' }],
      },
    ],
    totalLabel: 'Total: 2 Hari Bootcamp (16 JP) + Co-Teaching 1 Batch + Sertifikat 2 Tahun',
    trainers: ['Andy Bintoro (koordinator)', 'Nita Felia', 'Victor Osman', 'Tutut Handayani', 'Bambang Yapri'],
    targetMarket: 'Alumni terbaik P1/P5, praktisi berpengalaman',
  },
  {
    code: 'P8',
    title: 'Sertifikasi Nasional Inovasi Pembelajaran (Jalur BNSP)',
    horizon: 'long',
    tagline: 'Infrastruktur sertifikasi yang membuat semua program INOPI bernilai resmi',
    description:
      'Membangun skema sertifikasi kompetensi yang diakui BNSP — bukan program pelatihan, melainkan infrastruktur sertifikasi yang membuat semua program INOPI bernilai resmi.',
    spec: {
      proficiency: 'Asesi: Intermediate–Advanced',
      jobGrade: 'Staf–Manager',
      skillComposition: 'Skema Sertifikasi + Asesmen (asesi diuji, bukan dilatih)',
      format: 'Timeline pembangunan Bulan 6–12, pilot asesmen di bulan 11–12',
      price: 'Rp 2,5–4 juta/asesi',
    },
    moduleGroups: [
      {
        heading: 'Roadmap Pembangunan Skema (6 Bulan)',
        metaLabel: 'PIC',
        rows: [
          { no: 1, name: 'Penyusunan Skema & Unit Kompetensi', duration: 'Bulan 6–7', meta: 'Prof Mey, Paulina, Idha' },
          { no: 2, name: 'Harmonisasi BNSP & Penjajakan LSP (dirikan LSP sendiri vs menumpang LSP existing)', duration: 'Bulan 7–8', meta: 'Gogot, Victor, Siti Elda' },
          { no: 3, name: 'Pelatihan Asesor Kompetensi (min. 6 asesor bersertifikat)', duration: 'Bulan 8–9', meta: 'Andy + 6 kandidat asesor' },
          { no: 4, name: 'Pengembangan Perangkat Asesmen (MUK)', duration: 'Bulan 9–10', meta: 'Idha, Tutut' },
          { no: 5, name: 'Pilot Asesmen Batch 1 (30–60 asesi)', duration: 'Bulan 11–12', meta: 'Seluruh tim + asesor' },
        ],
      },
    ],
    totalLabel: 'Timeline Pembangunan: Bulan 6–12 · Pilot Asesmen Bulan 11–12',
    certificationSchemes: [
      { name: 'Praktisi AI untuk Produktivitas Kerja', linkedProgram: 'Alumni P1', assessmentStructure: 'Portofolio (60 mnt) → Uji praktik (120 mnt) → Wawancara (60 mnt)' },
      { name: 'Digital Learning Designer', linkedProgram: 'Alumni P5', assessmentStructure: 'Portofolio rancangan (60 mnt) → Demonstrasi desain (120 mnt) → Wawancara (60 mnt)' },
      { name: 'Fasilitator Pembelajaran Inovatif', linkedProgram: 'Alumni P7 (ToT)', assessmentStructure: 'Portofolio mengajar (60 mnt) → Simulasi mengajar (120 mnt) → Wawancara (60 mnt)' },
    ],
    trainers: ['Gogot Suharwoto', 'Prof. Meyliana', 'Idha Kristiana', 'Andy Bintoro'],
    targetMarket: 'Alumni P1, P5, P7 (ToT)',
  },
  {
    code: 'P9',
    title: 'INOPI AI Education Summit (Forum Nasional Tahunan)',
    horizon: 'long',
    tagline: 'Event puncak tahunan "AI in Learning Technology"',
    description:
      'Event puncak tahunan bertema "AI in Learning Technology" yang mempertemukan seluruh ekosistem: akademisi, industri, pemerintah, dan startup EdTech.',
    spec: {
      proficiency: '—',
      jobGrade: 'Seluruh ekosistem pendidikan & AI',
      skillComposition: '2 hari hybrid — offline Jakarta + streaming nasional',
      format: 'Target 300–500 peserta · Waktu: Bulan ke-10–12 (persiapan mulai bulan ke-6)',
      capacity: '300–500 peserta',
      price: 'Tiket Rp 250rb (mahasiswa) – Rp 1,5 juta (profesional)',
    },
    moduleGroups: [
      {
        heading: 'Hari 1 — Visi & Industri',
        metaLabel: 'Pengisi',
        rows: [
          { no: 1, name: 'Opening Ceremony & Keynote Pemerintah', duration: '60 mnt', meta: 'Jalur Gogot Suharwoto (Kemendikbud)' },
          { no: 2, name: 'Keynote Industri Global', duration: '45 mnt', meta: 'Mitra internasional (target: Google for Education/Microsoft Education/ELSA)' },
          { no: 3, name: 'Panel Utama: AI in Learning Technology', duration: '90 mnt', meta: 'Prof Mey, Idha, industri, pemerintah' },
          { no: 4, name: 'Workshop Paralel — 4 Track (teaser P1/P5/P3/P4)', duration: '120 mnt', meta: 'Certified Trainers + founders' },
          { no: 5, name: 'Exhibition & Networking Evening', duration: '90 mnt', meta: 'Divisi Kemitraan' },
        ],
      },
      {
        heading: 'Hari 2 — Riset, Penghargaan & Deklarasi',
        metaLabel: 'Pengisi',
        rows: [
          { no: 6, name: 'Research Showcase & Peluncuran White Paper/Jurnal', duration: '90 mnt', meta: 'Bobi, Nunik + tim penulis' },
          { no: 7, name: 'Panel Kebijakan & Peluncuran Skema Sertifikasi (link P8)', duration: '90 mnt', meta: 'Gogot, Andy, perwakilan BNSP' },
          { no: 8, name: 'INOPI Innovation Awards', duration: '60 mnt', meta: 'Dewan Pakar sebagai juri' },
          { no: 9, name: 'Deklarasi & Closing', duration: '45 mnt', meta: 'Seluruh pengurus & founders' },
        ],
      },
    ],
    totalLabel: '2 Hari Hybrid — Offline Jakarta + Streaming Nasional',
    trainers: ['Nita Felia & Yasser Syaiful (lead pelaksana)', 'Victor Osman & Siti Elda (sponsorship)', 'Gogot Suharwoto (government relations)'],
    targetMarket: 'Akademisi, industri, pemerintah, startup EdTech',
  },
  {
    code: 'P10',
    title: 'Data Science & AI Builder Bootcamp',
    horizon: 'long',
    tagline: 'Melahirkan praktisi yang bisa MEMBANGUN solusi AI',
    description:
      'Program teknis intensif untuk melahirkan praktisi yang bisa membangun solusi AI — bukan hanya menggunakannya.',
    spec: {
      proficiency: 'Advanced (prasyarat: logika kuat, lolos tes masuk logika dasar)',
      jobGrade: 'Staf–Manager (analyst, engineer, product manager teknis, IT staff)',
      skillComposition: '85% Hard / 15% Soft',
      format: '5 hari intensif (40 JP) atau 8 minggu part-time (Sabtu), 20–25 peserta',
      capacity: '20–25 peserta/batch',
      price: 'Rp 8–15 juta/peserta',
    },
    moduleGroups: [
      {
        heading: 'Hari 1 — Python & Data Foundations (8 JP)',
        rows: [
          { no: 1, name: 'Python untuk Data (dari Nol)', duration: '240 mnt' },
          { no: 2, name: 'Data Cleaning & Preparation', duration: '240 mnt' },
        ],
      },
      {
        heading: 'Hari 2 — Analysis & Visualization (8 JP)',
        rows: [
          { no: 3, name: 'Exploratory Data Analysis (EDA)', duration: '240 mnt' },
          { no: 4, name: 'Data Visualization & Storytelling', duration: '240 mnt' },
        ],
      },
      {
        heading: 'Hari 3 — Machine Learning Fundamentals (8 JP)',
        rows: [
          { no: 5, name: 'ML Concepts & Supervised Learning', duration: '240 mnt' },
          { no: 6, name: 'Model Evaluation & Responsible AI', duration: '240 mnt' },
        ],
      },
      {
        heading: 'Hari 4 — GenAI & AI App Building (8 JP)',
        rows: [
          { no: 7, name: 'Bekerja dengan LLM API', duration: '240 mnt' },
          { no: 8, name: 'RAG Sederhana & Low-Code AI Apps', duration: '240 mnt' },
        ],
      },
      {
        heading: 'Hari 5 — Capstone & Deployment (8 JP)',
        rows: [
          { no: 9, name: 'Capstone Project End-to-End', duration: '300 mnt' },
          { no: 10, name: 'Demo Day & Sertifikasi', duration: '180 mnt' },
        ],
      },
    ],
    totalLabel: 'Total: 5 Hari Intensif (40 JP) — atau 8 Minggu Part-Time',
    customization: ['Banking/Finance', 'Manufaktur', 'Retail/E-commerce', 'Pendidikan'],
    trainers: ['Ikrar Adinata (lead)', 'Nunik Afriliana', 'Ferry Sutanto', 'Bobi Kurniawan', 'Idha Kristiana'],
    targetMarket: 'Analyst, engineer, product manager teknis, IT staff',
  },
]
