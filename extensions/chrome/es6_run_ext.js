import constants from 'constants';

const {HOST_DOMAIN} = constants;
const URL = `${HOST_DOMAIN}/b_plugin.js`;
//const URL = `${HOST_DOMAIN}/fzz.min.js`;

console.log('HELLOOOOOO');

function getScript(url, callback) {
    var headTag = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    //script.id = 'fzz-script';
    //script.setAttribute('data-fzz', '{"whitelist":"*"}');
    script.src = url;
    script.onload = callback;
    script.onreadystatechange = function() {
        if (this.readyState == 'complete') {
            callback();
        }
    };
    headTag.appendChild(script);
}

window.addEventListener('DOMContentLoaded', function() {
    getScript(URL, function() {
        window.FZZ = {logList: []};
        window.FZZ.log = function(message){
            window.FZZ.logList.push(message);
        };
        window.FZZ.log('TG Extension Done at: ' + new Date());
    });
});