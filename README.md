# Invitación web — Alfredo & Lisbeth

## V10 · Editorial 2026

Rediseño integral de la invitación con una estructura más visual, moderna y robusta.

### Qué conserva
- RSVP conectado a Google Sheets.
- Cola local de reintento si se cae la conexión.
- Sugerencias de canciones.
- Google Maps y Waze.
- Apertura directa de Google Calendar, sin descargar `.ics`.
- Música ambiental.
- Lista de regalos, Yape, Plin y transferencia.
- Enlaces personalizados con `?para=`.

### Qué cambia
- Nueva portada editorial con fotografía.
- Nueva apertura cinematográfica simplificada y más robusta.
- Jerarquía tipográfica y composición asimétrica.
- Cuenta regresiva con mejor contraste.
- Bloque de fecha/lugar completamente nuevo.
- Dress code + adultos integrados en una composición visual.
- RSVP convertido en sección protagonista.
- Historia convertida en galería editorial.
- Música con elemento visual tipo vinilo.
- Cierre fotográfico.
- Formularios con `label`, mejor foco y mensajes accesibles.
- JavaScript defensivo: elementos opcionales, fallback de IntersectionObserver y control de errores.
- Envíos a Google Sheets con timeout, cola limitada y deduplicación por ID.
- Soporte para `prefers-reduced-motion`.
- Optimización de imágenes con lazy loading y decoding async.

### Tres apariencias
Consulta `OPCIONES-DISENO.md`.

### Pendientes antes de publicar
Edita `CONFIG` en `script.js`:
1. `horaCeremonia`
2. `horaRecepcion`
3. `limiteConfirmar`
4. QR oficial de Yape
5. Cuenta y CCI reales, si desean mostrarlos

### Google Sheets
La integración existente se mantiene. El archivo `google-apps-script.gs` continúa siendo compatible con esta versión.
