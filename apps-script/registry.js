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
  SHEET_MEM: 'Anggota',
  SHEET_LOG: 'Log',
  FOLDER_NAME: 'INOPI - Bukti Transfer',
  PRICES: { student: 250000, professional: 500000, corporate: 5000000 },
  LETTER: { student: 'S', professional: 'P', corporate: 'C' },
  CORPORATE_SEATS: 3,
  SEAT_AVAILABLE: 'Tersedia',
  SEAT_USED: 'Terpakai',
  SEAT_DISABLED: 'Dinonaktifkan',
  MEMBER_ACTIVE: 'Aktif',
  MEMBER_INACTIVE: 'Nonaktif',
  // Masa berlaku: 'one_year_from_verification' atau 'fixed_date' (sama dengan lib/membership/config.ts).
  VALIDITY_MODE: 'one_year_from_verification',
  FIXED_VALID_UNTIL: '2027-12-31T23:59:59+07:00',
  // Tanpa huruf/angka yang mudah tertukar (0/O, 1/I/L).
  CODE_ALPHABET: 'ABCDEFGHJKMNPQRSTUVWXYZ23456789',
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
    validateCode: { limit: 10, windowSec: 600 },
    registerCode: { limit: 10, windowSec: 600 },
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
// Anggota kursi Corporate (termasuk PIC bila memakai kursi 1). Anggota Mahasiswa/Profesional = baris di tab Pendaftaran.
var MEM_HEADERS = [
  'No. Anggota', 'Nama Lengkap', 'Email', 'WhatsApp', 'Pekerjaan', 'Jabatan', 'Institusi', 'Negara',
  'No. Pendaftaran Corporate', 'Kursi Ke', 'Kode Kursi', 'Status', 'Berlaku s.d.', 'Bahasa',
  'Persetujuan PDP', 'Token Verifikasi', 'Token Terima Kasih', 'Dibuat',
];
var LOG_HEADERS = ['Waktu', 'Aksi', 'Rujukan', 'Pelaku', 'Detail'];
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
  validateCode: actionValidateCode,
  registerCode: actionRegisterCode,
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
  emitEvent('registered', regNumber, category + ' Rp ' + (base + code), { regNumber: regNumber, category: category, locale: data.locale });
  return ok({ receiptToken: receiptToken, regNumber: regNumber, category: category, status: CFG.STATUS_PENDING, transferAmount: base + code });
}

/** Ringkasan untuk halaman terima kasih; dicari lewat token acak, bukan nomor pendaftaran. */
function actionReceipt(req) {
  var token = String(req.receiptToken || '');
  var row = findRow(sheet(CFG.SHEET_REG), col('Token Terima Kasih'), token);
  if (row) return ok(receiptOf(row.values));
  var mem = findRow(sheet(CFG.SHEET_MEM), 16, token);
  if (mem) return ok(memberReceiptOf(mem.values));
  throw regErr('not_found');
}

// ---------------------------------------------------------------------------
// Daftar dengan kode kursi Corporate (tanpa pembayaran)
// ---------------------------------------------------------------------------

function normalizeSeatCode(v) {
  return String(v == null ? '' : v).replace(/\s+/g, '').toUpperCase().slice(0, 40);
}

/**
 * Memeriksa kode kursi. Melempar galat yang jelas: code_not_found, seat_disabled, seat_used,
 * org_not_verified. Mengembalikan baris kursi, pendaftaran perusahaan, dan data perusahaan.
 */
function lookupSeat(code) {
  if (!/^CORP-\d{4,}-[1-9]-[A-Z2-9]{4}$/.test(code)) throw regErr('code_not_found');
  var seat = findRow(sheet(CFG.SHEET_SEAT), 3, code);
  if (!seat) throw regErr('code_not_found');
  var st = seat.values[4];
  if (st === CFG.SEAT_DISABLED) throw regErr('seat_disabled');
  var reg = findRow(sheet(CFG.SHEET_REG), col('No. Pendaftaran'), String(seat.values[1]));
  var org = findRow(sheet(CFG.SHEET_ORG), 1, String(seat.values[1]));
  if (!reg || !org) throw regErr('code_not_found');
  if (st === CFG.SEAT_USED) throw regErr('seat_used');
  if (reg.values[col('Status')] !== CFG.STATUS_ACTIVE) throw regErr('org_not_verified');
  return { seat: seat, reg: reg, org: org };
}

