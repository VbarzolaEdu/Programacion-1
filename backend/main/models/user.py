from .. import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80))
    apellidos = db.Column(db.String(120))
    email = db.Column(db.String(120))
    cellphone = db.Column(db.Integer)

    def to_json(self):
        user_json = {
            'id': self.id,
            'nombre': self.nombre,
            'apellidos': self.apellidos,
            'email': self.email,
            'cellphone': self.cellphone
        }
        return user_json
    
    @staticmethod
    #concierto json a objeto
    def from_json(user_json):
        id = user_json.get('id')
        nombre = user_json.get('nombre')
        apellidos = user_json.get('apellidos')
        email = user_json.get('email')
        cellphone = user_json.get('cellphone')
        return User(id=id, nombre=nombre, apellidos=apellidos, email=email, cellphone=cellphone)