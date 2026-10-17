// Pencatatan pendaftaran ke Google Sheet lewat Apps Script Web App,
// tanpa service account dan tanpa dependency tambahan.
//
// Cara mengaktifkan (sekali saja, oleh pengurus):
//   1. Buka Google Sheet rekap pendaftaran milik asosiasi.inopi@gmail.com.
//   2. Menu Extensions → Apps Script, hapus isi Code.gs, tempel skrip di
//      bawah ini (lihat dokumentasi README bagian Registrasi), lalu Save.
//   3. Deploy → New deployment → tipe "Web app".
//        Execute as : Me
//        Who has access : Anyone
//      (akses "Anyone" diperlukan karena yang memanggil adalah server, bukan
//      pengguna yang login dengan akun Google. URL deployment-nya acak/sulit
//      ditebak dan hanya bisa dipakai untuk menambah baris, bukan membaca.)
//   4. Salin "Web app URL" hasil deploy, set sebagai env var SHEET_WEBHOOK_URL
//      di Vercel.
//
// Bila SHEET_WEBHOOK_URL belum diisi, pencatatan dilewati tanpa error —
// email notifikasi dan log server tetap menjadi sumber pencatatan utama.

interface SheetRow {
  registrationId: string
  submittedAt: Date
  category: string
  amount: number
  nama: string
  email: string
  hp: string
  institusi: string
  bidang?: string
  jabatan?: string
  alasan?: string
  infoKegiatan?: boolean
}

export interface SheetResult {
  recorded: boolean
  reason?: string
}

export async function appendToSheet(row: SheetRow): Promise<SheetResult> {
  const url = process.env.SHEET_WEBHOOK_URL
  if (!url) {
    return { recorded: false, reason: 'not_configured' }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registrationId: row.registrationId,
        submittedAt: row.submittedAt.toISOString(),
        category: row.category,
        amount: row.amount,
        nama: row.nama,
        email: row.email,
        hp: row.hp,
        institusi: row.institusi,
        bidang: row.bidang ?? '',
        jabatan: row.jabatan ?? '',
        alasan: row.alasan ?? '',
        infoKegiatan: Boolean(row.infoKegiatan),
      }),
      // Apps Script Web App mengirim redirect 302 sebelum balasan akhir;
      // follow (default) diperlukan agar fetch tidak gagal di langkah ini.
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      console.error('[sheet] Gagal mencatat, status:', res.status)
      return { recorded: false, reason: `http_${res.status}` }
    }

    return { recorded: true }
  } catch (err) {
    console.error('[sheet] Error saat mencatat ke Sheet:', err)
    return { recorded: false, reason: 'network_error' }
  }
}

/**
 * Skrip untuk ditempel di Extensions → Apps Script pada Google Sheet tujuan.
 * Disediakan sebagai string agar mudah disalin dari sini; tidak dieksekusi
 * oleh aplikasi Next.js.
 */
export const APPS_SCRIPT_SOURCE = `
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Pendaftaran') || ss.insertSheet('Pendaftaran');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Waktu Submit', 'No. Registrasi', 'Kategori', 'Iuran (Rp)',
      'Nama', 'Email', 'No. HP', 'Institusi', 'Bidang', 'Status Pembayaran',
      'Jabatan', 'Alasan Bergabung', 'Bersedia Terima Info'
    ]);
    sheet.setFrozenRows(1);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(data.submittedAt),
    data.registrationId,
    data.category,
    data.amount,
    data.nama,
    data.email,
    data.hp,
    data.institusi,
    data.bidang || '-',
    'Menunggu Pembayaran',
    data.jabatan || '-',
    data.alasan || '-',
    data.infoKegiatan ? 'Ya' : 'Tidak'
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
`.trim()
