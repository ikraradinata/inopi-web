import { z } from 'zod'
import { COLLAB_MODELS, ORG_TYPES, START_TIMES, SUMMARY_MAX } from '@/lib/constants/kemitraan'

const modelValues = COLLAB_MODELS.map((m) => m.value) as [
  (typeof COLLAB_MODELS)[number]['value'],
  ...(typeof COLLAB_MODELS)[number]['value'][],
]

// Dipakai bersama oleh formulir (klien) dan route handler (server).
export const kemitraanSchema = z.object({
  nama: z.string().trim().min(2, 'Nama minimal 2 karakter').max(120),
  email: z.string().trim().email('Email tidak valid').max(160),
  telepon: z
    .string()
    .trim()
    .max(32, 'Nomor terlalu panjang')
    .refine((v) => v === '' || v.replace(/\D/g, '').length >= 8, 'Nomor telepon tidak valid')
    .optional(),
  organisasi: z.string().trim().min(2, 'Nama organisasi wajib diisi').max(160),
  jenisOrganisasi: z.enum(ORG_TYPES, { error: 'Pilih jenis organisasi' }),
  model: z.array(z.enum(modelValues)).min(1, 'Pilih minimal satu model kolaborasi'),
  ringkasan: z
    .string()
    .trim()
    .min(10, 'Ringkasan minimal 10 karakter')
    .max(SUMMARY_MAX, `Maksimal ${SUMMARY_MAX} karakter`),
  waktuMulai: z.union([z.enum(START_TIMES), z.literal('')]).optional(),
  persetujuan: z.literal(true, { error: 'Anda harus menyetujui kebijakan privasi' }),
})

export type KemitraanInput = z.infer<typeof kemitraanSchema>
