import { describe, expect, it } from 'vitest'
import { MEMBERSHIP_PRICES } from '@/lib/membership/config'
import { createRegistryEnv, type RegistryEnv } from './fakes'

const JPEG = [0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]
const PDF = Array.from(Buffer.from('%PDF-1.7\n%test\n'))
const EXE = [0x4d, 0x5a, 0x90, 0x00, 0x03, 0, 0, 0]
const b64 = (bytes: number[], pad = 0) => Buffer.from([...bytes, ...new Array(pad).fill(1)]).toString('base64')

const person = {
  name: 'Siti Uji',
  email: 'siti@example.com',
  whatsapp: '081234567890',
  occupation: 'Dosen',
  position: 'Kaprodi',
  institution: 'Universitas Uji',
  country: 'ID',
  locale: 'id',
  consent: true,
}

function reserve(env: RegistryEnv, category = 'student', ip = '1.1.1.1') {
  return env.call({ action: 'reserve', category, ip })
}
function upload(env: RegistryEnv, bytes = JPEG, mime = 'image/jpeg', ip = '1.1.1.1') {
  return env.call({ action: 'upload', mime, dataBase64: b64(bytes), ip })
}
/** Alur lengkap reserve -> upload -> register. */
function fullRegister(env: RegistryEnv, over: Record<string, unknown> = {}, category = 'student') {
  const r = reserve(env, category)
  const u = upload(env)
  return {
    r,
    u,
    res: env.call({ action: 'register', category, reservationToken: r.token, uploadToken: u.uploadToken, ip: '1.1.1.1', ...person, ...over }),
  }
}
const regRows = (env: RegistryEnv) => env.ss.getSheetByName('Pendaftaran')!.rows.slice(1)
const H = (env: RegistryEnv, name: string) => (env.ss.getSheetByName('Pendaftaran')!.rows[0] as string[]).indexOf(name)

describe('spreadsheet awal', () => {
  it('memakai tab kosong Sheet1 sebagai tab Pendaftaran (tanpa tab sisa)', () => {
    const env = createRegistryEnv({ starterSheet: true })
    expect(reserve(env).ok).toBe(true)
    expect(env.ss.getSheetByName('Sheet1')).toBeNull()
    const reg = env.ss.getSheetByName('Pendaftaran')!
    expect(reg.rows[0][1]).toBe('No. Pendaftaran')
    expect(env.ss.getSheetByName('Reservasi')).not.toBeNull()
  })

  it('tidak menimpa Sheet1 yang sudah berisi data', () => {
    const env = createRegistryEnv()
    const starter = env.ss.insertSheet('Sheet1')
    starter.appendRow(['data penting'])
    reserve(env)
    expect(env.ss.getSheetByName('Sheet1')!.rows[0][0]).toBe('data penting')
    expect(env.ss.getSheetByName('Pendaftaran')).not.toBeNull()
  })
})

describe('keamanan akses', () => {
  it('menolak permintaan tanpa atau dengan secret salah', () => {
    const env = createRegistryEnv()
    expect(env.call({ action: 'reserve', category: 'student', secret: '' }).error).toBe('unauthorized')
    expect(env.call({ action: 'reserve', category: 'student', secret: 'salah' }).error).toBe('unauthorized')
    expect(env.ss.getSheetByName('Pendaftaran')).toBeNull() // tidak menyentuh Sheet
  })

  it('menolak bila API_SECRET belum dipasang di skrip', () => {
    const env = createRegistryEnv({ secret: null })
    expect(env.call({ action: 'reserve', category: 'student' }).error).toBe('not_configured')
  })

  it('aksi tidak dikenal ditolak', () => {
    expect(createRegistryEnv().call({ action: 'hapusSemua' }).error).toBe('unknown_action')
  })

  it('kunci selalu dilepas, termasuk saat galat', () => {
    const env = createRegistryEnv()
    reserve(env)
    env.call({ action: 'register', category: 'student', reservationToken: 'x', uploadToken: 'y', ...person })
    env.call({ action: 'upload', mime: 'image/png', dataBase64: b64(EXE) })
    expect(env.lock.held).toBe(0)
    expect(env.lock.acquired).toBe(env.lock.released)
    expect(env.lock.acquired).toBe(3)
  })

  it('harga di skrip sama dengan konfigurasi website', () => {
    const env = createRegistryEnv()
    for (const [category, price] of Object.entries(MEMBERSHIP_PRICES)) {
      const r = env.call({ action: 'reserve', category, ip: category })
      expect(r.transferAmount).toBe(price + r.uniqueCode)
    }
  })
})

describe('reservasi kode unik transfer', () => {
  it('kode 1–999 dan nominal = harga + kode', () => {
    const env = createRegistryEnv()
    const r = reserve(env, 'professional')
    expect(r.ok).toBe(true)
    expect(r.uniqueCode).toBeGreaterThanOrEqual(1)
    expect(r.uniqueCode).toBeLessThanOrEqual(999)
    expect(r.transferAmount).toBe(500_000 + r.uniqueCode)
    expect(r.token).toMatch(/^[0-9a-f]{64}$/)
  })

  it('kategori tidak sah ditolak', () => {
    expect(reserve(createRegistryEnv(), 'vip').error).toBe('invalid_category')
  })

  it('dua pemesan tidak pernah mendapat kode yang sama pada kategori yang sama', () => {
    const env = createRegistryEnv()
    const codes = new Set<number>()
    for (let i = 0; i < 9; i++) codes.add(env.call({ action: 'reserve', category: 'student', ip: `10.0.0.${i}` }).uniqueCode)
    expect(codes.size).toBe(9)
  })

  it('tersisa satu kode: kode itu yang diberikan; sesudahnya habis', () => {
    const env = createRegistryEnv()
    reserve(env) // membuat tab
    const res = env.ss.getSheetByName('Reservasi')!
    res.rows.length = 1
    const future = new Date(Date.now() + 3600_000)
    for (let c = 1; c <= 999; c++) if (c !== 500) res.appendRow([`t${c}`, 'student', c, future, '', ''])
    const last = env.call({ action: 'reserve', category: 'student', ip: 'a' })
    expect(last.uniqueCode).toBe(500)
    expect(env.call({ action: 'reserve', category: 'student', ip: 'b' }).error).toBe('codes_exhausted')
    // kategori lain tidak terpengaruh
    expect(env.call({ action: 'reserve', category: 'professional', ip: 'c' }).ok).toBe(true)
  })

  it('pesanan kedaluwarsa dibersihkan dan kodenya bebas lagi', () => {
    const env = createRegistryEnv()
    const first = reserve(env)
    env.setNow(new Date(Date.now() + 25 * 3600_000))
    reserve(env, 'student', '2.2.2.2')
    const tokens = env.ss.getSheetByName('Reservasi')!.rows.slice(1).map((r) => r[0])
    expect(tokens).not.toContain(first.token)
  })

  it('kode milik pendaftaran yang masih menunggu verifikasi tidak dipakai ulang', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    expect(res.ok).toBe(true)
    const used = Number(regRows(env)[0][H(env, 'Kode Unik')])
    // paksa semua kode selain `used` terpakai: sisa kosong hanya `used`, yang harus tetap ditolak
    const sh = env.ss.getSheetByName('Reservasi')!
    const future = new Date(Date.now() + 3600_000)
    for (let c = 1; c <= 999; c++) if (c !== used) sh.appendRow([`z${c}`, 'student', c, future, '', ''])
    expect(env.call({ action: 'reserve', category: 'student', ip: 'q' }).error).toBe('codes_exhausted')
  })
})

