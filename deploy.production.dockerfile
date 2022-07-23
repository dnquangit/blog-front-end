# BASE IMAGE with an alias #
FROM node:14.15.0-alpine3.11 as build-stage
WORKDIR /app
ARG APP_NAME=blog-front-end

COPY ./package.json .
RUN npm install --verbose

COPY . .
RUN npm run build

# BASE IMAGE with an alias #
FROM nginx:1.17.1-alpine as production-stage
ARG APP_NAME=blog-front-end
RUN rm -rf /usr/share/nginx/html/*
COPY deploy.template.ngnix.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/${APP_NAME} /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]