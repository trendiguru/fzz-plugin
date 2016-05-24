#!/bin/bash

npm run deploy

gsutil -m cp -a public-read fzz.min.js gs://fzz
gsutil -m cp -a public-read b_plugin.js gs://fzz

gsutil -m cp -a public-read app/b_desktop.js gs://fzz/app/b_desktop.js
gsutil -m cp -a public-read app/b_mobile.js gs://fzz/app/b_mobile.js

gsutil -m cp -a public-read app/desktop.html  gs://fzz/app/desktop.html
gsutil -m cp -r -a public-read plugin/css gs://fzz/plugin/
gsutil -m cp -r -a public-read app/css   gs://fzz/app/
gsutil -m cp -r -a public-read plugin/img   gs://fzz/plugin/
gsutil -m cp -r -a public-read app/img   gs://fzz/app/

gsutil -m cp -p gs://fzz/fzz.min.js gs://fzz/trendi.min.js

gsutil -m setmeta -r -h "Cache-Control:public, max-age=5" gs://fzz

#For Backwards compatibility (fashioncelebstyle.com, etc..)
gcloud compute ssh extremeli-evolution-1 'sudo gsutil -m rsync -r gs://fzz /var/www/latest/'
