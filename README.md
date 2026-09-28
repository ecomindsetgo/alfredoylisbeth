# Invitación web — Alfredo & Lisbeth

Versión 2: sobre de apertura + diseño minimalista luxury (Italiana · Cormorant Garamond · Jost).

Personalizar por invitado: `tuweb.com/?para=Familia%20Pérez` (aparece en el sobre y en el RSVP).

## Estructura

- `index.html` — estructura y textos.
- `style.css` — diseño responsive y animaciones.
- `script.js` — contador, música, animaciones y RSVP local.
- `music/` — coloca aquí tu archivo de audio autorizado como `besame.mp3`.

## Fecha provisional

28 de noviembre de 2026.

## Pendiente de reemplazar

- Fotos de referencia → fotos reales.
- Lugar por definir → lugar y mapa.
- Horarios.
- Dress code definitivo.
- Opciones de regalo.
- Historia real de Alfredo & Lisbeth.
- Música: añadir un archivo que tengas derecho a utilizar.

## Publicación

Puedes subir los archivos directamente a un repositorio de GitHub y conectar el repositorio con Netlify.

No requiere Node.js para esta versión: es HTML + CSS + JavaScript puro.

## Versión 3
- Edita `CONFIG` al inicio de `script.js`: lugar, dirección, búsqueda de Google Maps y tu WhatsApp (para recibir confirmaciones y canciones).
- Fotos: dentro de cada `<div class="ph">` agrega `<img src="foto.jpg" alt="">`.

## Versión 4
- Nueva sección **Lista de regalos** (ideas + Yape/Plin/cuenta con botón copiar): se edita en `CONFIG` de `script.js`.
- Confirmaciones y canciones se guardan en Google Sheets: ver `GUIA-GOOGLE-SHEETS.md` y `google-apps-script.gs`.
- Apertura del sobre más rápida, mapa rediseñado, cuenta regresiva con números legibles, paleta de vestimenta en una fila en móvil.
