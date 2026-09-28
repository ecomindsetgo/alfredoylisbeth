# ¿Dónde se guardan las confirmaciones y las canciones?

## Cómo está ahora
Una página web (Netlify/GitHub) no tiene base de datos. Mientras `sheetsUrl` esté vacío en `script.js`,
lo que escribe cada invitado se guarda **solo en su propio celular** (localStorage) y **tú no lo ves**.
Por eso conectamos la invitación con una hoja de Google Sheets.

## Cómo queda funcionando
Invitado llena el formulario → `script.js` lo envía → tu Google Apps Script → se agrega una fila en tu hoja.
- Pestaña **Confirmaciones**: Fecha, Nombre, ¿Asiste?, Mensaje, Enlace de invitado
- Pestaña **Canciones**: Fecha, Canción y artista, Enviado por
(Las pestañas se crean solas con el primer envío.)

## Pasos (10 minutos, gratis)
1. Entra a sheets.google.com y crea una hoja nueva: "Invitación Alfredo y Lisbeth".
2. Menú **Extensiones → Apps Script**.
3. Borra lo que aparezca y pega todo el contenido de `google-apps-script.gs`. Guarda (icono del disquete).
4. Clic en **Implementar → Nueva implementación**.
   - Tipo (engranaje): **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Clic en **Implementar** y autoriza los permisos
   (si dice "Google no ha verificado esta app": Avanzado → Ir a proyecto (no seguro) → Permitir; es tu propio script).
6. Copia la **URL de la aplicación web** (termina en `/exec`).
7. Abre `script.js` y pégala en `CONFIG`:
   `sheetsUrl: "https://script.google.com/macros/s/XXXXXXXX/exec",`
8. Sube los archivos de nuevo a GitHub/Netlify.
9. Prueba: confirma asistencia desde la invitación y revisa que aparezca la fila en tu hoja.

## Notas
- Si cambias el código del Apps Script, debes hacer **Implementar → Administrar implementaciones → editar → Nueva versión**; la URL se mantiene.
- Cualquiera con la URL podría enviar datos a tu hoja; no la publiques fuera de la invitación.
- El navegador no puede confirmar la respuesta de Google (es normal), así que revisa tu hoja en la primera prueba.
- Si además quieres aviso por WhatsApp, avísame y lo agregamos.

## Lista de regalos
Edita `ideas` y `pagos` al inicio de `script.js` (números de Yape/Plin, cuenta, CCI y titular).
Los invitados tienen un botón "Copiar" en cada número.