describe('unggah bukti transfer', () => {
  it('menerima JPEG, PNG, dan PDF; berkas tersimpan privat', () => {
    const env = createRegistryEnv()
    for (const [bytes, mime] of [[JPEG, 'image/jpeg'], [PNG, 'image/png'], [PDF, 'application/pdf']] as const) {
      const r = upload(env, [...bytes], mime)
      expect(r.ok).toBe(true)
      expect(r.uploadToken).toMatch(/^[0-9a-f]{64}$/)
    }
    expect(env.files.size).toBe(3)
    for (const f of env.files.values()) expect(f.sharing).toBe('PRIVATE')
    expect(env.ss.getSheetByName('Unggahan')!.hidden).toBe(true)
  })

  it('menolak .exe yang menyamar sebagai gambar', () => {
    const env = createRegistryEnv()
    expect(upload(env, EXE, 'image/png').error).toBe('invalid_file_type')
    expect(upload(env, EXE, 'application/pdf').error).toBe('invalid_file_type')
    expect(env.files.size).toBe(0)
  })

  it('menolak jika tipe yang diklaim tidak cocok dengan isi', () => {
    expect(upload(createRegistryEnv(), PNG, 'image/jpeg').error).toBe('invalid_file_type')
  })

  it('menolak tipe yang tidak diizinkan dan berkas kosong atau base64 rusak', () => {
    const env = createRegistryEnv()
    expect(upload(env, JPEG, 'image/gif').error).toBe('invalid_file_type')
    expect(env.call({ action: 'upload', mime: 'image/jpeg', dataBase64: '' }).error).toBe('invalid_file')
    expect(env.call({ action: 'upload', mime: 'image/jpeg', dataBase64: '###' }).error).toBe('invalid_file')
  })

  it('batas ukuran 4 MB', () => {
    const env = createRegistryEnv()
    const max = 4 * 1024 * 1024
    expect(env.call({ action: 'upload', mime: 'image/jpeg', dataBase64: b64(JPEG, max - JPEG.length) }).ok).toBe(true)
    expect(env.call({ action: 'upload', mime: 'image/jpeg', dataBase64: b64(JPEG, max - JPEG.length + 1) }).error).toBe('file_too_large')
  })

  it('pembatas laju: unggahan ke-11 dari IP yang sama ditolak', () => {
    const env = createRegistryEnv()
    const results = Array.from({ length: 11 }, () => upload(env, JPEG, 'image/jpeg', '9.9.9.9'))
    expect(results.slice(0, 10).every((r) => r.ok)).toBe(true)
    expect(results[10].error).toBe('rate_limited')
    expect(upload(env, JPEG, 'image/jpeg', '8.8.8.8').ok).toBe(true)
  })
})

