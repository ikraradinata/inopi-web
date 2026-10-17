import { z } from 'zod'

export const INTEREST_AREAS = [
  'Riset & Inovasi',
  'Implementasi & Pilot Project',
  'Kemitraan',
  'Pelatihan & Sertifikasi',
  'Kebijakan Pendidikan',
] as const

// Data diri (langkah 2). Dipakai bersama oleh formulir dan route handler.
// Pesan error adalah kunci di messages, namespace "Validation".
export const keanggotaanDetailsSchema = z.object({
  nama: z.string().trim().min(2, 'nameMin').max(120),
  email: z.string().trim().email('emailInvalid').max(160),
  hp: z
    .string()
    .trim()
    .max(32, 'phoneTooLong')
    .refine((v) => v.replace(/\D/g, '').length >= 8, 'phoneInvalid'),
  institusi: z.string().trim().min(2, 'institutionRequired').max(160),
  jabatan: z.string().trim().max(120).optional(),
  bidang: z.array(z.enum(INTEREST_AREAS)).optional(),
  alasan: z.string().trim().max(1000, 'max1000').optional(),
})

export const keanggotaanSchema = keanggotaanDetailsSchema.extend({
  category: z.enum(['student', 'professional', 'corporate']),
  persetujuan: z.literal(true, { error: 'privacyRequired' }),
  infoKegiatan: z.boolean().optional(),
})

export type KeanggotaanDetails = z.infer<typeof keanggotaanDetailsSchema>
