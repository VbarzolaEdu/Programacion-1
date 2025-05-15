from flask_restful import Resource
from flask import request
from .. import db
from main.models import ProductoModel, PedidoModel
from flask import jsonify

class Producto(Resource):
    def get(self,id):
        
        producto = db.session.query(ProductoModel).get_or_404(id)
        return producto.to_json(), 200
    
    def put(self,id): 
        producto= db.session.query(ProductoModel).get_or_404(id)
        data= request.get_json().items()
        for key,value in data:
            setattr(producto,key,value)
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 200
    
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

        # Paginación
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'productos': [producto.to_json() for producto in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'page': pagination.page
        })

    
    def post(self):
        pedido_ids= request.get_json().get('pedidos')
        productos= ProductoModel.from_json(request.get_json())
        if pedido_ids:
            pedidos= PedidoModel.query.filter(PedidoModel.id.in_(pedido_ids)).all()
            productos.pedidos.extend(pedidos)

        db.session.add(productos)
        db.session.commit()
        return productos.to_json(), 201