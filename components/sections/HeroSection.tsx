'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconCalendarEvent, IconMapPin } from '@tabler/icons-react'
import { LAUNCH, RSVP_URL } from '@/lib/constants/launch'
import LaunchCountdown from '@/components/sections/LaunchCountdown'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 lg:pt-16" style={{ background: 'var(--inopi-ivory)' }}>
      <div className="inopi-diagonal hidden lg:block" style={{ right: '6%', top: '-40px', width: '160px', height: '620px' }} />
      <div className="container relative">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-5"
              style={{ background: 'var(--inopi-sand)', color: 'var(--inopi-teal-strong)' }}
            >
              ⬡ {LAUNCH.eyebrow}
            </motion.div>

            <h1
              className="font-display font-extrabold mb-4 leading-[1.1]"
              style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: 'var(--inopi-espresso)' }}
            >
              Beyond Technology:{' '}
              <br className="hidden md:block" />
              <span style={{ color: 'var(--inopi-teal)' }}>Shaping the Future of Learning</span>
            </h1>

            <p className="font-body text-[14px] leading-relaxed mb-6 max-w-lg" style={{ color: 'var(--inopi-taupe-strong)' }}>
              {LAUNCH.tagline}. Peluncuran resmi INOPI — {LAUNCH.positioning}.
            </p>

            {/* Waktu & tempat */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center gap-2">
                <IconCalendarEvent size={16} style={{ color: 'var(--inopi-orange)' }} />
                <span className="font-body text-[13px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                  {LAUNCH.dateLabel} · {LAUNCH.timeLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconMapPin size={16} style={{ color: 'var(--inopi-orange)' }} />
                <span className="font-body text-[13px] font-medium" style={{ color: 'var(--inopi-espresso)' }}>
                  {LAUNCH.venue}, {LAUNCH.venueDetail}
                </span>
              </div>
            </div>

            <div className="mb-7">
              <LaunchCountdown />
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={RSVP_URL}
                className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px hover:shadow-hover"
                style={{ background: 'var(--inopi-orange-strong)' }}
              >
                Konfirmasi Kehadiran →
              </Link>
              <Link
                href={LAUNCH.href}
                className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[var(--inopi-teal-strong)] hover:text-[var(--inopi-teal-strong)]"
                style={{ color: 'var(--inopi-espresso)', borderColor: 'var(--inopi-sand)' }}
              >
                Detail Acara
              </Link>
            </div>
          </motion.div>

          {/* Right — poster acara */}
          <motion.div
            className="w-full lg:w-[42%] relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          >
            <Link href={LAUNCH.href} className="block group">
              <Image
                src={LAUNCH.poster}
                alt={`Poster ${LAUNCH.eyebrow} — ${LAUNCH.title}`}
                width={1092}
                height={1440}
                priority
                className="w-full h-auto rounded-[12px] transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ boxShadow: '0 10px 30px rgba(53,41,42,0.14)' }}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
