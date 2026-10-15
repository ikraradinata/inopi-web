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

export interface RundownItem {
  time: string
  segment: string
  /** Pengisi acara di panggung. Kosong untuk segmen tanpa pembicara. */
  speaker?: string
  highlight?: boolean
}

/**
 * Rundown publik, sesuai dokumen rapat tim inti 13 Oktober 2026.
 * Kolom PIC sengaja tidak ditampilkan di situs (internal only).
 */
export const RUNDOWN: RundownItem[] = [
  { time: '10.00 – 10.30', segment: 'Founder call time' },
  { time: '11.00 – 12.00', segment: 'Press conference' },
  { time: '11.00 – 12.50', segment: 'Registrasi & ISHOMA' },
  { time: '12.50 – 13.00', segment: 'Call to seat' },
  { time: '13.00 – 13.05', segment: 'Pembukaan & Indonesia Raya' },
  { time: '13.05 – 13.10', segment: 'Sambutan Komdigi' },
  { time: '13.10 – 13.15', segment: 'Sambutan Kemendikdasmen' },
  { time: '13.15 – 13.20', segment: 'Sambutan Ketua Umum' },
  { time: '13.20 – 13.25', segment: 'Perkenalan 26 founder' },
  { time: '13.25 – 13.40', segment: 'Prosesi launching, ajakan membership & foto bersama', highlight: true },
  { time: '13.40 – 14.00', segment: 'Keynote' },
  { time: '14.00 – 14.50', segment: 'Panel 1 — AI & Learning Innovation' },
  { time: '14.50 – 15.00', segment: 'Jeda & coffee break' },
  { time: '15.00 – 15.50', segment: "Panel 2 — Building Indonesia's EdTech Ecosystem" },
  { time: '15.50 – 16.10', segment: 'Closing remark & networking' },
]

export interface SpeakerGroup {
  title: string
  subtitle?: string
  people: string[]
  moderator?: string
}

export const SPEAKERS: SpeakerGroup[] = [
  {
    title: 'Keynote',
    subtitle: 'Beyond Technology',
    people: ['Heru Dewanto'],
  },
  {
    title: 'Panel 1',
    subtitle: 'AI & Learning Innovation',
    people: ['Tyo Guritno', 'Stephen Ng', 'Kun Wardana'],
    moderator: 'Andy Febrico Bintoro',
  },
  {
    title: 'Panel 2',
    subtitle: "Building Indonesia's EdTech Ecosystem",
    people: ['M. Aditya Warman', 'Paulina Pannen', 'Victor Osman'],
    moderator: 'Nita Felia Pambudi',
  },
  {
    title: 'Closing Remark',
    people: ['Subchan Gatot'],
  },
]

export const MC = ['Siti Elda Hiererra', 'Yasser Muhammad Syaiful']

export const BRAND_VALUES = ['Modern', 'Human-Centered', 'Collaborative', 'Impactful'] as const
export const BRAND_MOTTO = 'Learn · Collaborate · Innovate · Impact'
export const BRAND_TAGLINE = 'Together for a Brighter Learning Future'
