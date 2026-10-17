/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * INOPI Registry: Google Apps Script yang menjadi "database" pendaftaran anggota.
 *
 * Dipasang di Google Sheet asosiasi (Extensions > Apps Script) dan di-deploy sebagai
 * Web app. Hanya server website yang memanggilnya; setiap permintaan wajib membawa
 * `secret` yang sama dengan Script Property API_SECRET. Panduan pasang: apps-script/README.md
 *
 * Semua penulisan berjalan di bawah LockService, sehingga nomor pendaftaran, kode unik
 * transfer, dan klaim kursi tidak bisa bentrok walau dua orang mendaftar bersamaan.
 *
 * Berkas ini murni JavaScript tanpa impor agar bisa ditempel apa adanya ke Apps Script
 * dan diuji lokal dengan layanan Google tiruan (tests/registry).
 */

var CFG = {
  SHEET_REG: 'Pendaftaran',
  SHEET_RES: 'Reservasi',
  SHEET_UP: 'Unggahan',
  SHEET_ORG: 'Perusahaan',
  SHEET_SEAT: 'Kursi',
  FOLDER_NAME: 'INOPI - Bukti Transfer',
  PRICES: { student: 250000, professional: 500000, corporate: 5000000 },
  LETTER: { student: 'S', professional: 'P', corporate: 'C' },
  CORPORATE_SEATS: 3,
  SEAT_AVAILABLE: 'Tersedia',
  CODE_MIN: 1,
  CODE_MAX: 999,
  RESERVE_HOURS: 24,
  MAX_PROOF_BYTES: 4 * 1024 * 1024,
  LOCK_MS: 25000,
  TZ: 'Asia/Jakarta',
  STATUS_PENDING: 'Menunggu Verifikasi',
  STATUS_ACTIVE: 'Aktif',
  STATUS_REJECTED: 'Ditolak',
  RATE: {
    reserve: { limit: 10, windowSec: 600 },
    upload: { limit: 10, windowSec: 600 },
    register: { limit: 8, windowSec: 600 },
  },
};

var REG_HEADERS = [
  'Waktu Daftar', 'No. Pendaftaran', 'Kategori', 'Status', 'Alasan Penolakan',
  'Iuran (Rp)', 'Kode Unik', 'Nominal Transfer (Rp)',
  'Nama Lengkap', 'Email', 'WhatsApp', 'Pekerjaan', 'Jabatan', 'Institusi', 'Negara',
  'Bukti Transfer', 'Berlaku s.d.', 'Diverifikasi Pada', 'Bahasa', 'Persetujuan PDP',
  'Token Terima Kasih', 'Token Verifikasi', 'No. Anggota',
];
var RES_HEADERS = ['Token', 'Kategori', 'Kode Unik', 'Berlaku Sampai', 'Terpakai Pada', 'No. Pendaftaran'];
var UP_HEADERS = ['Token', 'File ID', 'Tipe', 'Ukuran (byte)', 'Dibuat', 'Terpakai Pada'];
var ORG_HEADERS = [
  'ID Perusahaan', 'No. Pendaftaran', 'Nama Institusi', 'Negara',
  'Nama PIC', 'Jabatan PIC', 'Email PIC', 'WhatsApp PIC',
  'PIC Memakai Kursi 1', 'Butuh Invoice', 'Alamat Penagihan', 'Dibuat',
];
// Kode Kursi sengaja kosong sampai Bendahara mengaktifkan pendaftaran; kursi tanpa kode tidak bisa dipakai.
var SEAT_HEADERS = [
  'ID Perusahaan', 'No. Pendaftaran', 'Kursi Ke', 'Kode Kursi', 'Status Kursi',
  'Nama Pemegang', 'Email Pemegang', 'Diklaim Pada',
];

var ALLOWED_PROOF_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
var PROOF_EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'application/pdf': 'pdf' };

// ---------------------------------------------------------------------------
// Titik masuk
// ---------------------------------------------------------------------------

function doPost(e) {
  var out;
  try {
    out = handleRequest(JSON.parse(e.postData.contents));
  } catch (err) {
    out = { ok: false, error: 'bad_request' };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

/** GET hanya untuk memeriksa bahwa web app hidup (tanpa data apa pun). */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'inopi-registry' })).setMimeType(
    ContentService.MimeType.JSON
  );
}

var ACTIONS = {
  reserve: actionReserve,
  upload: actionUpload,
  register: actionRegister,
  receipt: actionReceipt,
};

