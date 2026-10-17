import { z } from 'zod'

export const CONTACT_TOPICS = ['Keanggotaan', 'Kemitraan', 'Program', 'Media & Publikasi', 'Acara', 'Umum'] as const

export const kontakSchema = z.object({
  nama: z.string().trim().min(2, 'nameMin').max(120),
  email: z.string().trim().email('emailInvalid').max(160),
  topik: z.enum(CONTACT_TOPICS, { error: 'topicRequired' }),
  subjek: z.string().trim().min(3, 'subjectRequired').max(160),
  pesan: z.string().trim().min(10, 'messageMin').max(2000, 'max2000'),
  persetujuan: z.literal(true, { error: 'privacyRequired' }),
})

export type KontakInput = z.infer<typeof kontakSchema>
