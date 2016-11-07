let Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
let {
    NIGHTMARE_DECLARATION,
    VIEWPORT,
    WAIT_TIME,
    IFRAME_SELECTOR,
    RESULT_SELECTOR,
    INJECTED_SCRIPT,
    BUTTON_SELECTOR,
    LOADING_SELECTOR
} = require('./../constants.js');

const URL_REGEXP = new RegExp('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)');

Nightmare.action('customInject', function(done) {
    this.wait('head').evaluate_now(function(insc) {
        console.log(insc);
        var s = document.createElement('script');
        s.setAttribute('id', insc.ID);
        s.setAttribute('data-pid', insc.PID);
        s.setAttribute('data-api', insc.API);
        console.log(s);
        console.log(document.head);
        s.src = insc.SRC;
        var head = document.head || document.getElementsByTagName('head')[0]; // IE
        head.appendChild(s);

    }, done, INJECTED_SCRIPT)
});

function runBasicTest(URLs, injectedFile) {
    let sessionData = {};
    let checkPage = (url) => {
        sessionData[url] = {};
        let nightmare = new Nightmare(NIGHTMARE_DECLARATION);
        let nm = nightmare.goto(url).cookies.clearAll();
        if (injectedFile) {
            nm = nm.inject('js', injectedFile);
        }else{
            nm = nm.customInject();
        }
        nm = nm.viewport(VIEWPORT.width, VIEWPORT.height)
            .wait('head')
            .wait(LOADING_SELECTOR)
            .wait(BUTTON_SELECTOR)
            .click(BUTTON_SELECTOR)
            .wait(IFRAME_SELECTOR)
            .enterIFrame(IFRAME_SELECTOR)
            .wait(RESULT_SELECTOR)
            .click(RESULT_SELECTOR)
            .evaluate(function(selector) {
                return document.querySelector(selector).src;
            }, RESULT_SELECTOR)
            .end()
            .then((src) => {
                sessionData[url].productSource = URL_REGEXP.exec(src)[1];
                console.log('url: ' + url + 'result: true');
                return true;
            })
            .catch((error) => {
                console.error('url: ' + url + ' ===> nightmare test failed:', error);
                return false;
            });
        return nm;
    };

    let promises = URLs.map((pageUrl) => checkPage(pageUrl));
    return Promise.all(promises).then((results) => {
        return new Promise(function(resolve, reject) {
            let flag = true;
            for (let result of results) {
                flag = flag && result;
            }
            console.log(flag);
            if (flag) {
                resolve(sessionData);
            } else {
                reject(new Error("NIGHTMARE TEST FAILED!!!:("));
            }

        });
    });
}

module.exports = runBasicTest;
