import { NextResponse } from 'next/server'
import { kontakSchema } from '@/lib/schemas/kontak'
import { FAILURE_MESSAGE } from '@/lib/constants/formMessages'
import { ASSOCIATION_EMAIL } from '@/lib/constants/registration'
import { sendEmail } from '@/lib/email'
import { guardForm, oneLine } from '@/lib/spam'
import { LANGUAGE_LABEL, senderLocale } from '@/lib/i18n/language'

// Penerima: KONTAK_EMAIL bila diisi, jika tidak, email asosiasi.
const RECIPIENT = process.env.KONTAK_EMAIL || ASSOCIATION_EMAIL

export async function POST(req: Request) {
  const guard = await guardForm(req, 'kontak')
  if (!guard.ok) return guard.response

  const parsed = kontakSchema.safeParse(guard.body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: 'Data pesan belum lengkap atau tidak valid.' }, { status: 400 })
  }
  const d = parsed.data
  const lang = senderLocale(guard.body)

  const submittedAt = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(new Date())

  // Dicatat di log server agar pesan tidak hilang bila email bermasalah.
  console.log('[kontak] Pesan baru:', { ...d, submittedAt })

  const result = await sendEmail({
    to: RECIPIENT,
    subject: `[INOPI] Kontak (${d.topik}) — ${oneLine(d.subjek)}`,
    text: [
      'Pesan baru dari formulir kontak INOPI.',
      '',
      `Waktu   : ${submittedAt} WIB`,
      `Bahasa  : ${LANGUAGE_LABEL[lang]}`,
      `Topik   : ${d.topik}`,
      `Nama    : ${d.nama}`,
      `Email   : ${d.email}`,
      `Subjek  : ${oneLine(d.subjek)}`,
      '',
      'Pesan:',
      d.pesan,
      '',
      'Pengirim telah menyetujui Kebijakan Privasi.',
    ].join('\n'),
    replyTo: d.email,
  })

  if (!result.delivered) {
    console.error('[kontak] Notifikasi email tidak terkirim:', result.reason)
    return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
