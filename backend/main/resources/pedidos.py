from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PedidoModel, ProductoModel

class Pedido(Resource):
    def get(self, id):
        pedido = db.session.query(PedidoModel).get_or_404(id)
        return pedido.to_json(), 200

    def delete(self, id):
        pedido = db.session.query(PedidoModel).get_or_404(id)
        db.session.delete(pedido)
        db.session.commit()
        return '', 204

    def put(self, id):
        pedido = db.session.query(PedidoModel).get_or_404(id)
        data = request.get_json()

        for key, value in data.items():
            if key != 'productos':  # Evitamos asignar directamente productos
                setattr(pedido, key, value)

        # Si se pasan productos para actualizar la relación
        producto_ids = data.get('productos')
        if producto_ids is not None:
            productos = ProductoModel.query.filter(ProductoModel.id.in_(producto_ids)).all()
            pedido.productos = productos  # Reemplaza productos asociados

        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(), 200


class Pedidos(Resource):
    def get(self):
        query = db.session.query(PedidoModel)

        # Filtros
        estado = request.args.get('estado')
        if estado:
            query = query.filter(PedidoModel.estado.ilike(f'%{estado}%'))

        id_user = request.args.get('id_user')
        if id_user:
            query = query.filter(PedidoModel.id_user == int(id_user))

        fecha = request.args.get('fecha')
        if fecha:
            query = query.filter(db.func.date(PedidoModel.fecha) == fecha)

        # Paginación
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'pedidos': [pedido.to_json() for pedido in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'page': pagination.page
        })

    def post(self):
        data = request.get_json()
        pedido = PedidoModel.from_json(data)

        # Asociar productos si se mandan
        producto_ids = data.get('productos')
        if producto_ids:
            productos = ProductoModel.query.filter(ProductoModel.id.in_(producto_ids)).all()
            pedido.productos.extend(productos)

        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(), 201