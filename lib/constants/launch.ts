// Data INOPI Launching & Conference 2026.
// Sumber: docs/launching 26-oct (poster, roll-up event & values).

/** Waktu mulai acara, WIB (UTC+7). Dipakai countdown & logika tampil/sembunyi banner. */
export const LAUNCH_START = '2026-10-26T13:00:00+07:00'
/** Waktu selesai acara. Setelah ini situs beralih ke mode pasca-acara. */
export const LAUNCH_END = '2026-10-26T16:10:00+07:00'

/** Ganti dengan tautan RSVP resmi (Google Form / Lu.ma) begitu tersedia. */
export const RSVP_URL = '/kontak'

export const LAUNCH = {
  eyebrow: 'INOPI Launching & Conference 2026',
  title: 'Beyond Technology: Shaping the Future of Learning',
  tagline: 'Innovating Learning, Empowering the Future',
  positioning: 'A Collaborative Platform for Learning Innovation in Indonesia',
  dateLabel: 'Senin, 26 Oktober 2026',
  timeLabel: '13.00 – 16.10 WIB',
  venue: 'Markas Komdigi',
  venueDetail: 'Midpoint Place, Lantai 21',
  venueAddress: 'Jl. K.H. Fachrudin, Tanah Abang, Jakarta Pusat',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Midpoint+Place+Jl.+K.H.+Fachrudin+Tanah+Abang+Jakarta+Pusat',
  href: '/event/launching-2026',
  poster: '/event/launching-2026-poster.jpg',
  banner: '/event/launching-2026-banner.jpg',
} as const

export interface LaunchPillar {
  label: string
  desc: string
}

/** Lima pilar INOPI dari roll-up values. */
export const LAUNCH_PILLARS: LaunchPillar[] = [
  { label: 'People', desc: 'Empowering Learners & Educators' },
  { label: 'Learning', desc: 'Advancing Learning Innovation' },
  { label: 'Innovation', desc: 'Exploring New Possibilities' },
  { label: 'Collaboration', desc: 'Connecting Ecosystem Stakeholders' },
  { label: 'Impact', desc: 'Creating Lasting Value' },
]

export const BRAND_VALUES = ['Modern', 'Human-Centered', 'Collaborative', 'Impactful'] as const
export const BRAND_MOTTO = 'Learn · Collaborate · Innovate · Impact'
export const BRAND_TAGLINE = 'Together for a Brighter Learning Future'
