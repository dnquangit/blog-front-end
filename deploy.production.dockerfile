# BASE IMAGE with an alias #
FROM node:14.15.0-alpine3.11 as build-stage
WORKDIR /app
ARG APP_NAME=blog-front-end
ARG MAX_OLD_SPACE_SIZE=1024
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

COPY ./package.json .

RUN npm install

COPY . .
RUN npm run build

# BASE IMAGE with an alias #
FROM nginx:1.17.1-alpine as production-stage
ARG APP_NAME=blog-front-end
RUN rm -rf /usr/share/nginx/html/*
COPY deploy.template.ngnix.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/blog-front-end /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]