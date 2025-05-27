#Importar librerias 
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import os
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_mail import Mail 

# Iniciar

api = Api()
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
mailsender=Mail()

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
    migrate.init_app(app, db)

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
    api.add_resource(resources.ProductoResource, '/producto/<int:id>')
    api.add_resource(resources.ProductosResource, '/productos')

    api.init_app(app)
    #cargar clave secreta
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    #cargar el tiempo de expiracion del token
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    from main.auth import routes
    app.register_blueprint(routes.auth)

    #Configuracion del mail
    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')
    
    mailsender.init_app(app)


    
    return app