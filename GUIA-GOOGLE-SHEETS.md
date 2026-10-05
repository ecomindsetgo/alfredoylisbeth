# Google Sheets — confirmaciones y canciones

La invitación ya tiene configurada una URL de Google Apps Script en `script.js`.

## Qué se guarda
### Pestaña `Confirmaciones`
- Fecha
- Nombre
- ¿Asiste?
- Mensaje
- Invitado (enlace personalizado)
- ID único
- Restricciones alimentarias

### Pestaña `Canciones`
- Fecha
- Nombre
- Canción y artista
- Invitado (enlace personalizado)
- ID único

El ID evita duplicados cuando un celular reintenta un envío. Si el invitado pierde conexión, la respuesta queda en cola local y se reintenta al recuperar internet mientras la invitación siga abierta.

## Importante al pasar a esta versión
Como el RSVP ahora incluye `Restricciones alimentarias`, debes actualizar el Apps Script. La nueva columna se agrega al final para respetar tus registros anteriores:
1. Abre tu Google Sheet.
2. Ve a **Extensiones → Apps Script**.
3. Reemplaza el código por el contenido del archivo `google-apps-script.gs`.
4. Guarda.
5. Ve a **Implementar → Administrar implementaciones**.
6. Edita la implementación actual y selecciona **Nueva versión**.
7. Implementa.

La URL `/exec` normalmente no cambia, así que no deberías tener que modificar `sheetsUrl`.

## Instalación desde cero
1. Crea una hoja llamada, por ejemplo, `Invitación Alfredo y Lisbeth`.
2. Ve a **Extensiones → Apps Script**.
3. Pega `google-apps-script.gs`.
4. Ejecuta la función `prueba` una vez y autoriza permisos.
5. Revisa que se creen `Confirmaciones` y `Canciones`.
6. Publica como **Aplicación web**:
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier persona**
7. Copia la URL terminada en `/exec` y colócala en `CONFIG.sheetsUrl`.

## Si no llegan registros
- La implementación debe permitir acceso a **Cualquier persona**.
- Usa la URL `/exec`, no `/dev`.
- Después de cambiar el Apps Script debes publicar una **Nueva versión**.
- Ejecuta `prueba`; si esa prueba falla, el problema está en Apps Script/permisos.

## QR de Yape
El ZIP actual no contiene el QR oficial de Yape. Por seguridad no se genera ni se inventa uno a partir del número. Cuando tengas tu QR oficial:
1. Guárdalo como `qr/yape.png`.
2. En `script.js`, cambia el campo de Yape a `qr: "qr/yape.png"`.
