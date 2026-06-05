'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="pt-12 pb-10 lg:pt-16" style={{ background: '#fff' }}>
      <div className="container">
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
              style={{ background: '#e0f7f5', color: '#0b7b8a' }}
            >
              ⬡ Inovasi EduTech · Indonesia
            </motion.div>

            <h1
              className="font-display font-extrabold mb-4 leading-[1.1]"
              style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: '#071422' }}
            >
              Transformasi Digital,{' '}
              <br className="hidden md:block" />
              Inovasi Masa Depan{' '}
              <span style={{ color: '#0b7b8a' }}>Pendidikan Indonesia</span>
            </h1>

            <p className="font-body text-[14px] leading-relaxed mb-7 max-w-lg" style={{ color: '#4a6070' }}>
              Membangun ekosistem inovasi pembelajaran berbasis AI dan kolaborasi nasional untuk mencetak generasi unggul di era Industri 5.0.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/keanggotaan/daftar"
                className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white rounded-[8px] transition-all hover:-translate-y-px hover:shadow-hover"
                style={{ background: '#083344' }}
              >
                Gabung Anggota →
              </Link>
              <Link
                href="/program"
                className="inline-flex items-center px-5 py-2.5 text-[14px] font-medium rounded-[8px] border transition-all hover:border-[#0d9488] hover:text-[#0d9488]"
                style={{ color: '#071422', borderColor: '#e0e8ef' }}
              >
                Pelajari Program
              </Link>
            </div>
          </motion.div>

          {/* Right — visual box */}
          <motion.div
            className="w-full lg:w-[45%] relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          >
            <div
              className="relative rounded-[12px] flex items-end p-5"
              style={{ background: '#eef2f7', height: '280px' }}
            >
              {/* Live badge */}
              <div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                style={{ background: 'rgba(7,20,34,0.85)', color: '#5dd4c8' }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e] pulse-dot" />
                LIVE RESEARCH
              </div>

              {/* Caption overlay */}
              <div
                className="rounded-[10px] p-3 w-full"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid #e0e8ef',
                }}
              >
                <p className="text-[12px] font-medium" style={{ color: '#4a6070' }}>
                  Implementasi Osmatika-AI di Kurikulum Nasional
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: '#8fa5b5' }}>
                  Divisi Riset & Inovasi · 2026
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
