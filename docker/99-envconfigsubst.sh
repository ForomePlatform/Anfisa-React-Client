#!/bin/sh
envsubst '${REACT_APP_URL_BACKEND}' < /usr/share/nginx/html/anfisa/env-config.js.template > /usr/share/nginx/html/anfisa/env-config.js
