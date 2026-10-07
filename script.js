(() => {
  "use strict";

  const CONFIG = {
    fecha: "2026-11-28T00:00:00-05:00",
    lugar: "Ciro's Eventos & Catering",
    direccion: "Jr. José Olaya 478, Chimbote 02803",
    busqueda: "WCH4+GXQ, Jirón José Olaya, Chimbote 02803",
    sheetsUrl: "https://script.google.com/macros/s/AKfycbyvlMoZZkwQoJ1egHAFs4NRcOQnC5MjbkyQlWUkEDVEMKphiNkscs6amVOJewmgwVk/exec",
    whatsapp: "",
    horaCeremonia: "Hora por definir",
    horaRecepcion: "Hora por definir",
    horaLlegada: "",
    limiteConfirmar: "",
    calendario: { titulo: "Boda Alfredo & Lisbeth", fecha: "2026-11-28", inicio: "", fin: "" },
    regalos: {
      sugerencias: ["Artículos para nuestro hogar", "Experiencias para disfrutar en familia", "Un detalle elegido con cariño"],
      yape: { numero: "960131764", titular: "Lisbeth Carolina Méndez Orellana", qr: "" },
      plin: { numero: "912352126", titular: "Alfredo Raúl Cruzado Palacios", qr: "qr/plin.png" },
      cuenta: { banco: "Banco de Crédito del Perú", titular: "Lisbeth Carolina Méndez Orellana", cuenta: "000-00000000-0-00", cci: "000-000-000000000000-00" }
    }
  };

  const $ = id => document.getElementById(id);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const params = new URLSearchParams(location.search);
  const allowedThemes = new Set(["editorial", "botanico", "galeria"]);
  const requestedTheme = params.get("tema");
  if (allowedThemes.has(requestedTheme)) document.documentElement.dataset.theme = requestedTheme;

  const intro = $("intro");
  const openBtn = $("openBtn");
  const song = $("weddingSong");
  const musicButton = $("musicButton");
  const musicSection = $("musica");
  if (song) song.volume = 0.38;

  const guest = (params.get("para") || "").trim().slice(0, 120);
  if (guest) {
    $("forGuest") && ($("forGuest").textContent = `Qué alegría contar contigo, ${guest}`);
    $("heroGuest") && ($("heroGuest").textContent = `Nos casamos · ${guest}`);
    $("guestName") && ($("guestName").value = guest);
    $("songFrom") && ($("songFrom").value = guest);
  }

  function syncMusicUI() {
    if (!song || !musicButton) return;
    const playing = !song.paused;
    musicButton.classList.toggle("is-playing", playing);
    musicButton.setAttribute("aria-pressed", String(playing));
    musicButton.setAttribute("aria-label", playing ? "Pausar música" : "Reproducir música");
    musicSection?.classList.toggle("is-playing", playing);
    const playSong = $("playSong");
    if (playSong) playSong.textContent = playing ? "❚❚ Pausar" : "▶ Escuchar";
  }

  async function tryPlayMusic() {
    if (!song) return;
    try { await song.play(); } catch (_) { syncMusicUI(); }
  }

  function openInvitation() {
    if (!intro) return;
    openBtn?.setAttribute("disabled", "");
    intro.classList.add("is-leaving");
    document.body.classList.remove("is-locked");
    document.body.classList.add("is-ready");
    tryPlayMusic();
    setTimeout(() => intro.remove(), 900);
  }
  openBtn?.addEventListener("click", openInvitation, { once: true });

  async function toggleMusic() {
    if (!song) return;
    try {
      if (song.paused) await song.play();
      else song.pause();
    } catch (_) {
      const note = $("songNote");
      if (note) note.textContent = "La música no pudo reproducirse en este dispositivo.";
    }
    syncMusicUI();
  }
  song?.addEventListener("play", syncMusicUI);
  song?.addEventListener("pause", syncMusicUI);
  musicButton?.addEventListener("click", toggleMusic);
  $("playSong")?.addEventListener("click", toggleMusic);

  function calendarDate(value = "") {
    return String(value).replace(/([+-]\d{2}):?(\d{2})$/, "").replace(/[-:]/g, "");
  }

  function googleCalendarUrl() {
    const c = CONFIG.calendario || {};
    const baseDate = c.fecha || "2026-11-28";
    const date = baseDate.replace(/-/g, "");
    const next = new Date(`${baseDate}T12:00:00`);
    next.setDate(next.getDate() + 1);
    const nextDate = `${next.getFullYear()}${String(next.getMonth() + 1).padStart(2, "0")}${String(next.getDate()).padStart(2, "0")}`;
    const dates = c.inicio && c.fin ? `${calendarDate(c.inicio)}/${calendarDate(c.fin)}` : `${date}/${nextDate}`;
    const query = new URLSearchParams({
      action: "TEMPLATE",
      text: c.titulo || "Boda Alfredo & Lisbeth",
      dates,
      details: "Celebramos nuestro sí contigo. Revisa la invitación para horarios y detalles actualizados.",
      location: `${CONFIG.lugar}, ${CONFIG.direccion}`,
      ctz: "America/Lima"
    });
    return `https://calendar.google.com/calendar/render?${query}`;
  }

  function openGoogleCalendar() {
    const url = googleCalendarUrl();
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) location.href = url;
  }
  ["saveDateHero", "saveDateDock", "saveDatePlace"].forEach(id => $(id)?.addEventListener("click", openGoogleCalendar));

  const shareButton = $("shareInvitation");
  if (shareButton && navigator.share) {
    shareButton.hidden = false;
    shareButton.addEventListener("click", async () => {
      try {
        await navigator.share({ title: "Alfredo & Lisbeth · 28.11.2026", text: "Acompáñanos a celebrar nuestro sí.", url: location.href });
      } catch (err) {
        if (err?.name !== "AbortError") shareButton.hidden = true;
      }
    });
  }

  const mapQuery = encodeURIComponent(CONFIG.busqueda);
  if ($("venueName")) $("venueName").textContent = CONFIG.lugar;
  if ($("venueAddr")) $("venueAddr").textContent = CONFIG.direccion;
  if ($("timeCer")) $("timeCer").textContent = CONFIG.horaCeremonia;
  if ($("timeRec")) $("timeRec").textContent = CONFIG.horaRecepcion;
  if (CONFIG.horaLlegada && $("itLlegada")) {
    $("itLlegada").hidden = false;
    $("timeLle").textContent = CONFIG.horaLlegada;
  }
  if (CONFIG.limiteConfirmar && $("rsvpDeadline")) {
    $("rsvpDeadline").hidden = false;
    $("rsvpDeadline").textContent = `Confirma antes del ${CONFIG.limiteConfirmar}`;
  }
  if ($("mapFrame")) $("mapFrame").src = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  if ($("gmaps")) $("gmaps").href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  if ($("waze")) $("waze").href = `https://waze.com/ul?q=${mapQuery}&navigate=yes`;

  const ICONS = {
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    bank: '<path d="M4 10 12 4l8 6M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16"/>'
  };

  function el(tag, cls = "", text = "") {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== "") node.textContent = text;
    return node;
  }

  function icon(name) {
    const wrap = el("span", "gico");
    wrap.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
    return wrap;
  }

  async function copyText(value, button) {
    const clean = String(value || "").replace(/[\s-]/g, "");
    try {
      await navigator.clipboard.writeText(clean);
    } catch (_) {
      const t = el("textarea");
      t.value = clean;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.append(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    button.textContent = "Copiado";
    button.classList.add("is-done");
    setTimeout(() => { button.textContent = "Copiar"; button.classList.remove("is-done"); }, 1600);
  }

  function copyButton(value) {
    const button = el("button", "copy", "Copiar");
    button.type = "button";
    button.addEventListener("click", () => copyText(value, button));
    return button;
  }

  function wallet(name, data) {
    const box = el("div", "wallet");
    const txt = el("div", "wtxt");
    txt.append(el("small", "", name), el("b", "", data.numero), copyButton(data.numero), el("span", "who", `A nombre de ${data.titular}`));
    const qr = el("div", "qr");
    if (data.qr) {
      const img = new Image();
      img.alt = `QR de ${name}`;
      img.loading = "lazy";
      img.src = data.qr;
      img.addEventListener("error", () => { qr.replaceChildren(el("span", "", "QR por agregar")); qr.classList.add("empty"); }, { once: true });
      qr.append(img);
    } else {
      qr.textContent = "QR por agregar";
      qr.classList.add("empty");
    }
    box.append(txt, qr);
    return box;
  }

  const validBank = value => Boolean(value && !/^0[\d\s-]*$/.test(String(value).trim()));
  function bankField(label, value) {
    const field = el("div", `fld${validBank(value) ? "" : " pending"}`);
    field.append(el("small", "", label), el("b", "", validBank(value) ? value : "Por completar"));
    if (validBank(value)) field.append(copyButton(value));
    return field;
  }

  function renderGifts() {
    const target = $("gifts");
    if (!target) return;
    const r = CONFIG.regalos;
    const ideas = el("article", "gcard reveal");
    ideas.append(icon("heart"), el("h3", "", "Ideas para nosotros"), el("p", "", "Si prefieres elegir un detalle, estas son algunas ideas que disfrutaríamos juntos."));
    const list = el("ul", "glist");
    r.sugerencias.forEach(item => list.append(el("li", "", item)));
    ideas.append(list);

    const digital = el("article", "gcard reveal");
    digital.append(icon("phone"), el("h3", "", "Yape / Plin"), el("p", "", "Para quienes prefieran un aporte digital."), wallet("Yape", r.yape), wallet("Plin", r.plin));

    const bank = el("article", "gcard reveal");
    bank.append(icon("bank"), el("h3", "", "Transferencia"), el("p", "", r.cuenta?.banco || "Banco por definir"), bankField("Nro. de cuenta", r.cuenta?.cuenta), bankField("CCI", r.cuenta?.cci), el("span", "who", `A nombre de ${r.cuenta?.titular || "Por definir"}`));
    target.replaceChildren(ideas, digital, bank);
  }
  renderGifts();

  const wedding = new Date(CONFIG.fecha);
  function tickCountdown() {
    const now = new Date();
    const diff = Math.max(0, wedding.getTime() - now.getTime());
    const values = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };
    Object.entries(values).forEach(([key, value]) => { if ($(key)) $(key).textContent = String(value).padStart(2, "0"); });
    if (diff === 0 && $("countdownStatus")) $("countdownStatus").textContent = "Hoy celebramos nuestro sí.";
  }
  tickCountdown();
  const countdownTimer = setInterval(tickCountdown, 1000);
  addEventListener("pagehide", () => clearInterval(countdownTimer), { once: true });

  function initReveal() {
    const nodes = $$(".reveal");
    if (!("IntersectionObserver" in window)) { nodes.forEach(node => node.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    nodes.forEach(node => observer.observe(node));
  }
  initReveal();

  const LS = {
    get(key) { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch (_) { return []; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} }
  };
  const uid = () => crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

  async function post(item) {
    if (!CONFIG.sheetsUrl) throw new Error("missing-endpoint");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      await fetch(CONFIG.sheetsUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(item), signal: controller.signal, keepalive: true });
    } finally { clearTimeout(timeout); }
  }

  function queueItem(item) {
    const queue = LS.get("wedding_pending").filter(Boolean).slice(-24);
    if (!queue.some(x => x.id === item.id)) queue.push(item);
    LS.set("wedding_pending", queue);
  }

  async function flushPending() {
    if (!CONFIG.sheetsUrl || !navigator.onLine) return;
    const pending = LS.get("wedding_pending");
    if (!pending.length) return;
    const remaining = [];
    for (const item of pending) {
      try { await post(item); }
      catch (_) { remaining.push(item); }
    }
    LS.set("wedding_pending", remaining);
  }
  addEventListener("online", flushPending);
  setTimeout(flushPending, 1200);

  async function send(tipo, data, fallbackText) {
    const item = { tipo, ...data, invitado: guest, id: uid() };
    if (CONFIG.sheetsUrl) {
      try { await post(item); return { ok: true, queued: false }; }
      catch (_) { queueItem(item); return { ok: true, queued: true }; }
    }
    if (CONFIG.whatsapp) {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(fallbackText)}`, "_blank", "noopener,noreferrer");
      return { ok: true, queued: false };
    }
    const key = tipo === "cancion" ? "wedding_songs" : "wedding_rsvp";
    LS.set(key, [...LS.get(key).slice(-24), { ...data, id: item.id, date: new Date().toISOString() }]);
    return { ok: true, queued: false };
  }

  $("attendance")?.addEventListener("change", () => {
    const yes = $("attendance").value === "si";
    if ($("yesOnly")) $("yesOnly").hidden = !yes;
    if (!yes && $("dietary")) $("dietary").value = "";
  });

  $("rsvpForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector("button[type=submit]");
    const name = $("guestName").value.trim();
    const attendance = $("attendance").value;
    const dietary = attendance === "si" ? $("dietary").value.trim() : "";
    const message = $("guestMessage").value.trim();
    if (!name || !attendance) {
      $("formNote").textContent = "Completa tu nombre y confirma si podrás acompañarnos.";
      (!name ? $("guestName") : $("attendance")).focus();
      return;
    }
    submit.disabled = true;
    submit.textContent = "Enviando…";
    const result = await send("asistencia", { nombre: name, asistencia: attendance === "si" ? "Sí" : "No", restricciones: dietary, mensaje: message }, `Hola, soy ${name}. ${attendance === "si" ? "Confirmo mi asistencia." : "No podré asistir."}`);
    submit.disabled = false;
    submit.textContent = "Enviar respuesta";
    if (!result.ok) { $("formNote").textContent = "No pudimos guardar tu respuesta. Inténtalo nuevamente."; return; }
    const yes = attendance === "si";
    $("doneTitle").textContent = yes ? "¡Qué alegría contar contigo!" : "Gracias por avisarnos";
    $("doneText").textContent = yes ? `${name}, nos vemos el 28 de noviembre. Estamos felices de compartir este día contigo.` : `${name}, gracias por responder. Te llevaremos con nosotros en este día tan especial.`;
    form.hidden = true;
    $("rsvpDone").hidden = false;
    $("rsvpDone").focus();
    if (result.queued) $("doneText").textContent += " Tu respuesta quedó guardada y se enviará automáticamente cuando vuelva la conexión.";
  });

  $("songForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector("button[type=submit]");
    const from = $("songFrom").value.trim();
    const songName = $("songName").value.trim();
    if (!from || !songName) { $("songNote").textContent = "Escribe tu nombre y la canción que quieres sugerir."; return; }
    submit.disabled = true;
    submit.textContent = "Guardando…";
    const result = await send("cancion", { nombre: from, cancion: songName }, `Sugerencia de canción de ${from}: ${songName}`);
    submit.disabled = false;
    submit.textContent = "Sugerir canción";
    $("songNote").textContent = result.queued ? "¡Anotada! Se enviará automáticamente cuando vuelva la conexión." : "¡Anotada! La sumamos a la lista.";
    if (!result.queued) {
      const preservedName = guest || from;
      form.reset();
      $("songFrom").value = preservedName;
    }
  });
})();
