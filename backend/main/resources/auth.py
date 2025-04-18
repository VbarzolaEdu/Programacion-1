from flask_restful import Resource
from flask import request

USERS = {
    'vlnbar@gmail.com': {'name': 'Valentin', 'apellido': 'Barzola', 'password': 'madrid91218', 'role': 'admin'},
    'lcsbos@gmail.com': {'name': 'Lucas', 'apellido': 'Boschin', 'password': 'riverplate', 'role': 'user'},
    'frnlop@gmail.com': {'name': 'Francisco', 'apellido': 'Lopez', 'password': 'messi181222', 'role': 'user'},
    'mrtsan@gmail.com': {'name': 'Martin', 'apellido': 'Sanz', 'password': 'elpepe32', 'role': 'moderator'},
    'frcber@gmail.com': {'name': 'Franco', 'apellido': 'Berardo', 'password': 'micontra23', 'role': 'user'}
}

TOKENS = {}

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return {"error": "Faltan credenciales"}, 400
        
        user = USERS.get(username)
        if user and user["password"] == password:
            token = f"token-{username}"
            TOKENS[token] = username  # Almacena el token como activo
            return {
                "message": "Usuario autenticado correctamente.",
                "role": user["role"],
                "token": token
            }, 200
        else:
            return {"error": "Credenciales inválidas"}, 401

class Logout(Resource):
    def post(self):
        data = request.get_json()
        token = data.get('token')
        
        if not token:
            return {"error": "Token no proporcionado"}, 400
        
        if token in TOKENS:
            del TOKENS[token] 
            return {"message": "Sesión cerrada correctamente."}, 200
        else:
            return {"error": "Token inválido o ya expirado"}, 401