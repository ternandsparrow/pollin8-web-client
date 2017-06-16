#!/bin/bash
# Executes the cloudformation template
cd `dirname $0`
set -e
CFTEMPLATE=`pwd`/s3-buckets.yml
STACK_NAME=dev
ACTION=create
if [ ! -z "$1" ]; then
  ACTION=$1
fi
echo "[INFO] $ACTION-ing stack"
aws cloudformation \
  $ACTION-stack \
  --stack-name $STACK_NAME \
  --template-body file://$CFTEMPLATE
#  --parameters ParameterKey=Parm1,ParameterValue=test1 ParameterKey=Parm2,ParameterValue=test2
sleep 5
echo "[INFO] describing stack to check progress"
aws cloudformation \
  describe-stacks \
  --stack-name $STACK_NAME
echo "[INFO] check progress with: aws cloudformation describe-stacks --stack-name $STACK_NAME"
echo "[INFO] find errors with:    aws cloudformation describe-stack-events --stack-name $STACK_NAME"
