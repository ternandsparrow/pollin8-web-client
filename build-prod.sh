#!/bin/bash
# Builds the production build
cd `dirname $0`
BUILD_DIR=`pwd`/target
set -e
rm -rf $BUILD_DIR
npm run build
echo "$(tput setaf 2)[INFO] Build success. Now deploy '$BUILD_DIR' to the production server$(tput sgr0)"
