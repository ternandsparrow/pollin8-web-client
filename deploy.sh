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
gcloud app deploy app.yaml \
  --version=therecanonlybeone \
  --project pollin8-web-client-162107
# using --stop-previous-version for the previous command doesn't work so we just steamroll the same version
echo "[SUCCESS] Build and deploy done"
