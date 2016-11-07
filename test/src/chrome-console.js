const Nightmare = require('nightmare');
const {
    NIGHTMARE_DECLARATION,
    VIEWPORT,
    WAIT_TIME,
    IFRAME_SELECTOR,
    RESULT_SELECTOR,
    INJECTED_SCRIPT
} = require('./../constants.js');
const SCRIPT_CLASS_NAME = 'superScript';

Nightmare.action('injectScript', function(scriptString, done) {
    this.evaluate_now((scriptString, className) => {
        let s = document.createElement('script');
        s.setAttribute('className', className);
        s.innerHTML = scriptString;
        var head = document.head || document.getElementsByTagName('head')[0]; // IE
        head.appendChild(s);
    }, done, scriptString, SCRIPT_CLASS_NAME)
});

class chromeConsole {
    constructor(pageURL, injectedFile) {
        this.url = pageURL;
        this.injectedFile = injectedFile;
        this.globalName = this.injectedFile.split("/").pop().slice(0, -3);
        this.run = this.run.bind(this);
    }


    run(scriptStr) {
        let url = this.url;
        let injectedFile = this.injectedFile;
        let nightmare = new Nightmare(NIGHTMARE_DECLARATION);
        return nightmare.goto(url)
            .cookies
            .clearAll()
            .inject('js', injectedFile)
            .injectScript(scriptStr)
            .wait(1000)
            .evaluate(function() {
                return window.result;
            })
            .end()
            .then(function(result) {
                return result;
            })
            .catch(function(error) {
                console.error('console failed:', error);
            });
    }
}

module.exports = chromeConsole;
