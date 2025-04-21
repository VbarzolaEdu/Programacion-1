from flask_restful import Resource
from flask import request
from .. import db
from main.models import UserModel
from flask import jsonify

USERS = {
    1:{'name': 'Valentin' ,'apellido' : 'Barzola' , 'mail':'vlnbar@gmail.com' , 'cellphone':'123456789'}, 
    2:{'name': 'Lucas' ,'apellido' : 'Boschin' , 'mail':'lcsbos@gmail.com' , 'cellphone':'123456756'},
    3:{'name': 'Francisco' ,'apellido' : 'Lopez' , 'mail':'frnlop@gmail.com' , 'cellphone':'123456756'},
    4:{'name': 'Martin' ,'apellido' : 'Sanz' , 'mail':'mrtsan@gmail.com' , 'cellphone':'123566789'},
    5:{'name': 'Franco' ,'apellido' : 'Berardo' , 'mail':'frcber@gmail.com' , 'cellphone':'563456789'}
    }

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
        users=db.session.query(UserModel).all()
        return jsonify([user.to_json() for user in users])
    
    def post(self):
        user = UserModel.from_json(request.get_json())
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201
        # id = int(max(USERS.keys()))+1
        # USERS[id] = user
        # return USERS[id], 201 