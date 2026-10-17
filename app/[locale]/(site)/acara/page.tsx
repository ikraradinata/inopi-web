import type { Metadata } from 'next'
import Link from 'next/link'
import { IconCalendarEvent, IconClock, IconMapPin } from '@tabler/icons-react'
import { LAUNCH } from '@/lib/constants/launch'

export const metadata: Metadata = {
  title: { absolute: 'Acara — INOPI' },
  description: 'Forum, seminar, dan pelatihan INOPI, termasuk INOPI Launching & Conference 26 Oktober 2026.',
}

const routineEvents = [
  { title: 'Molen', desc: 'Acara pembelajaran daring nasional setiap bulan.' },
  { title: 'NEXT EDU', desc: 'Pertemuan tahunan anggota dan mitra.' },
  { title: 'Acara onsite kuartalan', desc: 'Pertemuan anggota di Jakarta setiap tiga bulan.' },
]

const eyebrow = 'font-body text-[11px] font-semibold uppercase tracking-widest mb-4'

export default function AcaraPage() {
  return (
    <div className="py-14">
      <div className="container max-w-4xl">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(24px,4vw,36px)', color: 'var(--inopi-espresso)' }}>
          Acara INOPI
        </h1>
        <p className="font-body text-[14px] mb-10 max-w-2xl" style={{ color: 'var(--inopi-taupe-strong)' }}>
          Forum, seminar, dan pelatihan untuk mempertemukan ekosistem inovasi pembelajaran Indonesia.
        </p>

        {/* Acara mendatang */}
        <p className={eyebrow} style={{ color: 'var(--inopi-teal-strong)' }}>
          Acara Mendatang
        </p>
        <div
          className="rounded-[16px] p-6 border flex flex-col sm:flex-row sm:items-center gap-5 mb-12"
          style={{ borderColor: 'var(--inopi-sand)', background: 'var(--inopi-ivory)' }}
        >
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-[20px] leading-snug mb-3" style={{ color: 'var(--inopi-espresso)' }}>
              {LAUNCH.eyebrow}
            </h2>
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
                {LAUNCH.venue}, {LAUNCH.venueDetail}, Jakarta
              </span>
            </div>
          </div>
          <Link
            href={LAUNCH.href}
            className="inline-flex items-center justify-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px"
            style={{ background: 'var(--inopi-espresso)' }}
          >
            Lihat Detail
          </Link>
        </div>

        {/* Acara rutin */}
        <p className={eyebrow} style={{ color: 'var(--inopi-teal-strong)' }}>
          Acara Rutin
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {routineEvents.map((e) => (
            <div key={e.title} className="rounded-[12px] p-5 border bg-white flex flex-col" style={{ borderColor: 'var(--inopi-sand)' }}>
              <h2 className="font-display font-semibold text-[15px] mb-2" style={{ color: 'var(--inopi-espresso)' }}>
                {e.title}
              </h2>
              <p className="font-body text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {e.desc}
              </p>
              <span
                className="self-start text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-espresso)' }}
              >
                Direncanakan
              </span>
            </div>
          ))}
        </div>
        {/* Arsip Acara disembunyikan sampai ada acara yang selesai. */}
      </div>
    </div>
  )
}
