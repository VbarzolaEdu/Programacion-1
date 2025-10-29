from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ValoracionModel
from main.utils.pagination import paginate_query, get_sort_params, apply_sorting

class Valoracion(Resource):
    def get(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        return valoracion.to_json()

class Valoraciones(Resource):
    def get(self):
        # Obtener parámetros de consulta
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

        # Ordenamiento con whitelist de campos permitidos
        sort_by, order = get_sort_params(default_sort='id', default_order='desc')
        allowed_sort_fields = ['id', 'id_usuario', 'id_producto', 'puntuacion']
        query = apply_sorting(query, ValoracionModel, sort_by, order, allowed_sort_fields)

        # Aplicar paginación
        result = paginate_query(query)

        return jsonify({
            'valoraciones': [v.to_json() for v in result['items']],
            'total': result['total'],
            'pages': result['pages'],
            'page': result['page'],
            'per_page': result['per_page'],
            'has_next': result['has_next'],
            'has_prev': result['has_prev']
        })

    def post(self):
        valoracion = ValoracionModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201
