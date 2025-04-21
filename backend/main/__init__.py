from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import os


# Inicializamos restful

api = Api()
db = SQLAlchemy()

def create_app():
    # Inicializar flask
    app = Flask(__name__)
    # Cargamos variables de entorno
    load_dotenv()
    #crear archivo bd sino existe
    if not os.path.exists(os.getenv('DATABASE_PATH') +os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH') +os.getenv('DATABASE_NAME'))
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    #Url de configuración de base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    # Cargar los recursos
    import main.resources as resources
    api.add_resource(resources.UserResource, '/user/<id>')
    api.add_resource(resources.UsersResource, '/users')
    api.add_resource(resources.PedidoResource, '/pedido/<id>')
    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.ValoracionesResource, '/valoraciones')
    api.add_resource(resources.ValoracionResource, '/valoracion/<int:id>')
    api.add_resource(resources.NotificacionResource, '/notificacion')
    api.add_resource(resources.Login, '/login')
    api.add_resource(resources.Logout, '/logout')

 

    
    api.init_app(app)
    return app