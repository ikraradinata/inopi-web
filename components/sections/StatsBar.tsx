'use client'

const stats = [
  { value: '26', label: 'Founders' },
  { value: '4', label: 'Divisi Utama' },
  { value: '5', label: 'Program Prioritas' },
  { value: '1', label: 'Visi Nasional' },
]

export default function StatsBar() {
  return (
    <section style={{ background: 'var(--inopi-ivory)' }} className="py-10">
      <div className="container">
        <div className="grid grid-cols-2 md:flex md:flex-row md:justify-center md:gap-12 gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center relative">
              <span
                className="font-display font-bold text-[32px] leading-none"
                style={{ color: 'var(--inopi-orange)' }}
              >
                {stat.value}
              </span>
              <span className="font-body text-[13px] mt-1" style={{ color: 'var(--inopi-taupe-strong)' }}>
                {stat.label}
              </span>
              {i < stats.length - 1 && (
                <div
                  className="hidden md:block absolute right-[-24px] top-1/2 -translate-y-1/2 w-px h-8"
                  style={{ background: 'var(--inopi-sand)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
