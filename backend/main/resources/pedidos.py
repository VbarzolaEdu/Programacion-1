from flask_restful import Resource
from flask import request

PEDIDOS = {
    1: {'cliente': 'Juan', 'plato': 'Milanesa con papas', 'cantidad': 2},
    2: {'cliente': 'Ana', 'plato': 'Ensalada César', 'cantidad': 1}
}

class Pedido(Resource):
    def get(self, id):
        if int(id) in PEDIDOS:
            return PEDIDOS[int(id)]
        
        return 'El id es inexistente', 404
    
    def delete(self, id):
        if int(id) in PEDIDOS:
            del PEDIDOS[int(id)]
            return 'Eliminado con exito', 204
        
        return 'El id a eliminar es inexistente', 404
    
    def put(self, id):
        if int(id) in PEDIDOS:
            pedido = PEDIDOS[int(id)]
            data = request.get_json()
            pedido.update(data)
            return 'Pedido editado con exito', 201
        
        return 'El id que intentan editar es inexistente', 404
    
class Pedidos(Resource):
    def get(self):
        return PEDIDOS
    
    def post(self):
        pedido = request.get_json()
        id = int(max(PEDIDOS.keys()))+1
        PEDIDOS[id] = pedido
        return PEDIDOS[id], 201