describe('pendaftaran jalur A', () => {
  it('menyimpan satu baris lengkap dengan nomor INP-yy-S-0001', () => {
    const env = createRegistryEnv()
    const { r, res } = fullRegister(env)
    expect(res.ok).toBe(true)
    expect(res.regNumber).toMatch(/^INP-\d{2}-S-0001$/)
    expect(res.status).toBe('Menunggu Verifikasi')
    expect(res.transferAmount).toBe(r.transferAmount)
    const row = regRows(env)[0]
    expect(row[H(env, 'Nama Lengkap')]).toBe('Siti Uji')
    expect(row[H(env, 'Email')]).toBe('siti@example.com')
    expect(row[H(env, 'Kode Unik')]).toBe(r.uniqueCode)
    expect(row[H(env, 'Nominal Transfer (Rp)')]).toBe(250_000 + r.uniqueCode)
    expect(row[H(env, 'Status')]).toBe('Menunggu Verifikasi')
    expect(row[H(env, 'Negara')]).toBe('ID')
    expect(row[H(env, 'No. Anggota')]).toBe(res.regNumber)
    expect(String(row[H(env, 'Bukti Transfer')])).toMatch(/^=HYPERLINK\("https:\/\/drive\.google\.com\/file\/d\/[^"]+\/view"/)
  })

  it('nomor berurutan per kategori dan terpisah antar kategori', () => {
    const env = createRegistryEnv()
    const a = fullRegister(env).res.regNumber
    const b = fullRegister(env, { email: 'b@example.com' }).res.regNumber
    const c = fullRegister(env, { email: 'c@example.com' }, 'professional').res.regNumber
    expect(a).toMatch(/-S-0001$/)
    expect(b).toMatch(/-S-0002$/)
    expect(c).toMatch(/-P-0001$/)
  })

  it('tahun pada nomor mengikuti WIB dan urutan mulai lagi tiap tahun', () => {
    const env = createRegistryEnv()
    env.setNow(new Date('2026-12-31T16:30:00Z')) // 31 Des 2026 23:30 WIB
    expect(fullRegister(env).res.regNumber).toBe('INP-26-S-0001')
    env.setNow(new Date('2026-12-31T17:30:00Z')) // 1 Jan 2027 00:30 WIB
    expect(fullRegister(env, { email: 'x@example.com' }).res.regNumber).toBe('INP-27-S-0001')
  })

  it('berkas bukti diberi nama sesuai nomor pendaftaran', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    expect([...env.files.values()].map((f) => f.name)).toEqual([`${res.regNumber}.jpg`])
  })

  it('pengiriman ganda (klik dua kali) mengembalikan pendaftaran yang sama, tanpa baris ganda', () => {
    const env = createRegistryEnv()
    const r = reserve(env)
    const u = upload(env)
    const payload = { action: 'register', category: 'student', reservationToken: r.token, uploadToken: u.uploadToken, ip: '1.1.1.1', ...person }
    const first = env.call(payload)
    const second = env.call(payload)
    expect(second.regNumber).toBe(first.regNumber)
    expect(second.receiptToken).toBe(first.receiptToken)
    expect(regRows(env)).toHaveLength(1)
  })

  it('pesanan yang sudah dipakai orang lain tidak bisa dipakai ulang', () => {
    const env = createRegistryEnv()
    const r = reserve(env)
    const u1 = upload(env)
    env.call({ action: 'register', category: 'student', reservationToken: r.token, uploadToken: u1.uploadToken, ...person })
    const u2 = upload(env)
    const other = env.call({ action: 'register', category: 'student', reservationToken: r.token, uploadToken: u2.uploadToken, ...person, email: 'lain@example.com' })
    expect(other.error).toBe('reservation_used')
    expect(regRows(env)).toHaveLength(1)
  })

  it('token unggahan hanya sekali pakai', () => {
    const env = createRegistryEnv()
    const u = upload(env)
    const r1 = reserve(env)
    expect(env.call({ action: 'register', category: 'student', reservationToken: r1.token, uploadToken: u.uploadToken, ...person }).ok).toBe(true)
    const r2 = reserve(env)
    expect(env.call({ action: 'register', category: 'student', reservationToken: r2.token, uploadToken: u.uploadToken, ...person, email: 'b@example.com' }).error).toBe('upload_not_found')
  })

  it('menolak: pesanan tidak ada, kategori tidak cocok, tanpa persetujuan', () => {
    const env = createRegistryEnv()
    const u = upload(env)
    const r = reserve(env, 'professional')
    const base = { action: 'register', uploadToken: u.uploadToken, ...person }
    expect(env.call({ ...base, category: 'student', reservationToken: 'tidak-ada' }).error).toBe('reservation_not_found')
    expect(env.call({ ...base, category: 'student', reservationToken: r.token }).error).toBe('reservation_mismatch')
    expect(env.call({ ...base, category: 'professional', reservationToken: r.token, consent: false }).error).toBe('consent_required')
    expect(regRows(env)).toHaveLength(0)
  })

  it('memvalidasi setiap kolom data diri', () => {
    const env = createRegistryEnv()
    const cases: [Record<string, unknown>, string][] = [
      [{ name: 'A' }, 'invalid_name'],
      [{ email: 'bukan-email' }, 'invalid_email'],
      [{ whatsapp: '123' }, 'invalid_whatsapp'],
      [{ occupation: '' }, 'invalid_occupation'],
      [{ institution: ' ' }, 'invalid_institution'],
      [{ country: 'Indonesia' }, 'invalid_country'],
    ]
    for (const [over, error] of cases) {
      const { res } = fullRegister(env, over)
      expect(res.error, JSON.stringify(over)).toBe(error)
    }
    expect(regRows(env)).toHaveLength(0)
  })

  it('pesanan yang lewat masa berlaku tetapi belum diambil alih masih bisa dipakai', () => {
    const env = createRegistryEnv()
    const r = reserve(env)
    const u = upload(env)
    env.setNow(new Date(Date.now() + 30 * 3600_000))
    const res = env.call({ action: 'register', category: 'student', reservationToken: r.token, uploadToken: u.uploadToken, ...person })
    expect(res.ok).toBe(true)
    expect(res.transferAmount).toBe(r.transferAmount)
  })

  it('mencegah injeksi rumus Google Sheet', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env, {
      name: '=IMPORTXML("http://evil","//x")',
      institution: '+cmd|calc',
      occupation: '@SUM(1)',
      position: '-2+3',
    })
    expect(res.ok).toBe(true)
    const row = regRows(env)[0]
    expect(row[H(env, 'Nama Lengkap')]).toBe(`'=IMPORTXML("http://evil","//x")`)
    expect(row[H(env, 'Institusi')]).toBe("'+cmd|calc")
    expect(row[H(env, 'Pekerjaan')]).toBe("'@SUM(1)")
    expect(row[H(env, 'Jabatan')]).toBe("'-2+3")
  })

  it('membersihkan karakter kontrol dan memotong teks terlalu panjang', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env, { name: 'Siti\n\u0000Uji', institution: 'U'.repeat(500) })
    expect(res.ok).toBe(true)
    const row = regRows(env)[0]
    expect(row[H(env, 'Nama Lengkap')]).toBe('Siti Uji')
    expect(String(row[H(env, 'Institusi')])).toHaveLength(160)
  })

  it('mengirim notifikasi ke Bendahara tanpa memuat email atau WhatsApp pendaftar', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    expect(env.mails).toHaveLength(1)
    expect(env.mails[0].to).toBe('asosiasi.inopi@gmail.com')
    expect(env.mails[0].subject).toContain(res.regNumber)
    expect(env.mails[0].body).not.toContain('081234567890')
    expect(env.mails[0].body).not.toContain('siti@example.com')
  })

  it('token terima kasih dan token verifikasi acak, panjang, dan berbeda', () => {
    const env = createRegistryEnv()
    const row = (fullRegister(env), regRows(env)[0])
    const t1 = String(row[H(env, 'Token Terima Kasih')])
    const t2 = String(row[H(env, 'Token Verifikasi')])
    expect(t1).toMatch(/^[0-9a-f]{64}$/)
    expect(t2).toMatch(/^[0-9a-f]{64}$/)
    expect(t1).not.toBe(t2)
  })

  it('pembatas laju pendaftaran: ke-9 dari IP yang sama ditolak', () => {
    const env = createRegistryEnv()
    const results = Array.from({ length: 9 }, () => env.call({ action: 'register', category: 'student', reservationToken: 'x', uploadToken: 'y', ip: '7.7.7.7', ...person }))
    expect(results.slice(0, 8).every((r) => r.error === 'reservation_not_found')).toBe(true)
    expect(results[8].error).toBe('rate_limited')
  })
})

