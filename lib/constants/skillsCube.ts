// lib/constants/skillsCube.ts
// INOPI Skills Cube — kerangka analisis 4 dimensi kebutuhan pelatihan
// Sumber: 03_INOPI_Skills_Cube.md (framework) + 04_INOPI_Training_Cube.md (rasionalisasi)

export const RATIONALE = {
  points: [
    {
      title: 'Adopsi AI Masif, Kesiapan SDM Tertinggal',
      desc: 'Perusahaan dan institusi pendidikan bergerak cepat mengadopsi AI, tetapi kompetensi SDM belum menyusul. Kebutuhan pelatihan yang terstruktur sangat besar dan belum terlayani secara sistematis. Asosiasi perlu hadir mengisi celah ini sebagai penyedia standar dan pembinaan kompetensi.',
    },
    {
      title: 'Launching Asosiasi Butuh Program Unggulan',
      desc: 'Momentum peluncuran hanya efektif bila disertai program nyata, bukan sekadar deklarasi. Training adalah program yang paling cepat dieksekusi dan langsung dirasakan manfaatnya oleh anggota. Menjadi penanda identitas dan kredibilitas INOPI sejak hari pertama.',
    },
  ],
  conclusion: 'Training adalah langkah nyata pertama — berdampak langsung, cepat dieksekusi, dan menjadi program unggulan INOPI saat launching.',
}

export const SUPPORTING_STATS: { value: string; label: string }[] = [
  { value: '+148%', label: 'Lonjakan permintaan talenta AI di Indonesia (2023–2025)' },
  { value: '9 juta', label: 'Kebutuhan tambahan talenta digital hingga 2030' },
  { value: '~100 ribu', label: 'Kekurangan tenaga ahli keamanan siber' },
  { value: '39%', label: 'Skill inti yang berubah pada 2030 (WEF)' },
]

export const DIMENSIONS: { no: number; name: string; detail: string }[] = [
  { no: 1, name: 'Proficiency Level', detail: 'Basic (L1) · Intermediate (L2) · Advanced (L3)' },
  { no: 2, name: 'Job Grade', detail: 'Staff (G1) · Manager (G2) · Executive (G3)' },
  { no: 3, name: 'Skill', detail: 'Hard Skill (H) · Soft Skill (S)' },
  { no: 4, name: 'Industri', detail: 'Banking, Healthcare, Manufacturing, Tech, dll.' },
]

export const PROFICIENCY_LEVELS: { level: string; code: string; desc: string }[] = [
  { level: 'Basic', code: 'L1', desc: 'Mengenal konsep dasar & mengikuti prosedur dengan bimbingan' },
  { level: 'Intermediate', code: 'L2', desc: 'Menerapkan skill mandiri; menangani masalah menengah' },
  { level: 'Advanced', code: 'L3', desc: 'Merancang solusi, mengevaluasi, memimpin & inovasi strategis' },
]

export const JOB_GRADES: { grade: string; code: string; desc: string }[] = [
  { grade: 'Staff', code: 'G1', desc: 'Pelaksana — kemahiran teknis & penyelesaian tugas harian' },
  { grade: 'Manager', code: 'G2', desc: 'Pengelola — orkestrasi tim, keputusan taktis, problem solving' },
  { grade: 'Executive', code: 'G3', desc: 'Strategis — visi, tata kelola, kepemimpinan transformasi' },
]

export const LAYERS: { code: string; name: string; func: string; components: string[] }[] = [
  {
    code: 'A',
    name: 'Assessment',
    func: 'Mengukur & memetakan kompetensi',
    components: ['Skill gap assessment', 'Pre-test & post-test', 'Competency mapping (L1→L3)', 'Sertifikasi berjenjang', 'Evaluasi dampak kerja'],
  },
  {
    code: 'C',
    name: 'Coaching',
    func: 'Mendampingi peningkatan skill',
    components: ['Mentoring 1-on-1', 'On-the-job coaching', 'Feedback & review berkala', 'Peer & group learning', 'Pendampingan proyek nyata'],
  },
  {
    code: 'D',
    name: 'Delivery',
    func: 'Menyampaikan pembelajaran',
    components: ['Blended learning', 'Workshop & studi kasus industri', 'Project-based learning', 'Microlearning', 'e-Learning + kelas tatap muka'],
  },
]

