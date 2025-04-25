import os
from main import create_app

# Cargar las variables de entorno

app = create_app()

app.app_context().push()

from main import db
if __name__ == '__main__':
    db.create_all()
    app.run(debug=True,port=os.getenv('PORT'))