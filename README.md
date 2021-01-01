## For building image
```
    docker build .
```
### For creating container from image
```
    docker run -p 80:3000 {image-id}
```
### Example
```
    docker run -p 80:3000 51d926a5599d
```
### All Docker containers
```
    docker ps -a
```
### Currently running containers
```
    docker ps
```
### Remove container
```
    docker rm {container-id}
```
### Delete all local and stoped containers
```
    docker rm $(docker ps -a -q)
```
### Delete all local images
```
    docker rmi $(docker images -q)
```
### Remove unused images and stopped containers
```
    docker system prune -a
```
### Dockerfile commands
```
    ADD - can fetch from URLs and unzip
    ENTRYPOINT vs CMD - CMD provides default commands
    ENTRYPOINT ["node"]
    CMD ["server.js"]
    CMD is recomended for service based images (like API)
    CMD ["node", "server.js"]
```
### Volumes (sharing data in run-time between host and container)
```
    docker run -v $(pwd)/:/www/ {image-id}
    docker run -v $(pwd)/app:/usr/src/app -it {name}
    host folder: / container folder
```
### Use pm2 for dev and production
1. Use 
```
    docker run -v $(pwd)/api:/usr/src/api -e NODE_ENV=development {image-id}
```
2. Install pm2 and run npm start in Dockerfile
3. Use if/else in npm start which will run pm2-dev
### Package.json example
```
    "start": "if [[ ${NODE_ENV} = production ]]; then pm2-docker start -i 0 server.js; else pm2-dev server.js; fi"
```
### Dockerfile example
```
    FROM node:6-alpine
    # Image metadata
    LABEL version="1.0"
    LABEL description="This is an example of NODE API server with connection to MongoDB"
    ARG mongo_container_name
    ARG app_env
    # Environment variables
    # Add/change/overwrite with docker run --env key=value
    ENV NODE_ENV=$app_env
    ENV PORT=3000
    ENV DB_URI="mongodb://${mongodb_conatiner_name}:27017/db-${app_env}"
    # agr->env->npm start->pm2-dev or pm2-docker
```
### Another example
```
    # User
    #USER app
    RUN npm i -g pm2
    
    # Create API directory
    RUN mkdir -p /usr/src/api
    # From now one we are working in /usr/src/api
    WORKDIR /usr/src/api
    
    # Install api dependencies
    COPY ./api/package.json
    # Run build if necessary with devDependencies then clean them up
    RUN npm i --production
```
### Docker network
```
    docker network create --driver=bridge my-network
```
### Verify if exists:
```
    docker network inspect my-network
```
### Example creating network
```
    docker run --rm -it --net=my-network --name mongod-banking-api-prod-container mongo
```
### Another example
```
    docker run --rm -t \
    --net=my0network --name banking-api \
    -e NODE_ENV=production \
    -e DB_URI="mongodb://mongod-banking-api-prod-container:27017/db-prod" \
    -p 80:3000 be327d49c00d
```
