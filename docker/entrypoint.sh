#!/bin/sh
# entrypoint for the Docker container
set -euxo pipefail
cd `dirname "$0"`/..

envName=${DEPLOYED_TO_ENV:?}
echo "[INFO] deployed env name: $envName"

sentryDsn=${SENTRY_DSN:-}
echo "[INFO] Sentry DSN: ${sentryDsn:-(nothing)}"

gaId=${GA_ID:-}
echo "[INFO] Google Analytics ID: ${gaId:-(nothing)}"

# At the time of writing, Nuxt didn't support runtime env vars in the
# nuxt.config.js, so we'll do it ourselves.
find .nuxt/ \
  -type f \
  -name '*.js' \
  -exec sed -i \
    -e "s+%%API_BASE_URL%%+${API_BASE_URL:?}+g" \
    -e "s+http://11SENTRY_DSN@o1/1+$sentryDsn+g" \
    -e "s+%%DEPLOYED_TO_ENV%%+$envName+g" \
    -e "s+%%GA_ID%%+${gaId}+g" \
    '{}' \;

exec yarn start
