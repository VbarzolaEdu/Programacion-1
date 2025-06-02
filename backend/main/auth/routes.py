from flask import request, jsonify, Blueprint
from .. import db
from main.models import UserModel
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from main.mail.function import sendMail

auth = Blueprint('auth', __name__, url_prefix='/auth')

#Método de logueo
@auth.route('/login', methods=['POST'])
def login():
    user = db.session.query(UserModel).filter(UserModel.email == request.get_json().get('email')).first()
    # devolver error si no existe el usuario o si la contraseña no es correcta
    if (user is None) or not (user.validate_pass(request.get_json().get('password'))):
        return 'invalid user or pasword', 401
    
    #Valida la contraseña
    # if user.validate_pass(request.get_json().get("password")):
    #Genera un nuevo token
    #Pasa el objeto user como identidad
    access_token = create_access_token(identity=user)
    #Devolver valores y token
    data = {
        'id': str(user.id),
        'email': user.email,
        'access_token': access_token
    }

    return data, 200

#Método de registro
@auth.route('/register', methods=['POST'])
def register():
    #Obtener usuario
    user = UserModel.from_json(request.get_json())
    #Verificar si el mail ya existe en la db, scalar() para saber la cantidad de ese email
    exists = db.session.query(UserModel).filter(UserModel.email == user.email).scalar() is not None
    if exists:
        return 'Duplicated mail', 409
    else:
        try:
            #Agregar usuario a DB
            db.session.add(user)
            db.session.commit()
            #enviar mail de bienvenido/a
            send = sendMail([user.email],"¡Bienvenido/a!",'register',user = user)
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return user.to_json() , 201