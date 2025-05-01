from .. import db
# from pedidos import pedido_producto

class Producto(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    nombre= db.Column(db.String(50), nullable=False)
    precio= db.Column(db.Float, nullable=False)
    categoria= db.Column(db.String(50), nullable=False)
    disponibilidad= db.Column(db.String(50), nullable=False)

    valoracion=db.relationship('Valoracion', back_populates='producto', lazy=True)
    # pedidos = db.relationship('Pedido', secondary=pedido_producto, back_populates='productos')

    # def __repr__(self):
    #     return 

    def to_json(self):
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'precio': self.precio,
            'categoria': self.categoria,
            'disponibilidad': self.disponibilidad
        }
        return producto_json
    
    # def to_json_complete(self):
    #     producto_json = {
    #         'id': self.id,
    #         'nombre': self.nombre,
    #         'precio': self.precio
    #     }
    #     return producto_json
    
    @staticmethod
    def from_json(producto_json):
        id = producto_json.get('id')
        nombre = producto_json.get('nombre')
        precio = producto_json.get('precio')
        categoria = producto_json.get('categoria')
        disponibilidad = producto_json.get('disponibilidad')
        return Producto(id=id, nombre=nombre, precio=precio, categoria=categoria, disponibilidad=disponibilidad)