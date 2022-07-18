#!/bin/sh

APP_NAME=blog-front-end
PLATFORM=linux/amd64
DOCKER_FILE=./Dockerfile.local
DOCKER_PORT=80
LOCAL_PORT=4300
LOCAL_NGINX_CONF=nginx
LOCAL_BUNDLE_HTML=html

echo "Delete old image ..."
docker rmi -f ${APP_NAME}

echo "Docker build image ..."
docker build -t ${APP_NAME} -f ${DOCKER_FILE} .

echo "Docker delete old container ..."
docker rm -f ${APP_NAME}

echo "Docker run container ..."
docker run -d --name ${APP_NAME} --network=fd-network -p ${LOCAL_PORT}:${DOCKER_PORT} ${APP_NAME}