// ===== EDITA AQUÍ =====
const CONFIG = {
  fecha: "2026-11-28T17:00:00-05:00",
  lugar: "Lugar por definir",
  direccion: "Dirección por definir",
  busqueda: "Ica, Perú",      // dirección exacta o nombre del local tal como sale en Google Maps
  sheetsUrl: "https://script.google.com/macros/s/AKfycbyvlMoZZkwQoJ1egHAFs4NRcOQnC5MjbkyQlWUkEDVEMKphiNkscs6amVOJewmgwVk/exec",              // URL de tu Google Apps Script (ver GUIA-GOOGLE-SHEETS.md) → confirmaciones y canciones a tu Excel
  whatsapp: "",               // opcional, ej: "51999999999" (solo se usa si NO configuras sheetsUrl)

  // ---- LISTA DE REGALOS: edita libremente ----
  ideas: [
    { titulo: "Para nuestro hogar", texto: "Menaje, cocina y detalles que hagan la casa más cálida." },
    { titulo: "Luna de miel", texto: "Un aporte para vivir una experiencia juntos." },
    { titulo: "Momentos en familia", texto: "Una salida, una cena o un paseo para disfrutar con nuestros hijos." },
    { titulo: "Un sobre con cariño", texto: "Si prefieres algo sencillo, lo recibimos con el corazón." }
  ],
  pagos: [
    { metodo: "Yape", clase: "yape", titular: "Nombre del titular", lineas: [{ label: "Número", valor: "999 999 999" }] },
    { metodo: "Plin", clase: "plin", titular: "Nombre del titular", lineas: [{ label: "Número", valor: "999 999 999" }] },
    { metodo: "Cuenta bancaria", clase: "bank", titular: "Banco · Nombre del titular", lineas: [
      { label: "N.º de cuenta", valor: "000-00000000-0-00" },
      { label: "CCI", valor: "000-000-000000000000-00" }
    ] }
  ]
};
// ======================
const $ = id => document.getElementById(id);
const song = $("weddingSong"), musicButton = $("musicButton"), intro = $("intro");

// Invitado personalizado: tuweb.com/?para=Familia%20Pérez
const guest = new URLSearchParams(location.search).get("para");
if (guest) { $("forGuest").textContent = "Para " + guest; $("guestName").value = guest; }

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
$("mapFrame").src = `https://maps.google.com/maps?q=${q}&output=embed`;
$("gmaps").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
$("waze").href = `https://waze.com/ul?q=${q}&navigate=yes`;

// Lista de regalos
function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
CONFIG.ideas.forEach(i => { const d = el("div", "idea"); d.append(el("h3", "", i.titulo), el("p", "", i.texto)); $("giftIdeas").append(d); });
CONFIG.pagos.forEach(p => {
  const d = el("div", "pay");
  d.append(el("span", "tag " + p.clase, p.metodo));
  p.lineas.forEach(l => {
    const row = el("div", "line"), b = el("button", "copy", "Copiar");
    b.type = "button";
    b.addEventListener("click", async () => {
      const v = l.valor.replace(/[\s-]/g, "");
      try { await navigator.clipboard.writeText(v); }
      catch { const t = el("textarea"); t.value = v; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
      b.textContent = "¡Copiado!"; b.classList.add("done");
      setTimeout(() => { b.textContent = "Copiar"; b.classList.remove("done"); }, 1800);
    });
    row.append(el("small", "", l.label), el("b", "", l.valor), b);
    d.append(row);
  });
  d.append(el("p", "who", p.titular));
  $("giftPays").append(d);
});

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
  const ok = await send("asistencia", { nombre: name, asistencia: attendance === "si" ? "Sí" : "No", mensaje: message, invitado: guest || "" },
    `Hola, soy ${name}. ${attendance === "si" ? "¡Confirmo mi asistencia!" : "Lamentablemente no podré asistir."} ${message}`);
  btn.disabled = false;
  if (!ok) { $("formNote").textContent = "No pudimos enviar tu respuesta. Revisa tu conexión e inténtalo otra vez."; return; }
  $("formNote").textContent = attendance === "si" ? `¡Qué alegría, ${name}! Nos vemos el 28 de noviembre.` : `Gracias por avisarnos, ${name}. Te llevaremos en el corazón.`;
  form.reset();
});
$("songForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, btn = form.querySelector("button[type=submit]");
  const s = $("songName").value.trim();
  if (!s) return;
  btn.disabled = true;
  const ok = await send("cancion", { cancion: s, invitado: guest || "" }, `Sugerencia de canción para la boda: ${s}`);
  btn.disabled = false;
  $("songNote").textContent = ok ? "¡Anotada! La ponemos en la lista." : "No pudimos enviarla. Inténtalo otra vez.";
  if (ok) form.reset();
});