// Sistem kode ringkas — dipakai untuk format [INDUSTRI]·[H/S+DOMAIN]·[G#L#]
export const SKILL_CODES = {
  hard: [
    { name: 'AI & Machine Learning', code: 'AI' },
    { name: 'Big Data & Analytics', code: 'DATA' },
    { name: 'Cloud Computing', code: 'CLOUD' },
    { name: 'Cyber Security', code: 'CYBER' },
    { name: 'Internet of Things', code: 'IOT' },
    { name: 'Blockchain', code: 'BLOCK' },
    { name: 'Immersive Tech / AR-VR', code: 'XR' },
    { name: 'Robotics / Automation', code: 'RPA' },
  ],
  soft: [
    { name: 'Analytical Thinking', code: 'ANLY' },
    { name: 'Creative Thinking', code: 'CREA' },
    { name: 'Problem Solving & Decision Making', code: 'PROB' },
    { name: 'Communication', code: 'COMM' },
    { name: 'Leadership & Social Influence', code: 'LEAD' },
    { name: 'Negotiation', code: 'NEGO' },
    { name: 'Change Management', code: 'CHG' },
    { name: 'Resilience & Adaptability', code: 'RESI' },
  ],
}

export const CODE_EXAMPLES: { code: string; meaning: string }[] = [
  { code: 'BANK · H-AI · G1L1', meaning: 'AI dasar untuk Staf di Perbankan ("Basic Staff")' },
  { code: 'EDU · S-CREA · G1L1', meaning: 'Creative Thinking dasar untuk Staf Pendidikan' },
  { code: 'MFG · H-IOT · G2L3', meaning: 'IoT tingkat Advanced untuk Manajer Manufaktur' },
]

export const GRADE_LEVEL_READING: { combo: string; label: string }[] = [
  { combo: 'G1L1', label: 'Staff · Basic → "Fondasi"' },
  { combo: 'G2L2', label: '"Pengelola"' },
  { combo: 'G3L3', label: '"Visioner"' },
]

// Matriks — Prioritas Hard Skill per Industri (doc03 §8)
export const INDUSTRY_COLUMNS = ['Banking/Finance', 'Healthcare', 'Education', 'Manufaktur', 'Mining/Energy', 'Technology', 'Retail/FMCG']

export const HARD_SKILL_INDUSTRY_MATRIX: { skill: string; values: string[] }[] = [
  { skill: 'AI & Machine Learning', values: ['Tinggi', 'Tinggi', 'Sedang', 'Tinggi', 'Sedang', 'Tinggi', 'Tinggi'] },
  { skill: 'Big Data & Analytics', values: ['Tinggi', 'Tinggi', 'Sedang', 'Tinggi', 'Tinggi', 'Tinggi', 'Tinggi'] },
  { skill: 'Cloud Computing', values: ['Tinggi', 'Sedang', 'Sedang', 'Sedang', 'Sedang', 'Tinggi', 'Tinggi'] },
  { skill: 'Cyber Security', values: ['Tinggi', 'Tinggi', 'Sedang', 'Sedang', 'Sedang', 'Tinggi', 'Sedang'] },
  { skill: 'Internet of Things (IoT)', values: ['Emerging', 'Sedang', 'Emerging', 'Tinggi', 'Tinggi', 'Sedang', 'Sedang'] },
  { skill: 'Blockchain', values: ['Tinggi', 'Emerging', 'Emerging', 'Emerging', 'Sedang', 'Sedang', 'Sedang'] },
  { skill: 'Immersive Tech (AR/VR)', values: ['Emerging', 'Sedang', 'Tinggi', 'Sedang', 'Sedang', 'Sedang', 'Sedang'] },
  { skill: 'Robotics / RPA', values: ['Tinggi', 'Sedang', 'Emerging', 'Tinggi', 'Sedang', 'Sedang', 'Sedang'] },
]

// Matriks — Prioritas Soft Skill per Jenjang (doc03 §9)
export const JOB_GRADE_COLUMNS = ['Staff (G1)', 'Manager (G2)', 'Executive (G3)']

export const SOFT_SKILL_GRADE_MATRIX: { skill: string; values: string[] }[] = [
  { skill: 'Analytical Thinking', values: ['Tinggi', 'Tinggi', 'Tinggi'] },
  { skill: 'Creative Thinking', values: ['Tinggi', 'Tinggi', 'Tinggi'] },
  { skill: 'Problem Solving & Decision Making', values: ['Sedang', 'Tinggi', 'Tinggi'] },
  { skill: 'Communication', values: ['Tinggi', 'Tinggi', 'Tinggi'] },
  { skill: 'Leadership & Social Influence', values: ['Sedang', 'Tinggi', 'Tinggi'] },
  { skill: 'Negotiation', values: ['Emerging', 'Tinggi', 'Tinggi'] },
  { skill: 'Change Management', values: ['Sedang', 'Tinggi', 'Tinggi'] },
  { skill: 'Resilience & Adaptability', values: ['Tinggi', 'Tinggi', 'Tinggi'] },
  { skill: 'Public Speaking', values: ['Sedang', 'Sedang', 'Tinggi'] },
  { skill: 'Lifelong Learning & Curiosity', values: ['Tinggi', 'Tinggi', 'Sedang'] },
]

