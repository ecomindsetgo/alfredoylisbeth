// ===== EDITA AQUÍ =====
const CONFIG = {
  fecha: "2026-11-28T17:00:00-05:00",
  lugar: "Lugar por definir",
  direccion: "Dirección por definir",
  busqueda: "Ica, Perú",      // dirección exacta o nombre del local tal como sale en Google Maps
  whatsapp: ""                // ej: "51999999999" → las confirmaciones y canciones te llegan por WhatsApp
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

// Sello → sobre → invitación
$("seal").addEventListener("click", () => {
  intro.classList.add("open");
  document.body.classList.add("opened");
  song.play().then(() => musicButton.classList.add("playing")).catch(() => {});
  setTimeout(() => intro.classList.add("leaving"), 3000);
  setTimeout(() => {
    intro.classList.add("gone");
    document.body.classList.remove("locked");
    document.body.classList.add("ready");
    musicButton.classList.add("visible");
  }, 4100);
  setTimeout(() => intro.remove(), 5400);
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

// Envío: WhatsApp si lo configuras; si no, se guarda solo en este dispositivo
function send(key, data, text) {
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.push({ ...data, date: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(list));
  if (CONFIG.whatsapp) open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
}
$("rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("guestName").value.trim(), attendance = $("attendance").value, message = $("guestMessage").value.trim();
  if (!name || !attendance) return;
  send("wedding_rsvp", { name, attendance, message },
    `Hola, soy ${name}. ${attendance === "si" ? "¡Confirmo mi asistencia!" : "Lamentablemente no podré asistir."} ${message}`);
  $("formNote").textContent = attendance === "si" ? `¡Qué alegría, ${name}! Nos vemos el 28 de noviembre.` : `Gracias por avisarnos, ${name}. Te llevaremos en el corazón.`;
  e.target.reset();
});
$("songForm").addEventListener("submit", e => {
  e.preventDefault();
  const s = $("songName").value.trim();
  if (!s) return;
  send("wedding_songs", { song: s, from: guest || "" }, `Sugerencia de canción para la boda: ${s}`);
  $("songNote").textContent = "¡Anotada! La ponemos en la lista.";
  e.target.reset();
});
