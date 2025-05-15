from flask_restful import Resource
from flask import request
from .. import db
from main.models import UserModel
from flask import jsonify

# USERS = {
#     1:{'name': 'Valentin' ,'apellido' : 'Barzola' , 'mail':'vlnbar@gmail.com' , 'cellphone':'123456789'}, 
#     2:{'name': 'Lucas' ,'apellido' : 'Boschin' , 'mail':'lcsbos@gmail.com' , 'cellphone':'123456756'},
#     3:{'name': 'Francisco' ,'apellido' : 'Lopez' , 'mail':'frnlop@gmail.com' , 'cellphone':'123456756'},
#     4:{'name': 'Martin' ,'apellido' : 'Sanz' , 'mail':'mrtsan@gmail.com' , 'cellphone':'123566789'},
#     5:{'name': 'Franco' ,'apellido' : 'Berardo' , 'mail':'frcber@gmail.com' , 'cellphone':'563456789'}
#     }

class User(Resource):
    def get(self,id):
        user=db.session.query(UserModel).get_or_404(id)
        return user.to_json()

        # if int(id) in USERS:
        #     return USERS[int(id)]
        
        # return 'User not found', 404
        
    def put(self,id):

        user=db.session.query(UserModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return user.to_json(),200

        # if int(id) in USERS:
        #     user = USERS[int(id)]
        #     data = request.get_json()
        #     user.update(data)
        #     return 'User updated', 201
        
        # return 'User not found', 404
    
    def delete(self,id):
        user=db.session.query(UserModel).get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return user.to_json(), 204
    

        # if int(id) in USERS:
        #     del USERS[int(id)]
        #     return 'User deleted', 204
    
        # return 'User not found', 404

class Users(Resource):
    def get(self):
        # Obtener parámetros de consulta para filtrado
        args = request.args
        query = db.session.query(UserModel)

        # Filtrado (por nombre, email, etc.)
        if 'nombre' in args:
            query = query.filter(UserModel.nombre.like(f"%{args['nombre']}%"))
        if 'email' in args:
            query = query.filter(UserModel.email.like(f"%{args['email']}%"))
        if 'rol' in args:
            query = query.filter(UserModel.rol == args['rol'])

        # Paginación
        limit = int(args.get('limit', 10))  # Límite de resultados (por defecto 10)
        page = int(args.get('page', 1))  # Número de página (por defecto 1)
        offset = (page - 1) * limit  # Desplazamiento

        # Aplicar paginación
        users = query.offset(offset).limit(limit).all()

        # Devolver resultados
        return jsonify([user.to_json() for user in users])
    
    def post(self):
        data = request.get_json()
        user = UserModel.from_json(data)
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201
    