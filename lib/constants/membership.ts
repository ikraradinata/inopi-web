// Harga & manfaat keanggotaan INOPI.
// Sumber: Minutes of Meeting tim inti — usulan harga 2 Oktober 2026
// dan matriks manfaat membership pada materi Update Founder.
//
// Teks (nama, deskripsi, harga tertulis, label manfaat) ada di messages,
// namespace "Membership". Di sini hanya angka dan pemetaan yang tidak diterjemahkan.

export type Tier = 'student' | 'professional' | 'corporate'

export interface PlanMeta {
  id: Tier
  /** Iuran per tahun dalam rupiah. */
  amount: number
  featured?: boolean
}

export const PLAN_META: PlanMeta[] = [
  { id: 'student', amount: 250_000 },
  { id: 'professional', amount: 500_000, featured: true },
  { id: 'corporate', amount: 5_000_000 },
]

export const getPlanMeta = (id: string) => PLAN_META.find((p) => p.id === id)

/**
 * Kategori yang memperoleh tiap manfaat. Urutannya sama dengan daftar
 * "Membership.benefits" di messages.
 */
export const BENEFIT_TIERS: Tier[][] = [
  ['student', 'professional', 'corporate'], // Quarterly event onsite Jakarta
  ['student', 'professional', 'corporate'], // Molen
  ['student', 'professional', 'corporate'], // NEXT EDU
  ['student', 'professional', 'corporate'], // Special price for training
  ['student', 'professional', 'corporate'], // Special price for assessment
  ['professional', 'corporate'], // Network opportunity
  ['corporate'], // Special price for EdTech services
  ['corporate'], // EdTech lab consultation
  ['corporate'], // Annual industry outlook
  ['student'], // Career opportunity
  ['student', 'corporate'], // Study experience
]
