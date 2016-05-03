window.addEventListener('DOMContentLoaded', function(){
    var headTag = document.getElementsByTagName('head')[0];
    var div = document.createElement('div');
    div.id = 'fzz-script';
    div.setAttribute('data-fzz', '{"whitelist":"*"}');
    div.setAttribute('data-pid', 'chrome_ext_dev');
    headTag.appendChild(div); 
});