/* globals wgxpath */
import Cookies from 'js-cookie';
import {WHITE_LIST, BLACK_LIST, INFO_URL, COOKIE_NAME, TUTORIAL_VERSION, ENV, PID, API, AMPLITUDE_KEY} from 'constants';
import Analytics from 'modules/analytics/analytics_wrapper';
import {STACKS, devReport} from 'modules/devTools';
import {Version, domready} from 'modules/utils';
import UI from 'modules/ui';
import {listenToExtension} from 'modules/chrome-manipulation';
import draw from './draw';
import {iFrame, Style} from './elements';
import Observer from './observe';
import {urlStore} from 'modules/server';
import {process, cleanRelevantImgDict} from './process';
import TGImage from './tgimage';
import * as overlay from './overlay';
import {getImageData} from 'modules/server';
import addAd from './video';
// import * as tutorial from './tutorial';
import browserSupport from 'modules/browser-support';

wgxpath.install();

let s = STACKS;
let ui = new UI({overlay});
let refererDomain = window.location.hostname.replace('www.', '');
let pageUrl = window.location.href;
let initAnaltics = Object.assign(JSON.parse(Cookies.get(COOKIE_NAME)), {
    pageUrl,
    refererDomain,
    PID,
    publisherDomain: refererDomain,
    API,
    amplitude_key: AMPLITUDE_KEY
});
let analytics = new Analytics('publisher', initAnaltics);
let style = new Style ();
let iframe = new iFrame(Object.assign({fzz_id: analytics.fzz_id}, initAnaltics));
analytics.track('Page Hit');
analytics.listen('scroll');
let processCallBack = (el)=>{
    try{
        attachResults(el, analytics);
    }
    catch(e){
        console.log(e);
    }
    draw(ui, el);
}

if (ENV === 'DEV'){
    listenToExtension();
}

domready(() => {
    if (isRelevantScript() && browserSupport()) {
        console.log('FZZ: domready');
        devReport('FZZ: domready', 'when plugin starts');
        document.body.appendChild(iframe);
        document.head.appendChild(style);
        void new Observer({
            whitelist: WHITE_LIST,
            blacklist: BLACK_LIST,
            callbackExisting: true,
            callback: onMutation(el => process(el, processCallBack)),
        });
        cleanRelevantImgDict();
        addEventListener('click', e => {
            for (let element of Array.from(document.elementsFromPoint(e.clientX, e.clientY))) {
                if (TGImage.isTGButton(element)) {
                    element.click();
                    return;
                }
            }
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
            });
        });
        addEventListener('button clicked', ({url: imageURL}) => {
            s.set('requests', 'Trendi Button Clicked');
            analytics.track('Trendi Button Clicked', {
                imageURL,
            });
            iframe.show();
            devReport(imageURL, 'imageUrl from plugin');
            devReport(urlStore.state[imageURL], 'data from plugin');
            iframe.contentWindow.postMessage({imageURL, data: urlStore.state[imageURL]}, '*');
        });
        addEventListener('recieved results', (receivingTime) => {
            analytics.track('Recieved Results', receivingTime);
        });
        addEventListener('button seen', ({url: imageURL}) => {
            s.set('requests', 'Button Seen: '+imageURL);
            analytics.track('Button Seen', {
                imageURL,
            });
            s.set('requests', 'Button Seen Multiple: '+imageURL);
            analytics.track('Button Seen Multiple', {
                imageURL,
            });
        });
        // INFO BUTTON
        addEventListener('info button clicked', ({url: imageURL}) => {
            s.set('requests', 'Info Button Clicked');
            analytics.track('Info Button Clicked', {
                imageURL,
            });
            window.open(INFO_URL, '_blank');
        });
        // TUTORIAL
        let fzz_tutorial_version = Cookies.get('fzz_tutorial_version');
        if (!fzz_tutorial_version || Version.toArray(fzz_tutorial_version)[0] < Version.toArray(TUTORIAL_VERSION)[0]) {
        // if (true) {
            // document.body.appendChild(ui.tutorial());
            // addEventListener('tutorial closed', ({closed_after}) => {
            //     analytics.track('Tutorial Closed', {closed_after});
            // });
        //}

        }
    }
});

function onMutation (action) {
    return (mutations) => {
        let mutationsList = Object.values(mutations);
        for (let mutation of mutationsList) {
            if (mutation.type == 'childList') {
                let nodesList = Object.values(mutation.addedNodes);
                for (let node of nodesList) {
                    action(node);
                    if (node.querySelectorAll){
                        // let elemsList = Object.values(node.querySelectorAll('*'));
                        let elemsList = Array.from(node.querySelectorAll('*'));
                        for (let el of elemsList){
                            action(el);
                        }
                    }
                }
            }
            else {
                action(mutation.target);
            }
        }
    };
}

function isRelevantScript () {
    let body = document.body;
    if (body.getAttribute('data-fzz-run')) {
        return false;
    }
    body.setAttribute('data-fzz-run', true);
    return true;
}

function attachResults(tgImg, analytics){
    return new Promise((resolve, reject)=>{
        getImageData(tgImg.url)
        .then(data => {
            if (data && data.items) {
                tgImg.firstResult  = analytics.appendResultLink(data.items[0].similar_results[0]).link;
            }
            resolve(data);
        });
    });
}
