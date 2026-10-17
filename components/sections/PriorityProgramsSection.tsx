import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

type PriorityStatus = 'live' | 'planned' | 'open'

// Lencana: teks espresso di atas gold/sand, teks putih hanya di atas teal-strong.
const statusStyle: Record<PriorityStatus, { background: string; color: string }> = {
  live: { background: 'var(--inopi-teal-strong)', color: '#fff' },
  planned: { background: 'var(--inopi-sand)', color: 'var(--inopi-espresso)' },
  open: { background: 'var(--inopi-gold)', color: 'var(--inopi-espresso)' },
}

export default function PriorityProgramsSection({
  showAllLink = true,
  children,
}: {
  showAllLink?: boolean
  /** Ditampilkan di bawah judul, mis. definisi label status. */
  children?: React.ReactNode
}) {
  const t = useTranslations('PriorityPrograms')
  const items = t.raw('items') as { title: string; desc: string; status: PriorityStatus }[]
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--inopi-teal-strong)' }}
        >
          {t('eyebrow')}
        </p>
        <h2
          className="font-display font-bold mb-4"
          style={{ fontSize: 'clamp(22px,3.2vw,30px)', color: 'var(--inopi-espresso)' }}
        >
          {t('title')}
        </h2>
        <div className="mb-8">{children}</div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <li
              key={i}
              className="rounded-[12px] p-5 border flex flex-col"
              style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
            >
              <span className="font-display font-bold text-[28px] leading-none mb-3" style={{ color: 'var(--inopi-orange)' }}>
                {i + 1}
              </span>
              <h3 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                {p.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {p.desc}
              </p>
              <span
                className="self-start text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={statusStyle[p.status]}
              >
                {t(`status.${p.status}`)}
              </span>
            </li>
          ))}
        </ol>

        {showAllLink && (
          <div className="mt-8">
            <Link
              href="/program"
              className="font-body text-[14px] font-semibold underline underline-offset-4 hover:text-[var(--inopi-teal-strong)] transition-colors"
              style={{ color: 'var(--inopi-espresso)' }}
            >
              {t('all')}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
