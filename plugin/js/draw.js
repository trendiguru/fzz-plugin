// import {isVisible} from 'ext/visibility';
// import {analytics} from 'modules/analytics_wrapper';
import * as overlay from './overlay';
import {REQUESTS, STACKS} from 'modules/devTools';
import getUI from './ui';

let ui = getUI({overlay});
// let doTrackVisible = true;
REQUESTS.active = true;

export default function draw (tgImg) {
    let {buttonDiv} = tgImg;
    buttonDiv = buttonDiv || ui.overlay(tgImg);
    wrap (tgImg);
}

// function trackButtonSeen(el, rect){
//     if(isVisible(el, rect)){
//         // Make sure the user sees the button for more than an instant.
//         setTimeout(() => {
//             if(doTrackVisible && isVisible(el, rect)){
//                 doTrackVisible = false;
//                 analytics.track('Button Seen');
//                 REQUESTS.set('Button Seen','property');
//             }
//         }, 1000);
//     }
// }

function wrap ({element, buttonDiv}) {
    let div = document.createElement('div');
    element.parentElement.insertBefore(div, element);
    div.appendChild(element);
    div.appendChild(buttonDiv);
    Object.assign(div.style, {
        width: element.width + 'px',
        height: element.height + 'px',
        position: 'relative',
        isolation: 'isolate',
        display: 'inline-block'
    });
    Object.assign(buttonDiv.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    });
    //STACKS.set('svg', svg);
    STACKS.set('content', buttonDiv);
}
