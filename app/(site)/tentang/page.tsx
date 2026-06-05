import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang INOPI',
  description: 'INOPI adalah asosiasi profesional yang mendorong inovasi pembelajaran Indonesia.',
}

const subPages = [
  { title: 'Sejarah & Latar Belakang', desc: 'Perjalanan INOPI dari gagasan kolaboratif.', href: '/tentang/sejarah' },
  { title: 'Visi & Misi', desc: 'Arah strategis dan nilai-nilai organisasi INOPI.', href: '/tentang/visi-misi' },
  { title: 'Struktur Organisasi', desc: 'Pengurus dan divisi-divisi INOPI.', href: '/tentang/struktur-organisasi' },
  { title: 'Para Pendiri', desc: '26 tokoh pendiri dari akademik dan industri.', href: '/tentang/founders' },
]

export default function TentangPage() {
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: '#071422' }}>
          Tentang INOPI
        </h1>
        <p className="font-body text-[14px] leading-relaxed mb-10" style={{ color: '#4a6070' }}>
          INOPI (Asosiasi Inovasi Pembelajaran Indonesia) adalah asosiasi profesional yang menghubungkan akademisi, industri, dan pemerintah dalam ekosistem inovasi pembelajaran nasional.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subPages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-[12px] p-5 border bg-white transition-all hover:border-[#0d9488] hover:shadow-hover block"
              style={{ borderColor: '#e0e8ef' }}
            >
              <h2 className="font-display font-semibold text-[15px] mb-1.5" style={{ color: '#071422' }}>
                {p.title}
              </h2>
              <p className="font-body text-[13px]" style={{ color: '#4a6070' }}>{p.desc}</p>
              <span className="font-body text-[13px] mt-3 block" style={{ color: '#0d9488' }}>Selengkapnya →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
