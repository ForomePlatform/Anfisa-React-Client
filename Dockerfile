FROM node:16-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.23.1-alpine
COPY --chown=nginx:nginx --from=build /app/build /usr/share/nginx/html/anfisa
COPY --chown=nginx:nginx maintenance.html /usr/share/nginx/html/
COPY --chown=nginx:nginx docker/default.conf.template /etc/nginx/templates/
COPY --chown=nginx:nginx docker/env-config.js.template /usr/share/nginx/html/anfisa/
# COPY --chown=nginx:nginx docker/env-config.js.template /usr/share/nginx/html/anfisa/env-config.js
COPY docker/99-envconfigsubst.sh /docker-entrypoint.d/
WORKDIR /usr/share/nginx/html/anfisa
RUN chmod +x /docker-entrypoint.d/*.sh && \
    chown -R nginx:nginx /usr/share/nginx/html/anfisa && \
    chmod -R 755 /usr/share/nginx/html/anfisa && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chmod -R 755 /var/log/nginx; \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid
USER nginx
