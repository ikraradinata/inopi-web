import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Berita & Artikel',
  description: 'Berita terkini dan artikel opini seputar inovasi pembelajaran Indonesia.',
}

const categoryColors: Record<string, string> = {
  'Berita INOPI': 'var(--inopi-teal-strong)',
  'Artikel Opini': 'var(--inopi-teal)',
  'Research Digest': 'var(--inopi-espresso)',
  'Press Release': 'var(--inopi-taupe-strong)',
}

export default async function BeritaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Berita' })
  const articles = t.raw('articles') as { category: string; title: string; date: string; excerpt: string }[]
  return (
    <div className="py-14">
      <div className="container">
        <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] mb-10" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <div key={i} className="bg-white rounded-[12px] border overflow-hidden hover:border-[var(--inopi-teal-strong)] hover:shadow-hover transition-all" style={{ borderColor: 'var(--inopi-sand)' }}>
              {/* Image placeholder */}
              <div className="h-36" style={{ background: 'var(--inopi-sand)' }} />
              <div className="p-4">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full mb-2 text-white"
                  style={{ background: categoryColors[a.category] ?? 'var(--inopi-taupe-strong)' }}
                >
                  {t(`categories.${a.category}`)}
                </span>
                <h2 className="font-display font-semibold text-[14px] leading-snug mb-2 line-clamp-2" style={{ color: 'var(--inopi-espresso)' }}>
                  {a.title}
                </h2>
                <p className="font-body text-[12px] leading-relaxed line-clamp-3 mb-3" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {a.excerpt}
                </p>
                <p className="font-body text-[11px]" style={{ color: 'var(--inopi-sage-strong)' }}>{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
