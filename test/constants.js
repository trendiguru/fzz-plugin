const path = require('path');

const WAIT_TIME = 3500,
    URLS = {
        publishers: [
            'http://amaze-magazine.com/2016/08/cute-fall-denim-everybody/',
            'http://www.fashionseoul.com/?p=119333'
        ],
        tricky: [
            'https://www.instagram.com/forever21/'
        ],
        potential: [
            // 'http://www.gala.de/stars/news/michelle-hunziker-die-schoensten-fotos-ihrer-familie_1166388-i10704220.html',
            // 'http://www.gala.de/beauty-fashion/fashion/fashion-looks-der-style-von-jennifer-lawrence_1171061_782392-i9736316.html',
            // 'http://www.stylebook.de/stars/Lena-Meyer-Landrut-ueberrascht-mit-neuer-Frisur_1-784989.html',
            'http://www.stylebistro.com/lookbook/Jessica+Alba/HMkKFqZGd_D',
            'http://gathery.recruit-lifestyle.co.jp/article/1147221855455488201',
            // 'http://www.plus-model-mag.com/',
            'http://www.stylebook.de/fashion/topmodel-doutzen-kroes-launcht-eigene-dessous-kollektion-829220.html'
        ]
    },
    INJECTED_FILES = {
        'fzz-publish': null,
        'fzz-test': './test/src/snippet.js',
        'local': 'b_plugin.js'
    },
    NIGHTMARE_DECLARATION = {
        show: true,
        openDevTools: true,
        gotoTimeout: 30000,
        loadTimeout: 30000,
        waitTimeout: 30000,
        'webPreferences': {
            'webSecurity': false
        }
    },
    VIEWPORT = {
        height: 1000,
        width: 2000,
    },
    TEST_TIMEOUT = 120000,
    IFRAME_SELECTOR = '#fazzi',
    RESULT_SELECTOR = 'IMG',
    BUTTON_SELECTOR = '.fzz-button',
    LOADING_SELECTOR = '.fzz-loading',


    INJECTED_SCRIPT = {
        API: 'nd',
        PID: 'DEV',
        ID: 'fzz-script',
        SRC: 'https://fzz-test.storage.googleapis.com/b_plugin.js',
    },

    RESULTS_SRC = 'ecx.images-amazon.com';

module.exports = {
    WAIT_TIME,
    URLS,
    INJECTED_FILES,
    TEST_TIMEOUT,
    NIGHTMARE_DECLARATION,
    VIEWPORT,
    IFRAME_SELECTOR,
    RESULT_SELECTOR,
    INJECTED_SCRIPT,
    RESULTS_SRC,
    BUTTON_SELECTOR,
    LOADING_SELECTOR
};
