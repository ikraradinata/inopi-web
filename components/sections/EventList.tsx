import { IconMapPin } from '@tabler/icons-react'

const events = [
  {
    day: '15',
    month: 'Okt',
    year: '2024',
    title: 'National Learning Innovation Forum (NLIF)',
    venue: 'Jakarta Convention Center',
    location: 'Jakarta',
    href: '#',
  },
  {
    day: '22',
    month: 'Okt',
    year: '2024',
    title: 'EduTech Asia Roadshow: Indonesia Chapter',
    venue: 'Bandung Institute of Technology',
    location: 'Bandung',
    href: '#',
  },
]

export default function EventList() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-widest mb-5"
          style={{ color: 'var(--inopi-sage-strong)' }}
        >
          Agenda & Forum Nasional
        </p>

        <div className="divide-y" style={{ borderColor: 'var(--inopi-sand)' }}>
          {events.map((e) => (
            <div key={e.title} className="flex items-center gap-5 py-5">
              {/* Date circle */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center"
                style={{ background: 'var(--inopi-sand)' }}
              >
                <span className="font-display font-bold text-[18px] leading-none" style={{ color: 'var(--inopi-espresso)' }}>
                  {e.day}
                </span>
                <span className="font-body text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--inopi-teal-strong)' }}>
                  {e.month}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-[14px] truncate" style={{ color: 'var(--inopi-espresso)' }}>
                  {e.title}
                </h3>
                <p className="font-body text-[12px] mt-0.5" style={{ color: 'var(--inopi-taupe-strong)' }}>
                  {e.venue}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden sm:flex items-center gap-1">
                  <IconMapPin size={13} style={{ color: 'var(--inopi-sage-strong)' }} />
                  <span className="font-body text-[12px]" style={{ color: 'var(--inopi-taupe-strong)' }}>{e.location}</span>
                </div>
                <a
                  href={e.href}
                  className="px-3 py-1.5 text-[12px] font-medium rounded-[8px] border transition-all hover:bg-[var(--inopi-sand)]"
                  style={{ color: 'var(--inopi-teal-strong)', borderColor: 'var(--inopi-teal-strong)' }}
                >
                  Daftar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