describe('tanda terima', () => {
  it('ditemukan lewat token acak, bukan nomor pendaftaran', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    const got = env.call({ action: 'receipt', receiptToken: res.receiptToken })
    expect(got).toMatchObject({ ok: true, regNumber: res.regNumber, category: 'student', status: 'Menunggu Verifikasi', locale: 'id' })
    expect(got.verifyToken).toBeUndefined() // token QR tidak ikut tanda terima
    expect(env.call({ action: 'receipt', receiptToken: res.regNumber }).error).toBe('not_found')
    expect(env.call({ action: 'receipt', receiptToken: '' }).error).toBe('not_found')
  })

  it('tidak memuat email, WhatsApp, atau data pribadi lain', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    const text = JSON.stringify(env.call({ action: 'receipt', receiptToken: res.receiptToken }))
    expect(text).not.toContain('siti@example.com')
    expect(text).not.toContain('081234567890')
    expect(text).not.toContain('Siti Uji')
  })
})

const corp = {
  organization: 'PT Inovasi Uji',
  name: 'Budi PIC',
  position: 'Direktur SDM',
  email: 'budi@ptuji.co.id',
  whatsapp: '081200001111',
  country: 'ID',
  useSeat1: true,
  needInvoice: false,
  billingAddress: '',
  locale: 'id',
  consent: true,
}
const sheetRows = (env: RegistryEnv, name: string) => env.ss.getSheetByName(name)!.rows.slice(1)

describe('pendaftaran Corporate', () => {
  it('mencatat pendaftaran, perusahaan, dan 3 kursi tersedia tanpa kode', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env, corp, 'corporate')
    expect(res).toMatchObject({ ok: true, category: 'corporate', status: 'Menunggu Verifikasi' })
    expect(res.regNumber).toMatch(/^INP-\d\d-C-0001$/)
    expect(res.transferAmount).toBeGreaterThan(MEMBERSHIP_PRICES.corporate)
    expect(res.transferAmount).toBeLessThan(MEMBERSHIP_PRICES.corporate + 1000)

    const reg = regRows(env)[0]
    expect(reg[H(env, 'Kategori')]).toBe('corporate')
    expect(reg[H(env, 'Nama Lengkap')]).toBe('Budi PIC')
    expect(reg[H(env, 'Institusi')]).toBe('PT Inovasi Uji')
    expect(reg[H(env, 'Iuran (Rp)')]).toBe(5_000_000)

    const orgs = sheetRows(env, 'Perusahaan')
    expect(orgs).toHaveLength(1)
    expect(orgs[0][1]).toBe(res.regNumber)
    expect(orgs[0][2]).toBe('PT Inovasi Uji')
    expect(orgs[0][8]).toBe('Ya')
    expect(orgs[0][9]).toBe('Tidak')

    const seats = sheetRows(env, 'Kursi')
    expect(seats).toHaveLength(3)
    seats.forEach((seat, i) => {
      expect(seat[1]).toBe(res.regNumber)
      expect(seat[2]).toBe(i + 1)
      expect(seat[3]).toBe('') // belum ada kode kursi
      expect(seat[4]).toBe('Tersedia')
      expect(seat[5]).toBe('')
    })
  })

  it('menyimpan permintaan invoice beserta alamat; toggle kursi 1 bisa dimatikan', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env, { ...corp, useSeat1: false, needInvoice: true, billingAddress: 'Jl. Sudirman No. 1, Jakarta' }, 'corporate')
    expect(res.ok).toBe(true)
    const org = sheetRows(env, 'Perusahaan')[0]
    expect(org[8]).toBe('Tidak')
    expect(org[9]).toBe('Ya')
    expect(org[10]).toBe('Jl. Sudirman No. 1, Jakarta')
  })

  it('wajib alamat penagihan bila butuh invoice, dan jabatan PIC', () => {
    const env = createRegistryEnv()
    expect(fullRegister(env, { ...corp, needInvoice: true, billingAddress: 'x' }, 'corporate').res.error).toBe('invalid_billing')
    expect(fullRegister(env, { ...corp, position: '' }, 'corporate').res.error).toBe('invalid_position')
    expect(fullRegister(env, { ...corp, organization: '' }, 'corporate').res.error).toBe('invalid_institution')
    expect(regRows(env)).toHaveLength(0)
    expect(sheetRows(env, 'Kursi')).toHaveLength(0)
  })

  it('kirim ganda dengan pesanan sama tidak membuat perusahaan atau kursi ganda', () => {
    const env = createRegistryEnv()
    const r = reserve(env, 'corporate')
    const u = upload(env)
    const call = () => env.call({ action: 'register', category: 'corporate', reservationToken: r.token, uploadToken: u.uploadToken, ...corp })
    const a = call()
    const b = call()
    expect(b.regNumber).toBe(a.regNumber)
    expect(regRows(env)).toHaveLength(1)
    expect(sheetRows(env, 'Perusahaan')).toHaveLength(1)
    expect(sheetRows(env, 'Kursi')).toHaveLength(3)
  })

  it('nomor urut Corporate terpisah dari kategori lain dan menaik', () => {
    const env = createRegistryEnv()
    fullRegister(env)
    const a = fullRegister(env, corp, 'corporate').res
    const b = fullRegister(env, { ...corp, email: 'lain@ptuji.co.id' }, 'corporate').res
    expect(a.regNumber).toMatch(/-C-0001$/)
    expect(b.regNumber).toMatch(/-C-0002$/)
    expect(sheetRows(env, 'Kursi')).toHaveLength(6)
  })

  it('mencegah injeksi rumus pada nama institusi dan alamat', () => {
    const env = createRegistryEnv()
    fullRegister(env, { ...corp, organization: '=HYPERLINK("http://x")', needInvoice: true, billingAddress: '=cmd|calc halo dunia' }, 'corporate')
    const org = sheetRows(env, 'Perusahaan')[0]
    expect(String(org[2]).startsWith("'=")).toBe(true)
    expect(String(org[10]).startsWith("'=")).toBe(true)
  })
})