function actionValidateCode(req) {
  var found = lookupSeat(normalizeSeatCode(req.code));
  return ok({
    organization: found.org.values[2],
    country: found.org.values[3],
    seat: Number(found.seat.values[2]),
    seats: CFG.CORPORATE_SEATS,
  });
}

/** Seorang rekan memakai kode kursi: kursi ditandai Terpakai dan kartu aktif langsung dibuat. */
function actionRegisterCode(req) {
  var code = normalizeSeatCode(req.code);
  var data = validateRegistrant({
    name: req.name, email: req.email, whatsapp: req.whatsapp, occupation: req.occupation,
    position: req.position, institution: 'xx', country: 'ID', locale: req.locale,
  });
  if (req.consent !== true) throw regErr('consent_required');

  // Kirim ganda dengan kode dan email yang sama: kembalikan anggota yang sudah ada.
  var prior = findRow(sheet(CFG.SHEET_MEM), 10, code);
  if (prior) {
    if (prior.values[11] !== CFG.MEMBER_ACTIVE) throw regErr('seat_disabled');
    if (String(prior.values[2]).toLowerCase() === data.email.toLowerCase()) return ok(memberReceiptOf(prior.values));
    throw regErr('seat_used');
  }

  var found = lookupSeat(code);
  var reg = String(found.seat.values[1]);
  var seatNo = Number(found.seat.values[2]);

  // Satu email tidak boleh memegang dua kursi di perusahaan yang sama.
  var members = readRows(sheet(CFG.SHEET_MEM));
  for (var i = 0; i < members.length; i++) {
    var m = members[i];
    if (String(m[8]) === reg && m[11] === CFG.MEMBER_ACTIVE && String(m[2]).toLowerCase() === data.email.toLowerCase()) throw regErr('already_member');
  }

  var now = new Date();
  var validUntil = toDate(found.reg.values[col('Berlaku s.d.')]);
  var p = [];
  p[col('Nama Lengkap')] = data.name;
  p[col('Email')] = data.email;
  p[col('WhatsApp')] = data.whatsapp;
  p[col('Pekerjaan')] = data.occupation;
  p[col('Jabatan')] = data.position;
  p[col('Institusi')] = found.org.values[2];
  p[col('Negara')] = found.org.values[3];
  p[col('Bahasa')] = data.locale;
  p[col('Persetujuan PDP')] = now;
  var number = addMember(reg, seatNo, code, p, validUntil, now);

  sheet(CFG.SHEET_SEAT).getRange(found.seat.row, 5, 1, 4).setValues([[CFG.SEAT_USED, safeCell(data.name), safeCell(data.email), now]]);
  emitEvent('seat_claimed', number, code, {
    regNumber: reg, memberNumber: number, seat: seatNo, locale: data.locale,
    picEmail: found.org.values[6], organization: found.org.values[2],
  });
  var mem = findRow(sheet(CFG.SHEET_MEM), 0, number);
  return ok(memberReceiptOf(mem.values));
}

function memberReceiptOf(v) {
  return {
    kind: 'member',
    receiptToken: v[16],
    regNumber: v[0],
    category: 'corporate',
    status: v[11],
    institution: v[6],
    validUntil: toDate(v[12]).toISOString(),
    locale: v[13],
    verifyToken: v[15],
  };
}

// ---------------------------------------------------------------------------
// Pembantu: data
// ---------------------------------------------------------------------------

function receiptOf(v) {
  return {
    kind: 'registration',
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
  ensureSheet(CFG.SHEET_MEM, MEM_HEADERS, false);
  ensureSheet(CFG.SHEET_LOG, LOG_HEADERS, false);
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
  formatSheet(sh, name);
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
  all[CFG.SHEET_MEM] = MEM_HEADERS;
  all[CFG.SHEET_LOG] = LOG_HEADERS;
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

// ---------------------------------------------------------------------------
// Verifikasi oleh Bendahara (langsung di Google Sheet)
// ---------------------------------------------------------------------------
//
// Bendahara mengubah kolom Status di tab Pendaftaran lewat dropdown. Pemicu onEdit
// (dipasang sekali dengan installTriggers) memanggil processStatusChanges, yang
// merekonsiliasi SELURUH tab: setiap baris diproses paling banyak sekali (ditandai
// kolom "Diverifikasi Pada"), sehingga aman dijalankan ulang kapan saja dari menu.

function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('INOPI')
      .addItem('Proses status sekarang', 'menuProcessStatuses')
      .addItem('Nonaktifkan kursi terpilih & terbitkan kode pengganti', 'menuReplaceSeats')
      .addSeparator()
      .addItem('Pasang pemicu otomatis (sekali saja)', 'installTriggers')
      .addToUi();
  } catch (err) {
    // Menu hanya tersedia saat Sheet dibuka di browser.
  }
}

