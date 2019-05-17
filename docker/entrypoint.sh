#!/bin/sh
# entrypoint for the Docker container
cd `dirname "$0"`/..
mainDir=`pwd`

# Nuxt doesn't support runtime env vars in the nuxt.config.js so we'll do it ourselves (yep, it's a little hacky but it
# works)
find .nuxt/ \
  -type f \
  -name '*.js' \
  -exec sed -i "s+%%API_BASE_URL%%+${API_BASE_URL:?}+g" '{}' \; \
  -exec sed -i "s+%%ROLLBAR_SERVER_TOKEN%%+${ROLLBAR_SERVER_TOKEN:?}+g" '{}' \; \
  -exec sed -i "s+%%ROLLBAR_CLIENT_TOKEN%%+${ROLLBAR_CLIENT_TOKEN:?}+g" '{}' \; \
  -exec sed -i "s+%%DEPLOYED_TO_ENV%%+${DEPLOYED_TO_ENV:?}+g" '{}' \;

exec yarn start
