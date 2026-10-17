import { Link } from '@/i18n/navigation'
import { IconCheck } from '@tabler/icons-react'

import type { AppPathname } from '@/i18n/routing'

interface ThankYouProps {
  title: string
  text: string
  actions: { label: string; href: AppPathname }[]
  children?: React.ReactNode
}

/** Halaman sukses formulir (docs/02_KONTEN_BARU_P0.md, bagian I). */
export default function ThankYou({ title, text, actions, children }: ThankYouProps) {
  return (
    <div className="py-20">
      <div className="container max-w-xl text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'var(--inopi-sand)' }}
        >
          <IconCheck size={24} style={{ color: 'var(--inopi-teal-strong)' }} />
        </div>
        <h1
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(22px,3.5vw,30px)', color: 'var(--inopi-espresso)' }}
        >
          {title}
        </h1>
        <p className="font-body text-[14px] mb-8" style={{ color: 'var(--inopi-taupe-strong)' }}>
          {text}
        </p>
        {children}
        <div className="flex flex-wrap gap-3 justify-center">
          {actions.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              className={
                i === 0
                  ? 'inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px'
                  : 'inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)]'
              }
              style={
                i === 0
                  ? { background: 'var(--inopi-espresso)' }
                  : { color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-taupe-strong)' }
              }
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
