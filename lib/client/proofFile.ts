// Persiapan berkas bukti transfer di browser: validasi dasar dan kompresi gambar.
// Pemeriksaan sebenarnya (tipe dari isi berkas) tetap dilakukan di server.

import { MAX_PROOF_BYTES } from '@/lib/membership/config'

export type ProofErrorKey = 'type' | 'size' | 'read'

export class ProofFileError extends Error {
  constructor(public key: ProofErrorKey) {
    super(key)
  }
}

const MAX_SIDE = 1600

function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') return createImageBitmap(file)
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob'))), 'image/jpeg', quality),
  )
}

/** Mengecilkan foto (maks. 1600 px, JPEG) agar jauh di bawah batas ukuran. PDF dibiarkan. */
export async function prepareProofFile(file: File): Promise<File> {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
  const isPdf = file.type === 'application/pdf'
  if (!isImage && !isPdf) throw new ProofFileError('type')

  if (isPdf) {
    if (file.size > MAX_PROOF_BYTES) throw new ProofFileError('size')
    return file
  }

  let bitmap: ImageBitmap | HTMLImageElement
  try {
    bitmap = await loadBitmap(file)
  } catch {
    throw new ProofFileError('read')
  }

  const w = 'naturalWidth' in bitmap ? bitmap.naturalWidth : bitmap.width
  const h = 'naturalHeight' in bitmap ? bitmap.naturalHeight : bitmap.height
  const scale = Math.min(1, MAX_SIDE / Math.max(w, h))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(w * scale))
  canvas.height = Math.max(1, Math.round(h * scale))
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new ProofFileError('read')
  ctx.fillStyle = '#fff' // PNG transparan menjadi latar putih
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

  let blob = await toBlob(canvas, 0.82)
  if (blob.size > MAX_PROOF_BYTES) blob = await toBlob(canvas, 0.6)
  if (blob.size > MAX_PROOF_BYTES) throw new ProofFileError('size')

  const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
  return new File([blob], name, { type: 'image/jpeg' })
}
