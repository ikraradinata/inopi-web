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

const logoMeaning = [
  {
    title: 'Belah ketupat',
    desc: 'Melambangkan keseimbangan, ketelitian, dan integritas. Empat sisinya mewakili empat pilar pembelajaran yang saling menopang secara setara: pendidik, peserta didik, institusi, dan inovasi. Bentuknya juga menyerupai permata, simbol nilai keilmuan yang terus diasah.',
  },
  {
    title: 'Garis diagonal',
    desc: 'Menggambarkan aliran ide dan transformasi dari praktik konvensional menuju praktik inovatif, sekaligus menjadi jembatan antara teori dan praktik. Garis ini membentuk huruf "I" yang tersirat: Inovasi dan Indonesia.',
  },
  {
    title: 'Lingkaran kecil di puncak',
    desc: 'Melambangkan gagasan dan percikan ide. Posisinya di luar bentuk utama menandakan keterbukaan pada pemikiran baru. Lingkaran ini juga menyerupai kepala manusia: pembelajar sebagai pusat seluruh kegiatan asosiasi.',
  },
  {
    title: 'Warna netral',
    desc: 'Taupe dan cokelat hangat menyampaikan kebijaksanaan, kedalaman, stabilitas, dan keberlanjutan.',
  },
]

export default function TentangPage() {
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          Tentang INOPI
        </h1>
        <p className="font-body text-[14px] leading-relaxed mb-10" style={{ color: 'var(--inopi-taupe-strong)' }}>
          INOPI (Asosiasi Inovasi Pembelajaran Indonesia) adalah asosiasi profesional yang menghubungkan akademisi, industri, dan pemerintah dalam ekosistem inovasi pembelajaran nasional.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subPages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-[12px] p-5 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover block"
              style={{ borderColor: 'var(--inopi-sand)' }}
            >
              <h2 className="font-display font-semibold text-[15px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>
                {p.title}
              </h2>
              <p className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{p.desc}</p>
              <span className="font-body text-[13px] mt-3 block" style={{ color: 'var(--inopi-teal-strong)' }}>Selengkapnya →</span>
            </Link>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="font-display font-bold text-[22px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
            Makna Logo INOPI
          </h2>
          <p className="font-body text-[14px] leading-relaxed mb-6" style={{ color: 'var(--inopi-taupe-strong)' }}>
            Logo INOPI dirancang minimalis dengan bentuk geometris sederhana.
          </p>
          <dl className="space-y-4">
            {logoMeaning.map((m) => (
              <div key={m.title} className="rounded-[12px] p-5" style={{ background: 'var(--inopi-sand)' }}>
                <dt className="font-display font-semibold text-[15px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>
                  {m.title}
                </dt>
                <dd className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-espresso)' }}>
                  {m.desc}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}
