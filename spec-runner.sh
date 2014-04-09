#!/bin/bash

TAP_FILE='report.tap'

OWNER=$1
REPO=$2
SHA=$3

source ~/.nvm/nvm.sh
export PATH=$PATH:~/.phantomjs/bin
nvm use 0.10

git config url."https://".insteadOf "git://"

npm install
bower install

grunt clean
grunt test
testem launchers
testem ci > $TAP_FILE

NG_COUNT=`cat $TAP_FILE | grep "not ok" | wc -l`

if [ $NG_COUNT -eq 0 ] ; then
  COMMENT="OK"
  STATE="success"
else
  COMMENT=":shit: NG"
  STATE="failure"
fi

curl -H "Authorization: token cf2656ece6c8138c73deb4622d961568cc08d444" https://api.github.com/repos/$OWNER/$REPO/issues/25/comments -X POST -d "{\"body\":\"$COMMENT\"}"
curl -H "Authorization: token cf2656ece6c8138c73deb4622d961568cc08d444" https://api.github.com/repos/$OWNER/$REPO/statuses/$SHA -X POST -d "{\"state\":\"$STATE\"}"
