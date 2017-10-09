#!/bin/bash
# needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY set for aws calls

FUNCTION=renderReact
REGION=us-east-1

# development, production, staging, etc
ALIAS=$1
REF=$2

# unique description per lambda version for use in moving aliases
DESC="$REF:${BUILD:=0}"

if [ ! -f lambda.zip ]; then
    echo "Unable to find lambda.zip"
    exit 1
fi

echo "Updating function code..."
aws lambda update-function-code \
    --function-name $FUNCTION \
    --region $REGION \
    --zip-file fileb://lambda.zip

# publish function and move aliases
echo "Publishing new version ($DESC)..."
aws lambda publish-version \
    --function-name $FUNCTION \
    --region $REGION \
    --description $DESC

VERSION=$(aws lambda list-versions-by-function \
    --function-name $FUNCTION \
    --region $REGION \
    --output json | jq -r ".Versions[] | select(.Version!=\"\$LATEST\") | select(.Description == \"${DESC}\").Version")

echo "Updating alias '$ALIAS' to point to version $VERSION..."
aws lambda update-alias \
    --function-name $FUNCTION \
    --name $ALIAS \
    --function-version $VERSION \
    --description $DESC \
    --region $REGION
