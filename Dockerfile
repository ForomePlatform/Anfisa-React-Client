FROM node:16 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.23.0
COPY default.nginx /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html/anfisa