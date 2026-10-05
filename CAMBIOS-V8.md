# Cambios V8 — Invitación Alfredo & Lisbeth

## Experiencia y diseño
- CTA de **Confirmar asistencia** visible desde la portada.
- CTA de **Guardar fecha** desde portada y sección del evento.
- Barra flotante con accesos rápidos a RSVP, ubicación y calendario.
- Resumen visual de fecha, ciudad, vestimenta y celebración para adultos.
- Nueva sección de preguntas frecuentes.
- Mejoras responsive y safe-area para iPhone.
- Botones y controles con objetivos táctiles más cómodos.
- Mejoras de foco y accesibilidad.

## Organización
- RSVP con alergias/restricciones alimentarias opcionales.
- Google Sheets actualizado para guardar ese nuevo campo sin desplazar columnas anteriores.
- Cuenta bancaria oculta automáticamente mientras siga con valores de ejemplo.
- QR de Yape no se inventa: se muestra “QR por agregar” hasta colocar el QR oficial.
- Botón de calendario genera un `.ics`; mientras no existan horarios definitivos, guarda el día completo.

## Privacidad y fiabilidad
- `noindex,nofollow,noarchive` para desalentar indexación en buscadores.
- Los RSVP enviados correctamente a Sheets ya no se conservan innecesariamente como historial local del invitado.
- La cola local solo se usa para reintentos cuando falla la conexión.

## Rendimiento
- `besame.mp3` optimizado de aproximadamente 10.9 MB / 320 kbps a aproximadamente 4.4 MB / 128 kbps.
- La calidad sigue siendo adecuada para reproducción ambiental desde celular.

## Verificado
- Fecha: sábado 28 de noviembre de 2026.
- Dirección pública del local actualizada a Jr. José Olaya 478, Chimbote 02803.
- Referencias internas de JavaScript revisadas: sin IDs faltantes ni duplicados.
- Sintaxis JavaScript y Apps Script validada.

## Pendiente antes de enviar la invitación definitiva
1. Definir hora de ceremonia.
2. Definir hora de recepción.
3. Definir fecha límite de RSVP.
4. Colocar QR oficial de Yape.
5. Colocar cuenta/CCI reales si desean mostrar transferencia bancaria.
6. Volver a publicar la nueva versión de `google-apps-script.gs` para guardar restricciones alimentarias.

## Ajustes posteriores — V9
- Los botones de calendario ya no descargan un archivo `.ics`: abren directamente Google Calendar con el evento precargado.
- Se eliminó la ficha visual “Fecha / Ciudad / Estilo / Celebración”.
- Se reemplazó por un cierre editorial discreto en la sección de mensaje.
- La tarjeta “Cuenta bancaria” vuelve a mostrarse siempre.
- Si todavía no se han colocado números reales, “Nro. de cuenta” y “CCI” aparecen como “Por completar” en lugar de ocultarse o mostrar números ficticios.
