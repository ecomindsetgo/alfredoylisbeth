// Pega este código en Google Apps Script (Extensiones → Apps Script) desde tu hoja de cálculo.
const ZONA = "America/Lima";

function doPost(e) {
  const p = e.parameter || {};
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const fecha = Utilities.formatDate(new Date(), ZONA, "dd/MM/yyyy HH:mm:ss");
    if (p.tipo === "cancion") {
      hoja(ss, "Canciones", ["Fecha", "Canción y artista", "Enviado por"])
        .appendRow([fecha, limpio(p.cancion), limpio(p.invitado)]);
    } else {
      hoja(ss, "Confirmaciones", ["Fecha", "Nombre", "¿Asiste?", "Mensaje", "Enlace de invitado"])
        .appendRow([fecha, limpio(p.nombre), limpio(p.asistencia), limpio(p.mensaje), limpio(p.invitado)]);
    }
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return salida({ ok: true, mensaje: "Invitación Alfredo & Lisbeth: funcionando" }); }

function hoja(ss, nombre, encabezados) {
  let sh = ss.getSheetByName(nombre);
  if (!sh) {
    sh = ss.insertSheet(nombre);
    sh.appendRow(encabezados);
    sh.getRange(1, 1, 1, encabezados.length).setFontWeight("bold").setBackground("#ecd8c6");
    sh.setFrozenRows(1);
  }
  return sh;
}
// Evita que un texto como "=algo" se ejecute como fórmula en la hoja
function limpio(v) {
  v = String(v || "").trim().slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
function salida(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
