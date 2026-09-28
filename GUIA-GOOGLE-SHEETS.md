# ¿Dónde se guardan las confirmaciones y las canciones?

## Cómo está ahora
Una página web (Netlify/GitHub) no tiene base de datos. Mientras `sheetsUrl` esté vacío en `script.js`,
lo que escribe cada invitado se guarda **solo en su propio celular** (localStorage) y **tú no lo ves**.
Por eso conectamos la invitación con una hoja de Google Sheets.

## Cómo queda funcionando
Invitado llena el formulario → `script.js` lo envía → tu Google Apps Script → se agrega una fila en tu hoja.
- Pestaña **Confirmaciones**: Fecha, Nombre, ¿Asiste?, Mensaje, Invitado (enlace), ID
- Pestaña **Canciones**: Fecha, Nombre, Canción y artista, Invitado (enlace), ID
(Las pestañas se crean solas con el primer envío. Si ya existían con menos columnas, se completan solas.)
- **Invitado (enlace)** guarda el nombre del enlace personalizado (`?para=Familia Pérez`), útil para saber a quién se envió cada invitación.
- **ID** es un código único por envío: si el celular reintenta, no se duplica la fila.
- Si el invitado no tiene internet al enviar, la respuesta queda guardada en su celular y se reenvía sola cuando vuelva la conexión (con la página abierta).

## Pasos (10 minutos, gratis)
1. Entra a sheets.google.com y crea una hoja nueva: "Invitación Alfredo y Lisbeth".
2. Menú **Extensiones → Apps Script**.
3. Borra lo que aparezca y pega todo el contenido de `google-apps-script.gs`. Guarda (icono del disquete).
4. En la barra superior elige la función **prueba** y pulsa **▶ Ejecutar**. Autoriza los permisos
   (si dice "Google no ha verificado esta app": Avanzado → Ir a proyecto (no seguro) → Permitir; es tu propio script).
   Revisa que aparezcan dos filas de prueba en las pestañas Confirmaciones y Canciones; luego bórralas.
5. Clic en **Implementar → Nueva implementación**.
   - Tipo (engranaje): **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
6. Copia la **URL de la aplicación web** (termina en `/exec`).
7. Abre `script.js` y pégala en `CONFIG`:
   `sheetsUrl: "https://script.google.com/macros/s/XXXXXXXX/exec",`
8. Sube los archivos de nuevo a GitHub/Netlify.
9. Prueba desde la invitación (confirma asistencia y sugiere una canción) y revisa que aparezcan las filas.

## Si ya tenías el Apps Script de la versión anterior
Pega el nuevo `google-apps-script.gs` y publica una nueva versión: **Implementar → Administrar implementaciones → editar (lápiz) → Versión: Nueva versión → Implementar**.
La URL no cambia, así que no hace falta tocar `sheetsUrl`. No borres tus pestañas: se completan solas.

## Si no aparecen las filas
- La implementación debe tener acceso **Cualquier persona** (no "Solo yo" ni "Cualquier persona con cuenta de Google").
- La URL debe terminar en **/exec** (no en /dev).
- Después de editar el código hay que publicar una **Nueva versión** (ver arriba); guardar no basta.
- Ejecuta `prueba` en el editor: si ahí tampoco aparecen filas, el problema es del script/permisos, no de la invitación.
- Ten en cuenta: el navegador no puede leer la respuesta de Google (es normal), así que la invitación confirma al invitado
  en cuanto envía. La prueba real siempre es mirar tu hoja.

## Notas
- Cualquiera con la URL podría enviar datos a tu hoja; no la publiques fuera de la invitación.
- Si además quieres aviso por WhatsApp, avísame y lo agregamos.

## Lista de regalos
Edita `ideas` y `pagos` al inicio de `script.js` (números de Yape/Plin, cuenta, CCI y titular).
Los invitados tienen un botón "Copiar" en cada número.

### QR de Yape y Plin
Guarda las imágenes en la carpeta `qr/` con los nombres `yape.png` y `plin.png` (o cambia la ruta en `CONFIG.regalos`).
Mientras no existan, se muestra un recuadro "QR por agregar".
