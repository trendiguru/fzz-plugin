#!/bin/bash
echo setting of path to driver
export PATH=/home/sergrey/fzz-project3/fzz-plugin/node_modules/geckodriver:$PATH
export PATH=/home/sergrey/fzz-project3/fzz-plugin/node_modules/chromedriver/bin:$PATH
echo $PATH

node ./index



