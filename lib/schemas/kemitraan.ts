import { z } from 'zod'
import { COLLAB_MODELS, ORG_TYPES, START_TIMES, SUMMARY_MAX } from '@/lib/constants/kemitraan'

const modelValues = COLLAB_MODELS.map((m) => m.value) as [
  (typeof COLLAB_MODELS)[number]['value'],
  ...(typeof COLLAB_MODELS)[number]['value'][],
]

// Dipakai bersama oleh formulir (klien) dan route handler (server).
export const kemitraanSchema = z.object({
  nama: z.string().trim().min(2, 'nameMin').max(120),
  email: z.string().trim().email('emailInvalid').max(160),
  telepon: z
    .string()
    .trim()
    .max(32, 'phoneTooLong')
    .refine((v) => v === '' || v.replace(/\D/g, '').length >= 8, 'phoneInvalidTel')
    .optional(),
  organisasi: z.string().trim().min(2, 'orgRequired').max(160),
  jenisOrganisasi: z.enum(ORG_TYPES, { error: 'orgTypeRequired' }),
  model: z.array(z.enum(modelValues)).min(1, 'modelRequired'),
  ringkasan: z
    .string()
    .trim()
    .min(10, 'summaryMin')
    .max(SUMMARY_MAX, 'max1000plain'),
  waktuMulai: z.union([z.enum(START_TIMES), z.literal('')]).optional(),
  persetujuan: z.literal(true, { error: 'privacyRequired' }),
})

export type KemitraanInput = z.infer<typeof kemitraanSchema>
