import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { IconMapPin, IconClock } from '@tabler/icons-react'
import { LAUNCH } from '@/lib/constants/launch'

export default function EventList() {
  const t = useTranslations('EventList')
  const tl = useTranslations('Launch')
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-widest mb-5"
          style={{ color: 'var(--inopi-sage-strong)' }}
        >
          {t('eyebrow')}
        </p>

        <div
          className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-[12px] p-5 border"
          style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
        >
          {/* Tanggal */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-[12px] flex flex-col items-center justify-center"
            style={{ background: 'var(--inopi-espresso)' }}
          >
            <span className="font-display font-bold text-[22px] leading-none" style={{ color: 'var(--inopi-ivory)' }}>
              {t('day')}
            </span>
            <span
              className="font-body text-[10px] uppercase tracking-wider mt-0.5"
              style={{ color: 'var(--inopi-gold)' }}
            >
              {t('month')}
            </span>
          </div>

          {/* Konten */}
          <div className="flex-1 min-w-0">
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-wider mb-1"
              style={{ color: 'var(--inopi-orange-strong)' }}
            >
              {tl('eyebrow')}
            </p>
            <h3 className="font-display font-semibold text-[15px] leading-snug" style={{ color: 'var(--inopi-espresso)' }}>
              {tl('title')}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
              <span className="inline-flex items-center gap-1 font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                <IconClock size={13} style={{ color: 'var(--inopi-sage-strong)' }} />
                {tl('timeLabel')}
              </span>
              <span className="inline-flex items-center gap-1 font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>
                <IconMapPin size={13} style={{ color: 'var(--inopi-sage-strong)' }} />
                {tl('venue')}, {tl('venueDetail')}
              </span>
            </div>
          </div>

          {/* Aksi */}
          <Link
            href={LAUNCH.href}
            className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 text-[13px] font-semibold rounded-[8px] border transition-all hover:bg-[var(--inopi-sand)]"
            style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-espresso)' }}
          >
            {t('details')}
          </Link>
        </div>
      </div>
    </section>
  )
}
