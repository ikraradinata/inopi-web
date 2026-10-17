// lib/constants/programs.ts
// Data Program Kerja 4 Divisi INOPI — Semester 1 & 2 (PRD v2.0 Section 4).
// Teks (judul, peran, tugas, program kerja) ada di messages, namespace
// "Programs" -> "divisions.<slug>". Di sini hanya data yang tidak diterjemahkan.

export interface ProgramItem {
  no: number
  name: string
  description: string
  output: string
}

export interface DivisionProgram {
  slug: string
  title: string
  role: string
  orientation: string
  pic: string[]
  responsibilities?: string[]
  semester1: ProgramItem[]
  semester2: ProgramItem[]
}

/** Nama PIC tidak diterjemahkan. */
const DIVISION_META: { slug: string; pic: string[] }[] = [
  { slug: 'riset-inovasi', pic: ['Bobi Kurniawan Soegoto', 'Nunik Afriliana'] },
  { slug: 'implementasi', pic: ['Nita Felia', 'Yasser Muhammad Syaiful'] },
  { slug: 'kemitraan', pic: ['Victor Osman', 'Siti Elda Hiererra'] },
  { slug: 'pelatihan-sertifikasi', pic: ['Andy Febrico Bintoro'] },
]

/** Menggabungkan data tetap dengan teks dari messages. `t` dari getTranslations({ namespace: 'Programs' }). */
export function getDivision(slug: string, t: { raw: (key: string) => unknown }): DivisionProgram {
  const meta = DIVISION_META.find((d) => d.slug === slug)!
  return { ...meta, ...(t.raw(`divisions.${slug}`) as Omit<DivisionProgram, 'slug' | 'pic'>) }
}
