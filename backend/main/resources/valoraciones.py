from flask_restful import Resource
from flask import request , jsonify
from .. import db
from main.models import ValoracionModel
from flask import jsonify

VALORACIONES = {
    1:{'Usuario': 'usuario@gmail.com', 'plato': 'Milanesa con papas',"puntuacion":5 , 'comentario': "Excelente comida!", 'fecha': '2025-10-01'},
    2:{'Usuario': 'usuario@gmail.com', 'plato': 'Ensalada césar',"puntuacion":3 , 'comentario': "Buen plato, pero le falto condimentos", 'fecha': '2025-10-02'},
}


class Valoracion(Resource):
    def get(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        return valoracion.to_json()

class Valoraciones(Resource):
    def get(self): 
        valoraciones = db.session.query(ValoracionModel).all()
        return jsonify([valoraciones.to_json()for valoracion in valoraciones])

    def post(self):
        
        data =  ValoracionModel.from_json(request.get_json())
        db.session.add(data)
        db.session.commit()
        return data.to_json(),201

        # rol = data.get('rol')
        
        # if rol != 'USER':
        #     return {'error': 'Solo los usuarios pueden agregar valoraciones'}, 403

        
        # campos_requeridos = ['usuario', 'plato', 'puntuacion']
        # if not all(key in data for key in campos_requeridos):
        #     return {'error': f'Faltan campos obligatorios: {campos_requeridos}'}, 400

        
        # id = int(max(VALORACIONES.keys())) + 1 if VALORACIONES else 1
        # VALORACIONES[id] = {
        #     'usuario': data['usuario'],
        #     'plato': data['plato'],
        #     'puntuacion': data['puntuacion'],
        #     'comentario': data.get('comentario', '')  
        # }
        # return VALORACIONES[id], 201