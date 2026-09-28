# Invitación web — Alfredo & Lisbeth

Versión 6: apertura con arco, anillos y ramas que se dibujan solas + diseño sobrio, minimalista y en tonos pastel/arena (Cormorant Garamond · Jost).

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

## Versión 5 (minimalista · moderna · campestre)
- Se reemplazó el sobre con sello por un **arco con ramas que se dibujan solas** (SVG con efecto de trazo). Al tocar «Abrir invitación» el marco se desvanece y el papel sube revelando la portada.
- Paleta nueva: hueso, verde salvia, terracota suave y gris carbón. Tipografías: Cormorant Garamond + Jost (se quitaron Italiana y Pinyon Script).
- Fotos con forma de arco que se revelan con máscara al hacer scroll; parallax suave en la portada; polen sutil de fondo.
- Las ramas se generan en `script.js` (función `sprig`): puedes cambiar cantidad de hojas, tamaño y curva editando los puntos.
- Todo lo funcional se mantiene igual: `CONFIG`, mapa, regalos, RSVP y canciones con Google Sheets, música y `?para=Nombre`.
- La paleta de vestimenta de los invitados (Arena, Terracota, Oliva, Cacao, Champán) no se tocó.

## Versión 6 (sobria · pastel · anillos)
- **Anillos de boda** dibujados en línea dorada (con un brillo en el diamante) en la apertura, la portada, la tarjeta de confirmación y el cierre. Las ramas se mantienen, más suaves.
- **Colores pastel y arena**: se quitaron todos los fondos oscuros (cuenta regresiva en salvia pastel, cierre en rosa arena, pie en arena).
- **Portada corregida**: «desliza» ya no tapa la fecha; ahora está dentro del flujo y desaparece al bajar. El texto de la portada ya no se desplaza al hacer scroll.
- **Orden más claro**: Mensaje → Cuenta regresiva → El gran día (programa + lugar + mapa) → Vestimenta → Solo adultos → Confirmación → Historia → Regalos → Música → Cierre.
- **Programa del día** en línea de tiempo. Opcionales en `CONFIG`: `horaLlegada` (agrega «Llegada de invitados») y `limiteConfirmar` (muestra «confirma antes del …»).
- **Tarjeta «¡Gracias por confirmar!»** al enviar la confirmación.
- **Google Sheets más fiable**: confirmaciones y canciones se guardan con ID único (sin duplicados), con el enlace del invitado (`?para=`) y reintento automático si no hay internet. Hay que pegar el nuevo `google-apps-script.gs` y publicar una nueva versión (ver `GUIA-GOOGLE-SHEETS.md`).
