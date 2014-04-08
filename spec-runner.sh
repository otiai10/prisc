#!/bin/bash

TAP_FILE='report.tap'

source ~/.nvm/nvm.sh
nvm use 0.10

git config url."https://".insteadOf git://

npm install
bower install

grunt clean
grunt test
testem ci > $TAP_FILE
