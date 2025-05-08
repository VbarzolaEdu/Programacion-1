from flask_restful import Resource
from flask import request
from .. import db
from main.models import NotificacionModel
from flask import jsonify



# NOTIFICACIONES = {
#     1:{'mensaje':'El pedido esta listo para ser retirado', 'Destinatario':'cliente@gmail.com'},
#     2:{"mensaje":"El pedido esta en camino", "Destinatario":"cliente@gmail.com"},
#     3:{'mensaje':'Nuevo pedido recibido', 'Destinatario':'admin@gmail.com'},
#     4:{"mensaje":"Pago recibido","Destinatario":"admin@gmail.com"}

# }


class Notificaciones(Resource):

    def post(self):

        notificaciones=NotificacionModel.from_json(request.get_json())
        db.session.add(notificaciones)
        db.session.commit()
        return notificaciones.to_json(), 201




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








