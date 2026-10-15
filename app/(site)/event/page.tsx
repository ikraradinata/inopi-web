import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { IconCalendarEvent, IconClock, IconMapPin } from '@tabler/icons-react'
import { LAUNCH } from '@/lib/constants/launch'

export const metadata: Metadata = {
  title: 'Event & Kegiatan',
  description: `Kalender kegiatan INOPI. Agenda terdekat: ${LAUNCH.eyebrow}, ${LAUNCH.dateLabel} di ${LAUNCH.venue}.`,
}

export default function EventPage() {
  return (
    <div className="py-14">
      <div className="container max-w-4xl">
        <p className="inopi-eyebrow mb-3">Agenda INOPI</p>
        <h1
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}
        >
          Event & Kegiatan
        </h1>
        <p className="font-body text-[14px] mb-10 max-w-2xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Forum, konferensi, dan kegiatan kolaboratif INOPI bersama akademisi, industri, dan pemerintah.
        </p>

        {/* Agenda terdekat */}
        <p className="inopi-eyebrow mb-4">Agenda Terdekat</p>
        <Link
          href={LAUNCH.href}
          className="group flex flex-col sm:flex-row gap-6 rounded-[16px] p-6 border transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover"
          style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
        >
          <Image
            src={LAUNCH.poster}
            alt={`Poster ${LAUNCH.eyebrow}`}
            width={1092}
            height={1440}
            className="w-full sm:w-[180px] h-auto flex-shrink-0 rounded-[10px]"
          />
          <div className="flex-1 min-w-0">
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--inopi-orange-strong)' }}
            >
              {LAUNCH.eyebrow}
            </p>
            <h2
              className="font-display font-bold text-[20px] leading-snug mb-2"
              style={{ color: 'var(--inopi-espresso)' }}
            >
              {LAUNCH.title}
            </h2>
            <p className="font-body text-[13px] leading-relaxed mb-4" style={{ color: 'var(--inopi-taupe-strong)' }}>
              {LAUNCH.tagline} — {LAUNCH.positioning}.
            </p>

            <div className="flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                <IconCalendarEvent size={14} style={{ color: 'var(--inopi-orange)' }} />
                {LAUNCH.dateLabel}
              </span>
              <span className="inline-flex items-center gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                <IconClock size={14} style={{ color: 'var(--inopi-orange)' }} />
                {LAUNCH.timeLabel}
              </span>
              <span className="inline-flex items-center gap-2 font-body text-[13px]" style={{ color: 'var(--inopi-espresso)' }}>
                <IconMapPin size={14} style={{ color: 'var(--inopi-orange)' }} />
                {LAUNCH.venue}, {LAUNCH.venueDetail}
              </span>
            </div>

            <span
              className="inline-block font-body text-[13px] font-semibold mt-4 transition-transform group-hover:translate-x-0.5"
              style={{ color: 'var(--inopi-teal-strong)' }}
            >
              Lihat detail acara →
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
