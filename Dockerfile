FROM node:16-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.23-alpine
COPY --from=build /app/build /usr/share/nginx/html/anfisa
COPY maintenance.html /usr/share/nginx/html/
COPY docker/default.conf.template /etc/nginx/templates/
COPY docker/env-config.js.template /usr/share/nginx/html/anfisa/
COPY docker/99-envconfigsubst.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/*.sh
