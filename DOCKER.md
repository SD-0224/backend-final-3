# Docker commandds

### TO build docker image
docker build -t image-name

### list images
docker image ls

### run image:
docker-compose up

### run image in background:
docker-compose up -d

### remove image
docker image rm image-name

### Lists all containers. The -a flag shows both running and non-running containers. To display only running containers, this flag can be omitted.
docker ps -a

### Renames the given container to new_name.
docker rename [container] [new_name]

### docker start [container]
Runs the given container.

### Stops the given container.
docker stop [container]

### Makes the given container wait until other running containers stop.
docker wait [container]




