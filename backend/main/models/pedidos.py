from datetime import datetime
from .. import db
from . import UserModel

pedido_producto = db.Table(
    'pedido_producto',
    db.Column('pedido_id', db.Integer, db.ForeignKey('pedido.id'), primary_key=True),
    db.Column('producto_id', db.Integer, db.ForeignKey('producto.id'), primary_key=True)
)

class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    precio_final = db.Column(db.Integer, nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)  # Cambiado a db.DateTime

    user = db.relationship('User', back_populates='pedidos')
    notificaciones = db.relationship('Notificacion', back_populates='pedido')
    productos = db.relationship('Producto', secondary=pedido_producto,backref=db.backref('pedidos', lazy='dynamic'))  # Cambiado a 'productos' para evitar confusión
    # back_populates='pedidos'

    def __repr__(self):
        return '<Pedido: %r %r>' % (self.id_user, self.precio_final)

    def to_json(self):
        pedido_json = {
            'id': self.id,
            'precio_final': self.precio_final,
            'fecha': self.fecha.isoformat(),  # Convierte a formato ISO 8601
            'user': self.user.to_json(),
            'productos': [producto.to_json() for producto in self.productos],
        }
        return pedido_json

    def to_json_short(self):
        pedido_json = {
            'id': self.id,
            'precio_final': self.precio_final,
            'fecha': self.fecha.isoformat()  # Convierte a formato ISO 8601
        }
        return pedido_json

    @staticmethod
    def from_json(pedido_json):
        id = pedido_json.get('id')
        id_user = pedido_json.get('id_user')
        precio_final = pedido_json.get('precio_final')
        # Convierte la fecha de cadena a datetime
        fecha = datetime.strptime(pedido_json.get('fecha'), '%Y-%m-%dT%H:%M:%S')
        return Pedido(id=id, id_user=id_user, precio_final=precio_final, fecha=fecha)