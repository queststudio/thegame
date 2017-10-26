##Before run
    sudo apt-get install git build-essential python-dev
    mkdir git
    cd git
    git clone https://github.com/queststudio/thegame.git
    cd thegame
    cd server
    sh setup.sh
    
**Enable I2C** (https://learn.adafruit.com/adafruits-raspberry-pi-lesson-4-gpio-setup/configuring-i2c#installing-kernel-support-with-raspi-config)  
pins https://pinout.xyz/pinout/i2c

    
##To start
    sh start.sh
    
    
    
##To configure servos
Change values in serer/api/\_\_init__.py

    SERVO_MIN = 150
    SERVO_MAX = 600
    