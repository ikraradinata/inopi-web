import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: { absolute: 'Tata Kelola & Informasi Legal — INOPI' },
  description:
    'Identitas badan hukum, struktur tata kelola, dan akuntabilitas Perkumpulan Asosiasi Inovasi Pembelajaran Indonesia.',
}

// Baris dengan data yang belum diputuskan pengurus (nomor SK pengesahan, NPWP,
// alamat kedudukan) sengaja belum ditampilkan. Tambahkan di messages setelah ada keputusan.

const h2 = 'font-display font-bold text-[20px] mb-5'

export default async function TataKelolaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'TataKelola' })
  const identity = t.raw('identity') as { label: string; value: string }[]
  const governance = t.raw('governance') as { title: string; desc: string }[]
  const underline = (href: string) =>
    function Anchor(chunks: React.ReactNode) {
      return (
        <Link href={href} className="underline" style={{ color: 'var(--inopi-teal-strong)' }}>
          {chunks}
        </Link>
      )
    }
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] leading-relaxed mb-10" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>

        <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>{t('identityTitle')}</h2>
        <dl className="rounded-[12px] border bg-white mb-12 overflow-hidden" style={{ borderColor: 'var(--inopi-sand)' }}>
          {identity.map(({ label: k, value: v }, i) => (
            <div
              key={k}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 px-5 py-3.5"
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--inopi-sand)' }}
            >
              <dt className="font-body text-[13px] font-medium" style={{ color: 'var(--inopi-taupe-strong)' }}>{k}</dt>
              <dd className="font-body text-[14px]" style={{ color: 'var(--inopi-espresso)' }}>{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>{t('governanceTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {governance.map((g) => (
            <div key={g.title} className="rounded-[12px] p-5" style={{ background: 'var(--inopi-sand)' }}>
              <h3 className="font-display font-semibold text-[15px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>{g.title}</h3>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--inopi-espresso)' }}>{g.desc}</p>
            </div>
          ))}
        </div>
        <p className="font-body text-[13px] mb-12" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t.rich('names', { link: underline('/tentang/struktur-organisasi') })}
        </p>

        <h2 className={h2} style={{ color: 'var(--inopi-espresso)' }}>{t('accountabilityTitle')}</h2>
        <ul className="list-disc pl-5 space-y-2 font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
          <li>{t('reports')}</li>
          <li>{t.rich('questions', { link: underline('/kontak') })}</li>
        </ul>
      </div>
    </div>
  )
}
