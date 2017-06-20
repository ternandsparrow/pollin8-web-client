#!/bin/bash
# Deletes an AWS stack
cd `dirname $0`
set -e
STACK_NAME=$1
source ./create-stack.sh
if [ -z "$STACK_NAME" ]; then
  echo "[ERROR] no stack name provided"
  echo "usage: $0 [stack name]"
  echo "   eg: $0 dev"
  exit 1
fi
echo "[INFO] deleting stack '$STACK_NAME'"
aws --region=$REGION \
  cloudformation \
  delete-stack \
  --stack-name $STACK_NAME
echo "[WARN] this will fail if you haven't emptied all the S3 buckets that are to be deleted"
sleep 5
echo "[INFO] checking progress"
aws --region=$REGION \
  cloudformation \
  describe-stacks \
  --stack-name $STACK_NAME
echo "[INFO] check progress with: ./$CS_STACK_NAME-describe-stack.sh"
echo "[INFO] find errors with:    ./$CS_STACK_NAME-describe-stack-events.sh"
