from .. import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    cellphone = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    #relacion con tabla pedidos
    pedidos= db.relationship('Pedido', back_populates='user', cascade="all, delete-orphan")
    valoraciones=db.relationship('Valoracion', back_populates='user', cascade="all, delete-orphan")
    notificaciones=db.relationship('Notificacion', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return '<User %r>' % self.nombre

    def to_json(self):
        user_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellidos': str(self.apellidos),
            'email': str(self.email),
            'cellphone': self.cellphone,
            'password': str(self.password)
        }
        return user_json
    
    def to_json_complete(self):
        pedidos = [pedido.to_json() for pedido in self.pedidos]
        user_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellidos': str(self.apellidos),
            'email': str(self.email),
            'cellphone': self.cellphone,
            'password': str(self.password),
            'pedidos': pedidos
        }
    
    @staticmethod
    #convierto json a objeto
    def from_json(user_json):
        id = user_json.get('id')
        nombre = user_json.get('nombre')
        apellidos = user_json.get('apellidos')
        email = user_json.get('email')
        cellphone = user_json.get('cellphone')
        password = user_json.get('password')
        return User(id=id, nombre=nombre, apellidos=apellidos, email=email, cellphone=cellphone, password=password)