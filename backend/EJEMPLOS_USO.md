# Ejemplos de Uso de Paginación y Filtrado

Este archivo contiene ejemplos de cómo usar la paginación y el filtrado en la API.

## Prerrequisitos

```bash
# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env-example .env
# Editar .env con tus configuraciones

# Iniciar el servidor
python app.py
```

## Ejemplos de Peticiones

### 1. Productos

#### Listar todos los productos (paginación básica)
```bash
curl "http://localhost:7000/productos?page=1&per_page=10"
```

#### Filtrar por categoría y precio
```bash
curl "http://localhost:7000/productos?categoria=bebidas&precio_min=10&precio_max=50&page=1&per_page=20"
```

#### Buscar por nombre y ordenar por precio descendente
```bash
curl "http://localhost:7000/productos?nombre=coca&sort_by=precio&order=desc&page=1&per_page=10"
```

#### Filtrar por disponibilidad
```bash
curl "http://localhost:7000/productos?disponibilidad=disponible&page=1&per_page=20"
```

### 2. Usuarios (requiere autenticación)

#### Listar usuarios con rol específico
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:7000/users?rol=cliente&page=1&per_page=10"
```

#### Buscar usuarios por nombre y ordenar
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:7000/users?nombre=juan&sort_by=nombre&order=asc&page=1&per_page=10"
```

#### Filtrar por estado y email
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:7000/users?estado=activo&email=example.com&page=1&per_page=20"
```

### 3. Pedidos

#### Listar pedidos recientes
```bash
curl "http://localhost:7000/pedidos?sort_by=fecha&order=desc&page=1&per_page=10"
```

#### Filtrar pedidos por usuario
```bash
curl "http://localhost:7000/pedidos?id_user=5&page=1&per_page=20"
```

#### Filtrar por estado y fecha
```bash
curl "http://localhost:7000/pedidos?estado=pendiente&fecha=2024-01-15&page=1&per_page=10"
```

#### Combinar múltiples filtros
```bash
curl "http://localhost:7000/pedidos?id_user=5&estado=completado&sort_by=fecha&order=desc&page=1&per_page=10"
```

### 4. Valoraciones

#### Listar valoraciones de un producto
```bash
curl "http://localhost:7000/valoraciones?id_producto=3&page=1&per_page=10"
```

#### Filtrar por puntuación
```bash
curl "http://localhost:7000/valoraciones?puntuacion=5&sort_by=id&order=desc&page=1&per_page=20"
```

#### Valoraciones de un usuario específico
```bash
curl "http://localhost:7000/valoraciones?id_usuario=5&page=1&per_page=10"
```

### 5. Notificaciones

#### Notificaciones de un usuario
```bash
curl "http://localhost:7000/notificacion?id_usuario=5&page=1&per_page=10"
```

#### Buscar en mensajes
```bash
curl "http://localhost:7000/notificacion?mensaje=pedido&sort_by=id&order=desc&page=1&per_page=20"
```

#### Notificaciones de un pedido específico
```bash
curl "http://localhost:7000/notificacion?id_pedido=10&page=1&per_page=10"
```

## Ejemplos con Python

```python
import requests

# Función auxiliar para hacer peticiones
def get_data(endpoint, params=None):
    base_url = "http://localhost:7000"
    response = requests.get(f"{base_url}/{endpoint}", params=params)
    return response.json()

# Ejemplo 1: Obtener productos con filtros
productos = get_data('productos', {
    'categoria': 'bebidas',
    'precio_min': 10,
    'precio_max': 50,
    'sort_by': 'precio',
    'order': 'asc',
    'page': 1,
    'per_page': 20
})

print(f"Total de productos: {productos['total']}")
print(f"Páginas: {productos['pages']}")
for producto in productos['productos']:
    print(f"- {producto['nombre']}: ${producto['precio']}")

# Ejemplo 2: Paginar a través de todos los resultados
def get_all_pages(endpoint, filters=None):
    all_items = []
    page = 1
    
    while True:
        params = {'page': page, 'per_page': 50}
        if filters:
            params.update(filters)
        
        data = get_data(endpoint, params)
        all_items.extend(data.get(endpoint, []))
        
        if not data.get('has_next'):
            break
        
        page += 1
    
    return all_items

# Obtener todos los pedidos de un usuario
pedidos_usuario = get_all_pages('pedidos', {'id_user': 5})
print(f"Total de pedidos del usuario: {len(pedidos_usuario)}")
```

## Ejemplos con JavaScript/Fetch

```javascript
// Función auxiliar para hacer peticiones
async function getData(endpoint, params = {}) {
    const baseUrl = 'http://localhost:7000';
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${baseUrl}/${endpoint}?${queryString}`);
    return await response.json();
}

// Ejemplo 1: Obtener productos con filtros
async function getProductos() {
    const data = await getData('productos', {
        categoria: 'bebidas',
        precio_min: 10,
        precio_max: 50,
        sort_by: 'precio',
        order: 'asc',
        page: 1,
        per_page: 20
    });
    
    console.log(`Total de productos: ${data.total}`);
    console.log(`Páginas: ${data.pages}`);
    data.productos.forEach(producto => {
        console.log(`- ${producto.nombre}: $${producto.precio}`);
    });
    
    return data;
}

// Ejemplo 2: Obtener todos los items (todas las páginas)
async function getAllItems(endpoint, filters = {}) {
    let allItems = [];
    let page = 1;
    let hasNext = true;
    
    while (hasNext) {
        const data = await getData(endpoint, {
            ...filters,
            page: page,
            per_page: 50
        });
        
        // El nombre de la clave depende del endpoint
        const key = Object.keys(data).find(k => Array.isArray(data[k]));
        if (key) {
            allItems = allItems.concat(data[key]);
        }
        
        hasNext = data.has_next;
        page++;
    }
    
    return allItems;
}

// Uso
getAllItems('pedidos', { id_user: 5 })
    .then(pedidos => {
        console.log(`Total de pedidos: ${pedidos.length}`);
    });
```

## Respuesta Estándar

Todas las peticiones GET a endpoints de colección retornan:

```json
{
  "items_key": [
    /* array de items */
  ],
  "total": 100,
  "pages": 10,
  "page": 1,
  "per_page": 10,
  "has_next": true,
  "has_prev": false
}
```

Donde `items_key` es:
- `productos` para `/productos`
- `users` para `/users`
- `pedidos` para `/pedidos`
- `valoraciones` para `/valoraciones`
- `notificaciones` para `/notificacion`

## Parámetros Comunes

| Parámetro | Descripción | Por defecto | Válidos |
|-----------|-------------|-------------|---------|
| `page` | Número de página | 1 | >= 1 |
| `per_page` | Items por página | 10 | 1-100 |
| `sort_by` | Campo para ordenar | Varía | Campos del modelo |
| `order` | Dirección del orden | 'asc' | 'asc', 'desc' |

## Límites y Validaciones

- **Página mínima:** 1
- **Items por página mínimo:** 1
- **Items por página máximo:** 100
- Si se pasa `per_page` > 100, se usa 100
- Si se pasa `page` < 1, se usa 1
- Si `sort_by` no es un campo válido, se ignora
- Si `order` no es 'asc' o 'desc', se usa el valor por defecto