/* ---------- Verifikasi Bendahara di Sheet (R4) ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const run = (env: RegistryEnv, fn: string, ...args: unknown[]) => (env.ctx as any)[fn](...args)
const processAll = (env: RegistryEnv) => run(env, 'processStatusChanges') as number
const regCell = (env: RegistryEnv, row: number, name: string) => env.ss.getSheetByName('Pendaftaran')!.rows[row][H(env, name)]
const setRegCell = (env: RegistryEnv, row: number, name: string, value: unknown) => {
  env.ss.getSheetByName('Pendaftaran')!.rows[row][H(env, name)] = value
}
const logActions = (env: RegistryEnv) => sheetRows(env, 'Log').map((r) => r[1])

describe('verifikasi: aktif', () => {
  it('mengisi Diverifikasi Pada dan Berlaku s.d. (1 tahun) dan mencatat ke Log', () => {
    const env = createRegistryEnv()
    env.setNow(new Date('2026-10-30T03:00:00Z'))
    const { res } = fullRegister(env)
    expect(logActions(env)).toEqual(['registered'])
    expect(processAll(env)).toBe(0) // masih menunggu: tidak ada yang berubah

    setRegCell(env, 1, 'Status', 'Aktif')
    expect(processAll(env)).toBe(1)
    expect(new Date(regCell(env, 1, 'Diverifikasi Pada') as string).toISOString()).toBe('2026-10-30T03:00:00.000Z')
    expect(new Date(regCell(env, 1, 'Berlaku s.d.') as string).toISOString()).toBe('2027-10-30T03:00:00.000Z')
    expect(logActions(env)).toEqual(['registered', 'verified'])
    expect(sheetRows(env, 'Log')[1][2]).toBe(res.regNumber)
  })

  it('idempoten: diproses ulang tidak mengubah apa pun', () => {
    const env = createRegistryEnv()
    fullRegister(env)
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const first = regCell(env, 1, 'Diverifikasi Pada')
    env.setNow(new Date(Date.now() + 86_400_000))
    expect(processAll(env)).toBe(0)
    expect(regCell(env, 1, 'Diverifikasi Pada')).toEqual(first)
    expect(logActions(env).filter((a) => a === 'verified')).toHaveLength(1)
  })

  it('mode tanggal tetap memakai tanggal yang dikonfigurasi', () => {
    const env = createRegistryEnv()
    setInContext(env, "CFG.VALIDITY_MODE = 'fixed_date'")
    fullRegister(env)
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    expect(new Date(regCell(env, 1, 'Berlaku s.d.') as string).toISOString()).toBe('2027-12-31T16:59:59.000Z')
  })

  it('perhitungan masa berlaku sama dengan lib/membership/config.ts', async () => {
    const { computeValidUntil } = await import('@/lib/membership/config')
    const env = createRegistryEnv()
    const at = new Date('2028-02-29T10:15:00Z')
    expect(new Date(run(env, 'computeValidUntil', at) as Date).toISOString()).toBe(computeValidUntil(at, 'one_year_from_verification').toISOString())
  })

  it('pendaftaran yang sudah aktif tidak bisa dikembalikan atau ditolak lewat Status', () => {
    const env = createRegistryEnv()
    fullRegister(env)
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    for (const status of ['Menunggu Verifikasi', 'Ditolak']) {
      setRegCell(env, 1, 'Status', status)
      setRegCell(env, 1, 'Alasan Penolakan', 'salah ketik')
      processAll(env)
      expect(regCell(env, 1, 'Status')).toBe('Aktif')
    }
  })
})

describe('verifikasi: tolak', () => {
  it('Ditolak tanpa alasan dikembalikan ke Menunggu Verifikasi', () => {
    const env = createRegistryEnv()
    fullRegister(env)
    setRegCell(env, 1, 'Status', 'Ditolak')
    processAll(env)
    expect(regCell(env, 1, 'Status')).toBe('Menunggu Verifikasi')
    expect(logActions(env)).not.toContain('rejected')
  })

  it('Ditolak dengan alasan dipertahankan dan dicatat sekali', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    setRegCell(env, 1, 'Status', 'Ditolak')
    setRegCell(env, 1, 'Alasan Penolakan', 'Nominal tidak sesuai')
    expect(processAll(env)).toBe(1)
    processAll(env)
    expect(regCell(env, 1, 'Status')).toBe('Ditolak')
    expect(regCell(env, 1, 'Diverifikasi Pada')).toBe('')
    const rejected = sheetRows(env, 'Log').filter((r) => r[1] === 'rejected')
    expect(rejected).toHaveLength(1)
    expect(rejected[0][2]).toBe(res.regNumber)
    expect(rejected[0][4]).toBe('Nominal tidak sesuai')
  })

  it('pendaftaran Corporate yang ditolak tidak mendapat kode kursi', () => {
    const env = createRegistryEnv()
    fullRegister(env, corp, 'corporate')
    setRegCell(env, 1, 'Status', 'Ditolak')
    setRegCell(env, 1, 'Alasan Penolakan', 'Bukti tidak terbaca')
    processAll(env)
    expect(sheetRows(env, 'Kursi').map((r) => r[3])).toEqual(['', '', ''])
    expect(sheetRows(env, 'Anggota')).toHaveLength(0)
  })
})

describe('verifikasi: Corporate', () => {
  const seatCodes = (env: RegistryEnv) => sheetRows(env, 'Kursi').map((r) => r[3] as string)

  it('menerbitkan 3 kode unik berformat CORP-nomor-kursi-acak', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env, corp, 'corporate')
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const codes = seatCodes(env)
    expect(codes).toHaveLength(3)
    codes.forEach((c, i) => expect(c).toMatch(new RegExp(`^CORP-0001-${i + 1}-[A-HJKMNP-Z2-9]{4}$`)))
    expect(new Set(codes).size).toBe(3)
    expect(res.regNumber).toMatch(/-C-0001$/)
    expect(logActions(env)).toContain('verified')
  })

  it('kursi 1 otomatis atas nama PIC dengan kartu aktif bila toggle ON', () => {
    const env = createRegistryEnv()
    env.setNow(new Date('2026-10-30T03:00:00Z'))
    const { res } = fullRegister(env, corp, 'corporate')
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const seats = sheetRows(env, 'Kursi')
    expect(seats[0][4]).toBe('Terpakai')
    expect(seats[0][5]).toBe('Budi PIC')
    expect(seats[0][6]).toBe('budi@ptuji.co.id')
    expect(seats[1][4]).toBe('Tersedia')
    expect(seats[2][4]).toBe('Tersedia')

    const members = sheetRows(env, 'Anggota')
    expect(members).toHaveLength(1)
    expect(members[0][0]).toBe(`${res.regNumber}-1`)
    expect(members[0][1]).toBe('Budi PIC')
    expect(members[0][10]).toBe(seats[0][3])
    expect(members[0][11]).toBe('Aktif')
    expect(new Date(members[0][12] as string).toISOString()).toBe('2027-10-30T03:00:00.000Z')
    expect(members[0][15]).toMatch(/^[0-9a-f]{64}$/)
  })

  it('toggle kursi 1 OFF: ketiga kursi tersedia dan tidak ada anggota', () => {
    const env = createRegistryEnv()
    fullRegister(env, { ...corp, useSeat1: false }, 'corporate')
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    expect(sheetRows(env, 'Kursi').map((r) => r[4])).toEqual(['Tersedia', 'Tersedia', 'Tersedia'])
    expect(seatCodes(env).every(Boolean)).toBe(true)
    expect(sheetRows(env, 'Anggota')).toHaveLength(0)
  })

  it('memproses ulang tidak menerbitkan kode atau anggota ganda', () => {
    const env = createRegistryEnv()
    fullRegister(env, corp, 'corporate')
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const before = seatCodes(env)
    processAll(env)
    processAll(env)
    expect(seatCodes(env)).toEqual(before)
    expect(sheetRows(env, 'Anggota')).toHaveLength(1)
    expect(sheetRows(env, 'Kursi')).toHaveLength(3)
  })

  it('beberapa perusahaan diverifikasi sekaligus mendapat kode berbeda', () => {
    const env = createRegistryEnv()
    fullRegister(env, corp, 'corporate')
    fullRegister(env, { ...corp, email: 'lain@pt.co.id' }, 'corporate')
    setRegCell(env, 1, 'Status', 'Aktif')
    setRegCell(env, 2, 'Status', 'Aktif')
    expect(processAll(env)).toBe(2)
    const codes = seatCodes(env)
    expect(new Set(codes).size).toBe(6)
    expect(codes[3]).toMatch(/^CORP-0002-1-/)
  })

  it('mengganti kursi: kode lama dan kartu pemegang nonaktif, kode baru untuk kursi yang sama', () => {
    const env = createRegistryEnv()
    fullRegister(env, corp, 'corporate')
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const oldCode = seatCodes(env)[0]
    const fresh = run(env, 'replaceSeat', 2) as string // baris 2 = kursi 1 (setelah judul)
    const seats = sheetRows(env, 'Kursi')
    expect(seats).toHaveLength(4)
    expect(seats[0][4]).toBe('Dinonaktifkan')
    expect(seats[0][3]).toBe(oldCode) // riwayat kode lama tetap ada
    expect(seats[3][2]).toBe(1)
    expect(seats[3][3]).toBe(fresh)
    expect(fresh).not.toBe(oldCode)
    expect(seats[3][4]).toBe('Tersedia')
    expect(sheetRows(env, 'Anggota')[0][11]).toBe('Nonaktif')
    expect(logActions(env)).toContain('seat_replaced')
    expect(() => run(env, 'replaceSeat', 2)).toThrow() // sudah dinonaktifkan
  })
})

describe('hook kejadian untuk email', () => {
  it('memanggil deliverEmail untuk setiap kejadian; kegagalan kirim tidak membatalkan pendaftaran', () => {
    const env = createRegistryEnv()
    const seen: string[] = []
    setInContext(env, 'var deliverEmail = function (type) { __seen.push(type); if (type === "registered") throw new Error("SMTP mati"); }', { __seen: seen })
    const { res } = fullRegister(env)
    expect(res.ok).toBe(true)
    expect(regRows(env)).toHaveLength(1)
    expect(seen).toEqual(['registered'])
    expect(logActions(env)).toEqual(['registered', 'email_failed'])

    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    expect(seen).toEqual(['registered', 'verified'])
  })
})

function setInContext(env: RegistryEnv, code: string, globals: Record<string, unknown> = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.assign(env.ctx as any, globals)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('node:vm').runInContext(code, env.ctx)
}

/* ---------- Daftar dengan kode kursi (R5) ---------- */

