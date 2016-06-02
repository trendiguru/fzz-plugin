/* eslint-disable no-console */

import domready from 'ext/domready';
import {PID} from 'constants';
import {analytics} from 'modules/analytics_wrapper';
import draw from './draw';
import {scanForever, observe} from './observe';
import {devTools} from 'modules/devTools';
import {process} from './process';
import {iframe, style} from './elements';

let refererDomain = window.location.hostname.replace('www.', '');

analytics.initializeInPublisher({
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
    scanForever(document.body, el => process(el, draw));
    observe(document.body, el => process(el, draw), {childList: true, subtree: true});
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
});
