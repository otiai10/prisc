#!/bin/bash

TAP_FILE='report.tap'

TOKEN=$1
OWNER=$2
REPO=$3
SHA=$4
NUMBER=$5

source ~/.nvm/nvm.sh
export PATH=$PATH:~/.phantomjs/bin
nvm use 0.10

npm install
bower install

grunt clean
grunt test
testem launchers
testem ci > $TAP_FILE

NG_COUNT=`cat $TAP_FILE | grep "not ok" | wc -l`

if [ $NG_COUNT -eq 0 ] ; then
  COMMENT=":+1: OK"
  STATE="success"
else
  # NG_BODY=`cat $TAP_FILE | grep "not ok" -A 10`
  NG_BODY=`cat $TAP_FILE | grep "not ok"`
  COMMENT=":shit: NG\n\n----------\n"$NG_BODY
  STATE="failure"
fi

curl -H "Authorization: token ${TOKEN}" https://api.github.com/repos/$OWNER/$REPO/issues/$NUMBER/comments -X POST -d "{\"body\":\"$COMMENT\"}"
curl -H "Authorization: token ${TOKEN}" https://api.github.com/repos/$OWNER/$REPO/statuses/$SHA -X POST -d "{\"state\":\"$STATE\"}"
