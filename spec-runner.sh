#!/bin/bash

BRANCH='develop'
TAP_FILE='report.tap'

git checkout $BRANCH
git pull origin $BRANCH

source ~/.nvm/nvm.sh
nvm use 0.10

npm install
bower install

grunt clean
grunt test
testem ci > $TAP_FILE
