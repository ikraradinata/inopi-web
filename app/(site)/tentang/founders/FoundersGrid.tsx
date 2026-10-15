'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FOUNDERS, type Founder } from '@/lib/constants/founders'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const avatarColors = [
  ['var(--inopi-teal)', 'var(--inopi-espresso)'],
  ['var(--inopi-teal-strong)', 'var(--inopi-teal)'],
  ['var(--inopi-espresso)', 'var(--inopi-espresso)'],
]

export default function FoundersGrid() {
  const [selected, setSelected] = useState<Founder | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {FOUNDERS.map((f, i) => {
          const [from, to] = avatarColors[i % avatarColors.length]
          return (
            <button
              key={f.name}
              onClick={() => setSelected(f)}
              className="text-left rounded-[12px] p-4 border bg-white transition-all hover:border-[var(--inopi-teal-strong)] hover:shadow-hover hover:scale-[1.02]"
              style={{ borderColor: 'var(--inopi-sand)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display font-bold text-[16px] mb-3 mx-auto"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              >
                {f.initials || getInitials(f.name)}
              </div>
              <p className="font-body font-semibold text-[13px] text-center truncate" style={{ color: 'var(--inopi-espresso)' }}>
                {f.name}
              </p>
              <p className="font-body text-[12px] text-center mt-0.5 leading-tight" style={{ color: 'var(--inopi-teal-strong)' }}>
                {f.role}
              </p>
            </button>
          )
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-sm">
          {selected && (
            <>
              <DialogHeader>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-display font-bold text-[18px] mb-3"
                  style={{ background: 'linear-gradient(135deg, var(--inopi-teal), var(--inopi-espresso))' }}
                >
                  {selected.initials || getInitials(selected.name)}
                </div>
                <DialogTitle className="font-display text-[18px]" style={{ color: 'var(--inopi-espresso)' }}>
                  {selected.name}
                </DialogTitle>
              </DialogHeader>
              <p className="text-[13px] font-medium" style={{ color: 'var(--inopi-teal-strong)' }}>{selected.role}</p>
              <p className="text-[13px] leading-relaxed mt-2" style={{ color: 'var(--inopi-taupe-strong)' }}>
                Bio akan segera ditambahkan.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
