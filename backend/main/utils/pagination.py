"""
Utilidades para paginación y filtrado estandarizado
"""
from flask import request


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
        'per_page': per_page,
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
