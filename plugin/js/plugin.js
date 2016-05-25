/* eslint-disable no-console */

import domready from 'ext/domready';
import * as constants from 'constants';
import {analytics} from 'modules/analytics_wrapper';
import draw from './draw';
import {scanForever, observe} from './observe';
import Controller from './controller';
//import {getElementsToProcess} from 'modules/utils';
//import {console} from 'modules/smartConsole';

const {IFRAME_ID, CSS_URL, IFRAME_SRC, PID} = constants;

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

let controller = window.controller = new Controller (draw);

domready(function () {
    loadStyle();
    console.log('FZZ: domready');
    document.body.appendChild(createIframe());
    scanForever(document.body, controller.process.bind(controller));
    observe(document.body, controller.process.bind(controller), {childList: true,subtree: true});
});

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
