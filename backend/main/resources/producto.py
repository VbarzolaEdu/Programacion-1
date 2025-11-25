from flask_restful import Resource
from flask import request
from .. import db
from main.models import ProductoModel, PedidoModel, UserModel
from flask import jsonify
from flask_jwt_extended import jwt_required
from main.auth.decorators import role_required
from main.mail.functions import sendMail

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
            # Buscar en nombre O categoría
            query = query.filter(
                db.or_(
                    ProductoModel.nombre.ilike(f'%{nombre}%'),
                    ProductoModel.categoria.ilike(f'%{nombre}%')
                )
            )

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
        
        # Enviar email a todos los usuarios notificando el nuevo producto
        try:
            usuarios = db.session.query(UserModel).all()
            enviados = 0
            
            for usuario in usuarios:
                try:
                    print(f"Enviando email de nuevo producto a: {usuario.email}")
                    sendMail(
                        [usuario.email],
                        f"¡Nuevo producto: {producto.nombre}!",
                        'nuevo_producto',
                        user=usuario,
                        producto=producto
                    )
                    enviados += 1
                except Exception as e:
                    print(f"Error enviando a {usuario.email}: {str(e)}")
            
            print(f"Emails enviados: {enviados}/{len(usuarios)}")
        except Exception as mail_error:
            print(f"Error general al enviar emails: {str(mail_error)}")
            import traceback
            traceback.print_exc()
        
        return producto.to_json(), 201