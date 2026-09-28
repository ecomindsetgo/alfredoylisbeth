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
- Sobre más claro y natural (papel marfil, pétalos cayendo), apertura en 3 tiempos: sello → solapa → carta sube y se disuelve hacia la portada.
- Florales minimalistas en SVG (ramas, tulipanes, orquídeas, florecillas). Los colores se cambian en las variables `--leaf`, `--petal` en `style.css`.
- Portada clara; adaptado a móviles (florales más pequeños en pantallas angostas).
