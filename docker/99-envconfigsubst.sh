#!/bin/sh
envsubst '${URL_BACKEND}' < /usr/share/nginx/html/anfisa/env-config.js.template > /usr/share/nginx/html/anfisa/env-config.js