/** Dijalankan Bendahara/Admin sekali setelah memasang skrip: membuat pemicu onEdit yang berhak mengirim email. */
function installTriggers() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var existing = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].getHandlerFunction() === 'onEditInstalled') ScriptApp.deleteTrigger(existing[i]);
  }
  ScriptApp.newTrigger('onEditInstalled').forSpreadsheet(ss).onEdit().create();
  notify('Pemicu otomatis terpasang. Mengubah kolom Status kini langsung diproses.');
}

function onEditInstalled(e) {
  try {
    if (e && e.range && e.range.getSheet().getName() !== CFG.SHEET_REG) return;
  } catch (err) {
    // lanjut: rekonsiliasi aman dijalankan kapan pun
  }
  processStatusChanges();
}

function menuProcessStatuses() {
  var n = processStatusChanges();
  notify(n + ' pendaftaran diproses.');
}

/** Memproses perubahan Status. Mengembalikan jumlah baris yang berubah. */
function processStatusChanges() {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(CFG.LOCK_MS);
  } catch (err) {
    notify('Sistem sedang sibuk. Ubah Status sekali lagi atau pilih menu INOPI > Proses status sekarang.');
    return 0;
  }
  try {
    ensureSheets();
    var sh = sheet(CFG.SHEET_REG);
    var rows = readRows(sh);
    var changed = 0;
    for (var i = 0; i < rows.length; i++) {
      var v = rows[i];
      if (!v[col('No. Pendaftaran')]) continue;
      var rowNo = i + 2;
      var status = String(v[col('Status')]);
      var verified = v[col('Diverifikasi Pada')];
      var reason = String(v[col('Alasan Penolakan')] || '').trim();
      var reg = String(v[col('No. Pendaftaran')]);

      if (status === CFG.STATUS_ACTIVE && !verified) {
        activateRegistration(sh, rowNo, v);
        changed++;
      } else if (status === CFG.STATUS_ACTIVE) {
        // sudah aktif dan sudah diproses: tidak ada yang dilakukan
      } else if (verified) {
        // Pendaftaran yang sudah diverifikasi tidak boleh dikembalikan atau ditolak lewat Status.
        setStatusCell(sh, rowNo, CFG.STATUS_ACTIVE);
        notify('Pendaftaran ' + reg + ' sudah aktif dan tidak bisa diubah statusnya. Nonaktifkan lewat tab Kursi bila perlu.');
      } else if (status === CFG.STATUS_REJECTED) {
        if (!reason) {
          setStatusCell(sh, rowNo, CFG.STATUS_PENDING);
          notify('Isi kolom "Alasan Penolakan" untuk ' + reg + ' lebih dulu, lalu pilih Ditolak lagi.');
        } else if (!isLogged('rejected', reg, reason)) {
          emitEvent('rejected', reg, reason, { regNumber: reg, reason: reason, locale: v[col('Bahasa')] });
          changed++;
        }
      }
    }
    return changed;
  } finally {
    lock.releaseLock();
  }
}

function setStatusCell(sh, rowNo, status) {
  sh.getRange(rowNo, col('Status') + 1, 1, 1).setValues([[status]]);
}

function activateRegistration(sh, rowNo, v) {
  var now = new Date();
  var validUntil = computeValidUntil(now);
  var reg = String(v[col('No. Pendaftaran')]);
  sh.getRange(rowNo, col('Alasan Penolakan') + 1, 1, 1).setValues([['']]);
  sh.getRange(rowNo, col('Berlaku s.d.') + 1, 1, 2).setValues([[validUntil, now]]);

  var detail = '';
  if (v[col('Kategori')] === 'corporate') {
    var codes = issueSeatCodes(reg, now, validUntil, v);
    detail = codes.length + ' kode kursi diterbitkan';
  }
  emitEvent('verified', reg, detail, {
    regNumber: reg, category: v[col('Kategori')], locale: v[col('Bahasa')], validUntil: validUntil,
  });
}