const member = { name: 'Rina Rekan', email: 'rina@ptuji.co.id', whatsapp: '081355556666', occupation: 'Analis', position: 'Staf', locale: 'id', consent: true }

/** Perusahaan terverifikasi; mengembalikan kode kursi 1..3 (kursi 1 dipakai PIC kecuali dimatikan). */
function verifiedCompany(env: RegistryEnv, over: Record<string, unknown> = {}, row = 1) {
  fullRegister(env, { ...corp, ...over }, 'corporate')
  setRegCell(env, row, 'Status', 'Aktif')
  processAll(env)
  return sheetRows(env, 'Kursi').filter((r) => r[1] === regCell(env, row, 'No. Pendaftaran')).map((r) => r[3] as string)
}
const validate = (env: RegistryEnv, code: string, ip = '9.9.9.9') => env.call({ action: 'validateCode', code, ip })
const claim = (env: RegistryEnv, code: string, over: Record<string, unknown> = {}, ip = '9.9.9.9') =>
  env.call({ action: 'registerCode', code, ip, ...member, ...over })

describe('kode kursi: validasi', () => {
  it('kode sah menampilkan institusi, nomor kursi, dan jumlah kursi', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    expect(validate(env, codes[1])).toMatchObject({ ok: true, organization: 'PT Inovasi Uji', seat: 2, seats: 3, country: 'ID' })
  })

  it('tidak peka huruf besar/kecil dan spasi', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    expect(validate(env, ` ${codes[1].toLowerCase().replace(/-/g, ' - ')} `.replace(/ - /g, '-')).ok).toBe(true)
  })

  it('galat jelas: tidak ditemukan, sudah dipakai, dinonaktifkan', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    expect(validate(env, 'CORP-0001-2-ZZZZ').error).toBe('code_not_found')
    expect(validate(env, 'ngawur').error).toBe('code_not_found')
    expect(validate(env, '').error).toBe('code_not_found')
    expect(validate(env, codes[0]).error).toBe('seat_used') // kursi 1 dipakai PIC
    run(env, 'replaceSeat', 3) // kursi 2 dinonaktifkan
    expect(validate(env, codes[1]).error).toBe('seat_disabled')
  })

  it('perusahaan yang belum terverifikasi tidak bisa dipakai kodenya', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    // paksa perusahaan kembali menunggu (data tidak konsisten) untuk memeriksa pengaman
    setRegCell(env, 1, 'Status', 'Menunggu Verifikasi')
    env.ss.getSheetByName('Pendaftaran')!.rows[1][H(env, 'Diverifikasi Pada')] = ''
    expect(validate(env, codes[1]).error).toBe('org_not_verified')
  })

  it('dibatasi 10 percobaan per 10 menit per IP', () => {
    const env = createRegistryEnv()
    verifiedCompany(env)
    for (let i = 0; i < 10; i++) expect(validate(env, 'CORP-0001-2-AAAA', '5.5.5.5').error).toBe('code_not_found')
    expect(validate(env, 'CORP-0001-2-AAAA', '5.5.5.5').error).toBe('rate_limited')
    expect(validate(env, 'CORP-0001-2-AAAA', '6.6.6.6').error).toBe('code_not_found') // IP lain tidak terdampak
  })
})

