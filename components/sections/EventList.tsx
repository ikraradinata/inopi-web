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
          style={{ color: '#8fa5b5' }}
        >
          Agenda & Forum Nasional
        </p>

        <div className="divide-y" style={{ borderColor: '#e0e8ef' }}>
          {events.map((e) => (
            <div key={e.title} className="flex items-center gap-5 py-5">
              {/* Date circle */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center"
                style={{ background: '#e0f7f5' }}
              >
                <span className="font-display font-bold text-[18px] leading-none" style={{ color: '#083344' }}>
                  {e.day}
                </span>
                <span className="font-body text-[10px] uppercase tracking-wider mt-0.5" style={{ color: '#0d9488' }}>
                  {e.month}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-[14px] truncate" style={{ color: '#071422' }}>
                  {e.title}
                </h3>
                <p className="font-body text-[12px] mt-0.5" style={{ color: '#4a6070' }}>
                  {e.venue}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden sm:flex items-center gap-1">
                  <IconMapPin size={13} style={{ color: '#8fa5b5' }} />
                  <span className="font-body text-[12px]" style={{ color: '#4a6070' }}>{e.location}</span>
                </div>
                <a
                  href={e.href}
                  className="px-3 py-1.5 text-[12px] font-medium rounded-[8px] border transition-all hover:bg-[#e0f7f5]"
                  style={{ color: '#0d9488', borderColor: '#0d9488' }}
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
