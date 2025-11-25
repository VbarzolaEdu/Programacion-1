from .. import db
import json
from datetime import datetime


class Valoracion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer,db.ForeignKey('user.id'))
    puntuacion = db.Column(db.Integer)
    comentario = db.Column(db.String(255))
    id_producto = db.Column(db.Integer, db.ForeignKey('producto.id'))
    user= db.relationship('User', back_populates='valoraciones') #relacion con la tabla User
    producto = db.relationship('Producto', back_populates='valoracion') #relacion con la tabla Producto
    #nombre de la relacion
    # user = db.relationship('User', back_populates='valoraciones')

    
    def to_json(self):
        # Normalizar la salida para evitar romper el contrato esperado por el frontend
        user_json = None
        if self.user:
            try:
                u = self.user.to_json()
            except Exception:
                u = None

            if u:
                # El frontend busca campos como 'nombre' y 'apellido' (no 'apellidos')
                user_json = {
                    'id': u.get('id'),
                    'nombre': u.get('nombre') or u.get('name'),
                    'apellido': u.get('apellidos') or u.get('apellido') or u.get('lastname') or u.get('lastname'),
                    'email': u.get('email')
                }

        producto_json = None
        if self.producto:
            try:
                p = self.producto.to_json()
            except Exception:
                p = None

            if p:
                producto_json = {
                    'id': p.get('id'),
                    'nombre': p.get('nombre') or p.get('name'),
                    'precio': p.get('precio')
                }

        return {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'id_producto': self.id_producto,
            'puntuacion': self.puntuacion,
            'comentario': self.comentario,
            'user': user_json,
            'producto': producto_json
        }

    # def to_json_complete(self):
        
    #     valoracion_json = {
    #         'id': self.id,
    #         'id_usuario': str(self.id_usuario),
    #         'id_producto': str(self.id_producto),
    #         'puntuacion': str(self.puntuacion),
    #         'comentario': str(self.comentario),
    #         'user': user
    #     }
    
    @staticmethod
    #concierto json a objeto
    def from_json(valoraciones_json):
        id = valoraciones_json.get('id')
        id_usuario = valoraciones_json.get('id_usuario')
        puntuacion = valoraciones_json.get('puntuacion')
        comentario = valoraciones_json.get('comentario')
        id_producto = valoraciones_json.get('id_producto')
        return Valoracion(id=id, id_usuario=id_usuario, puntuacion=puntuacion, comentario=comentario, id_producto=id_producto)