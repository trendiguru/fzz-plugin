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
    if (!element.originalInlineStyle) {
        element.originalInlineStyle = element.getAttribute('style');
    }
    element.setAttribute('style', element.originalInlineStyle);
    let {width, margin, padding, display} = getComputedStyle(element);
    Object.assign(div.style, {
        position: 'relative',
        isolation: 'isolate',
        display: display !== 'inline' ? display : 'inline-block',
        width,
        margin,
        padding
    });
    Object.assign(buttonDiv.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    });
    Object.assign(element.style, {
        padding: '0px',
        margin: '0px',
        display: 'block'
    });
    //STACKS.set('svg', svg);
    STACKS.set('content', buttonDiv);
}
