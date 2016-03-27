//var URL = 'https://fzz.storage.googleapis.com/b_main.js';
//var URL = 'https://extremeli.trendi.guru/front/latest/b_main.js';
var URL = 'http://localhost:8000/b_plugin.js';

function getScript(url, callback) {
    var headTag = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
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
