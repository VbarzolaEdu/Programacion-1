from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UserModel
from sqlalchemy import func, desc, or_
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required

# USERS = {
#     1:{'name': 'Valentin' ,'apellido' : 'Barzola' , 'mail':'vlnbar@gmail.com' , 'cellphone':'123456789'}, 
#     2:{'name': 'Lucas' ,'apellido' : 'Boschin' , 'mail':'lcsbos@gmail.com' , 'cellphone':'123456756'},
#     3:{'name': 'Francisco' ,'apellido' : 'Lopez' , 'mail':'frnlop@gmail.com' , 'cellphone':'123456756'},
#     4:{'name': 'Martin' ,'apellido' : 'Sanz' , 'mail':'mrtsan@gmail.com' , 'cellphone':'123566789'},
#     5:{'name': 'Franco' ,'apellido' : 'Berardo' , 'mail':'frcber@gmail.com' , 'cellphone':'563456789'}
#     }

class User(Resource):
    @jwt_required(optional=True)
    def get(self,id):
        user=db.session.query(UserModel).get_or_404(id)
        current_identity = get_jwt_identity() 
        if str(current_identity) == str(user.id):
            return user.to_json_complete()
        else:
            return user.to_json()

        # if int(id) in USERS:
        #     return USERS[int(id)]
        
        # return 'User not found', 404
    
    @jwt_required()
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

    @role_required(roles = ["admin","users"])
    def delete(self,id):
        user=db.session.query(UserModel).get_or_404(id)
        rol = get_jwt().get('rol')
        if rol == 'users' and user.id != get_jwt_identity():
            return 'No tienes permisos para eliminar este usuario', 403
        db.session.delete(user)
        db.session.commit()
        return user.to_json(), 204
    
        # if int(id) in USERS:
        #     del USERS[int(id)]
        #     return 'User deleted', 204
    
        # return 'User not found', 404

class Users(Resource):
    @role_required(roles = ["admin", "empleado"])
    def get(self):
        # Obtener parámetros de consulta para filtrado
        args = request.args
        query = db.session.query(UserModel)

        # Filtrado por nombre y/o apellidos (usa OR si ambos están presentes)
        nombre_filter = None
        apellidos_filter = None
        
        if 'nombre' in args:
            nombre_filter = UserModel.nombre.like(f"%{args['nombre']}%")
        if 'apellidos' in args:
            apellidos_filter = UserModel.apellidos.like(f"%{args['apellidos']}%")
        
        # Si ambos filtros existen y son el mismo valor, usar OR
        if nombre_filter is not None and apellidos_filter is not None:
            if args.get('nombre') == args.get('apellidos'):
                query = query.filter(or_(nombre_filter, apellidos_filter))
            else:
                query = query.filter(nombre_filter).filter(apellidos_filter)
        elif nombre_filter is not None:
            query = query.filter(nombre_filter)
        elif apellidos_filter is not None:
            query = query.filter(apellidos_filter)
        
        # Filtrado por email
        if 'email' in args:
            query = query.filter(UserModel.email.like(f"%{args['email']}%"))
        
        # Filtrado por rol
        if 'rol' in args:
            query = query.filter(UserModel.rol == args['rol'])
        
        if 'estado' in args:
            query = query.filter(UserModel.estado == args['estado'])

        # Paginación
        limit = int(args.get('limit', 10))  # Límite de resultados (por defecto 10)
        page = int(args.get('page', 1))  # Número de página (por defecto 1)
        offset = (page - 1) * limit  # Desplazamiento

        # Aplicar paginación
        users = query.offset(offset).limit(limit).all()

        # Devolver resultados
        return jsonify([user.to_json() for user in users])
    
    @role_required(roles = ["admin"])
    def post(self):
        data = request.get_json()
        user = UserModel.from_json(data)
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201
