from flask_restful import Resource
from flask import request
from .. import db
from main.models import ProductoModel, PedidoModel
from flask import jsonify
from flask_jwt_extended import jwt_required
from main.auth.decorators import role_required
from main.utils.pagination import paginate_query, get_sort_params
from sqlalchemy import desc

class Producto(Resource):
    def get(self,id):
        
        producto = db.session.query(ProductoModel).get_or_404(id)
        return producto.to_json(), 200
    
    @jwt_required()
    @role_required(roles=["admin","empleado"])
    def put(self,id): 
        producto= db.session.query(ProductoModel).get_or_404(id)
        data= request.get_json().items()
        for key,value in data:
            setattr(producto,key,value)
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 200
    
    @jwt_required()
    @role_required(roles=["admin"])
    def delete(self,id):
        producto = db.session.query(ProductoModel).get_or_404(id)
        db.session.delete(producto)
        db.session.commit()
        return '', 200
    
class Productos(Resource):
    def get(self):
        query = db.session.query(ProductoModel)

        # Filtros
        nombre = request.args.get('nombre')
        if nombre:
            query = query.filter(ProductoModel.nombre.ilike(f'%{nombre}%'))

        precio_min = request.args.get('precio_min')
        if precio_min:
            query = query.filter(ProductoModel.precio >= float(precio_min))

        precio_max = request.args.get('precio_max')
        if precio_max:
            query = query.filter(ProductoModel.precio <= float(precio_max))

        categoria = request.args.get('categoria')
        if categoria:
            query = query.filter(ProductoModel.categoria.ilike(f'%{categoria}%'))

        disponibilidad = request.args.get('disponibilidad')
        if disponibilidad:
            query = query.filter(ProductoModel.disponibilidad == disponibilidad)

        # Ordenamiento
        sort_by, order = get_sort_params(default_sort='id', default_order='asc')
        if sort_by and hasattr(ProductoModel, sort_by):
            sort_column = getattr(ProductoModel, sort_by)
            query = query.order_by(desc(sort_column) if order == 'desc' else sort_column)

        # Paginación
        result = paginate_query(query)

        return jsonify({
            'productos': [producto.to_json() for producto in result['items']],
            'total': result['total'],
            'pages': result['pages'],
            'page': result['page'],
            'per_page': result['per_page'],
            'has_next': result['has_next'],
            'has_prev': result['has_prev']
        })

    
    @jwt_required()
    @role_required(roles=["admin"])
    def post(self):
        data = request.get_json()
        
        # Crear el producto desde los datos JSON
        producto = ProductoModel.from_json(data)
        
        # Si hay pedidos asociados (opcional)
        pedido_ids = data.get('pedidos')
        if pedido_ids:
            pedidos = PedidoModel.query.filter(PedidoModel.id.in_(pedido_ids)).all()
            producto.pedidos.extend(pedidos)

        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 201