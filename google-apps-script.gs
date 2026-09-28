// Pega este código en Google Apps Script (Extensiones → Apps Script) desde tu hoja de cálculo.
// Guarda las confirmaciones de asistencia y las canciones sugeridas de la invitación.
const ZONA = "America/Lima";

const HOJAS = {
  asistencia: { nombre: "Confirmaciones", cols: ["Fecha", "Nombre", "¿Asiste?", "Mensaje", "Invitado (enlace)", "ID"] },
  cancion:    { nombre: "Canciones",      cols: ["Fecha", "Nombre", "Canción y artista", "Invitado (enlace)", "ID"] }
};

function doPost(e) {
  const p = (e && e.parameter) || {};
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const tipo = p.tipo === "cancion" ? "cancion" : "asistencia";
    const sh = hoja(SpreadsheetApp.getActiveSpreadsheet(), HOJAS[tipo].nombre, HOJAS[tipo].cols);
    const id = limpio(p.id);

    // Si el navegador reintenta un envío, no se duplica la fila
    if (id && sh.createTextFinder(id).matchEntireCell(true).findNext()) return salida({ ok: true, duplicado: true });

    const fecha = Utilities.formatDate(new Date(), ZONA, "dd/MM/yyyy HH:mm:ss");
    const fila = tipo === "cancion"
      ? [fecha, limpio(p.nombre), limpio(p.cancion), limpio(p.invitado), id]
      : [fecha, limpio(p.nombre), limpio(p.asistencia), limpio(p.mensaje), limpio(p.invitado), id];
    sh.appendRow(fila);
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return salida({ ok: true, mensaje: "Invitación Alfredo & Lisbeth: funcionando" }); }

// Ejecútala una vez desde el editor (▶ Ejecutar) para autorizar permisos y comprobar que se crean las filas de prueba.
function prueba() {
  doPost({ parameter: { tipo: "asistencia", nombre: "PRUEBA (puedes borrar esta fila)", asistencia: "Sí", mensaje: "Fila de prueba", id: "prueba-a-" + Date.now() } });
  doPost({ parameter: { tipo: "cancion", nombre: "PRUEBA (puedes borrar esta fila)", cancion: "Canción de prueba", id: "prueba-c-" + Date.now() } });
}

function hoja(ss, nombre, encabezados) {
  let sh = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
  // Crea o completa los encabezados (también funciona si la pestaña ya existía con menos columnas)
  if (sh.getLastRow() === 0 || sh.getLastColumn() < encabezados.length) {
    sh.getRange(1, 1, 1, encabezados.length).setValues([encabezados]).setFontWeight("bold").setBackground("#efe4d3");
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
