# AgendaWeb

## Descripción

Aplicación web sencilla de gestión de contactos, donde puedes agregar, editar, eliminar y buscar contactos. La app se conecta a una base de datos PostgreSQL local para almacenar la información de los contactos.

## Tecnologías

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Base de Datos**: PostgreSQL
- **Entorno**: `.env` para configuración de base de datos

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/FernandoIvan10/AgendaWeb.git
2. Instala las dependencias:

   ```bash
   cd AgendaWeb
   npm install
3. Modifica el archivo .env con la configuración de tu base de datos:

   ```bash
    DB_HOST=<tu_host>
    DB_PORT=<puerto_de_tu_base_de_datos>
    DB_USER=<usuario_de_tu_base_de_datos>
    DB_PASSWORD=<contraseña_de_tu_base_de_datos>
    DB_NAME=<nombre_de_tu_base_de_datos>
    FRONTEND_PORT=<puerto_de_tu_servidor_frontend>
    BACKEND_PORT=<puerto_de_tu_servidor_backend>
4. Genera el build del frontend ejecutando el siguiente comando:  

   ```bash
   npm run build
5. En una terminal ejecuta el servidor backend con el siguiente comando:

   ```bash
   node server.js
6. En otra terminal ejecuta el frontend con el siguiente comando:

   ```bash
   npm start

## Funcionalidades
- **Formulario de contacto**: Permite agregar nuevos contactos.
- **Lista de contactos**: Muestra todos los contactos registrados con opciones para editar o eliminar.
- **Búsqueda de contactos**: Encuentra contactos rápidamente por nombre.

## Consideraciones
- El archivo `.env` contiene datos de conexión a la base de datos PostgreSQL. No se incluye información sensible, ya que se utiliza una base de datos local.
- Asegúrate de tener PostgreSQL instalado y configurado en tu máquina local.

## Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.
