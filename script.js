// ===== EDITA AQUÍ =====
const CONFIG = {
  fecha: "2026-11-28T17:00:00-05:00",
  lugar: "Ciro's Eventos & Catering | Chimbote",
  direccion: "Jirón José Olaya",
  busqueda: "Ciro'S",      // dirección exacta o nombre del local tal como sale en Google Maps
  sheetsUrl: "https://script.google.com/macros/s/AKfycbyvlMoZZkwQoJ1egHAFs4NRcOQnC5MjbkyQlWUkEDVEMKphiNkscs6amVOJewmgwVk/exec",              // URL de tu Google Apps Script (ver GUIA-GOOGLE-SHEETS.md) → confirmaciones y canciones a tu Excel
  whatsapp: "",               // opcional, ej: "51999999999" (solo se usa si NO configuras sheetsUrl)

  horaCeremonia: "Hora por definir",
  horaRecepcion: "Hora por definir",

  // ---- LISTA DE REGALOS: edita libremente ----
  regalos: {
    sugerencias: ["Artículos para nuestro hogar", "Experiencias para disfrutar en familia", "Un detalle elegido con cariño"],
    yape: { numero: "960131764", titular: "Lisbeth Carolina Méndez Orellana", qr: "qr/yape.png" },   // guarda tu QR en la carpeta qr/
    plin: { numero: "912352126", titular: "Alfredo Raúl Cruzado Palacios", qr: "qr/plin.png" },
    cuenta: { banco: "Banco de Crédito del Perú", titular: "Lisbeth Carolina Méndez Orellana", cuenta: "000-00000000-0-00", cci: "000-000-000000000000-00" }
  }
};
// ======================
const $ = id => document.getElementById(id);
const song = $("weddingSong"), musicButton = $("musicButton"), intro = $("intro");

// Invitado personalizado: tuweb.com/?para=Familia%20Pérez
const guest = new URLSearchParams(location.search).get("para");
if (guest) { $("forGuest").textContent = "Para " + guest; $("guestName").value = guest; $("songFrom").value = guest; }

// Polvo dorado y perspectiva del sobre
for (let i = 0; i < 26; i++) {
  const p = document.createElement("span");
  p.style.cssText = `left:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--t:${9 + Math.random() * 10}s;--dl:${-Math.random() * 12}s`;
  $("dust").append(p);
}
addEventListener("pointermove", e => {
  if (!intro.isConnected) return;
  $("env").style.setProperty("--ry", (e.clientX / innerWidth - .5) * 12 + "deg");
  $("env").style.setProperty("--rx", (.5 - e.clientY / innerHeight) * 9 + "deg");
});

// Sello → sobre → invitación (tiempos cortos: la invitación aparece mientras el sobre se desvanece)
$("seal").addEventListener("click", () => {
  intro.classList.add("open");
  document.body.classList.add("opened");
  song.play().then(() => musicButton.classList.add("playing")).catch(() => {});
  setTimeout(() => intro.classList.add("leaving"), 1400);
  setTimeout(() => {
    scrollTo(0, 0);
    document.body.classList.remove("locked");
    document.body.classList.add("ready");
    intro.classList.add("gone");
    musicButton.classList.add("visible");
  }, 1900);
  setTimeout(() => intro.remove(), 3000);
});

function toggleMusic() {
  if (song.paused) song.play().then(() => musicButton.classList.add("playing")).catch(() => alert("Agrega tu audio en music/besame.mp3"));
  else { song.pause(); musicButton.classList.remove("playing"); }
}
musicButton.addEventListener("click", toggleMusic);
$("playSong").addEventListener("click", toggleMusic);

// Mapa
const q = encodeURIComponent(CONFIG.busqueda);
$("venueName").textContent = CONFIG.lugar;
$("venueAddr").textContent = CONFIG.direccion;
$("timeCer").textContent = CONFIG.horaCeremonia;
$("timeRec").textContent = CONFIG.horaRecepcion;
$("mapFrame").src = `https://maps.google.com/maps?q=${q}&output=embed`;
$("gmaps").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
$("waze").href = `https://waze.com/ul?q=${q}&navigate=yes`;

