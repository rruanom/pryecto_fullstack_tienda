# Tienda Online - Proyecto Final

## Descripción
Este proyecto es una tienda online fullstack desarrollada como proyecto final. Ofrece una experiencia de compra completa, desde la navegación del catálogo hasta la gestión de pedidos, con funcionalidades tanto para clientes como para administradores.

## Tecnologías Utilizadas
- Frontend: React 18 con Vite
- Backend: Node.js 14+ con Express 4
- Bases de Datos: 
  - PostgreSQL 12+ (productos, categorías, proveedores, usuarios)
  - MongoDB 4+ (carritos de compra anteriores)
- Autenticación: JWT (JSON Web Tokens)
- Estilizado: CSS Modules
- Testing: Jest y React Testing Library
- Despliegue: Render

## Características Principales

### Para Clientes
1. Catálogo de Productos
   - Visualización de productos con imágenes, descripciones y precios
   - Filtrado por categoría, proveedor y nombre
   - Ordenamiento por precio (ascendente/descendente) o aleatorio
   - Paginación de resultados

2. Sistema de Autenticación
   - Registro de nuevos usuarios
   - Inicio de sesión con JWT
   - Cierre de sesión

3. Carrito de Compras
   - Agregar/eliminar productos
   - Modificar cantidades
   - Persistencia del carrito entre sesiones

4. Gestión de Pedidos
   - Crear nuevos pedidos
   - Ver historial de pedidos anteriores

5. Perfil de Usuario
   - Ver y editar información personal
   - Cambiar contraseña

### Para Administradores
1. Gestión de Productos (CRUD)
   - Crear nuevos productos
   - Leer/Listar todos los productos
   - Actualizar información de productos
   - Eliminar productos

2. Gestión de Categorías (CRUD)
   - Crear nuevas categorías
   - Listar todas las categorías
   - Actualizar nombres de categorías
   - Eliminar categorías

3. Gestión de Proveedores (CRUD)
   - Agregar nuevos proveedores
   - Listar todos los proveedores
   - Actualizar información de proveedores
   - Eliminar proveedores

4. Gestión de Usuarios
   - Ver lista de usuarios registrados
   - Cambiar roles de usuario (cliente/admin)
   - Desactivar cuentas de usuario

## API Endpoints

### Productos
- GET /api/products/page: Obtiene productos paginados con filtros
- GET /api/products/id/:id: Obtiene un producto por ID
- POST /api/products/product: Crea un nuevo producto
- PUT /api/products/product/:id: Actualiza un producto
- DELETE /api/products/product/:id: Elimina un producto

### Categorías
- GET /api/categories: Obtiene todas las categorías
- GET /api/categories/:id: Obtiene una categoría por ID
- POST /api/categories: Crea una nueva categoría
- PUT /api/categories/:id: Actualiza una categoría
- DELETE /api/categories/:id: Elimina una categoría

### Proveedores
- GET /api/providers: Obtiene todos los proveedores
- GET /api/providers/:id: Obtiene un proveedor por ID
- POST /api/providers: Crea un nuevo proveedor
- PUT /api/providers/:id: Actualiza un proveedor
- DELETE /api/providers/:id: Elimina un proveedor

### Usuarios
- GET /api/users: Obtiene usuarios (con filtro por email)
- POST /api/users/register: Registra un nuevo usuario
- POST /api/users/login: Inicia sesión de usuario
- POST /api/users/logout: Cierra sesión de usuario
- PUT /api/users: Actualiza información de usuario
- DELETE /api/users: Elimina un usuario

### Carritos Antiguos
- POST /api/oldcarts/create-user: Crea un usuario en MongoDB
- POST /api/oldcarts: Guarda un carrito
- GET /api/oldcarts/:email: Obtiene carritos anteriores de un usuario
