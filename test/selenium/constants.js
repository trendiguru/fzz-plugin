const path = require('path');

const WAIT_TIME = 5000,
    WAIT_TIMEOUT = WAIT_TIME*3;
    DRIVER_DECLARATION = {
        browsers:['firefox', 'chrome']
    },
    URLS = {
        publishers: [
            'http://amaze-magazine.com/2016/08/cute-fall-denim-everybody/',
            'http://www.fashionseoul.com/?p=119333'
        ],
        tricky: [
            'https://www.instagram.com/forever21/'
        ],
        potential: [
            'http://www.gala.de/stars/news/michelle-hunziker-die-schoensten-fotos-ihrer-familie_1166388-i10704220.html',
            'http://www.gala.de/beauty-fashion/fashion/fashion-looks-der-style-von-jennifer-lawrence_1171061_782392-i9736316.html',
            'http://www.stylebook.de/stars/Lena-Meyer-Landrut-ueberrascht-mit-neuer-Frisur_1-784989.html',
            'http://www.stylebistro.com/lookbook/Jessica+Alba/HMkKFqZGd_D',
            'http://gathery.recruit-lifestyle.co.jp/article/1147221855455488201',
            'http://www.plus-model-mag.com/',
            'http://www.stylebook.de/fashion/topmodel-doutzen-kroes-launcht-eigene-dessous-kollektion-829220.html'
        ]
    },
    
    RESULT_SELECTOR = 'IMG',
    IFRAME_ID = 'fazzi',
    BUTTON_CLASSNAME = 'fzz-button',
    LOADING_CLASSNAME = 'fzz-loading',
    SNIPPET = [
            function injectScript(localFlag){
            var attributes = {
                API: 'pd',
                PID: 'Y8Y4jENvaJ2Lsklz',//healthyCeleb
                ID: 'fzz-script',
                SRC: 'https://fzz-test.storage.googleapis.com/b_plugin.js',
            }
            //run only in browser:
            if (!localFlag){
                var s = document.createElement('script');
                s.setAttribute('id', attributes.ID);
                s.setAttribute('data-pid', attributes.PID);
                s.setAttribute('data-api', attributes.API);
                console.log(s);
                s.src = attributes.SRC;
                var head = document.head || document.getElementsByTagName('head')[0]; // IE
                head.appendChild(s);
            }
            return attributes;
        },
        function injectScript(localFlag){
            var attributes = {
                API: 'pd',
                PID: 'DEV',//healthyCeleb
                ID: 'fzz-script',
                SRC: 'https://fzz-test.storage.googleapis.com/b_plugin.js',
            }
            //run only in browser:
            if (!localFlag){
                var s = document.createElement('script');
                s.setAttribute('id', attributes.ID);
                s.setAttribute('data-pid', attributes.PID);
                s.setAttribute('data-api', attributes.API);
                console.log(s);
                s.src = attributes.SRC;
                var head = document.head || document.getElementsByTagName('head')[0]; // IE
                head.appendChild(s);
            }
            return attributes;
        }
    ][0],
    INJECTED_SCRIPT = {
        API: SNIPPET(true).API,
        PID: SNIPPET(true).PID,
        ID: SNIPPET(true).ID,
        SRC: SNIPPET(true).SRC,
    },

module.exports = {
    WAIT_TIME,
    WAIT_TIMEOUT,
    URLS,
    DRIVER_DECLARATION,
    IFRAME_ID,
    RESULT_SELECTOR,
    INJECTED_SCRIPT,
    LOADING_CLASSNAME,
    BUTTON_CLASSNAME,
    SNIPPET
};
