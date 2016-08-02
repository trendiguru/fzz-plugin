/* eslint-disable no-console */

import domready from 'ext/domready';
import {PID, INFO_URL, COOKIE_NAME, TUTORIAL_VERSION} from 'constants';
import Cookies from 'js-cookie';
import getUI from './ui';
import * as overlay from './overlay';
import * as tutorial from './tutorial';
import Analytics from 'modules/analytics_wrapper';
import draw from './draw';
import Observer from './observe';
import {process} from './process';
import {iFrame, Style} from './elements';
import {Version} from 'modules/utils';

let refererDomain = window.location.hostname.replace('www.', '');

let ui = getUI({overlay, tutorial});

let initAnaltics = Object.assign(JSON.parse(Cookies.get(COOKIE_NAME)), {
    refererDomain,
    PID,
    publisherDomain: refererDomain
});

let analytics = new Analytics('publisher', initAnaltics);

let style = new Style ();
let iframe = new iFrame(initAnaltics);

analytics.track('Page Hit');
analytics.listen('scroll');

domready(() => {
    console.log('FZZ: domready');
    document.body.appendChild(iframe);
    document.head.appendChild(style);
    new Observer({
        callback (mutations) {
            for (let mutation of mutations) {
                processElement(mutation.target);
            }
        },
        callbackExisting: true
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
            console.log('Received fzz_id: ' + msg.data.fzz_id);
        }
    });
    // BUTTON
    addEventListener('button clicked', ({url: imageURL}) => {
        analytics.track('Trendi Button Clicked', {
            imageURL,
            pageUrl: window.location.href
        });
        iframe.show();
        iframe.contentWindow.postMessage({imageURL}, '*');
    });
    addEventListener('button seen', () => analytics.track('Button Seen'));
    // INFO BUTTON
    addEventListener('info button clicked', () => {
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
});

function processElement (el) {
    return process(el, el => draw(ui, el));
}
