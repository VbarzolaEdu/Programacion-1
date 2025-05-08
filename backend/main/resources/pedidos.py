from flask_restful import Resource
from flask import request
from .. import db
from main.models import PedidoModel
from flask import jsonify

# PEDIDOS = {
#     1: {'cliente': 'Juan', 'plato': 'Milanesa con papas', 'cantidad': 2},
#     2: {'cliente': 'Ana', 'plato': 'Ensalada César', 'cantidad': 1}
# }

class Pedido(Resource):
    def get(self, id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        return pedido.to_json()

        # if int(id) in PEDIDOS:
        #     return PEDIDOS[int(id)]
        
        # return 'El id es inexistente', 404
    
    def delete(self, id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        db.session.delete(pedido)
        db.session.commit()
        return '',204
        # if int(id) in PEDIDOS:
        #     del PEDIDOS[int(id)]
        #     return 'Eliminado con exito', 204
        
        # return 'El id a eliminar es inexistente', 404
    
    def put(self, id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        data= request.get_json().items()
        for key, value in data:
            setattr(pedido, key, value)
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(), 201

        # if int(id) in PEDIDOS:
        #     pedido = PEDIDOS[int(id)]
        #     data = request.get_json()
        #     pedido.update(data)
        #     return 'Pedido editado con exito', 201
        
        # return 'El id que intentan editar es inexistente', 404
    
class Pedidos(Resource):
    def get(self):
        pedidos=db.session.query(PedidoModel).all()
        return jsonify([pedido.to_json() for pedido in pedidos])
        
    
    def post(self):
        pedidos = PedidoModel.from_json(request.get_json())
        db.session.add(pedidos)
        db.session.commit()
        return pedidos.to_json(),201

        # pedido = request.get_json()
        # id = int(max(PEDIDOS.keys()))+1
        # PEDIDOS[id] = pedido
        # return PEDIDOS[id], 201