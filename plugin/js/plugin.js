/* eslint-disable no-console */

import domready from 'ext/domready';
import {PID, INFO_URL, COOKIE_NAME} from 'constants';
import Cookies from 'js-cookie';
import getUI from './ui';
import * as overlay from './overlay';
import Analytics from 'modules/analytics_wrapper';
import draw from './draw';
import {scanForever, observe} from './observe';
import {process} from './process';
import {iFrame, Style} from './elements';

let refererDomain = window.location.hostname.replace('www.', '');

let ui = getUI({overlay});

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
    scanForever(document.body, processElement);
    observe(document.body, processElement, {childList: true, subtree: true});
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
    addEventListener('button clicked', ({url: imageURL}) => {
        analytics.track('Trendi Button Clicked', {
            imageURL,
            pageUrl: window.location.href
        });
        iframe.show();
        iframe.contentWindow.postMessage({imageURL}, '*');
    });
    addEventListener('info button clicked', () => {
        analytics.track('Info Button Clicked');
        window.open(INFO_URL, '_blank');
    });
    addEventListener('button seen', () => analytics.track('Button Seen'));
});

function processElement (el) {
    return process(el, el => draw(ui, el));
}
