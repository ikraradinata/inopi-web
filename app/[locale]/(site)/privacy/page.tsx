import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: { absolute: 'Kebijakan Privasi — INOPI' },
  description: 'Cara INOPI mengumpulkan, menggunakan, dan melindungi data pribadi pengguna website.',
}

// DRAF dari docs/02_KONTEN_BARU_P0.md bagian L, disusun mengikuti prinsip UU
// No. 27 Tahun 2022 (PDP). Wajib ditinjau pengurus/penasihat hukum sebelum
// tayang. Tanggal berlaku dan periode penyimpanan data belum diputuskan,
// sehingga belum dicantumkan.
type Section = { title: string; body?: string; intro?: string; items?: string[]; outro?: string }

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  const sections = t.raw('sections') as Section[]
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display font-semibold text-[17px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                {s.title}
              </h2>
              <div className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {s.body && <p>{s.body}</p>}
                {s.intro && <p className="mb-3">{s.intro}</p>}
                {s.items && (
                  <ul className={`list-disc pl-5 space-y-1.5${s.outro ? ' mb-3' : ''}`}>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.outro && <p>{s.outro}</p>}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
