"""
Utilidades para paginación y filtrado estandarizado
"""
from flask import request
from sqlalchemy import desc


def get_pagination_params():
    """
    Obtiene los parámetros de paginación de la request.
    
    Returns:
        tuple: (page, per_page) con valores por defecto si no se proporcionan
    """
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Validar límites
    page = max(1, page)  # Página mínima 1
    per_page = min(max(1, per_page), 100)  # Entre 1 y 100 items por página
    
    return page, per_page


def paginate_query(query, page=None, per_page=None):
    """
    Aplica paginación a una query de SQLAlchemy.
    
    Args:
        query: Query de SQLAlchemy
        page: Número de página (opcional, si no se proporciona se obtiene de la request)
        per_page: Items por página (opcional, si no se proporciona se obtiene de la request)
    
    Returns:
        dict: Diccionario con los resultados paginados y metadatos
    """
    if page is None or per_page is None:
        page, per_page = get_pagination_params()
    
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    
    return {
        'items': pagination.items,
        'total': pagination.total,
        'pages': pagination.pages,
        'page': pagination.page,
        'per_page': per_page,  # Use validated parameter for consistency
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev
    }


def get_sort_params(default_sort=None, default_order='asc'):
    """
    Obtiene los parámetros de ordenamiento de la request.
    
    Args:
        default_sort: Campo de ordenamiento por defecto
        default_order: Orden por defecto ('asc' o 'desc')
    
    Returns:
        tuple: (sort_by, order) con los valores de ordenamiento
    """
    sort_by = request.args.get('sort_by', default_sort)
    order = request.args.get('order', default_order).lower()
    
    # Validar que order sea válido
    if order not in ['asc', 'desc']:
        order = default_order
    
    return sort_by, order


def apply_sorting(query, model, sort_by, order='asc', allowed_fields=None):
    """
    Aplica ordenamiento seguro a una query de SQLAlchemy usando whitelist.
    
    Args:
        query: Query de SQLAlchemy
        model: Modelo de SQLAlchemy
        sort_by: Campo por el cual ordenar
        order: Orden ('asc' o 'desc')
        allowed_fields: Lista de campos permitidos para ordenar. Si es None, se permiten todos.
    
    Returns:
        Query con ordenamiento aplicado
    """
    if not sort_by:
        return query
    
    # Si hay whitelist, validar que el campo esté permitido
    if allowed_fields is not None and sort_by not in allowed_fields:
        return query
    
    # Verificar que el campo existe en el modelo
    if not hasattr(model, sort_by):
        return query
    
    sort_column = getattr(model, sort_by)
    
    if order == 'desc':
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(sort_column)
    
    return query

