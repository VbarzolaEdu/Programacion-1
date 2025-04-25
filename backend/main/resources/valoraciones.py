from flask_restful import Resource
from flask import request
from .. import db
from main.models import ValoracionModel
from flask import jsonify

# VALORACIONES = {
#     1:{'Usuario': 'usuario@gmail.com', 'plato': 'Milanesa con papas',"puntuacion":5 , 'comentario': "Excelente comida!"},
#     2:{'Usuario': 'usuario@gmail.com', 'plato': 'Ensalada césar',"puntuacion":3 , 'comentario': "Buen plato, pero le falto condimentos"},
# }


class Valoracion(Resource):
    def get(self, id):
       valoracion=db.session.query(ValoracionModel).get_or_404(id)
       return valoracion.to_json()
    

class Valoraciones(Resource):
    def get(self): 
        valoracion=db.session.query(ValoracionModel).all()
        return jsonify([valoracion.to_json() for valoracion in valoracion])

    def post(self):
        valoracion=ValoracionModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201

        
        # data = request.get_json()

        
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