from flask_restful import Resource
from flask import request

USERS = {
    1:{'ID':'1','name': 'Valentin' ,'apellido' : 'Barzola' , 'mail':'vlnbar@gmail.com' , 'cellphone':'123456789'}, 
    2:{'ID':'2','name': 'Lucas' ,'apellido' : 'Boschin' , 'mail':'lcsbos@gmail.com' , 'cellphone':'123456756'},
    3:{'ID':'3','name': 'Francisco' ,'apellido' : 'Lopez' , 'mail':'frnlop@gmail.com' , 'cellphone':'123456756'},
    4:{'ID':'4','name': 'Martin' ,'apellido' : 'Sanz' , 'mail':'mrtsan@gmail.com' , 'cellphone':'123566789'},
    5:{'ID':'5','name': 'Franco' ,'apellido' : 'Berardo' , 'mail':'frcber@gmail.com' , 'cellphone':'563456789'}
    }

class User(Resource):
    def get(self,id):
        if id in USERS:
            return USERS[id]
        else:
            return 'User not found', 404
        
    def put(self,id):
        if id in USERS:
            user = USERS[id]
            data = request.get_json()
            user.update(data)
            return 'User updated', 201
        else:
            return 'User not found', 404
    
    def delete(self,id):
        if id in USERS:
            del USERS[id]
            return 'User deleted', 204
        else:
            return 'User not found', 404

class Users(Resource):
    def get(self):
        return USERS
    
    def post(self):
        data = request.get_json()
        id = len(USERS) + 1
        USERS[id] = data
        USERS[id] = id
        return USERS[id], 201 
        
        

