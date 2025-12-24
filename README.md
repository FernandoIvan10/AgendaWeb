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
   cd AgendaWeb
   ```
2. Instala las dependencias del frontend:

   ```bash
   cd client
   npm install
   ```
3. Instala las dependencias del backend:

   ```bash
   cd ../server
   npm install
   ```
4. Modifica el archivo .env, ubicado en la carpeta server, con la configuración de tu base de datos y el puerto de tu servidor backend:

   ```bash
    DB_HOST=<tu_host>
    DB_PORT=<puerto_de_tu_base_de_datos>
    DB_USER=<usuario_de_tu_base_de_datos>
    DB_PASSWORD=<contraseña_de_tu_base_de_datos>
    DB_NAME=<nombre_de_tu_base_de_datos>
    BACKEND_PORT=<puerto_de_tu_servidor_backend>
    ```
5. En una terminal ejecuta el script de la base de datos
con el siguiente comando:

   ```bash
   cd server
   node init-db
   ```
6. Y en ese mismo directorio ejecuta el servidor backend con el siguiente comando:

   ```bash
   node server.js
   ```
7. En otra teriminal genera el build del frontend ejecutando el siguiente comando:  

   ```bash
   cd client
   npm run build
   ```
8. Y en ese mismo directorio ejecuta el frontend con el siguiente comando:

   ```bash
   npm start
   ```

## Funcionalidades
- **Formulario de contacto**: Permite agregar nuevos contactos.
- **Lista de contactos**: Muestra todos los contactos registrados con opciones para editar o eliminar.
- **Búsqueda de contactos**: Encuentra contactos rápidamente por nombre.

## Consideraciones
- El archivo `.env` contiene datos de conexión a la base de datos PostgreSQL. No se incluye información sensible, ya que se utiliza una base de datos local.
- Asegúrate de tener PostgreSQL instalado y configurado en tu máquina local.

## Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.