export const TOP_HARD_SKILLS: { rank: number; name: string; desc: string }[] = [
  { rank: 1, name: 'AI & Machine Learning', desc: 'Skill teknologi No.1 dunia (WEF). Permintaan talenta AI Indonesia +148% (2023–2025). Generative & Agentic AI mendorong produktivitas lintas sektor.' },
  { rank: 2, name: 'Big Data & Analytics', desc: 'Fondasi semua inisiatif digital & AI. Indonesia butuh 9 juta talenta digital hingga 2030.' },
  { rank: 3, name: 'Cyber Security', desc: '~3.300 serangan siber/minggu (tertinggi ASEAN); kekurangan ~100.000 ahli; pasar tumbuh ~24% CAGR.' },
  { rank: 4, name: 'Cloud Computing', desc: 'Investasi cloud region & pusat data besar; fondasi skala digital dan penerapan AI.' },
  { rank: 5, name: 'IoT & Automation / RPA', desc: 'Kunci Industri 4.0: predictive maintenance, digital twin, otomasi proses (manufaktur & energi).' },
]

export const TOP_SOFT_SKILLS: { rank: number; name: string; desc: string }[] = [
  { rank: 1, name: 'Analytical Thinking', desc: 'Soft skill inti No.1 versi WEF Future of Jobs 2025 — dinilai paling esensial oleh mayoritas pemberi kerja.' },
  { rank: 2, name: 'Creative Thinking', desc: 'Skill yang paling cepat naik nilainya; kunci inovasi di era otomasi & AI.' },
  { rank: 3, name: 'Resilience & Adaptability', desc: 'Ketangguhan menghadapi perubahan cepat; salah satu skill inti paling dicari menuju 2030.' },
  { rank: 4, name: 'Leadership & Social Influence', desc: 'Krusial bagi Manager & Executive untuk memimpin transformasi dan tim.' },
  { rank: 5, name: 'Curiosity & Lifelong Learning', desc: '39% skill berubah pada 2030 — kemampuan belajar berkelanjutan jadi meta-skill wajib.' },
]

export const INDUSTRY_COMBO_RECOMMENDATIONS: { cluster: string; hardSkill: string; softSkill: string; useCase: string }[] = [
  { cluster: 'Banking & Finance', hardSkill: 'AI/ML, Big Data, Cyber Security', softSkill: 'Analytical Thinking, Decision Making', useCase: 'Fraud detection, credit scoring, kepatuhan' },
  { cluster: 'Healthcare & Education', hardSkill: 'AI, Big Data, Immersive Tech', softSkill: 'Communication, Creative Thinking', useCase: 'Telemedicine, adaptive & VR learning' },
  { cluster: 'Manufacturing, Mining & Energy', hardSkill: 'IoT, Automation/RPA, Big Data', softSkill: 'Problem Solving, Adaptability', useCase: 'Industri 4.0, predictive maintenance, HSE' },
  { cluster: 'Technology, Retail & FMCG', hardSkill: 'AI, Cloud, Data Analytics', softSkill: 'Creative Thinking, Agility', useCase: 'Personalisasi, forecasting, supply chain' },
]

export const APPLICATION_STEPS: { no: number; stage: string; activity: string }[] = [
  { no: 1, stage: 'Skill Mapping', activity: 'Petakan posisi di 4 dimensi' },
  { no: 2, stage: 'Gap Analysis', activity: 'Bandingkan level kini vs target' },
  { no: 3, stage: 'Curriculum Design', activity: 'Pilih sel cube prioritas' },
  { no: 4, stage: 'Delivery', activity: 'Blended: e-learning, workshop, proyek' },
  { no: 5, stage: 'Assessment', activity: 'Ukur kenaikan proficiency & sertifikasi' },
  { no: 6, stage: 'Impact', activity: 'Evaluasi produktivitas & employability' },
]

export const SUCCESS_METRICS: { dimension: string; indicators: string }[] = [
  { dimension: 'Produktivitas', indicators: 'Waktu tugas ↓, error ↓, output/pekerja ↑, adopsi tools' },
  { dimension: 'Employability', indicators: 'Kenaikan level, sertifikasi, promosi & mobilitas karier' },
  { dimension: 'Organisasi', indicators: 'Efisiensi biaya, kecepatan transformasi, retensi talenta' },
]
