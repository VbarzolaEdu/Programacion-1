from flask import Flask
from dotenv import load_dotenv

from flask_restful import Api

import main.resources as resources

<<<<<<< HEAD
=======

>>>>>>> franco
#Inicializamos restful
api = Api()

def create_app():
    #Inicializar flask
    app = Flask(__name__)
    #cargamos variables de entorno
    load_dotenv()
       
    #cargar los recursos
<<<<<<< HEAD
    api.add_resource(resources.UserResource, '/user/<id>')
    api.add_resource(resources.UsersResource, '/users')
    api.add_resource(resources.PedidoResource, '/pedido/<id>')
    api.add_resource(resources.PedidosResource, '/pedidos')
=======
    
    api.add_resource(resources.Notificaciones, '/Notificaciones')

    api.add_resource(resources.Valoraciones, '/valoraciones')
    api.add_resource(resources.Valoracion, '/valoraciones/<int:id>')
>>>>>>> franco
    
    api.init_app(app)
    return app
    