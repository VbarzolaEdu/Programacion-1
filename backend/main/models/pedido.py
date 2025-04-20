from .. import db

class pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.Integer, db.ForeignKey('user.id'))
    fecha = db.Column(db.DateTime)
    precio = db.Column(db.Float)
    estado = db.Column(db.String(80))
    
    def to_json(self):
        pedido_json = {
            'id': self.id,
            'nombre': self.nombre,
            'fecha': self.fecha,
            'total': self.precio,
            'estado': self.estado,
        }
        return pedido_json
    @staticmethod
    #concierto json a objeto
    def from_json(user_json):
        id = user_json.get('id')
        nombre = user_json.get('nombre')
        fecha = user_json.get('fecha')
        precio = user_json.get('total')
        estado = user_json.get('estado')
        return pedido(id=id, nombre=nombre, fecha=fecha, precio=precio, estado=estado)