from flask_restful import Resource
from flask import request

VALORACIONES = {
    1: {'Usuario': 'usuario@gmail.com', 'plato': 'Milanesa con papas',"puntuacion":5 , 'comentario': "Excelente comida!"},
    2:{'Usuario': 'usuario@gmail.com', 'plato': 'Ensalada césar',"puntuacion":3 , 'comentario': "Buen plato, pero le falto condimentos"},
}


class Valoracion(Resource):
    def get(self, id):
        if id in VALORACIONES:
            return VALORACIONES[id]
        return {'error': 'Valoración no encontrada'}, 404

class Valoraciones(Resource):
    def get(self): 
        return VALORACIONES

    def post(self):
        
        data = request.get_json()

        
        rol = data.get('rol')
        if rol != 'USER':
            return {'error': 'Solo los usuarios pueden agregar valoraciones'}, 403

        
        campos_requeridos = ['usuario', 'plato', 'puntuacion']
        if not all(key in data for key in campos_requeridos):
            return {'error': f'Faltan campos obligatorios: {campos_requeridos}'}, 400

        
        id = int(max(VALORACIONES.keys())) + 1 if VALORACIONES else 1
        VALORACIONES[id] = {
            'usuario': data['usuario'],
            'plato': data['plato'],
            'puntuacion': data['puntuacion'],
            'comentario': data.get('comentario', '')  
        }
        return VALORACIONES[id], 201