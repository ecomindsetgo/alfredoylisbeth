# Invitación web — Alfredo & Lisbeth

## Versión 8 · experiencia premium 2026

Esta versión mantiene la estética minimalista, cálida y elegante de la invitación, pero mejora la experiencia móvil y la organización del evento.

### Novedades principales
- Apertura animada con arco, anillos y ramas.
- Portada con CTA inmediato para **Confirmar asistencia** y **Guardar fecha**.
- Barra flotante móvil con accesos a RSVP, ubicación y calendario.
- Tarjetas rápidas con fecha, ciudad, dress code y celebración para adultos.
- Botón **Guardar en calendario** que descarga un archivo `.ics` compatible con calendarios habituales.
- RSVP mejorado con campo opcional de **alergias o restricciones alimentarias**.
- Preguntas frecuentes para reducir mensajes repetitivos a los novios.
- Metadatos de privacidad: la invitación pide a buscadores que no la indexen.
- Mejoras de accesibilidad: foco visible, estados de música y mensajes `aria-live`.
- Mejoras mobile-first y safe area para iPhone.
- El QR de Yape queda en un estado visual limpio de “QR por agregar” hasta que coloques el QR oficial.

## Archivos principales
- `index.html` — estructura y textos.
- `style.css` — diseño responsive y animaciones.
- `script.js` — configuración, calendario, música, mapa, regalos y RSVP.
- `google-apps-script.gs` — recepción de confirmaciones y canciones en Google Sheets.
- `GUIA-GOOGLE-SHEETS.md` — instrucciones de publicación del Apps Script.
- `fotos/` — fotos de la historia.
- `music/besame.mp3` — música de la invitación.
- `qr/plin.png` — QR de Plin.

## Datos que aún debes definir antes de enviarla
En `script.js`, dentro de `CONFIG`, completa cuando los tengas:
- `horaCeremonia`
- `horaRecepcion`
- `limiteConfirmar`
- QR oficial de Yape: guarda la imagen como `qr/yape.png` y cambia `qr: ""` por `qr: "qr/yape.png"`.
- Completa y verifica la cuenta bancaria/CCI antes de publicar. Mientras sigan con ceros de ejemplo, la tarjeta bancaria se oculta automáticamente para no mostrar datos falsos.

Mientras las horas estén por definir, el botón de calendario guarda el 28 de noviembre como evento de todo el día para no comunicar una hora incorrecta.

## Invitación personalizada
Puedes compartir enlaces como:
`https://tuweb.com/?para=Familia%20Pérez`

El nombre aparece en la apertura y precompleta el RSVP y la sugerencia musical.

## Publicación
Puedes subir esta carpeta a GitHub Pages, Netlify u otro hosting estático. No requiere Node.js.