function computeValidUntil(verifiedAt) {
  if (CFG.VALIDITY_MODE === 'fixed_date') return new Date(CFG.FIXED_VALID_UNTIL);
  var d = new Date(verifiedAt.getTime());
  d.setUTCFullYear(d.getUTCFullYear() + 1);
  return d;
}

/**
 * Menerbitkan kode untuk kursi Corporate yang belum berkode dan, bila PIC memakai kursi 1,
 * menjadikan PIC pemegang kursi 1 dengan kartu aktif.
 */
function issueSeatCodes(reg, now, validUntil, regValues) {
  var seatSheet = sheet(CFG.SHEET_SEAT);
  var seatRows = readRows(seatSheet);
  var taken = {};
  for (var k = 0; k < seatRows.length; k++) if (seatRows[k][3]) taken[String(seatRows[k][3])] = true;
  var orgRow = findRow(sheet(CFG.SHEET_ORG), 1, reg);
  var usePic = orgRow && orgRow.values[8] === 'Ya';
  var issued = [];

  for (var i = 0; i < seatRows.length; i++) {
    var r = seatRows[i];
    if (String(r[1]) !== reg || r[3] || r[4] !== CFG.SEAT_AVAILABLE) continue;
    var seatNo = Number(r[2]);
    var code = newSeatCode(reg, seatNo, taken);
    taken[code] = true;
    var rowNo = i + 2;
    seatSheet.getRange(rowNo, 4, 1, 1).setValues([[code]]);
    issued.push({ seat: seatNo, code: code });
    if (seatNo === 1 && usePic) {
      seatSheet.getRange(rowNo, 5, 1, 4).setValues([[CFG.SEAT_USED, regValues[col('Nama Lengkap')], regValues[col('Email')], now]]);
      addMember(reg, 1, code, regValues, validUntil, now);
    }
  }
  return issued;
}

function newSeatCode(reg, seatNo, taken) {
  var seq = String(reg).split('-').pop();
  for (var attempt = 0; attempt < 50; attempt++) {
    var suffix = '';
    var hex = newToken();
    for (var i = 0; i < 4; i++) suffix += CFG.CODE_ALPHABET.charAt(parseInt(hex.substr(i * 2, 2), 16) % CFG.CODE_ALPHABET.length);
    var code = 'CORP-' + seq + '-' + seatNo + '-' + suffix;
    if (!taken[code]) return code;
  }
  throw new Error('gagal membuat kode kursi unik');
}

/** Menambahkan anggota pemegang kursi Corporate (kartu aktif langsung). `p` memuat nama, email, dst. */
function addMember(reg, seatNo, code, p, validUntil, now) {
  var number = reg + '-' + seatNo;
  var values = [
    number, safeCell(p[col('Nama Lengkap')]), safeCell(p[col('Email')]), safeCell(p[col('WhatsApp')]),
    safeCell(p[col('Pekerjaan')]), safeCell(p[col('Jabatan')]), safeCell(p[col('Institusi')]), p[col('Negara')],
    reg, seatNo, code, CFG.MEMBER_ACTIVE, validUntil, p[col('Bahasa')],
    p[col('Persetujuan PDP')] || now, newToken(), newToken(), now,
  ];
  sheet(CFG.SHEET_MEM).appendRow(values);
  return number;
}

/** Menonaktifkan kursi dan menerbitkan kode pengganti untuk kursi yang sama. */
function replaceSeat(seatRowNo) {
  var seatSheet = sheet(CFG.SHEET_SEAT);
  var r = seatSheet.getRange(seatRowNo, 1, 1, SEAT_HEADERS.length).getValues()[0];
  var code = String(r[3] || '');
  if (!code) throw regErr('seat_has_no_code');
  if (r[4] === CFG.SEAT_DISABLED) throw regErr('seat_already_disabled');
  var now = new Date();
  var reg = String(r[1]);

  seatSheet.getRange(seatRowNo, 5, 1, 1).setValues([[CFG.SEAT_DISABLED]]);
  var memSheet = sheet(CFG.SHEET_MEM);
  var mem = findRow(memSheet, 10, code);
  if (mem) memSheet.getRange(mem.row, 12, 1, 1).setValues([[CFG.MEMBER_INACTIVE]]);

  var taken = {};
  var all = readRows(seatSheet);
  for (var i = 0; i < all.length; i++) if (all[i][3]) taken[String(all[i][3])] = true;
  var fresh = newSeatCode(reg, Number(r[2]), taken);
  seatSheet.appendRow([r[0], reg, r[2], fresh, CFG.SEAT_AVAILABLE, '', '', '']);
  emitEvent('seat_replaced', reg, 'kursi ' + r[2] + ': ' + code + ' diganti ' + fresh, {
    regNumber: reg, seat: Number(r[2]), oldCode: code, newCode: fresh,
  });
  return fresh;
}

