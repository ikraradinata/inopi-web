import { z } from 'zod'
import { isCountryCode } from '@/lib/membership/countries'

// Skema bersama formulir (browser) dan route (server). Pesan galat berupa kunci di
// messages, namespace "Validation".

export const registrantSchema = z.object({
  nama: z.string().trim().min(2, 'nameMin').max(120),
  email: z.string().trim().email('emailInvalid').max(160),
  hp: z
    .string()
    .trim()
    .max(32, 'phoneTooLong')
    .refine((v) => v.replace(/\D/g, '').length >= 8, 'phoneInvalid'),
  pekerjaan: z.string().trim().min(2, 'occupationRequired').max(120),
  jabatan: z.string().trim().max(120).optional(),
  institusi: z.string().trim().min(2, 'institutionRequired').max(160),
  negara: z.string().refine((v): boolean => isCountryCode(v), 'countryRequired'),
})

export type RegistrantInput = z.infer<typeof registrantSchema>

export const categoryPickSchema = z.enum(['student', 'professional', 'corporate'])

/** Isi permintaan pendaftaran ke server. */
export const submitSchema = registrantSchema.extend({
  category: z.enum(['student', 'professional']),
  reservationToken: z.string().regex(/^[0-9a-f]{64}$/),
  uploadToken: z.string().regex(/^[0-9a-f]{64}$/),
  persetujuan: z.literal(true, { error: 'privacyRequired' }),
  locale: z.enum(['id', 'en']).default('id'),
})
