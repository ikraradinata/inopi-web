import type { Metadata } from 'next'
import { pageAlternates } from '@/lib/i18n/seo'
import { Link } from '@/i18n/navigation'
import type { AppPathname } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta.about' })
  return {
    alternates: pageAlternates(locale, '/tentang'), title: { absolute: t('title') }, description: t('description') }
}

const subPages: { href: AppPathname }[] = [
  { href: '/tentang/sejarah' },
  { href: '/tentang/visi-misi' },
  { href: '/tentang/struktur-organisasi' },
  { href: '/tentang/founders' },
]

export default async function TentangPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'About' })
  const pages = t.raw('subPages') as { title: string; desc: string }[]
  const logo = t.raw('logo.items') as { title: string; desc: string }[]
  return (
    <div className="py-14">
      <div className="container max-w-3xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          {t('title')}
        </h1>
        <p className="font-body text-[14px] leading-relaxed mb-10" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {t('intro')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subPages.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-[12px] p-5 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover block"
              style={{ borderColor: 'var(--inopi-sand)' }}
            >
              <h2 className="font-display font-semibold text-[15px] mb-1.5" style={{ color: 'var(--inopi-espresso)' }}>
                {pages[i].title}
              </h2>
              <p className="font-body text-[13px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{pages[i].desc}</p>
              <span className="font-body text-[13px] mt-3 block" style={{ color: 'var(--inopi-teal-strong)' }}>{t('more')}</span>
            </Link>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="font-display font-bold text-[22px] mb-3" style={{ color: 'var(--inopi-espresso)' }}>
            {t('logo.title')}
          </h2>
          <p className="font-body text-[14px] leading-relaxed mb-6" style={{ color: 'var(--inopi-taupe-strong)' }}>
            {t('logo.intro')}
          </p>
          <dl className="space-y-4">
            {logo.map((m) => (
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
