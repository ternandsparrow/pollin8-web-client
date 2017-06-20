#!/bin/bash
STACK_NAME=$1
if [ -z "$STACK_NAME" ]; then
  echo "[ERROR] no stack name supplied"
  echo "usage: $0 [stack name]"
  exit 1
fi
aws \
 cloudformation \
 describe-stacks \
 --stack-name $STACK_NAME
