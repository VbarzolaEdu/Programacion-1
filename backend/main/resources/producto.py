from flask_restful import Resource
from flask import request
from .. import db
from main.models import ProductoModel
from flask import jsonify

class Producto(Resource):
    def get(self,id):
        
        producto = db.session.query(ProductoModel).get_or_404(id)
        return producto.to_json(), 200
    
    def put(self,id): 
        producto= db.session.query(ProductoModel).get_or_404(id)
        data= request.get_json().items()
        for key,value in data:
            setattr(producto,key,value)
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 200
    
    def delete(self,id):
        producto = db.session.query(ProductoModel).get_or_404(id)
        db.session.delete(producto)
        db.session.commit()
        return '', 200
    
class Productos(Resource):
    def get(self):
        productos = db.session.query(ProductoModel).all()
        return jsonify([producto.to_json() for producto in productos])
    
    def post(self):
        productos= ProductoModel.from_json(request.get_json())
        db.session.add(productos)
        db.session.commit()
        return productos.to_json(), 201