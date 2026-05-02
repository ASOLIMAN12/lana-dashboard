// Lana Unified API - JSONP Version
// انسخ هذا الكود في Apps Script جديد ثم Deploy كـ Web App
// Execute as: Me
// Who has access: Anyone

const SOURCE_APIS = [
  { name: "الصيدليات", url: "https://script.google.com/macros/s/AKfycbxT41DVpsSxYTC7Owhm333K4MPPYYHfECOt1BwoyK_JYt7pfCkIBIqjb4tQN1Me3VqB/exec" },
  { name: "العيادات", url: "https://script.google.com/macros/s/AKfycby27_mKdXXgDMtMNeb271a4Ihb93zBhT1Mj88LPCONJc54mCmaSZ5LqZFNBWyFu_OeD/exec" },
  { name: "المجمع", url: "https://script.google.com/macros/s/AKfycbz5wz2LdA5-wQ1T4YOnHrLlIgeaFqe3dgbJEBNX-_eggTLx1S4I6tUTXQbSO9O2CAKpjw/exec" }
];

function readApi_(source) {
  try {
    const res = UrlFetchApp.fetch(source.url, { muteHttpExceptions: true, followRedirects: true });
    const code = res.getResponseCode();
    const text = res.getContentText();
    if (code < 200 || code >= 300) return { source: source.name, ok: false, rows: [], count: 0, error: "HTTP " + code };
    const data = JSON.parse(text);
    const rows = Array.isArray(data) ? data.map(r => { r["المصدر"] = source.name; return r; }) : [];
    return { source: source.name, ok: true, rows, count: rows.length, error: "" };
  } catch (err) {
    return { source: source.name, ok: false, rows: [], count: 0, error: String(err) };
  }
}

function doGet(e) {
  const callback = e && e.parameter && e.parameter.callback ? e.parameter.callback : "";
  const results = SOURCE_APIS.map(readApi_);
  const rows = [];
  const sources = [];

  results.forEach(r => {
    sources.push({ source: r.source, ok: r.ok, count: r.count || 0, error: r.error || "" });
    if (r.rows && r.rows.length) rows.push.apply(rows, r.rows);
  });

  const output = {
    ok: true,
    updatedAt: new Date().toISOString(),
    totalRows: rows.length,
    sources,
    rows
  };

  const json = JSON.stringify(output);
  if (callback) {
    return ContentService.createTextOutput(callback + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
