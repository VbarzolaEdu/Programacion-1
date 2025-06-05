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
        return {
        'id': self.id,
        'id_usuario': self.id_usuario,
        'id_producto': self.id_producto,
        'puntuacion': self.puntuacion,
        'comentario': self.comentario,
        'user': self.user.to_json() if self.user else None,
        'producto': self.producto.to_json() if self.producto else None
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