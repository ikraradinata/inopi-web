'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconCalendarEvent, IconArrowRight } from '@tabler/icons-react'
import { LAUNCH, LAUNCH_END } from '@/lib/constants/launch'

export default function AnnouncementBar() {
  // Dirender kosong di server: status bergantung pada waktu browser.
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(Date.now() < new Date(LAUNCH_END).getTime())
  }, [])

  if (!show) return null

  return (
    <Link
      href={LAUNCH.href}
      className="group flex w-full items-center justify-center gap-2 px-4 py-2 text-center transition-opacity hover:opacity-95"
      style={{ background: 'var(--inopi-espresso)' }}
    >
      <IconCalendarEvent size={15} style={{ color: 'var(--inopi-gold)' }} className="flex-shrink-0" />
      <span className="font-body text-[12px]" style={{ color: 'var(--inopi-ivory)' }}>
        <span className="font-semibold">{LAUNCH.eyebrow}</span>
        <span className="hidden sm:inline"> — {LAUNCH.dateLabel} · {LAUNCH.venue}</span>
      </span>
      <span
        className="font-body text-[12px] font-semibold inline-flex items-center gap-1"
        style={{ color: 'var(--inopi-gold)' }}
      >
        Detail
        <IconArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
