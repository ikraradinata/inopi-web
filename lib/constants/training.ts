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

// Teks katalog (program, horizon, matriks penempatan, use case industri, learning path)
// ada di messages, namespace "Training". Berikut hanya tipe data dan daftar skill
// lengkap yang belum dipakai di antarmuka.

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
