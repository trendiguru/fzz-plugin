#!/bin/bash
echo setting of path to driver
echo TODO: dont forget to add absolute path
export PATH=/home/sergrey/fzz-project4/fzz-plugin/node_modules/geckodriver:$PATH
export PATH=/home/sergrey/fzz-project4/fzz-plugin/node_modules/chromedriver/bin:$PATH
echo $PATH

node ./index



