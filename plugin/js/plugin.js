/* eslint-disable no-console */

import {API, PID, WHITE_LIST, BLACK_LIST, INFO_URL, COOKIE_NAME, TUTORIAL_VERSION} from 'constants';
import Cookies from 'js-cookie';
import getUI from './ui';
import * as overlay from './overlay';
import * as tutorial from './tutorial';
import Analytics from 'modules/analytics_wrapper';
import draw from './draw';
import Observer from './observe';
import {process,cleanRelevantImgDict} from './process';
import {iFrame, Style} from './elements';
import {Version} from 'modules/utils';
import {STACKS} from 'modules/devTools';

let s = STACKS;
let refererDomain = window.location.hostname.replace('www.', '');

window.fzz_run = true;

let ui = getUI({overlay, tutorial});

let initAnaltics = Object.assign(JSON.parse(Cookies.get(COOKIE_NAME)), {
    refererDomain,
    PID,
    publisherDomain: refererDomain,
    API
});

let analytics = new Analytics('publisher', initAnaltics);

let style = new Style ();
let iframe = new iFrame(initAnaltics);

analytics.track('Page Hit');
analytics.listen('scroll');

domready(() => {
    if (isRelevantScript()) {
        console.log('FZZ: domready');
        document.body.appendChild(iframe);
        document.head.appendChild(style);
        new Observer({
            whitelist: WHITE_LIST,
            blacklist: BLACK_LIST,
            callbackExisting: true,
            callback (mutations) {
                for (let mutation of mutations) {
                    if (mutation.type == 'childList') {
                        for (let node of mutation.addedNodes) {
                            processElement(node);
                            if (node.querySelectorAll){
                                for (let el of node.querySelectorAll('*')){
                                    processElement(el);
                                }
                            }
                        }
                    }
                    else {
                        processElement(mutation.target);
                    }
                }
            },
        });
        cleanRelevantImgDict();
        addEventListener('click', e => {
            for (let element of Array.from(document.elementsFromPoint(e.clientX, e.clientY))) {
                if (isTGButton(element)) {
                    element.click();
                    return true;
                }
            }
            return false;
        });
        // MESSAGE
        addEventListener('message', msg => {
            let {data} = msg;
            if (data === 'show') {
                iframe.show();
            }
            if (data === 'hide') {
                iframe.hide();
            }
            if (data.fzz_id){
                console.debug('Received fzz_id: ' + msg.data.fzz_id);
            }
        });
        // BUTTON
        addEventListener('button drawn', ({url: imageURL}) => {
            s.set('requests', 'Trendi Button Drawn');
            analytics.track('Trendi Button Drawn', {
                imageURL,
                pageUrl: window.location.href
            });
        });
        addEventListener('button clicked', ({url: imageURL}) => {
            s.set('requests', 'Trendi Button Clicked');
            analytics.track('Trendi Button Clicked', {
                imageURL,
                pageUrl: window.location.href
            });
            iframe.show();
            iframe.contentWindow.postMessage({imageURL}, '*');
        });
        addEventListener('button seen', () => {
            s.set('requests', 'Button Seen');
            analytics.track('Button Seen');
        });
        // INFO BUTTON
        addEventListener('info button clicked', () => {
            s.set('requests', 'Info Button Clicked');
            analytics.track('Info Button Clicked');
            window.open(INFO_URL, '_blank');
        });
        // TUTORIAL
        let fzz_tutorial_version = Cookies.get('fzz_tutorial_version');
        if (!fzz_tutorial_version || Version.toArray(fzz_tutorial_version)[0] < Version.toArray(TUTORIAL_VERSION)[0]) {
        // if (true) {
            document.body.appendChild(ui.tutorial());
            addEventListener('tutorial closed', ({closed_after}) => {
                analytics.track('Tutorial Closed', {closed_after});
            });
        }
    }
});

function domready (action) {
    if (document.readyState == 'interactive') {
        addEventListener('DOMContentLoaded', action);
    }
    else {
        action();
    }
}

function processElement (el) {
    return process(el, el => draw(ui, el));
}

function isTGButton (el) {
    if (el === undefined || el.classList === undefined) return false;
    if (Array.from(el.classList).includes('fzzButton') && el.tagName === 'BUTTON') {
        return true;
    }
    return false;
}

function isRelevantScript () {
    return window.fzz_run;
}