// Lista de regalos
const ICONS = {
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  bank: '<path d="M4 10 12 4l8 6M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16"/>'
};
function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
function icon(name) { const d = el("span", "gico"); d.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`; return d; }
function copyBtn(valor) {
  const b = el("button", "copy", "Copiar"); b.type = "button";
  b.addEventListener("click", async () => {
    const v = valor.replace(/[\s-]/g, "");
    try { await navigator.clipboard.writeText(v); }
    catch { const t = el("textarea"); t.value = v; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
    b.textContent = "¡Copiado!"; b.classList.add("done");
    setTimeout(() => { b.textContent = "Copiar"; b.classList.remove("done"); }, 1800);
  });
  return b;
}
function field(label, valor) { const f = el("div", "fld"); f.append(el("small", "", label), el("b", "", valor), copyBtn(valor)); return f; }
function wallet(nombre, w) {
  const box = el("div", "wallet");
  const txt = el("div", "wtxt");
  txt.append(el("small", "", nombre), el("b", "", w.numero), copyBtn(w.numero), el("span", "who", "A nombre de " + w.titular));
  const qr = el("div", "qr");
  const img = new Image(); img.alt = "QR de " + nombre; img.src = w.qr;
  img.onerror = () => { qr.textContent = "QR por agregar"; qr.classList.add("empty"); };
  qr.append(img);
  box.append(txt, qr);
  return box;
}
const R = CONFIG.regalos, G = $("gifts");
const c1 = el("div", "gcard"); c1.append(icon("heart"), el("h3", "", "Sugerencias"), el("p", "", "Hemos preparado algunas ideas para quienes quieran ayudarnos a elegir un detalle para nuestro nuevo capítulo."));
const ul = el("ul", "glist"); R.sugerencias.forEach(t => ul.append(el("li", "", t))); c1.append(ul);
const c2 = el("div", "gcard"); c2.append(icon("phone"), el("h3", "", "Yape / Plin"), el("p", "", "Si prefieres hacernos un aporte, puedes utilizar cualquiera de estas opciones."), wallet("Yape", R.yape), wallet("Plin", R.plin));
const c3 = el("div", "gcard"); c3.append(icon("bank"), el("h3", "", "Cuenta bancaria"), el("p", "", R.cuenta.banco), field("Cuenta", R.cuenta.cuenta), field("CCI", R.cuenta.cci), el("span", "who", "A nombre de " + R.cuenta.titular));
G.append(c1, c2, c3);

// Cuenta regresiva
const wedding = new Date(CONFIG.fecha);
function tick() {
  const d = Math.max(0, wedding - new Date());
  const v = { days: d / 864e5, hours: d % 864e5 / 36e5, minutes: d % 36e5 / 6e4, seconds: d % 6e4 / 1e3 };
  for (const k in v) $(k).textContent = String(Math.floor(v[k])).padStart(2, "0");
}
tick(); setInterval(tick, 1000);

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Envío: Google Sheets (recomendado) → si no está configurado, WhatsApp; siempre queda copia en este dispositivo
async function send(tipo, data, text) {
  const key = tipo === "cancion" ? "wedding_songs" : "wedding_rsvp";
  try {
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
  } catch {}
  if (CONFIG.sheetsUrl) {
    try { await fetch(CONFIG.sheetsUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams({ tipo, ...data }) }); }
    catch { return false; }
  } else if (CONFIG.whatsapp) {
    open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  }
  return true;
}
$("rsvpForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, btn = form.querySelector("button[type=submit]");
  const name = $("guestName").value.trim(), attendance = $("attendance").value, message = $("guestMessage").value.trim();
  if (!name || !attendance) return;
  btn.disabled = true;
  const ok = await send("asistencia", { nombre: name, asistencia: attendance === "si" ? "Sí" : "No", mensaje: message },
    `Hola, soy ${name}. ${attendance === "si" ? "¡Confirmo mi asistencia!" : "Lamentablemente no podré asistir."} ${message}`);
  btn.disabled = false;
  if (!ok) { $("formNote").textContent = "No pudimos enviar tu respuesta. Revisa tu conexión e inténtalo otra vez."; return; }
  $("formNote").textContent = attendance === "si" ? `¡Qué alegría, ${name}! Nos vemos el 28 de noviembre.` : `Gracias por avisarnos, ${name}. Te llevaremos en el corazón.`;
  form.reset();
});
$("songForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, btn = form.querySelector("button[type=submit]");
  const s = $("songName").value.trim(), from = $("songFrom").value.trim();
  if (!s || !from) return;
  btn.disabled = true;
  const ok = await send("cancion", { nombre: from, cancion: s }, `Sugerencia de canción de ${from}: ${s}`);
  btn.disabled = false;
  $("songNote").textContent = ok ? "¡Anotada! La ponemos en la lista." : "No pudimos enviarla. Inténtalo otra vez.";
  if (ok) form.reset();
});
