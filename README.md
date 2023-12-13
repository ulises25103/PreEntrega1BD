# Backend Project

Este proyecto de backend implementa un servidor Node.js con Express para gestionar productos y carritos.

## Lógicas Implementadas

### Rutas de Productos (/api/products)

- **GET /api/products/**: Listar todos los productos.
- **GET /api/products/:pid**: Obtener un producto por ID.
- **POST /api/products/**: Agregar un nuevo producto.
- **PUT /api/products/:pid**: Actualizar un producto por ID.
- **DELETE /api/products/:pid**: Eliminar un producto por ID.

### Rutas de Carritos (/api/carts)

- **POST /api/carts/**: Crear un nuevo carrito.
- **GET /api/carts/:cid**: Listar productos de un carrito por ID.
- **POST /api/carts/:cid/product/:pid**: Agregar un producto al carrito.
