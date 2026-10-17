import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Halaman tidak ditemukan — INOPI' },
}

export default function NotFound() {
  return (
    <div className="py-24">
      <div className="container max-w-xl text-center">
        <p className="font-display font-bold text-[48px] leading-none mb-4" style={{ color: 'var(--inopi-orange)' }}>
          404
        </p>
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(22px,3.5vw,30px)', color: 'var(--inopi-espresso)' }}>
          Halaman tidak ditemukan
        </h1>
        <p className="font-body text-[14px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Halaman yang Anda cari mungkin sudah dipindahkan atau belum tersedia.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
            style={{ background: 'var(--inopi-espresso)' }}
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)]"
            style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-taupe-strong)' }}
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  )
}
