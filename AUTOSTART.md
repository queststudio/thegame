Taken from [here](https://stackoverflow.com/questions/43671482/how-to-run-docker-compose-up-d-at-system-start-up?rq=1)  
  
```
# /etc/systemd/system/docker-compose-app.service

[Unit]
Description=Docker Compose Application Service
Requires=docker.service
After=docker.service

[Service]
WorkingDirectory=/home/pi/git/thegame
ExecStart=/usr/local/bin/docker-compose up
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0
Restart=on-failure
StartLimitIntervalSec=60
StartLimitBurst=3

[Install]
WantedBy=multi-user.target
```
  
To apply:
``` bash
systemctl enable docker-compose-app
```