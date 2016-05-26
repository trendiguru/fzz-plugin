/* eslint-disable no-console, no-unused-vars */

import domready from 'ext/domready';
import * as constants from 'constants';
import {analytics} from 'modules/analytics_wrapper';
import draw from './draw';
import {scanForever, observe} from './observe';
import imagesLoaded from 'imagesloaded';
import {smartCheckRelevancy} from 'modules/server';
import {getElementsToProcess} from 'modules/utils';
//import {console} from 'modules/smartConsole';

const {USER_CONFIG, MIN_IMG_WIDTH, MIN_IMG_HEIGHT, IFRAME_ID, CSS_URL, IFRAME_SRC, PID} = constants;

const FZZ = window.FZZ = window.FZZ || {};
let relevantImgs = FZZ.relevantImgs = {};
let irrelevantImgs = FZZ.irrelevantImgs = {};
let irrelevantElements = FZZ.irrelevantElements = {};
let refererDomain = window.location.hostname.replace('www.', '');
analytics.initializeInPublisher( {refererDomain: refererDomain, publisherDomain: refererDomain, PID:PID });
analytics.track('Page Hit');

//Track Scroll on Publisher
let initScrollTop = window.scrollY;
window.addEventListener('scroll', function () {
    if (window.scrollY - initScrollTop > 20) {
        analytics.track('Publisher Scroll', undefined, ['ga']);
        initScrollTop = 100000000;
    }
});


domready(function () {
    loadStyle();
    console.log('FZZ: domready');
    document.body.appendChild(createIframe());
    scanForever(document.body, processElement);
    observe(document.body, processElement, {childList: true,subtree: true});
});

function processElement(el) {
    return Promise.resolve(el)
        .then(function (elem) {
            return new TGImage(elem);
        })
        .then(ensureNew)
        .then(isLoaded)
        .then(ensureSuspicious)
        .then(smartCheckRelevancy)
        .then(
        function (relevantImg) {
            let date = new Date();
            console.log(`${date}: Found Relevant!: ${relevantImg.url}`);
            relevantImgs[relevantImg.url] = relevantImg;
            draw(relevantImg);
        },
        function (irrelevantImg) {
            // This will only have a url if it returns from smartRelevacyCheck as irrelevant,
            // the others will arrive as {name: nnn, element:eee} error objects.
            if (irrelevantImg.url) {
                irrelevantImgs[irrelevantImg.url] = irrelevantImg;
            } else {
                logIrrelevant(irrelevantImg);
            }
        });
}

function TGImage(elem, url) {
    if (elem.nodeName == 'IMG') {
        this.url = url || elem.src || (location.origin + elem.srcset);
    } else {
        //TODO: Get the size if possible
        this.url = url || getBackgroundImage(elem);
        if (!this.url) {
            throw {
                name: 'No Image found',
                element: elem
            };
        }
    }
    this.element = elem;
}

function logIrrelevant(error) {
    //console.log('reached logIrrelevant');
    let errName = error.name;
    let errElement = error.element;
    let errorCounts = irrelevantElements[errName] = irrelevantElements[errName] || {};
    let errorCountforElem = errorCounts[errElement] = errorCounts[errElement] || 0;
    errorCountforElem += 1;
}

function ensureNew(tgImg) {
    if (tgImg.url in relevantImgs || tgImg.url in irrelevantImgs) {
        throw {
            name: 'Not a New Image',
            element: tgImg
        };
    }
    return tgImg;
}

function isLoaded(tgImg) {
    return new Promise(function (resolve, reject) {
        let iml = imagesLoaded(tgImg.element, {
            background: tgImg.background
        });
        iml.on('done', function (instance) {
            resolve(tgImg);
        });
        iml.on('fail', function (instance) {
            reject({
                name: 'Image Load Failed',
                element: tgImg
            });
        });
    });
}

function ensureSuspicious(tgImg) {
    let rect = tgImg.element.getBoundingClientRect();
    if (rect.height >= MIN_IMG_HEIGHT && rect.width >= MIN_IMG_WIDTH) {
        return tgImg;
    } else {
        throw {
            name: 'Too Small',
            element: tgImg
        };
    }
}

//From imagesLoaded
function getBackgroundImage(elem) {
    var urls = [];
    // IE8
    var getStyle = window.getComputedStyle || function (elem) {
        return elem.currentStyle;
    };
    var style = getStyle(elem);
    // get url inside url('...')
    var reURL = /url\(([''""])?(.*?)\1\)/gi;
    var matches = reURL.exec(style.backgroundImage);
    while (matches !== null) {
        var url = matches && matches[2];
        if (url) {
            urls.push(url);
        }
        matches = reURL.exec(style.backgroundImage);
    }
    if (urls.length > 1) {
        console.log('Too many background images');
    }
    return urls[0];
}

function createIframe(src) {
    let iframe = document.createElement('iframe');
    iframe.style.cssText = 'z-index: 10000000000; width: 100%; height: 100vh; position: fixed; top: 0; left: 0; margin: 0; border: 0; padding: 0; display: none;';
    iframe.id = IFRAME_ID;
    iframe.src = src || IFRAME_SRC;
    console.log(iframe.src);
    return iframe;
}

window.addEventListener('message', function(msg) {
    //let origin = msg.origin || msg.originalEvent.origin;
    if (msg.data === 'show') {
        tg_show();
    } else if (msg.data === 'hide') {
        tg_hide();
    } else if (msg.data.fzz_id){
        console.log('Received fzz_id: ' + msg.data.fzz_id);
    }
}, false);

function tg_show() {
    document.body.style.overflow = 'hidden';
}

function tg_hide() {
    document.getElementById(IFRAME_ID).style.display = 'none';
    document.body.style.overflow = 'visible';
}

function loadStyle() {
    let fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('type', 'text/css');
    fileref.setAttribute('href', CSS_URL);
    document.head.appendChild(fileref);
}
