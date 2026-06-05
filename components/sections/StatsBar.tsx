'use client'

const stats = [
  { value: '26', label: 'Founders' },
  { value: '4', label: 'Divisi Utama' },
  { value: '5', label: 'Program Prioritas' },
  { value: '1', label: 'Visi Nasional' },
]

export default function StatsBar() {
  return (
    <section style={{ background: '#f7f9fb' }} className="py-10">
      <div className="container">
        <div className="grid grid-cols-2 md:flex md:flex-row md:justify-center md:gap-12 gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center relative">
              <span
                className="font-display font-bold text-[32px] leading-none"
                style={{ color: '#083344' }}
              >
                {stat.value}
              </span>
              <span className="font-body text-[13px] mt-1" style={{ color: '#4a6070' }}>
                {stat.label}
              </span>
              {i < stats.length - 1 && (
                <div
                  className="hidden md:block absolute right-[-24px] top-1/2 -translate-y-1/2 w-px h-8"
                  style={{ background: '#e0e8ef' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