function handleRequest(body) {
  if (!body || typeof body !== 'object') return fail('bad_request');
  var secret = prop('API_SECRET');
  if (!secret) return fail('not_configured');
  if (!safeEqual(String(body.secret || ''), secret)) return fail('unauthorized');
  var action = ACTIONS[body.action];
  if (!action) return fail('unknown_action');

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(CFG.LOCK_MS);
  } catch (err) {
    return fail('busy');
  }
  try {
    var limit = CFG.RATE[body.action];
    if (limit && !withinRateLimit(body.action, String(body.ip || 'unknown'), limit)) return fail('rate_limited');
    ensureSheets();
    return action(body);
  } catch (err) {
    if (err && err.isRegistryError) return fail(err.code);
    console.error('registry error', err && err.stack ? err.stack : err);
    return fail('server_error');
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Aksi
// ---------------------------------------------------------------------------

/** Memesan kode unik transfer sebelum pendaftaran dikirim (kode tampil di layar pembayaran). */
function actionReserve(req) {
  var category = req.category;
  if (!CFG.PRICES[category]) throw regErr('invalid_category');
  var now = new Date();
  purgeReservations(now);

  var used = {};
  var regs = readRows(sheet(CFG.SHEET_REG));
  for (var i = 0; i < regs.length; i++) {
    var r = regs[i];
    if (r[col('Kategori')] === category && r[col('Status')] === CFG.STATUS_PENDING) used[Number(r[col('Kode Unik')])] = true;
  }
  var ress = readRows(sheet(CFG.SHEET_RES));
  for (var j = 0; j < ress.length; j++) {
    var s = ress[j];
    if (s[1] === category && !s[4]) used[Number(s[2])] = true;
  }
  var free = [];
  for (var c = CFG.CODE_MIN; c <= CFG.CODE_MAX; c++) if (!used[c]) free.push(c);
  if (free.length === 0) throw regErr('codes_exhausted');

  var code = free[Math.floor(Math.random() * free.length)];
  var token = newToken();
  var expiresAt = new Date(now.getTime() + CFG.RESERVE_HOURS * 3600 * 1000);
  sheet(CFG.SHEET_RES).appendRow([token, category, code, expiresAt, '', '']);
  return ok({ token: token, uniqueCode: code, transferAmount: CFG.PRICES[category] + code, expiresAt: expiresAt.toISOString() });
}

/** Menyimpan bukti transfer ke folder Drive privat. */
function actionUpload(req) {
  var mime = String(req.mime || '');
  if (ALLOWED_PROOF_TYPES.indexOf(mime) < 0) throw regErr('invalid_file_type');
  var bytes;
  try {
    bytes = Utilities.base64Decode(String(req.dataBase64 || ''));
  } catch (err) {
    throw regErr('invalid_file');
  }
  if (!bytes || bytes.length === 0) throw regErr('invalid_file');
  if (bytes.length > CFG.MAX_PROOF_BYTES) throw regErr('file_too_large');
  if (sniffType(bytes) !== mime) throw regErr('invalid_file_type');

  var now = new Date();
  var token = newToken();
  var file = proofFolder().createFile(Utilities.newBlob(bytes, mime, 'unggahan-' + token.slice(0, 12) + '.' + PROOF_EXT[mime]));
  file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
  sheet(CFG.SHEET_UP).appendRow([token, file.getId(), mime, bytes.length, now, '']);
  return ok({ uploadToken: token });
}

function actionRegister(req) {
  var category = req.category;
  if (!CFG.PRICES[category]) throw regErr('invalid_category');
  var corporate = category === 'corporate';
  var data = corporate ? validateCorporate(req) : validateRegistrant(req);
  if (req.consent !== true) throw regErr('consent_required');

  var resSheet = sheet(CFG.SHEET_RES);
  var resRow = findRow(resSheet, 0, String(req.reservationToken || ''));
  if (!resRow) throw regErr('reservation_not_found');
  var res = resRow.values;

  // Pengiriman ganda dengan pesanan yang sama: kembalikan pendaftaran yang sudah ada.
  if (res[4]) {
    var existing = findRow(sheet(CFG.SHEET_REG), col('No. Pendaftaran'), String(res[5]));
    if (existing && String(existing.values[col('Email')]).toLowerCase() === data.email.toLowerCase()) {
      return ok(receiptOf(existing.values));
    }
    throw regErr('reservation_used');
  }
  if (res[1] !== category) throw regErr('reservation_mismatch');

  var upSheet = sheet(CFG.SHEET_UP);
  var upRow = findRow(upSheet, 0, String(req.uploadToken || ''));
  if (!upRow || upRow.values[5]) throw regErr('upload_not_found');

  var now = new Date();
  var yy = Utilities.formatDate(now, CFG.TZ, 'yy');
  var letter = CFG.LETTER[category];
  var seq = nextSequence(yy, letter);
  var regNumber = 'INP-' + yy + '-' + letter + '-' + pad(seq, 4);
  var code = Number(res[2]);
  var base = CFG.PRICES[category];

  var fileId = String(upRow.values[1]);
  var file = DriveApp.getFileById(fileId);
  file.setName(regNumber + '.' + PROOF_EXT[String(upRow.values[2])]);
  file.setDescription('Bukti transfer ' + regNumber);

  var receiptToken = newToken();
  var verifyToken = newToken();
  var values = [];
  values[col('Waktu Daftar')] = now;
  values[col('No. Pendaftaran')] = regNumber;
  values[col('Kategori')] = category;
  values[col('Status')] = CFG.STATUS_PENDING;
  values[col('Alasan Penolakan')] = '';
  values[col('Iuran (Rp)')] = base;
  values[col('Kode Unik')] = code;
  values[col('Nominal Transfer (Rp)')] = base + code;
  values[col('Nama Lengkap')] = safeCell(data.name);
  values[col('Email')] = safeCell(data.email);
  values[col('WhatsApp')] = safeCell(data.whatsapp);
  values[col('Pekerjaan')] = safeCell(data.occupation);
  values[col('Jabatan')] = safeCell(data.position);
  values[col('Institusi')] = safeCell(data.institution);
  values[col('Negara')] = data.country;
  values[col('Bukti Transfer')] = '=HYPERLINK("https://drive.google.com/file/d/' + fileId + '/view","Lihat bukti")';
  values[col('Berlaku s.d.')] = '';
  values[col('Diverifikasi Pada')] = '';
  values[col('Bahasa')] = data.locale;
  values[col('Persetujuan PDP')] = now;
  values[col('Token Terima Kasih')] = receiptToken;
  values[col('Token Verifikasi')] = verifyToken;
  values[col('No. Anggota')] = regNumber;
  sheet(CFG.SHEET_REG).appendRow(values);

  if (corporate) createOrganization(regNumber, yy, seq, data, now);

  resSheet.getRange(resRow.row, 5, 1, 2).setValues([[now, regNumber]]);
  upSheet.getRange(upRow.row, 6, 1, 1).setValues([[now]]);

  notifyTreasurer(regNumber, category, data, base + code);
  return ok({ receiptToken: receiptToken, regNumber: regNumber, category: category, status: CFG.STATUS_PENDING, transferAmount: base + code });
}

/** Ringkasan untuk halaman terima kasih; dicari lewat token acak, bukan nomor pendaftaran. */
function actionReceipt(req) {
  var row = findRow(sheet(CFG.SHEET_REG), col('Token Terima Kasih'), String(req.receiptToken || ''));
  if (!row) throw regErr('not_found');
  return ok(receiptOf(row.values));
}

// ---------------------------------------------------------------------------
// Pembantu: data
// ---------------------------------------------------------------------------

function receiptOf(v) {
  return {
    receiptToken: v[col('Token Terima Kasih')],
    regNumber: v[col('No. Pendaftaran')],
    category: v[col('Kategori')],
    status: v[col('Status')],
    transferAmount: Number(v[col('Nominal Transfer (Rp)')]),
    locale: v[col('Bahasa')],
    verifyToken: v[col('Token Verifikasi')],
  };
}

function validateRegistrant(req) {
  var name = clean(req.name, 120);
  var email = clean(req.email, 160);
  var whatsapp = clean(req.whatsapp, 32);
  var occupation = clean(req.occupation, 120);
  var position = clean(req.position, 120);
  var institution = clean(req.institution, 160);
  var country = String(req.country || '').toUpperCase();
  var locale = req.locale === 'en' ? 'en' : 'id';
  if (name.length < 2) throw regErr('invalid_name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw regErr('invalid_email');
  if (whatsapp.replace(/\D/g, '').length < 8) throw regErr('invalid_whatsapp');
  if (occupation.length < 2) throw regErr('invalid_occupation');
  if (institution.length < 2) throw regErr('invalid_institution');
  if (!/^[A-Z]{2}$/.test(country)) throw regErr('invalid_country');
  return { name: name, email: email, whatsapp: whatsapp, occupation: occupation, position: position, institution: institution, country: country, locale: locale };
}

/**
 * Pendaftaran Corporate: PIC mendaftarkan institusinya. Dipetakan ke kolom Pendaftaran yang sama
 * (Nama = PIC, Institusi = nama perusahaan/kampus, Pekerjaan = jabatan PIC).
 */
function validateCorporate(req) {
  var org = clean(req.organization, 160);
  if (clean(req.position, 120).length < 2) throw regErr('invalid_position');
  var base = validateRegistrant({
    name: req.name, email: req.email, whatsapp: req.whatsapp,
    occupation: req.position, position: req.position, institution: org,
    country: req.country, locale: req.locale,
  });
  var needInvoice = req.needInvoice === true;
  var billing = clean(req.billingAddress, 400);
  if (needInvoice && billing.length < 10) throw regErr('invalid_billing');
  base.useSeat1 = req.useSeat1 !== false;
  base.needInvoice = needInvoice;
  base.billingAddress = needInvoice ? billing : '';
  return base;
}

/** Mencatat Perusahaan dan 3 kursi "Tersedia" (belum berkode, belum bisa dipakai). */
function createOrganization(regNumber, yy, seq, data, now) {
  var orgId = 'ORG-' + yy + '-' + pad(seq, 4);
  sheet(CFG.SHEET_ORG).appendRow([
    orgId, regNumber, safeCell(data.institution), data.country,
    safeCell(data.name), safeCell(data.position), safeCell(data.email), safeCell(data.whatsapp),
    data.useSeat1 ? 'Ya' : 'Tidak', data.needInvoice ? 'Ya' : 'Tidak', safeCell(data.billingAddress), now,
  ]);
  var seats = [];
  for (var n = 1; n <= CFG.CORPORATE_SEATS; n++) seats.push([orgId, regNumber, n, '', CFG.SEAT_AVAILABLE, '', '', '']);
  var sh = sheet(CFG.SHEET_SEAT);
  sh.getRange(sh.getLastRow() + 1, 1, seats.length, SEAT_HEADERS.length).setValues(seats);
}

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}

/** Mencegah sel dibaca sebagai rumus (=, +, -, @) saat ditulis ke Sheet. */
function safeCell(v) {
  var s = String(v == null ? '' : v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function notifyTreasurer(regNumber, category, data, amount) {
  try {
    var to = prop('NOTIFY_EMAIL') || Session.getEffectiveUser().getEmail();
    MailApp.sendEmail({
      to: to,
      subject: '[INOPI] Pendaftaran baru ' + regNumber + ' (' + category + ')',
      body:
        'Pendaftaran keanggotaan baru menunggu verifikasi.\n\n' +
        'No. pendaftaran : ' + regNumber + '\n' +
        'Kategori        : ' + category + '\n' +
        'Nominal transfer: Rp ' + amount + '\n' +
        'Nama            : ' + data.name + '\n' +
        'Institusi       : ' + data.institution + '\n' +
        (category === 'corporate'
          ? 'Butuh invoice   : ' + (data.needInvoice ? 'Ya (alamat di tab "' + CFG.SHEET_ORG + '")' : 'Tidak') + '\n'
          : '') +
        '\n' +
        'Cocokkan nominal dengan mutasi rekening, lalu ubah kolom Status di tab "' + CFG.SHEET_REG + '".',
    });
  } catch (err) {
    console.error('notifikasi gagal', err);
  }
}

// ---------------------------------------------------------------------------
// Pembantu: Sheet dan Drive
// ---------------------------------------------------------------------------

function col(name) {
  var i = REG_HEADERS.indexOf(name);
  if (i < 0) throw new Error('Kolom tidak dikenal: ' + name);
  return i;
}

function sheet(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

function ensureSheets() {
  ensureSheet(CFG.SHEET_REG, REG_HEADERS, false);
  ensureSheet(CFG.SHEET_RES, RES_HEADERS, true);
  ensureSheet(CFG.SHEET_UP, UP_HEADERS, true);
  ensureSheet(CFG.SHEET_ORG, ORG_HEADERS, false);
  ensureSheet(CFG.SHEET_SEAT, SEAT_HEADERS, false);
}

function ensureSheet(name, headers, hidden) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (sh) return sh;
  // Spreadsheet baru memiliki satu tab kosong bernama Sheet1/Lembar1: pakai itu untuk tab utama.
  if (name === CFG.SHEET_REG) {
    var starter = ss.getSheetByName('Sheet1') || ss.getSheetByName('Lembar1');
    if (starter && starter.getLastRow() === 0) {
      starter.setName(name);
      sh = starter;
    }
  }
  if (!sh) sh = ss.insertSheet(name);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  sh.setFrozenRows(1);
  if (name === CFG.SHEET_REG && typeof SpreadsheetApp.newDataValidation === 'function') {
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList([CFG.STATUS_PENDING, CFG.STATUS_ACTIVE, CFG.STATUS_REJECTED], true)
      .setAllowInvalid(false)
      .build();
    sh.getRange(2, col('Status') + 1, 1000, 1).setDataValidation(rule);
  }
  if (hidden && typeof sh.hideSheet === 'function') sh.hideSheet();
  return sh;
}

/** Baris data (tanpa judul) sebagai array nilai. */
function readRows(sh) {
  var last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, headerWidth(sh)).getValues();
}

function headerWidth(sh) {
  var all = {};
  all[CFG.SHEET_REG] = REG_HEADERS;
  all[CFG.SHEET_RES] = RES_HEADERS;
  all[CFG.SHEET_UP] = UP_HEADERS;
  all[CFG.SHEET_ORG] = ORG_HEADERS;
  all[CFG.SHEET_SEAT] = SEAT_HEADERS;
  return all[sh.getName()].length;
}

/** Mencari baris yang kolom `colIndex`-nya sama persis dengan `value`. */
function findRow(sh, colIndex, value) {
  if (!value) return null;
  var rows = readRows(sh);
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][colIndex]) === value) return { row: i + 2, values: rows[i] };
  }
  return null;
}

