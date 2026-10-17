import { z } from 'zod'

export const CONTACT_TOPICS = ['Keanggotaan', 'Kemitraan', 'Program', 'Media & Publikasi', 'Acara', 'Umum'] as const

export const kontakSchema = z.object({
  nama: z.string().trim().min(2, 'Nama minimal 2 karakter').max(120),
  email: z.string().trim().email('Email tidak valid').max(160),
  topik: z.enum(CONTACT_TOPICS, { error: 'Pilih topik' }),
  subjek: z.string().trim().min(3, 'Subjek wajib diisi').max(160),
  pesan: z.string().trim().min(10, 'Pesan minimal 10 karakter').max(2000, 'Maksimal 2.000 karakter'),
  persetujuan: z.literal(true, { error: 'Anda harus menyetujui kebijakan privasi' }),
})

export type KontakInput = z.infer<typeof kontakSchema>
