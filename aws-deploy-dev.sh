#!/bin/bash
cd `dirname $0`
S3_TARGET_BUCKET="www.dev.pollin8.aekos.org.au"
OUTPUT_DIR="target"
S3_LS=`sh -c "aws s3 ls | grep $S3_TARGET_BUCKET"`
if [ -z "$S3_LS" ]; then
  echo "[ERROR] can't find target S3 bucket '$S3_TARGET_BUCKET', do you have the right account enabled?"
  exit 1
fi
npm run build
NPM_RC=$?
if [ "$NPM_RC" != "0" ]; then
  echo "[ERROR] NPM failed"
  exit $NPM_RC
fi
aws s3 sync --delete ./$OUTPUT_DIR/ s3://$S3_TARGET_BUCKET/ --acl public-read
