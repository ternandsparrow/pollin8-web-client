#!/bin/bash
# Deletes an AWS stack
cd `dirname $0`
set -e
STACK_NAME=$1
if [ -z "$STACK_NAME" ]; then
  echo "[ERROR] no stack name provided"
  echo "usage: $0 [stack name]"
  echo "   eg: $0 dev"
  exit 1
fi

echo "[INFO] deleting stack '$STACK_NAME'"
aws cloudformation \
  delete-stack \
  --stack-name $STACK_NAME
sleep 5
echo "[INFO] checking progress"
aws cloudformation \
  describe-stacks \
  --stack-name $STACK_NAME
echo "[INFO] check progress with: aws cloudformation describe-stacks --stack-name $STACK_NAME"
echo "[INFO] find errors with:    aws cloudformation describe-stack-events --stack-name $STACK_NAME"
