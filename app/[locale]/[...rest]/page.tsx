import { notFound } from 'next/navigation'

// Menangkap semua alamat yang tidak dikenal agar halaman 404 kustom
// ([locale]/not-found.tsx) tampil dengan layout dan bahasa yang benar.
export default function CatchAllPage() {
  notFound()
}
