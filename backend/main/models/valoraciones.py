from .. import db
import json
from datetime import datetime


class valoracion(db.Model):
    __tablename__ = 'valoraciones'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.string(80))
    plato = db.Column(db.string(80))
    puntuacion = db.Column(db.String(255))
    comentario = db.Column(db.String(255))
    fecha = db.Column(db.String(255))
    #nombre de la relacion
    user = db.relationship('User', back_populates='valoraciones')

    
    def to_json(self):
        user_json = {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'plato': self.plato,
            'puntuacion': self.puntuacion,
            'comentario': self.comentario,
            'fecha': self.fecha
        }
        return user_json
    
    def to_json_complete(self):
        user = [user.to_jason() for user in self.user]
        valoracion_json = {
            'id': self.id,
            'id_usuario': str(self.id_usuario),
            'plato': str(self.plato),
            'puntuacion': str(self.puntuacion),
            'comentario': str(self.comentario),
            'fecha': str(self.fecha),
            'user': user
        }
    
    @staticmethod
    #concierto json a objeto
    def from_json(valoraciones_json):
        id = valoraciones_json.get('id')
        id_usuario = valoraciones_json.get('id_usuario')
        plato = valoraciones_json.get('plato')
        puntuacion = valoraciones_json.get('puntuacion')
        comentario = valoraciones_json.get('comentario')
        fecha = valoraciones_json.get('fecha')
        return valoracion(id=id, id_usuario=id_usuario, plato=plato, puntuacion=puntuacion, comentario=comentario, fecha=fecha)