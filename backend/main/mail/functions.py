#configuracion del envio de mail
from .. import mailsender 
from flask import current_app, render_template
from flask_mail import Message
from smtplib import SMTPException 

 #La funcion pide al menos 3 atributos: to a quien envio(no necesariamente a una persona), subjet asunto del mail y el template 
def sendMail(to, subject, template, **kwargs):
    #Configuracion del mail
    print(f"Preparando email para: {to}")
    print(f"Asunto: {subject}")
    print(f"Template: {template}")
    msg = Message( subject, sender=current_app.config['FLASKY_MAIL_SENDER'], recipients=to)
    try:
        #Creación del cuerpo del mensaje
        msg.body = render_template(template + '.txt', **kwargs)
        msg.html = render_template(template + '.html', **kwargs)
        print("Templates renderizados correctamente")
        print(f"Enviando desde: {current_app.config['MAIL_USERNAME']}")
        print(f"Servidor: {current_app.config['MAIL_SERVER']}:{current_app.config['MAIL_PORT']}")
        #Envío de mail
        result = mailsender.send(msg)
        print(f"Mail enviado exitosamente: {result}")
    except SMTPException as e:
        print(f"Error SMTP: {str(e)}")
        return "Mail deliver failed"
    except Exception as e:
        print(f"Error general al enviar mail: {str(e)}")
        import traceback
        traceback.print_exc()
        return "Mail deliver failed"
    return True