function menuReplaceSeats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getActiveRange();
  var sh = range && range.getSheet();
  if (!sh || sh.getName() !== CFG.SHEET_SEAT) {
    notify('Pilih baris kursi di tab "' + CFG.SHEET_SEAT + '" lebih dulu.');
    return;
  }
  var ui = SpreadsheetApp.getUi();
  var answer = ui.alert('Nonaktifkan kursi terpilih?', 'Kode lama dan kartu pemegangnya dinonaktifkan, lalu kode pengganti diterbitkan. Lanjutkan?', ui.ButtonSet.YES_NO);
  if (answer !== ui.Button.YES) return;
  var lock = LockService.getScriptLock();
  lock.waitLock(CFG.LOCK_MS);
  var done = 0;
  try {
    for (var r = range.getRow(); r < range.getRow() + range.getNumRows(); r++) {
      if (r < 2) continue;
      try {
        replaceSeat(r);
        done++;
      } catch (err) {
        if (!(err && err.isRegistryError)) throw err;
      }
    }
  } finally {
    lock.releaseLock();
  }
  notify(done + ' kursi diganti. Kode pengganti ada di baris baru pada tab "' + CFG.SHEET_SEAT + '".');
}

// ---------------------------------------------------------------------------
// Log dan kejadian (hook email R7)
// ---------------------------------------------------------------------------

/**
 * Setiap kejadian penting dicatat di tab Log. Pengiriman email (R7) menumpang di sini lewat
 * deliverEmail(type, ctx) bila fungsinya ada; kegagalan kirim tidak boleh membatalkan apa pun.
 */
function emitEvent(type, ref, detail, ctx) {
  logEvent(type, ref, detail);
  if (typeof deliverEmail === 'function') {
    try {
      deliverEmail(type, ctx || {});
    } catch (err) {
      logEvent('email_failed', ref, type + ': ' + (err && err.message ? err.message : err));
    }
  }
}

function logEvent(action, ref, detail) {
  var actor = '';
  try {
    actor = Session.getActiveUser().getEmail() || '';
  } catch (err) {
    actor = '';
  }
  try {
    sheet(CFG.SHEET_LOG).appendRow([new Date(), action, ref || '', actor || 'sistem', safeCell(detail || '')]);
  } catch (err) {
    console.error('log gagal', err);
  }
}

function isLogged(action, ref, detail) {
  var rows = readRows(sheet(CFG.SHEET_LOG));
  for (var i = rows.length - 1; i >= 0; i--) {
    if (rows[i][1] === action && String(rows[i][2]) === ref && String(rows[i][4]) === detail) return true;
  }
  return false;
}

/** Pesan singkat di layar Sheet (diabaikan saat berjalan tanpa antarmuka). */
function notify(message) {
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast(message, 'INOPI', 8);
  } catch (err) {
    console.log(message);
  }
}

/** Tampilan tab agar mudah dipakai Bendahara. Kegagalan format tidak boleh mengganggu pencatatan. */
function formatSheet(sh, name) {
  try {
    var headers = name === CFG.SHEET_REG ? REG_HEADERS : null;
    sh.getRange(1, 1, 1, headerWidth(sh)).setFontWeight('bold').setBackground('#35292A').setFontColor('#F6F1EC');
    if (headers) {
      var nominal = col('Nominal Transfer (Rp)') + 1;
      sh.getRange(2, nominal, 1000, 1).setFontWeight('bold').setNumberFormat('#,##0').setBackground('#FFF3D6');
      sh.getRange(2, col('Iuran (Rp)') + 1, 1000, 1).setNumberFormat('#,##0');
      sh.getRange(2, col('Berlaku s.d.') + 1, 1000, 2).setNumberFormat('dd mmm yyyy hh:mm');
      sh.getRange(2, 1, 1000, 1).setNumberFormat('dd mmm yyyy hh:mm');
      sh.getRange(1, 1, 1, headers.length).createFilter();
    }
  } catch (err) {
    // format opsional
  }
}
