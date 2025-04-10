from flask_restful import Resource
from flask import request
from flask import Response

USERS = {
    1:{'name': 'Valentin' ,'apellido' : 'Barzola' , 'mail':'vlnbar@gmail.com' , 'cellphone':'123456789'}, 
    2:{'name': 'Lucas' ,'apellido' : 'Boschin' , 'mail':'lcsbos@gmail.com' , 'cellphone':'123456756'},
    3:{'name': 'Francisco' ,'apellido' : 'Lopez' , 'mail':'frnlop@gmail.com' , 'cellphone':'123456756'},
    4:{'name': 'Martin' ,'apellido' : 'Sanz' , 'mail':'mrtsan@gmail.com' , 'cellphone':'123566789'},
    5:{'name': 'Franco' ,'apellido' : 'Berardo' , 'mail':'frcber@gmail.com' , 'cellphone':'563456789'}
    }

class logout(Resource):

    def get(self):
        return USERS

    def logout():
        message = "Logout exitoso"
        return Response(message, status=200, mimetype='text/plain')
    
