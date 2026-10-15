// Harga & manfaat keanggotaan INOPI.
// Sumber: Minutes of Meeting tim inti — usulan harga 2 Oktober 2026
// dan matriks manfaat membership pada materi Update Founder.

export type Tier = 'student' | 'professional' | 'corporate'

export interface Plan {
  id: Tier
  name: string
  desc: string
  price: string
  note?: string
  featured?: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'student',
    name: 'Student',
    desc: 'Untuk mahasiswa dan pelajar.',
    price: 'Rp 250.000',
  },
  {
    id: 'professional',
    name: 'Profesional',
    desc: 'Untuk dosen, praktisi, dan profesional.',
    price: 'Rp 500.000',
    featured: true,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    desc: 'Untuk perusahaan dan institusi.',
    price: 'Rp 5.000.000',
    note: 'Kuota 3 orang',
  },
]

export interface Benefit {
  label: string
  /** Kategori yang memperoleh manfaat ini. */
  tiers: Tier[]
}

export const BENEFITS: Benefit[] = [
  { label: 'Quarterly event onsite Jakarta', tiers: ['student', 'professional', 'corporate'] },
  { label: 'Monthly online learning event nasional (Molen)', tiers: ['student', 'professional', 'corporate'] },
  { label: 'Annual gathering / summit (NEXT EDU)', tiers: ['student', 'professional', 'corporate'] },
  { label: 'Special price for training', tiers: ['student', 'professional', 'corporate'] },
  { label: 'Special price for assessment', tiers: ['student', 'professional', 'corporate'] },
  { label: 'Network opportunity', tiers: ['professional', 'corporate'] },
  { label: 'Special price for EdTech services dari sesama anggota', tiers: ['corporate'] },
  { label: 'EdTech lab consultation (by PPOTD)', tiers: ['corporate'] },
  { label: 'Annual industry outlook', tiers: ['corporate'] },
  { label: 'Career opportunity', tiers: ['student'] },
  { label: 'Study experience', tiers: ['student', 'corporate'] },
]

/** Total nilai manfaat menurut perhitungan tim inti. */
export const TOTAL_BENEFIT_VALUE = 'Rp 11.600.000'
