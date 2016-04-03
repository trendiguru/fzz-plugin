#!/bin/bash

gsutil cp -a public-read fzz.min.js gs://fzz
gsutil cp -a public-read app/b_desktop.js gs://fzz/app/b_desktop.js
gsutil cp -a public-read app/b_mobile.js gs://fzz/app/b_mobile.js
gsutil cp -a public-read plugin/css/plugin.css gs://fzz/plugin/css/plugin.css
gsutil cp -a public-read app/desktop.html  gs://fzz/app/desktop.html
gsutil cp -a public-read app/css/app.css   gs://fzz/app/css/app.css 
gsutil -m mv -p gs://fzz/_old/img gs://fzz/
gsutil -m setmeta -r -h "Cache-Control:public, max-age=5" gs://fzz
