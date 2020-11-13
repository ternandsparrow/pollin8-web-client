#!/bin/sh
set -euxo pipefail
cd `dirname "$0"`/..

# `yarn install` requires git
apk add --no-cache --virtual .build-deps git

# install *including* devDependencies
NODE_ENV=need-dev-deps yarn install

export API_BASE_URL='%%API_BASE_URL%%'
export SENTRY_DSN='http://11SENTRY_DSN@o1/1'
export DEPLOYED_TO_ENV='%%DEPLOYED_TO_ENV%%'
export HEREMAPS_APP_ID='%%HEREMAPS_APP_ID%%'
export HEREMAPS_APP_CODE='%%HEREMAPS_APP_CODE%%'

yarn build

# letting NODE_ENV be production, this removes devDeps and saves space.
# thanks https://github.com/yarnpkg/yarn/issues/696#issuecomment-253011342
yarn install --force

apk del .build-deps
yarn cache clean
rm -fr /tmp/*
