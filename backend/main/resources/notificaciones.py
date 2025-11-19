from flask_restful import Resource
from flask import request
from .. import db
from main.models.notificaciones import Notificacion
from main.models import UserModel
from flask import jsonify
from main.mail.functions import sendMail




class Notificaciones(Resource):

    def get(self):
        # Obtener parámetros de consulta para filtrado
        args = request.args
        query = db.session.query(Notificacion)

        # Filtrado (por id_usuario, id_pedido, mensaje)
        if 'id_usuario' in args:
            query = query.filter(Notificacion.id_usuario == int(args['id_usuario']))
        # if 'id_pedido' in args:
        #     query = query.filter(Notificacion.id_pedido == int(args['id_pedido']))
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
        data = request.get_json()
        mensaje = data.get('mensaje')
        
        if not mensaje:
            return {'error': 'El mensaje es obligatorio'}, 400
        
        # Obtener todos los usuarios
        usuarios = db.session.query(UserModel).all()
        
        if not usuarios:
            return {'error': 'No hay usuarios registrados'}, 404
        
        enviados = 0
        errores = 0
        notificaciones_creadas = []
        
        # Crear notificación y enviar email a cada usuario
        for usuario in usuarios:
            try:
                # Crear notificación para este usuario
                notif = Notificacion(
                    id_usuario=usuario.id,
                    mensaje=mensaje
                )
                db.session.add(notif)
                notificaciones_creadas.append(notif)
                
                # Enviar email
                print(f"Enviando email a: {usuario.email}")
                sendMail(
                    [usuario.email],
                    "Nueva Notificación!",
                    'notification',
                    user=usuario,
                    notificacion=notif
                )
                enviados += 1
                
            except Exception as e:
                errores += 1
                print(f"Error con usuario {usuario.email}: {str(e)}")
                import traceback
                traceback.print_exc()
        
        # Guardar todas las notificaciones
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'error': f'Error al guardar notificaciones: {str(e)}'}, 500
        
        return {
            'mensaje': 'Notificación enviada a todos los usuarios',
            'total_usuarios': len(usuarios),
            'emails_enviados': enviados,
            'emails_fallidos': errores,
            'notificaciones_creadas': len(notificaciones_creadas)
        }, 201
