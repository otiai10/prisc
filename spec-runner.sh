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
