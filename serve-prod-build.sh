#!/bin/bash
# Serves up the production build with a web server to allow testing of it
BUILD_DIR=target
LOCAL_CONFIG_FILE="./app/local-config-module.js"
EXPECTED_CONFIG_FILE=`pwd`/$BUILD_DIR/config-module.js
PORT=8080
trap "rm -f $EXPECTED_CONFIG_FILE" INT # clean up config file
if [ ! -d "$BUILD_DIR" ]; then
  echo "[ERROR] build directory '$BUILD_DIR' is not present, cannot continue"
  exit 1
fi
cp $LOCAL_CONFIG_FILE $EXPECTED_CONFIG_FILE
cd `dirname $0`/$BUILD_DIR
echo "[INFO] serving $(pwd) directory on http://localhost:$PORT. Ctrl+c to exit"
docker run -v `pwd`:/usr/share/nginx/html:ro --rm -p 8080:80 nginx
