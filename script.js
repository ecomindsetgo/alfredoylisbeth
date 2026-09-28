// ===== EDITA AQUÍ =====
const CONFIG = {
  fecha: "2026-11-28T17:00:00-05:00",
  lugar: "Ciro's Eventos & Catering | Chimbote",
  direccion: "Jirón José Olaya",
  busqueda: "WCH4+GXQ, Jirón José Olaya, Chimbote 02803",      // dirección exacta o nombre del local tal como sale en Google Maps
  sheetsUrl: "https://script.google.com/macros/s/AKfycbyvlMoZZkwQoJ1egHAFs4NRcOQnC5MjbkyQlWUkEDVEMKphiNkscs6amVOJewmgwVk/exec",              // URL de tu Google Apps Script (ver GUIA-GOOGLE-SHEETS.md) → confirmaciones y canciones a tu Excel
  whatsapp: "",               // opcional, ej: "51999999999" (solo se usa si NO configuras sheetsUrl)

  horaCeremonia: "Hora por definir",
  horaRecepcion: "Hora por definir",
  horaLlegada: "",            // opcional, ej: "3:00 p. m." (vacío = no se muestra)
  limiteConfirmar: "",        // opcional, ej: "14 de noviembre" (vacío = no se muestra)

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

// ===== Ramas dibujadas con SVG (arco de apertura y esquinas del hero) =====
const NS = "http://www.w3.org/2000/svg";
function S(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.append(n);
  return n;
}
const bez = (p, t) => { const u = 1 - t; return [0, 1].map(i => u*u*u*p[0][i] + 3*u*u*t*p[1][i] + 3*u*t*t*p[2][i] + t*t*t*p[3][i]); };
const ang = (p, t) => { const u = 1 - t; const d = [0, 1].map(i => 3*u*u*(p[1][i]-p[0][i]) + 6*u*t*(p[2][i]-p[1][i]) + 3*t*t*(p[3][i]-p[2][i])); return Math.atan2(d[1], d[0]) * 180 / Math.PI; };
// pts: 4 puntos de una curva; n: hojas; size: largo de hoja; delay: segundos antes de empezar a dibujarse
function sprig(svg, { pts, n, size, delay }) {
  const g = S("g", {}, svg);
  S("path", { class: "stem", pathLength: 1, d: `M${pts[0]} C${pts[1]} ${pts[2]} ${pts[3]}`, style: `--d:${delay}s` }, g);
  for (let i = 0; i < n; i++) {
    const t = .16 + (i / (n - 1)) * .84, [x, y] = bez(pts, t);
    const a = ang(pts, t) + (i === n - 1 ? 0 : (i % 2 ? 52 : -52));
    const L = size * (1 - .4 * t), W = L * .34, d = (delay + .5 + t * 1.5).toFixed(2);
    const leaf = S("g", { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)})` }, g);
    S("path", { class: "leaf", pathLength: 1, d: `M0 0C${L*.3} ${-W} ${L*.72} ${-W} ${L} 0C${L*.72} ${W} ${L*.3} ${W} 0 0Z`, style: `--d:${d}s` }, leaf);
    S("path", { class: "vein", pathLength: 1, d: `M0 0L${(L*.85).toFixed(1)} 0`, style: `--d:${d}s` }, leaf);
    if (i % 3 === 2 && i < n - 1) {
      const b = a > 0 ? -1 : 1, r = (a + 90 * b) * Math.PI / 180;
      S("circle", { class: "berry", r: 2.6, cx: (x + Math.cos(r) * 11).toFixed(1), cy: (y + Math.sin(r) * 11).toFixed(1), style: `--d:${(+d + 1.2).toFixed(2)}s` }, g);
    }
  }
}
// Anillos (coordenadas centradas en 0,0; se reutilizan en apertura, portada, confirmación y cierre)
const RINGS = `
<circle class="ring" pathLength="1" cx="-17" cy="0" r="25" style="--d:calc(var(--rd,0s) + 0s)"/>
<circle class="ring r2" pathLength="1" cx="-17" cy="0" r="21.5" style="--d:calc(var(--rd,0s) + .25s)"/>
<circle class="ring" pathLength="1" cx="17" cy="0" r="25" style="--d:calc(var(--rd,0s) + .5s)"/>
<circle class="ring r2" pathLength="1" cx="17" cy="0" r="21.5" style="--d:calc(var(--rd,0s) + .75s)"/>
<path class="ring" pathLength="1" d="M17 -35L22 -28L17 -21L12 -28Z" style="--d:calc(var(--rd,0s) + 1.3s)"/>
<path class="ring r2" pathLength="1" d="M12 -28H22" style="--d:calc(var(--rd,0s) + 1.6s)"/>
<path class="spark" d="M29 -37l1.3 3.4 3.4 1.3-3.4 1.3-1.3 3.4-1.3-3.4-3.4-1.3 3.4-1.3z" style="--d:calc(var(--rd,0s) + 1.3s)"/>`;
document.querySelectorAll("[data-rings]").forEach(svg => { svg.innerHTML = RINGS; svg.style.setProperty("--rd", ".2s"); });

// Arco de apertura: anillos + ramas
const frameSvg = $("frameSvg");
const ringsG = S("g", { transform: "translate(200 215) scale(1.25)", style: "--rd:1.1s" }, frameSvg);
ringsG.innerHTML = RINGS;
sprig(frameSvg, { pts: [[52,552],[10,430],[74,300],[44,150]], n: 8, size: 32, delay: .5 });
sprig(frameSvg, { pts: [[350,552],[392,450],[330,330],[362,235]], n: 6, size: 28, delay: .8 });
// Esquinas de la portada (se dibujan al abrir)
sprig($("heroL"), { pts: [[70,420],[35,320],[110,220],[80,80]], n: 7, size: 30, delay: .2 });
sprig($("heroR"), { pts: [[230,0],[265,100],[190,200],[220,330]], n: 6, size: 28, delay: .5 });
requestAnimationFrame(() => frameSvg.classList.add("go"));

// Polen sutil
function pollen(box, n) {
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    p.style.cssText = `left:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--t:${12 + Math.random() * 12}s;--dl:${-Math.random() * 14}s`;
    box.append(p);
  }
}
pollen($("pollen"), 18);
pollen($("heroPollen"), 14);

// Abrir: el marco se desvanece y el papel sube revelando la invitación
$("openBtn").addEventListener("click", () => {
  intro.classList.add("open");
  song.play().then(() => musicButton.classList.add("playing")).catch(() => {});
  setTimeout(() => {
    intro.classList.add("leaving");
    scrollTo(0, 0);
    document.body.classList.remove("locked");
    document.body.classList.add("ready");
    document.querySelectorAll(".hs, .hero .rings").forEach(s => s.classList.add("go"));
    musicButton.classList.add("visible");
  }, 700);
  setTimeout(() => intro.remove(), 2200);
});

// Parallax suave solo en las ramas; "desliza" desaparece al bajar (ya no puede tapar la fecha)
const hs = [...document.querySelectorAll(".hs")], hint = $("scrollHint");
let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = Math.min(scrollY, innerHeight);
    hs.forEach((el, i) => el.style.transform = `translate3d(0,${y * (i ? -.08 : .1)}px,0)`);
    hint.classList.toggle("gone", scrollY > 30);
    ticking = false;
  });
}, { passive: true });

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
if (CONFIG.horaLlegada) { $("timeLle").textContent = CONFIG.horaLlegada; $("itLlegada").hidden = false; }
if (CONFIG.limiteConfirmar) { $("rsvpDeadline").textContent = "Por favor, confirma antes del " + CONFIG.limiteConfirmar; $("rsvpDeadline").hidden = false; }
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

// ===== Envío a Google Sheets =====
// Cada envío lleva un ID único: si hay que reintentarlo, el Apps Script no duplica la fila.
const LS = {
  get: k => { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch { return []; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const post = item => fetch(CONFIG.sheetsUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(item) });
async function flushPending() {
  if (!CONFIG.sheetsUrl || !navigator.onLine) return;
  const rest = [];
  for (const it of LS.get("wedding_pending")) { try { await post(it); } catch { rest.push(it); } }
  LS.set("wedding_pending", rest);
}
addEventListener("online", flushPending);
flushPending();

// Guarda copia local, envía a Sheets (o WhatsApp si no hay Sheets). Si no hay conexión, queda en cola y se reintenta sola.
async function send(tipo, data, text) {
  const key = tipo === "cancion" ? "wedding_songs" : "wedding_rsvp";
  LS.set(key, [...LS.get(key), { ...data, date: new Date().toISOString() }]);
  if (CONFIG.sheetsUrl) {
    const item = { tipo, ...data, invitado: guest || "", id: uid() };
    try { await post(item); return true; }
    catch { LS.set("wedding_pending", [...LS.get("wedding_pending"), item]); return false; }
  }
  if (CONFIG.whatsapp) open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
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
  if (!ok) { $("formNote").textContent = "No pudimos enviar tu respuesta ahora. La guardamos y se reenviará sola cuando recuperes la conexión."; return; }
  const yes = attendance === "si";
  $("doneTitle").textContent = yes ? "¡Gracias por confirmar!" : "Gracias por avisarnos";
  $("doneText").textContent = yes ? `${name}, nos vemos el 28 de noviembre. Estamos felices de compartir este día contigo.` : `${name}, te llevaremos en el corazón. Gracias por tu cariño.`;
  form.reset(); $("formNote").textContent = "";
  form.hidden = true; $("rsvpDone").hidden = false;
  $("rsvpDone").querySelector(".rings").classList.add("go");
});
$("songForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, btn = form.querySelector("button[type=submit]");
  const s = $("songName").value.trim(), from = $("songFrom").value.trim();
  if (!s || !from) return;
  btn.disabled = true;
  const ok = await send("cancion", { nombre: from, cancion: s }, `Sugerencia de canción de ${from}: ${s}`);
  btn.disabled = false;
  $("songNote").textContent = ok ? "¡Anotada! La ponemos en la lista." : "No pudimos enviarla ahora. Queda guardada y se reenviará sola al volver la conexión.";
  if (ok) form.reset();
});
