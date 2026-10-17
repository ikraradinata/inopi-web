import idMessages from '@/messages/id.json'
import { getPlanMeta } from '@/lib/constants/membership'

/**
 * Data kategori dengan teks Bahasa Indonesia, untuk sisi server yang tidak
 * bergantung pada bahasa pengunjung (mis. email notifikasi ke pengurus).
 */
export function getPlan(id: string) {
  const meta = getPlanMeta(id)
  if (!meta) return undefined
  const text = (idMessages.Membership.plans as Record<string, { name: string; desc: string; price: string; note?: string }>)[id]
  return { ...meta, ...text }
}
