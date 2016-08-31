/* eslint-disable no-console */

import Cookies from 'js-cookie';
import {API, PID, WHITE_LIST, BLACK_LIST, INFO_URL, COOKIE_NAME, TUTORIAL_VERSION} from 'constants';
import Analytics from 'modules/analytics_wrapper';
import {STACKS} from 'modules/devTools';
import {Version, domready} from 'modules/utils';
import UI from 'modules/ui';
import draw from './draw';
import {iFrame, Style} from './elements';
import Observer from './observe';
import {process,cleanRelevantImgDict} from './process';
import TGImage from './tgimage';

import * as overlay from './overlay';
import * as tutorial from './tutorial';

let s = STACKS;
let refererDomain = window.location.hostname.replace('www.', '');

let ui = new UI({overlay, tutorial});

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
    //-------------------------------
//     chrome.storage.local.get('value',(el)=>{console.log("here is our backgroundScript value");console.log(el);});
//     chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
//     // var code = 'window.location.reload();';
//     // chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
// });
// console.log(chrome.tabs);
// getAnswer("reload").then(()=>{
//     console.log("reloaded");})
// function mySUBookmarkLink(info, tab) {
//   chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
//     if (msg.action == 'bookmarkLink') {
//       var receivedValue = msg.title; //pull it out first, for better overview
//       chrome.storage.sync.set({'title': msg.title, 'url': msg.url}, function(msg) {
//         alert('Saved '+receivedValue+' to bookmarks');
//       });
//     }
//   });
// };
// addEventListener("reload",(e)=>{console.log("reloaded!");});
// chrome.extension.onRequest.addListener((e)=>{console.log("reloaded!");});
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.action == 'open_dialog_box') {
    alert("Message recieved!");
  }
});
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");

  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer == "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});
    //-------------------------------
    if (isRelevantScript()) {
        console.log('FZZ: domready');
        document.body.appendChild(iframe);
        document.head.appendChild(style);
        new Observer({
            whitelist: WHITE_LIST,
            blacklist: BLACK_LIST,
            callbackExisting: true,
            callback: onMutation(el => process(el, el => draw(ui, el))),
        });
        cleanRelevantImgDict();
        addEventListener('click', e => {
            for (let element of Array.from(document.elementsFromPoint(e.clientX, e.clientY))) {
                if (TGImage.isTGButton(element)) {
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
            // document.body.appendChild(ui.tutorial());
            // addEventListener('tutorial closed', ({closed_after}) => {
            //     analytics.track('Tutorial Closed', {closed_after});
            // });
        }
    }
});

function onMutation (action) {
    return (mutations) => {
        for (let mutation of mutations) {
            if (mutation.type == 'childList') {
                for (let node of mutation.addedNodes) {
                    action(node);
                    if (node.querySelectorAll){
                        for (let el of node.querySelectorAll('*')){
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
