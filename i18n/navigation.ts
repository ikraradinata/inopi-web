import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Pengganti next/link dan next/navigation yang sadar bahasa. Dipakai mulai
// Langkah B3, saat teks dan tautan dipindahkan per halaman.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
