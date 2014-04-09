#!/bin/bash

TAP_FILE='report.tap'

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
  COMMENT_BODY="OK"
else
  COMMENT_BODY=":shit: NG"
fi

curl -H "Authorization: token cf2656ece6c8138c73deb4622d961568cc08d444" https://api.github.com/repos/otiai10/prisc/issues/25/comments -X POST -d "{\"body\":\"Hi\"}"
