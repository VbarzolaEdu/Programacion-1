from flask_restful import Resource
from flask import request
from .. import db
from main.models.notificaciones import Notificacion
from flask import jsonify



# NOTIFICACIONES = {
#     1:{'mensaje':'El pedido esta listo para ser retirado', 'Destinatario':'cliente@gmail.com'},
#     2:{"mensaje":"El pedido esta en camino", "Destinatario":"cliente@gmail.com"},
#     3:{'mensaje':'Nuevo pedido recibido', 'Destinatario':'admin@gmail.com'},
#     4:{"mensaje":"Pago recibido","Destinatario":"admin@gmail.com"}

# }
    # def post(self):

    #     notificaciones=NotificacionModel.from_json(request.get_json())
    #     db.session.add(notificaciones)
    #     db.session.commit()
    #     return notificaciones.to_json(), 201



        # data = request.get_json()
        
        # #verificacion de rol
        # rol_emisor = data.get('rol_emisor')
        # if rol_emisor not in ['ADMIN', 'ENCARGADO']:
        #     return {'error': 'Rol no autorizado para enviar notificaciones'}, 403  

        # #verifico los campos
        # if not all(key in data for key in ['mensaje', 'destinatario']):
        #     return {'error': 'Faltan campos obligatorios (mensaje, destinatario)'}, 400

        # #agrego
        # id = int(max(NOTIFICACIONES.keys())) + 1 if NOTIFICACIONES else 1
        # NOTIFICACIONES[id] = {
        #     'mensaje': data['mensaje'],
        #     'destinatario': data['destinatario'],
        #     'rol_emisor': rol_emisor
        # }
        # return NOTIFICACIONES[id], 201  
# resources/notifiaciones.py


class Notificaciones(Resource):

    def get(self):
        # Obtener parámetros de consulta para filtrado
        args = request.args
        query = db.session.query(Notificacion)

        # Filtrado (por id_usuario, id_pedido, mensaje)
        if 'id_usuario' in args:
            query = query.filter(Notificacion.id_usuario == int(args['id_usuario']))
        if 'id_pedido' in args:
            query = query.filter(Notificacion.id_pedido == int(args['id_pedido']))
        if 'mensaje' in args:
            query = query.filter(Notificacion.mensaje.like(f"%{args['mensaje']}%"))

        # Paginación
        limit = int(args.get('limit', 10))  # Límite de resultados (por defecto 10)
        page = int(args.get('page', 1))  # Número de página (por defecto 1)
        offset = (page - 1) * limit  # Desplazamiento

        # Aplicar paginación
        notificaciones = query.offset(offset).limit(limit).all()

        # Devolver resultados
        return jsonify([notificacion.to_json() for notificacion in notificaciones])

    def post(self):
        notificaciones = Notificacion.from_json(request.get_json())
        db.session.add(notificaciones)
        db.session.commit()
        return notificaciones.to_json(), 201








