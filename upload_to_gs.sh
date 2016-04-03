#!/bin/bash

npm run deploy
gsutil -m cp -a public-read fzz.min.js gs://fzz
gsutil -m cp -a public-read b_plugin.js gs://fzz
gsutil -m cp -a public-read app/b_desktop.js gs://fzz/app/b_desktop.js
gsutil -m cp -a public-read app/b_mobile.js gs://fzz/app/b_mobile.js
gsutil -m cp -a public-read plugin/css/plugin.css gs://fzz/plugin/css/plugin.css
gsutil -m cp -a public-read app/desktop.html  gs://fzz/app/desktop.html
gsutil -m cp -a public-read app/css/app.css   gs://fzz/app/css/app.css 
gsutil -m mv -p gs://fzz/_old/img gs://fzz/
gsutil -m setmeta -r -h "Cache-Control:public, max-age=5" gs://fzz
