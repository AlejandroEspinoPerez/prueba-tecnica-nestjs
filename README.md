API Gestión de Clientes, Restaurantes y Órdenes
1. Descripción
Esta API permite gestionar entidades relacionadas con un sistema de restaurantes, donde se puede realizar:

Registro de clientes y restaurantes.
Creación de órdenes vinculadas a clientes y restaurantes específicos.
La API aplica restricciones como:

Limitar la capacidad de clientes en los restaurantes.
Aceptar únicamente clientes adultos.


2. Requisitos
Node.js y Yarn.
NestJS (para la arquitectura backend).
PostgreSQL (base de datos relacional).
TypeScript (para un desarrollo tipado y robusto).
Para documentación:

Swagger (API interactiva con Swagger 2.0).


3. Tecnologías utilizadas
NestJS: Framework para la construcción de aplicaciones backend en Node.js.
TypeORM: ORM para la integración de la base de datos PostgreSQL.
Swagger: Herramienta de documentación de API.
PostgreSQL: Base de datos relacional.


4. Estructura del proyecto
src/
│
├── client/                     # Módulo para gestión de clientes
│   ├── client.controller.ts     # Controlador de clientes
│   ├── client.service.ts        # Servicio de clientes
│   ├── client.entity.ts         # Entidad Cliente
│   ├── client.module.ts
│   ├── dto/                     # DTOs de cliente (validación de datos)
│
├── restaurant/                 # Módulo para gestión de restaurantes
│   ├── restaurant.controller.ts # Controlador de restaurantes
│   ├── restaurant.service.ts    # Servicio de restaurantes
│   ├── restaurant.entity.ts     # Entidad Restaurante
│   ├── restaurant.module.ts
│   ├── dto/                     # DTOs de restaurante
│
├── order/                      # Módulo para gestión de órdenes
│   ├── order.controller.ts      # Controlador de órdenes
│   ├── order.service.ts         # Servicio de órdenes
│   ├── order.entity.ts          # Entidad Orden
│   ├── order.module.ts
│   ├── dto/                     # DTOs de orden
│
├── common/                     # Utilidades y excepciones comunes
│   ├── filters/              # Excepciones personalizadas
│ 
└── main.ts                     # Punto de entrada de la aplicación


5. Instalación y configuración
Clonar el repositorio:

git clone <URL del repositorio>
cd <nombre-del-repositorio>
Instalar dependencias:

yarn install
Configurar las variables de entorno: Crear un archivo .env en la raíz del proyecto con el siguiente contenido (ajustar según tu entorno):


DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=prueba_tecnica
Ejecutar la base de datos:

Asegúrate de que PostgreSQL esté corriendo en localhost:5432.
Crear una base de datos llamada prueba_tecnica (si no existe).
Iniciar la aplicación:


yarn start:dev
6. Documentación con Swagger
Una vez la aplicación esté corriendo, Swagger estará disponible en:


http://localhost:3000/api
Swagger proporciona una interfaz visual para probar los endpoints de la API, detallando los datos requeridos, respuestas posibles y errores. La configuración de Swagger se encuentra en el archivo main.ts y está habilitada automáticamente en modo desarrollo.

7. Endpoints principales
Clientes:

POST /clients: Crear un nuevo cliente.
GET /clients: Listar todos los clientes.
GET /clients/:id: Obtener un cliente específico.
PUT /clients/:id: Actualizar un cliente.
DELETE /clients/:id: Eliminar un cliente.
Restaurantes:

POST /restaurants: Crear un nuevo restaurante.
GET /restaurants: Listar todos los restaurantes.
GET /restaurants/:id: Obtener un restaurante específico.
PUT /restaurants/:id: Actualizar un restaurante.
DELETE /restaurants/:id: Eliminar un restaurante.
Órdenes:

POST /orders: Crear una nueva orden asociada a un cliente y restaurante.
GET /orders: Listar todas las órdenes.
GET /orders/:id: Obtener una orden específica.
PUT /orders/:id: Actualizar una orden.
DELETE /orders/:id: Eliminar una orden.


8. Validaciones y Restricciones
Capacidad del restaurante: La cantidad de clientes asignados a un restaurante no debe exceder su capacidad máxima.
Edad del cliente: Solo se permite registrar clientes mayores de 18 años.


9. Contacto

Alejandro Espino Pérez.
+53 56108535.
GMAIL: espinoperezalejandro50@gmail.com