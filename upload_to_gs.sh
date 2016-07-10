#!/bin/bash
PROD_BUCKET='fzz'
TEST_BUCKET='fzz-test'
BUCKET_NAME=$PROD_BUCKET
EXCLUDE_REGEX='(^(?!^b_).+\.js)|(^\.)|(\/\.)|(.+\.((map)|(pem)|(sh)))|(^npm)'

webpack --progress --colors --config webpack.production.js

gsutil -m rsync -x $EXCLUDE_REGEX . gs://$BUCKET_NAME
for FOLDER in app plugin
do
    gsutil -m rsync -r -x $EXCLUDE_REGEX ./$FOLDER gs://$BUCKET_NAME/$FOLDER
done

gsutil -m cp -p gs://$BUCKET_NAME/b_plugin.js gs://$BUCKET_NAME/fzz.min.js
gsutil -m cp -p gs://$BUCKET_NAME/fzz.min.js gs://$BUCKET_NAME/trendi.min.js

gsutil -m acl set -r -a public-read gs://$BUCKET_NAME
gsutil -m setmeta -r -h 'Cache-Control:public, max-age=5' gs://$BUCKET_NAME

#For Backwards compatibility (fashioncelebstyle.com, etc..)
if [ '$BUCKET_NAME' = '$PROD_BUCKET' ]
then
    gcloud compute ssh extremeli-evolution-1 'sudo gsutil -m rsync -r gs://$BUCKET_NAME /var/www/latest/'
fi

echo Done!