function purgeReservations(now) {
  var sh = sheet(CFG.SHEET_RES);
  var rows = readRows(sh);
  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    var consumed = r[4];
    if (!consumed && toDate(r[3]) < now) {
      sh.deleteRow(i + 2); // kedaluwarsa dan belum dipakai: kode bebas kembali
    } else if (consumed && now.getTime() - toDate(consumed).getTime() > 30 * 24 * 3600 * 1000) {
      sh.deleteRow(i + 2); // catatan lama yang sudah dipakai
    }
  }
}

function proofFolder() {
  var id = prop('FOLDER_ID');
  if (id) return DriveApp.getFolderById(id);
  var folder = DriveApp.createFolder(CFG.FOLDER_NAME);
  folder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
  PropertiesService.getScriptProperties().setProperty('FOLDER_ID', folder.getId());
  return folder;
}

function nextSequence(yy, letter) {
  var key = 'seq:' + yy + ':' + letter;
  var props = PropertiesService.getScriptProperties();
  var next = Number(props.getProperty(key) || 0) + 1;
  props.setProperty(key, String(next));
  return next;
}

// ---------------------------------------------------------------------------
// Pembantu: umum
// ---------------------------------------------------------------------------

function ok(data) {
  data.ok = true;
  return data;
}
function fail(code) {
  return { ok: false, error: code };
}
function regErr(code) {
  var e = new Error(code);
  e.isRegistryError = true;
  e.code = code;
  return e;
}
function prop(name) {
  return PropertiesService.getScriptProperties().getProperty(name);
}
function pad(n, width) {
  var s = String(n);
  while (s.length < width) s = '0' + s;
  return s;
}
function toDate(v) {
  return v instanceof Date ? v : new Date(v);
}

/** Token acak ≥ 128 bit (dua UUID v4 = 244 bit acak), huruf kecil heksadesimal. */
function newToken() {
  return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Tipe berkas dari ISI (magic bytes). Byte di Apps Script bertanda (-128..127). */
function sniffType(bytes) {
  function b(i) {
    return bytes[i] & 0xff;
  }
  if (bytes.length >= 3 && b(0) === 0xff && b(1) === 0xd8 && b(2) === 0xff) return 'image/jpeg';
  var png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length >= 8) {
    var isPng = true;
    for (var i = 0; i < 8; i++) if (b(i) !== png[i]) isPng = false;
    if (isPng) return 'image/png';
  }
  if (bytes.length >= 5 && b(0) === 0x25 && b(1) === 0x50 && b(2) === 0x44 && b(3) === 0x46 && b(4) === 0x2d) return 'application/pdf';
  return null;
}

/** Pembatas laju per tindakan dan IP (CacheService; dijalankan di dalam kunci). */
function withinRateLimit(action, ip, limit) {
  var cache = CacheService.getScriptCache();
  var key = 'rl:' + action + ':' + ip;
  var n = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(n), limit.windowSec);
  return n <= limit.limit;
}
