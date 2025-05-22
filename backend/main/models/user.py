from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True, index=True)
    cellphone = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    rol= db.Column(db.String(120), nullable=False, server_default="users")  
    estado= db.Column(db.String(120), nullable=False)
    #relacion con tabla pedidos
    pedidos= db.relationship('Pedido', back_populates='user', cascade="all, delete-orphan")
    valoraciones=db.relationship('Valoracion', back_populates='user', cascade="all, delete-orphan")
    notificaciones=db.relationship('Notificacion', back_populates='user', cascade="all, delete-orphan")

    @property
    def plain_password(self):
        raise AttributeError('Password cant be read')
    #Setter de la contraseña toma un valor en texto plano
    # calcula el hash y lo guarda en el atributo password
    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)
    #Método que compara una contraseña en texto plano con el hash guardado en la db
    def validate_pass(self,password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User %r>' % self.nombre

    def to_json(self):
        user_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellidos': str(self.apellidos),
            'email': str(self.email),
            'cellphone': self.cellphone,
            'password': str(self.password),
            'rol': str(self.rol),
            'estado': str(self.estado)
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
            'rol': str(self.rol),
            'estado': str(self.estado),
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
        rol = user_json.get('rol')
        estado = user_json.get('estado')
        return User(id=id, nombre=nombre, apellidos=apellidos, email=email, cellphone=cellphone, plain_password=password, rol=rol, estado=estado)