#!/bin/bash
# creates a stack
function actionStack {
  local \
    CS_STACK_NAME \
    CS_ACTION \
    CS_ENV_LEVEL
  local "${@}"
  DIR_OF_THIS_SCRIPT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  cd $DIR_OF_THIS_SCRIPT
  set -e
  CFTEMPLATE=`pwd`/pollin8-stack.yml
  echo "[INFO] $CS_ACTION-ing '$CS_STACK_NAME' stack"
  aws cloudformation \
    $CS_ACTION-stack \
    --stack-name $CS_STACK_NAME \
    --template-body file://$CFTEMPLATE \
    --parameters ParameterKey=envlevel,ParameterValue=$CS_ENV_LEVEL
  sleep 5
  echo "[INFO] describing stack to check progress"
  aws cloudformation \
    describe-stacks \
    --stack-name $CS_STACK_NAME
  echo "[INFO] check progress with: aws cloudformation describe-stacks --stack-name $CS_STACK_NAME"
  echo "[INFO] find errors with:    aws cloudformation describe-stack-events --stack-name $CS_STACK_NAME"
}