describe('kode kursi: pendaftaran anggota', () => {
  it('membuat anggota dengan kartu aktif, institusi dari perusahaan, masa berlaku mengikuti perusahaan', () => {
    const env = createRegistryEnv()
    env.setNow(new Date('2026-10-30T03:00:00Z'))
    const codes = verifiedCompany(env)
    env.setNow(new Date('2026-11-15T03:00:00Z'))
    const res = claim(env, codes[1])
    expect(res).toMatchObject({ ok: true, kind: 'member', status: 'Aktif', institution: 'PT Inovasi Uji', category: 'corporate' })
    expect(res.regNumber).toMatch(/-C-0001-2$/)
    expect(res.receiptToken).toMatch(/^[0-9a-f]{64}$/)
    expect(res.verifyToken).toBeUndefined()
    expect(new Date(res.validUntil).toISOString()).toBe('2027-10-30T03:00:00.000Z') // sama dengan perusahaan, bukan 15 Nov
    expect(JSON.stringify(res)).not.toContain('rina@ptuji.co.id')

    const seat = sheetRows(env, 'Kursi')[1]
    expect(seat.slice(3, 7)).toEqual([codes[1], 'Terpakai', 'Rina Rekan', 'rina@ptuji.co.id'])
    const mem = sheetRows(env, 'Anggota')
    expect(mem).toHaveLength(2) // PIC + Rina
    expect(mem[1][6]).toBe('PT Inovasi Uji')
    expect(mem[1][7]).toBe('ID')
    expect(logActions(env)).toContain('seat_claimed')
  })

  it('tanpa pembayaran: tidak menyentuh Pendaftaran, Reservasi, atau Unggahan', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    const before = [regRows(env).length, sheetRows(env, 'Reservasi').length, sheetRows(env, 'Unggahan').length]
    expect(claim(env, codes[1]).ok).toBe(true)
    expect([regRows(env).length, sheetRows(env, 'Reservasi').length, sheetRows(env, 'Unggahan').length]).toEqual(before)
  })

  it('kode hanya bisa dipakai sekali; kirim ganda dari orang yang sama aman', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    const a = claim(env, codes[1])
    const again = claim(env, codes[1]) // klik ganda: email sama
    expect(again.regNumber).toBe(a.regNumber)
    expect(again.receiptToken).toBe(a.receiptToken)
    expect(sheetRows(env, 'Anggota')).toHaveLength(2)
    expect(claim(env, codes[1], { email: 'orang.lain@ptuji.co.id' }).error).toBe('seat_used')
    expect(sheetRows(env, 'Anggota')).toHaveLength(2)
  })

  it('dua orang berebut kode yang sama: hanya satu berhasil', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    const a = claim(env, codes[2], { email: 'a@pt.co.id' })
    const b = claim(env, codes[2], { email: 'b@pt.co.id' })
    expect([a.ok, b.ok].filter(Boolean)).toHaveLength(1)
    expect(sheetRows(env, 'Anggota').filter((r) => r[10] === codes[2])).toHaveLength(1)
  })

  it('satu email tidak boleh memegang dua kursi perusahaan yang sama', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    expect(claim(env, codes[1]).ok).toBe(true)
    expect(claim(env, codes[2]).error).toBe('already_member')
    expect(sheetRows(env, 'Kursi')[2][4]).toBe('Tersedia')
  })

  it('kode pengganti berfungsi setelah kursi diganti; kode lama ditolak', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    claim(env, codes[1])
    const fresh = run(env, 'replaceSeat', 3) as string
    expect(claim(env, codes[1], { email: 'baru@pt.co.id' }).error).toBe('seat_disabled')
    expect(claim(env, fresh, { email: 'baru@pt.co.id' })).toMatchObject({ ok: true, institution: 'PT Inovasi Uji' })
    expect(sheetRows(env, 'Anggota').filter((r) => r[11] === 'Nonaktif')).toHaveLength(1)
  })

  it('memvalidasi data diri dan persetujuan; tidak ada perubahan bila gagal', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    expect(claim(env, codes[1], { consent: false }).error).toBe('consent_required')
    expect(claim(env, codes[1], { name: 'A' }).error).toBe('invalid_name')
    expect(claim(env, codes[1], { email: 'x' }).error).toBe('invalid_email')
    expect(claim(env, codes[1], { whatsapp: '1' }).error).toBe('invalid_whatsapp')
    expect(claim(env, codes[1], { occupation: '' }).error).toBe('invalid_occupation')
    expect(sheetRows(env, 'Kursi')[1][4]).toBe('Tersedia')
    expect(sheetRows(env, 'Anggota')).toHaveLength(1)
  })

  it('mencegah injeksi rumus pada data anggota', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    claim(env, codes[1], { name: '=IMPORTXML("http://x")', occupation: '@SUM(1)' })
    const m = sheetRows(env, 'Anggota')[1]
    expect(String(m[1]).startsWith("'=")).toBe(true)
    expect(String(m[4]).startsWith("'@")).toBe(true)
    expect(String(sheetRows(env, 'Kursi')[1][5]).startsWith("'=")).toBe(true)
  })

  it('tanda terima anggota ditemukan lewat token acak dan memuat status serta institusi saja', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    const a = claim(env, codes[1])
    const got = env.call({ action: 'receipt', receiptToken: a.receiptToken })
    expect(got).toMatchObject({ ok: true, kind: 'member', regNumber: a.regNumber, status: 'Aktif', institution: 'PT Inovasi Uji' })
    expect(JSON.stringify(got)).not.toMatch(/rina|081355556666/i)
    const card = env.call({ action: 'card', receiptToken: a.receiptToken })
    expect(env.call({ action: 'receipt', receiptToken: card.verifyToken }).error).toBe('not_found')
  })
})

