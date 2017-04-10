#!/bin/bash
# Builds a production release and deploys it to GAE
cd `dirname $0`
OUTPUT_DIR=target
rm -fr $OUTPUT_DIR
npm run build
NPM_RC=$?
if [ "$NPM_RC" != "0" ]; then
  echo "[ERROR] NPM failed"
  exit 1
fi
cp app.yaml $OUTPUT_DIR
cd $OUTPUT_DIR
gcloud app deploy app.yaml --stop-previous-version --project pollin8-web-client-162107
echo "[SUCCESS] Build and deploy done"
