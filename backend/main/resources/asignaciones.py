from flask_restful import Resource
from flask import request
from .. import db
from main.models import PedidosProductosModel
from flask import jsonify

class Asignacion(Resource):
    def post(self):
        id_pedido = request.get_json().get('id_pedido')
        id_producto = request.get_json().get('id_producto')

        if id_producto is None:
            print ("El producto no fue encontrado")
        if id_pedido is None:
            print ("El pedido no fue encontrado")
        
        query = PedidosProductosModel.insert().values(id_pedido=id_pedido, id_producto=id_producto)
        try:
            db.session.execute(query)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return 'Asignacion creada', 201