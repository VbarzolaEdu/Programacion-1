# Documentación de Paginación y Filtrado del Backend

Este documento describe cómo utilizar la paginación y el filtrado en los endpoints del backend.

## Parámetros Comunes de Paginación

Todos los endpoints de listado (`/usuarios`, `/productos`, `/pedidos`, `/valoraciones`, `/notificaciones`) soportan los siguientes parámetros de paginación:

### Parámetros de Paginación

| Parámetro | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `page` | int | 1 | Número de página a obtener (mínimo: 1) |
| `per_page` | int | 10 | Cantidad de elementos por página (mínimo: 1, máximo: 100) |

### Parámetros de Ordenamiento

| Parámetro | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `sort_by` | string | Varía por endpoint | Campo por el cual ordenar los resultados |
| `order` | string | 'asc' | Orden de los resultados ('asc' o 'desc') |

### Respuesta Estándar de Paginación

Todos los endpoints retornan un objeto JSON con la siguiente estructura:

```json
{
  "items_key": [...],  // Nombre específico según el endpoint
  "total": 100,        // Total de elementos
  "pages": 10,         // Total de páginas
  "page": 1,           // Página actual
  "per_page": 10,      // Elementos por página
  "has_next": true,    // Indica si hay página siguiente
  "has_prev": false    // Indica si hay página anterior
}
```

## Endpoints Específicos

### 1. Productos (`/productos`)

**Filtros disponibles:**
- `nombre`: Busca productos por nombre (búsqueda parcial, case-insensitive)
- `categoria`: Filtra por categoría (búsqueda parcial, case-insensitive)
- `precio_min`: Precio mínimo (float)
- `precio_max`: Precio máximo (float)
- `disponibilidad`: Filtra por disponibilidad (string exacto)

**Ordenamiento por defecto:** `id` (ascendente)

**Campos disponibles para ordenar:** `id`, `nombre`, `precio`, `categoria`, `disponibilidad`

**Ejemplo:**
```
GET /productos?page=1&per_page=20&categoria=bebidas&precio_min=10&precio_max=50&sort_by=precio&order=asc
```

**Respuesta:**
```json
{
  "productos": [
    {
      "id": 1,
      "nombre": "Coca Cola",
      "precio": 25.50,
      "categoria": "bebidas",
      "disponibilidad": "disponible"
    }
  ],
  "total": 15,
  "pages": 1,
  "page": 1,
  "per_page": 20,
  "has_next": false,
  "has_prev": false
}
```

### 2. Usuarios (`/users`)

**Filtros disponibles:**
- `nombre`: Busca usuarios por nombre (búsqueda parcial)
- `email`: Busca por email (búsqueda parcial)
- `rol`: Filtra por rol exacto
- `estado`: Filtra por estado exacto

**Ordenamiento por defecto:** `id` (ascendente)

**Campos disponibles para ordenar:** `id`, `nombre`, `email`, `rol`, `estado`

**Autenticación:** Requiere rol `admin` o `empleado`

**Ejemplo:**
```
GET /users?page=1&per_page=10&rol=cliente&sort_by=nombre&order=asc
```

**Respuesta:**
```json
{
  "users": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellidos": "Pérez",
      "email": "juan@example.com",
      "cellphone": 123456789,
      "rol": "cliente",
      "estado": "activo"
    }
  ],
  "total": 50,
  "pages": 5,
  "page": 1,
  "per_page": 10,
  "has_next": true,
  "has_prev": false
}
```

### 3. Pedidos (`/pedidos`)

**Filtros disponibles:**
- `estado`: Filtra por estado (búsqueda parcial, case-insensitive)
- `id_user`: Filtra por ID de usuario (int)
- `fecha`: Filtra por fecha exacta (formato: YYYY-MM-DD)

**Ordenamiento por defecto:** `fecha` (descendente)

**Campos disponibles para ordenar:** `id`, `fecha`, `estado`, `id_user`

**Ejemplo:**
```
GET /pedidos?page=1&per_page=10&estado=pendiente&id_user=5&sort_by=fecha&order=desc
```

**Respuesta:**
```json
{
  "pedidos": [
    {
      "id": 1,
      "fecha": "2024-01-15T10:30:00",
      "estado": "pendiente",
      "id_user": 5
    }
  ],
  "total": 25,
  "pages": 3,
  "page": 1,
  "per_page": 10,
  "has_next": true,
  "has_prev": false
}
```

### 4. Valoraciones (`/valoraciones`)

**Filtros disponibles:**
- `id_usuario`: Filtra por ID de usuario (int)
- `id_producto`: Filtra por ID de producto (int)
- `puntuacion`: Filtra por puntuación exacta (int)

**Ordenamiento por defecto:** `id` (descendente)

**Campos disponibles para ordenar:** `id`, `id_usuario`, `id_producto`, `puntuacion`

**Ejemplo:**
```
GET /valoraciones?page=1&per_page=10&id_producto=3&puntuacion=5&sort_by=id&order=desc
```

**Respuesta:**
```json
{
  "valoraciones": [
    {
      "id": 1,
      "id_usuario": 5,
      "id_producto": 3,
      "puntuacion": 5,
      "comentario": "Excelente producto"
    }
  ],
  "total": 12,
  "pages": 2,
  "page": 1,
  "per_page": 10,
  "has_next": true,
  "has_prev": false
}
```

### 5. Notificaciones (`/notificacion`)

**Filtros disponibles:**
- `id_usuario`: Filtra por ID de usuario (int)
- `id_pedido`: Filtra por ID de pedido (int)
- `mensaje`: Busca en el mensaje (búsqueda parcial)

**Ordenamiento por defecto:** `id` (descendente)

**Campos disponibles para ordenar:** `id`, `id_usuario`, `id_pedido`

**Ejemplo:**
```
GET /notificacion?page=1&per_page=10&id_usuario=5&sort_by=id&order=desc
```

**Respuesta:**
```json
{
  "notificaciones": [
    {
      "id": 1,
      "id_usuario": 5,
      "id_pedido": 10,
      "mensaje": "Tu pedido está listo"
    }
  ],
  "total": 8,
  "pages": 1,
  "page": 1,
  "per_page": 10,
  "has_next": false,
  "has_prev": false
}
```

## Validación y Límites

- **Página mínima:** 1
- **Elementos por página mínimo:** 1
- **Elementos por página máximo:** 100
- **Orden válido:** 'asc' o 'desc' (cualquier otro valor se reemplaza por el valor por defecto)

## Buenas Prácticas

1. **Siempre usa paginación:** No hagas peticiones sin paginación en producción para evitar sobrecargar el servidor
2. **Especifica per_page apropiado:** Ajusta según tus necesidades (10-50 para listados normales)
3. **Usa ordenamiento:** Especifica `sort_by` y `order` para resultados predecibles
4. **Combina filtros:** Puedes usar múltiples filtros simultáneamente
5. **Verifica has_next/has_prev:** Usa estos campos para saber si hay más páginas disponibles

## Ejemplo de Implementación en Frontend

```javascript
// Función para obtener productos paginados
async function getProductos(page = 1, filters = {}) {
  const params = new URLSearchParams({
    page: page,
    per_page: 20,
    sort_by: 'nombre',
    order: 'asc',
    ...filters
  });
  
  const response = await fetch(`/productos?${params}`);
  const data = await response.json();
  
  return {
    productos: data.productos,
    totalPages: data.pages,
    currentPage: data.page,
    hasNext: data.has_next,
    hasPrev: data.has_prev
  };
}

// Uso
const result = await getProductos(1, { 
  categoria: 'bebidas', 
  precio_min: 10,
  precio_max: 50 
});
```