/* ---------- Kartu dan verifikasi publik (R6) ---------- */

const card = (env: RegistryEnv, receiptToken: string) => env.call({ action: 'card', receiptToken, ip: '3.3.3.3' })
const verify = (env: RegistryEnv, verifyToken: string, ip = '3.3.3.3') => env.call({ action: 'verify', verifyToken, ip })

describe('kartu anggota', () => {
  it('Mahasiswa/Profesional: data kartu lewat token pribadi, status mengikuti Sheet', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    const pending = card(env, res.receiptToken)
    expect(pending).toMatchObject({ ok: true, name: 'Siti Uji', category: 'student', institution: 'Universitas Uji', position: 'Kaprodi', status: 'Menunggu Verifikasi', number: res.regNumber, validUntil: '', locale: 'id' })
    expect(pending.verifyToken).toMatch(/^[0-9a-f]{64}$/)
    expect(pending.verifyToken).not.toBe(res.receiptToken)

    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const active = card(env, res.receiptToken)
    expect(active.status).toBe('Aktif')
    expect(active.validUntil).toMatch(/^\d{4}-\d\d-\d\dT/)
  })

  it('kartu hanya bisa diambil dengan token pribadi, bukan token QR, nomor, atau tebakan', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    const c = card(env, res.receiptToken)
    expect(card(env, c.verifyToken).error).toBe('not_found')
    expect(card(env, res.regNumber).error).toBe('not_found')
    expect(card(env, '0'.repeat(64)).error).toBe('not_found')
    expect(card(env, '').error).toBe('not_found')
  })

  it('PIC Corporate: pendaftaran perusahaan tanpa kartu; kartu PIC ada di tab Anggota (kursi 1)', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env, corp, 'corporate')
    expect(card(env, res.receiptToken).error).toBe('not_found')
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const picToken = sheetRows(env, 'Anggota')[0][16] as string
    expect(card(env, picToken)).toMatchObject({ ok: true, name: 'Budi PIC', category: 'corporate', institution: 'PT Inovasi Uji', status: 'Aktif', number: `${res.regNumber}-1` })
  })

  it('anggota dari kode: kartu aktif dengan institusi perusahaan', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    const a = claim(env, codes[1])
    expect(card(env, a.receiptToken)).toMatchObject({ name: 'Rina Rekan', institution: 'PT Inovasi Uji', status: 'Aktif', position: 'Staf' })
  })

  it('kartu anggota yang dinonaktifkan berstatus Nonaktif', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    const a = claim(env, codes[1])
    run(env, 'replaceSeat', 3)
    expect(card(env, a.receiptToken).status).toBe('Nonaktif')
  })
})

describe('verifikasi publik', () => {
  it('hanya memuat nama, kategori, institusi, status, berlaku s.d.', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    const vt = card(env, res.receiptToken).verifyToken
    setRegCell(env, 1, 'Status', 'Aktif')
    processAll(env)
    const got = verify(env, vt)
    expect(Object.keys(got).sort()).toEqual(['category', 'institution', 'name', 'ok', 'status', 'validUntil'])
    expect(got).toMatchObject({ ok: true, name: 'Siti Uji', category: 'student', institution: 'Universitas Uji', status: 'Aktif' })
    const text = JSON.stringify(got)
    for (const secret of ['siti@example.com', '081234567890', 'Kaprodi', res.regNumber, String(env.ss.getSheetByName('Pendaftaran')!.rows[1][H(env, 'Nominal Transfer (Rp)')])]) {
      expect(text).not.toContain(secret)
    }
  })

  it('token pribadi tidak bisa dipakai di halaman verifikasi, dan sebaliknya', () => {
    const env = createRegistryEnv()
    const { res } = fullRegister(env)
    expect(verify(env, res.receiptToken).error).toBe('not_found')
    expect(verify(env, 'x').error).toBe('not_found')
  })

  it('anggota Corporate: institusi tampil, status mengikuti kartu', () => {
    const env = createRegistryEnv()
    const codes = verifiedCompany(env)
    const a = claim(env, codes[1])
    const vt = card(env, a.receiptToken).verifyToken
    expect(verify(env, vt)).toMatchObject({ name: 'Rina Rekan', category: 'corporate', institution: 'PT Inovasi Uji', status: 'Aktif' })
    run(env, 'replaceSeat', 3)
    expect(verify(env, vt).status).toBe('Nonaktif')
  })

  it('dibatasi 60 permintaan per 10 menit per IP', () => {
    const env = createRegistryEnv()
    for (let i = 0; i < 60; i++) expect(verify(env, '0'.repeat(64), '7.7.7.7').error).toBe('not_found')
    expect(verify(env, '0'.repeat(64), '7.7.7.7').error).toBe('rate_limited')
  })
})
