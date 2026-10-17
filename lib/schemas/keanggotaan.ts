import { z } from 'zod'

export const INTEREST_AREAS = [
  'Riset & Inovasi',
  'Implementasi & Pilot Project',
  'Kemitraan',
  'Pelatihan & Sertifikasi',
  'Kebijakan Pendidikan',
] as const

// Data diri (langkah 2). Dipakai bersama oleh formulir dan route handler.
export const keanggotaanDetailsSchema = z.object({
  nama: z.string().trim().min(2, 'Nama minimal 2 karakter').max(120),
  email: z.string().trim().email('Email tidak valid').max(160),
  hp: z
    .string()
    .trim()
    .max(32, 'Nomor terlalu panjang')
    .refine((v) => v.replace(/\D/g, '').length >= 8, 'Nomor WhatsApp tidak valid'),
  institusi: z.string().trim().min(2, 'Institusi wajib diisi').max(160),
  jabatan: z.string().trim().max(120).optional(),
  bidang: z.array(z.enum(INTEREST_AREAS)).optional(),
  alasan: z.string().trim().max(1000, 'Maksimal 1.000 karakter').optional(),
})

export const keanggotaanSchema = keanggotaanDetailsSchema.extend({
  category: z.enum(['student', 'professional', 'corporate']),
  persetujuan: z.literal(true, { error: 'Anda harus menyetujui kebijakan privasi' }),
  infoKegiatan: z.boolean().optional(),
})

export type KeanggotaanDetails = z.infer<typeof keanggotaanDetailsSchema>
