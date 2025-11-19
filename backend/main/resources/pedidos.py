from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PedidoModel, ProductoModel
from flask_jwt_extended import jwt_required
from datetime import datetime
from main.mail.functions import sendMail

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
        try:
            pedido = db.session.query(PedidoModel).get_or_404(id)
            data = request.get_json()

            for key, value in data.items():
                if key == 'fecha':
                    # Convertir string de fecha a datetime
                    if isinstance(value, str):
                        try:
                            # Intentar varios formatos de fecha
                            if 'T' in value:
                                # Formato ISO con tiempo
                                fecha_obj = datetime.fromisoformat(value.replace('Z', '+00:00'))
                            else:
                                # Formato solo fecha (YYYY-MM-DD)
                                fecha_obj = datetime.strptime(value, '%Y-%m-%d')
                            setattr(pedido, key, fecha_obj)
                        except ValueError as e:
                            return {'error': f'Formato de fecha inválido: {str(e)}'}, 400
                    else:
                        setattr(pedido, key, value)
                elif key != 'productos':  # Evitamos asignar directamente productos
                    setattr(pedido, key, value)

            # Si se pasan productos para actualizar la relación
            producto_ids = data.get('productos')
            if producto_ids is not None:
                productos = ProductoModel.query.filter(ProductoModel.id.in_(producto_ids)).all()
                pedido.productos = productos  # Reemplaza productos asociados

            db.session.add(pedido)
            db.session.commit()
            
            # Enviar email de actualización de pedido
            try:
                if pedido.user and pedido.user.email:
                    print(f"Enviando email de actualización de pedido a: {pedido.user.email}")
                    sendMail(
                        [pedido.user.email],
                        f"Pedido #{pedido.id} actualizado",
                        'pedido',
                        user=pedido.user,
                        pedido=pedido,
                        es_nuevo=False
                    )
                    print("Email de actualización enviado correctamente")
            except Exception as mail_error:
                print(f"Error al enviar email: {str(mail_error)}")
                import traceback
                traceback.print_exc()
            
            return pedido.to_json(), 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500


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

    @jwt_required()
    def post(self):
        data = request.get_json()
        
        try:
            pedido = PedidoModel.from_json(data)

            # Asociar productos si se mandan
            producto_ids = data.get('productos')
            if producto_ids:
                productos = ProductoModel.query.filter(ProductoModel.id.in_(producto_ids)).all()
                pedido.productos.extend(productos)

            db.session.add(pedido)
            db.session.commit()
            
            # Enviar email de confirmación de pedido
            try:
                if pedido.user and pedido.user.email:
                    print(f"Enviando email de confirmación de pedido a: {pedido.user.email}")
                    sendMail(
                        [pedido.user.email],
                        f"¡Pedido #{pedido.id} confirmado!",
                        'pedido',
                        user=pedido.user,
                        pedido=pedido,
                        es_nuevo=True
                    )
                    print("Email de confirmación enviado correctamente")
            except Exception as mail_error:
                print(f"Error al enviar email: {str(mail_error)}")
                import traceback
                traceback.print_exc()
            
            return pedido.to_json(), 201
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
