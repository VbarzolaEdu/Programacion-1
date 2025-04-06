from flask import Flask
from dotenv import load_dotenv

from flask_restful import Api

import main.resources as resources

# Inicializamos restful
api = Api()

def create_app():
    # Inicializar flask
    app = Flask(__name__)
    # Cargamos variables de entorno
    load_dotenv()
       
    # Cargar los recursos
    api.add_resource(resources.AnimalResource, '/animal/<id>')
    api.add_resource(resources.AnimalesResource, '/animales')
    api.add_resource(resources.Login, '/login')
    api.add_resource(resources.Logout, '/logout')
    
    api.init_app(app)
    return app