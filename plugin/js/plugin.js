/* eslint-disable no-console */

import domready from 'ext/domready';
import {PID} from 'constants';
import {analytics} from 'modules/analytics_wrapper';
import draw from './draw';
import {scanForever, observe} from './observe';
<<<<<<< HEAD
import Controller from './controller';
import {devTools} from 'modules/devTools';
//import {getElementsToProcess} from 'modules/utils';
//import {console} from 'modules/smartConsole';

const {IFRAME_ID, CSS_URL, IFRAME_SRC, PID} = constants;
let s = devTools.STACKS;
console.log(s);

=======
import {process} from './process';
import {iframe, style} from './elements';
//import {getElementsToProcess} from 'modules/utils';
//import {console} from 'modules/smartConsole';

>>>>>>> master
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
