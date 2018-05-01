def create_pwm():
    try:
        import Adafruit_PCA9685
        pwm = Adafruit_PCA9685.PCA9685()
        pwm.set_pwm_freq(60)
        return pwm
    except ImportError:
        print('Couldn\'t find module Adafruit_PCA9685')
    except RuntimeError:
        print('Couldn\'t initiate Servo Controller')


class ServoFactory:
    def __init__(self):
        self._pwm = None
        self._create_servo = create_pwm

    def create(self):
        if not self._pwm:
            self._pwm = self._create_servo()

        return self._pwm


def set_pwm(channel, on, off):
    factory = ServoFactory()
    pwm = factory.create()
    if pwm:
        pwm.set_pwm(channel, on, off)
    else:
        print('Servos aren\'t accessible')

