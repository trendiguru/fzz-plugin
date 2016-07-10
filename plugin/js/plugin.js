/* eslint-disable no-console */

import domready from 'ext/domready';
import {PID, INFO_URL} from 'constants';
import getUI from './ui';
import * as overlay from './overlay';
import Analytics from 'modules/analytics_wrapper';
import draw from './draw';
import {scanForever, observe} from './observe';
import {process} from './process';
import {iframe, style} from './elements';

let refererDomain = window.location.hostname.replace('www.', '');

let ui = getUI({overlay});

let analytics = new Analytics('publisher', {
    refererDomain,
    PID,
    publisherDomain: refererDomain
});

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
    addEventListener('button clicked', ({data, url: imageURL}) => {
        analytics.track('Trendi Button Clicked', {
            imageURL,
            pageUrl: window.location.href
        });
        data.items = data.items.map(item => {
            item.similar_results = item.similar_results.map(result => analytics.appendResultLink(result));
            return item;
        });
        iframe.show();
        iframe.contentWindow.postMessage(Object.assign(data, {imageURL}), '*');
    });
    addEventListener('info button clicked', () => {
        analytics.track('Info Button Clicked');
        window.open(INFO_URL, '_blank');
    });
    addEventListener('button seen', () => analytics.track('Button Seen'));
});

function processElement (el) {
    return process(el, el => {
        el.data.items = el.data.items.map(item => {
            item.similar_results = item.similar_results.map(result => analytics.appendResultLink(result));
            return item;
        });
        draw(ui, el);
    });
}
