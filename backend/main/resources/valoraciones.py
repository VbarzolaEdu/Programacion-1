from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ValoracionModel

class Valoracion(Resource):
    def get(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        return valoracion.to_json()

class Valoraciones(Resource):
    def get(self):
        # Obtener parámetros de consulta
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        id_usuario = request.args.get('id_usuario')
        id_producto = request.args.get('id_producto')
        puntuacion = request.args.get('puntuacion')

        # Armar la consulta
        query = db.session.query(ValoracionModel)

        if id_usuario:
            query = query.filter(ValoracionModel.id_usuario == int(id_usuario))
        if id_producto:
            query = query.filter(ValoracionModel.id_producto == int(id_producto))
        if puntuacion:
            query = query.filter(ValoracionModel.puntuacion == int(puntuacion))

        # Aplicar paginación
        valoraciones_paginadas = query.paginate(page=page, per_page=per_page, error_out=False)

        return {
            'valoraciones': [v.to_json() for v in valoraciones_paginadas.items],
            'total': valoraciones_paginadas.total,
            'pages': valoraciones_paginadas.pages,
            'page': valoraciones_paginadas.page
        }

    def post(self):
        valoracion = ValoracionModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201
