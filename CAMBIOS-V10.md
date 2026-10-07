# Cambios V10

- Rediseño completo de estructura y experiencia visual.
- Portada editorial con fotografías reales de la familia.
- Apertura premium más simple y estable.
- Tres direcciones visuales seleccionables por URL.
- Google Calendar sigue abriendo directamente el evento.
- Se mantienen Google Sheets, mapa, Waze, música, regalos, QR, RSVP y canciones.
- Mejor accesibilidad de formularios y navegación.
- Mejor comportamiento móvil y safe-area.
- Cola offline robustecida, limitada a 25 registros y con IDs únicos.
- Timeout de red para evitar botones bloqueados indefinidamente.
- Mejor fallback si Web Share, IntersectionObserver o Clipboard no están disponibles.
- Se mantiene `noindex` para privacidad.


## Ajustes V10.1
- Se corrigió el encuadre de la fotografía inicial para evitar recortes agresivos del rostro.
- El sello de fecha de la portada se movió a una zona inferior para no competir con los rostros.
- La fotografía familiar final quedó libre de texto superpuesto; el cierre ahora usa una composición dividida.
- Se retiraron los textos visibles “Para ti” y “RSVP”.
- La personalización por invitado conserva el nombre sin usar el encabezado “Para …”.

## V10.2 — Contador dinámico
- Nueva tipografía sans serif de estilo minimalista para días, horas, minutos y segundos.
- Animación sutil al cambiar cada valor.
- El contador se inicializa de forma independiente del resto de módulos.
- Se resincroniza al volver a la pestaña y al restaurarse desde la caché de navegación del navegador.


## V10.3 — Tipografía del contador
- Se cambió exclusivamente la fuente de los números del contador a Montserrat 500.
- El número 1 ahora tiene una lectura más limpia y convencional.
- Se conserva el contador dinámico y su animación de cambio.

## V10.4 — Adaptación móvil completa
- Maquetación mobile-first revisada para 320–820 px.
- Portada, hero, contador, evento, vestimenta, confirmación, historia, regalos, música, FAQ y cierre reorganizados para móvil.
- Contador compacto en cuatro columnas y sin desbordes.
- Tarjeta de fecha rediseñada horizontalmente en móvil.
- Botones, inputs y select con alturas táctiles y fuente de 16 px para evitar zoom automático en iPhone.
- Paleta de vestimenta mantiene los cinco colores visibles en una fila.
- Galería de historia usa proporciones específicas por foto para evitar recortes incómodos.
- Foto familiar final se muestra completa en móvil con `background-size: contain` y relación 3:4.
- Dock inferior convertido en navegación móvil de tres accesos con soporte de safe-area.
- Ajustes específicos para pantallas menores de 390 px.
