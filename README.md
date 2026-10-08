# Desafio Orbital — registro de atenciones

API en Node.js y Express para calcular la prioridad de una atención y guardarla en MySQL. Frontend en React.

## Control y revisión del uso de IA

### ¿La IA detectó la regla de negocio que figuraba en el comentario del código Java, pero no estaba implementada?

Sí. La IA identificó que, para un cliente **CORPORATIVO** con una calificación menor que 3, no debía aplicarse el factor de 1,2. Esa observación coincidió con mi interpretación de la consigna y la regla quedó implementada en el servicio.

### Si pediste a la IA la consulta SQL o el componente React, ¿qué correcciones de seguridad o validación hiciste?

Pedí ayuda para generar la consulta SQL y el formulario. Agregue que el backend validara los datos antes de guardarlos: la calificación debe ser un entero entre 1 y 5, `esUrgente` debe ser un booleano y `tipoCliente` solo puede ser `VIP` o `CORPORATIVO`. 


### ¿Qué tipos de datos e índices propuso inicialmente la IA y qué ajustes hiciste?

- **Tipo de cliente:** inicialmente propuso `VARCHAR(50)`. Lo cambié por `ENUM('VIP', 'CORPORATIVO')` para limitar los valores a los dos tipos admitidos por esta versión de la API. Si se agrega otro tipo de cliente, habrá que actualizar tanto la base como la validación.
- **Prioridad:** inicialmente propuso `DECIMAL(4,2)`. Lo cambié por `DECIMAL(4,1)`, porque las calificaciones son enteras y los factores actuales (1, 1,2 y 1,5), más el adicional entero por urgencia, producen como máximo una cifra decimal.

## Puesta en marcha

1. Crear una base llamada `orbital` en MySQL y ejecutar `db/migrations/001_create_atenciones_orbital.sql` dentro de esa base.
2. Configurar `.env` con `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` y, opcionalmente, `PORT`.
3. Ejecutar `npm install` y `npm run dev` en este proyecto.
4. Ejecutar `npm install` y `npm run dev` en `Desafio-frontend`. El frontend usa el proxy de Vite para enviar `POST /atencion` al backend.
