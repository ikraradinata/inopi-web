// Pemeriksaan berkas bukti transfer di server (sebelum diteruskan ke Drive).

import { PROOF_ALLOWED_TYPES, type ProofMime } from './config'

/** Tipe berkas dari ISI (magic bytes), bukan dari ekstensi atau header klien. */
export function sniffProofType(bytes: Uint8Array): ProofMime | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  if (bytes.length >= 8 && png.every((b, i) => bytes[i] === b)) return 'image/png'
  const pdf = [0x25, 0x50, 0x44, 0x46, 0x2d] // %PDF-
  if (bytes.length >= 5 && pdf.every((b, i) => bytes[i] === b)) return 'application/pdf'
  return null
}

export const isAllowedProofType = (mime: string): mime is ProofMime => (PROOF_ALLOWED_TYPES as readonly string[]).includes(mime)
