from .. import db
import json
from datetime import datetime

class Notificacion(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    id_usuario= db.Column(db.Integer, db.ForeignKey('user.id'))
    mensaje= db.Column(db.String(255), nullable=False)
    id_pedido= db.Column(db.Integer, db.ForeignKey('pedido.id'), nullable=False)

    user = db.relationship('User', back_populates='notificaciones')
    pedido = db.relationship('Pedido', back_populates='notificaciones')

    def to_json(self):
        notificaciones_json = {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'mensaje': self.mensaje,
            'id_pedido': self.id_pedido,
            'user': self.user.to_json(),
            'pedido':self.pedido.to_json()
        }
        return notificaciones_json
    
    @staticmethod
    def from_json(notificaciones_json):
        id=notificaciones_json.get('id')
        id_usuario=notificaciones_json.get('id_usuario')
        mensaje=notificaciones_json.get('mensaje')
        id_pedido=notificaciones_json.get('id_pedido')
        return Notificacion(id=id, id_usuario=id_usuario, mensaje=mensaje, id_pedido=id_pedido)   