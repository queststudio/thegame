from flask import Flask
from flask_restful import Api, Resource


class Config(object):
    DEBUG = True
    TESTING = False
    PRESERVE_CONTEXT_ON_EXCEPTION = True
    PROPAGATE_EXCEPTIONS = True
    LOGGER_NAME = 'api'

app = Flask(__name__)
app.config.from_object(Config)

api = Api(app)

class Root(Resource):
    def get(self):
        return {'status': 'look ma!'}

api.add_resource(Root, '/')