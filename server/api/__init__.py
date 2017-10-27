from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
import Adafruit_PCA9685
import time

SERVO_MIN = 150
SERVO_MAX = 600

class Config(object):
    DEBUG = True
    TESTING = False
    PRESERVE_CONTEXT_ON_EXCEPTION = True
    PROPAGATE_EXCEPTIONS = True
    LOGGER_NAME = 'api'

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

api = Api(app)

pwm = Adafruit_PCA9685.PCA9685()
pwm.set_pwm_freq(60)

def get_real_target(target):
    range = SERVO_MAX - SERVO_MIN
    real_target = SERVO_MIN + target*range/100
    return int(real_target)

class Root(Resource):
    def get(self):
        return {'status': 'look ma!'}

    def post(self):
        data = request.get_json()
        servos = data.get('servos')
        for i in range(0, len(servos)):
            target = get_real_target(servos[i])
            print('moving servo {} to {}({})'.format(i,servos[i],target))
            pwm.set_pwm(i, 0, target)
        time.sleep(1)
        return {'status': 'success'}

api.add_resource(Root, '/')