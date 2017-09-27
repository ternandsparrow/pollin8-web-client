#!/bin/bash
cd `dirname $0`
command -v angular-cli-ghpages > /dev/null
RC=$?
if [ "$RC" != "0" ]; then
  echo "[ERROR] angular-cli-ghpages command isn't available."
  echo "[ERROR] install it with 'npm install -g angular-cli-ghpages'"
  exit $RC
fi
set -e
ng build -prod
echo "www.pollin8.org.au" > dist/CNAME
angular-cli-ghpages
echo "[INFO] done, site has been built and deployed to the github pages branch"
