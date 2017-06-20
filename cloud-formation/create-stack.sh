#!/bin/bash
# creates a stack
REGION=us-west-1
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
  aws --region=$REGION \
    cloudformation \
    $CS_ACTION-stack \
    --stack-name $CS_STACK_NAME \
    --template-body file://$CFTEMPLATE \
    --parameters ParameterKey=envlevel,ParameterValue=$CS_ENV_LEVEL,ParameterKey=theregion,ParameterValue=$REGION
  sleep 5
  echo "[INFO] describing stack to check progress"
  aws --region=$REGION \
    cloudformation \
    describe-stacks \
    --stack-name $CS_STACK_NAME
  echo "[INFO] check progress with: ./$CS_STACK_NAME-describe-stack.sh"
  echo "[INFO] find errors with:    ./$CS_STACK_NAME-describe-stack-events.sh"
}
