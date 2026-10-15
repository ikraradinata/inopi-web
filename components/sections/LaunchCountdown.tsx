'use client'

import { useEffect, useState } from 'react'
import { LAUNCH_START, LAUNCH_END } from '@/lib/constants/launch'

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function remainingFrom(now: number): Remaining | null {
  const diff = new Date(LAUNCH_START).getTime() - now
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

interface LaunchCountdownProps {
  /** 'light' untuk latar terang (ivory/putih), 'dark' untuk latar espresso. */
  tone?: 'light' | 'dark'
}

export default function LaunchCountdown({ tone = 'light' }: LaunchCountdownProps) {
  // Dirender kosong di server agar tidak terjadi hydration mismatch.
  const [remaining, setRemaining] = useState<Remaining | null>(null)
  const [phase, setPhase] = useState<'pending' | 'counting' | 'live' | 'done'>('pending')

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const left = remainingFrom(now)
      if (left) {
        setRemaining(left)
        setPhase('counting')
      } else if (now < new Date(LAUNCH_END).getTime()) {
        setPhase('live')
      } else {
        setPhase('done')
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (phase === 'pending') return null

  const valueColor = tone === 'dark' ? 'var(--inopi-ivory)' : 'var(--inopi-espresso)'
  const labelColor = tone === 'dark' ? 'var(--inopi-sand)' : 'var(--inopi-taupe-strong)'
  const boxBg = tone === 'dark' ? 'color-mix(in srgb, var(--inopi-ivory) 12%, transparent)' : 'var(--inopi-sand)'

  if (phase === 'live') {
    return (
      <p className="font-display font-bold text-[18px]" style={{ color: 'var(--inopi-orange-strong)' }}>
        Acara sedang berlangsung
      </p>
    )
  }

  if (phase === 'done') {
    return (
      <p className="font-body text-[14px]" style={{ color: labelColor }}>
        Acara telah selesai — terima kasih atas partisipasinya.
      </p>
    )
  }

  const units: { value: number; label: string }[] = [
    { value: remaining!.days, label: 'Hari' },
    { value: remaining!.hours, label: 'Jam' },
    { value: remaining!.minutes, label: 'Menit' },
    { value: remaining!.seconds, label: 'Detik' },
  ]

  return (
    <div className="flex gap-2.5" role="timer" aria-label="Hitung mundur menuju acara">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[62px] flex-col items-center rounded-[10px] px-3 py-2"
          style={{ background: boxBg }}
        >
          <span
            className="font-display font-extrabold text-[26px] leading-none tabular-nums"
            style={{ color: valueColor }}
          >
            {String(u.value).padStart(2, '0')}
          </span>
          <span
            className="font-body text-[10px] font-semibold uppercase tracking-wider mt-1"
            style={{ color: labelColor }}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
