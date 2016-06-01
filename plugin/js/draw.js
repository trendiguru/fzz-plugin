import {isVisible} from 'ext/visibility';
import {analytics} from 'modules/analytics_wrapper';
import * as overlay from './overlay';
import {REQUESTS} from 'modules/devTools';
import getUI from './ui';

let ui = getUI({overlay});

console.log('UI: ');
console.log(ui);

let doTrackVisible = true;

REQUESTS.active = true;

export default function draw (tgImg) {
    _initialDrawButton(tgImg);
    _drawForever(tgImg.element, tgImg.buttonDiv);
}

function _initialDrawButton(tgImg){
    let el = tgImg.element;
    console.log('TGIMG: ');
    console.log(tgImg);
    let buttonDiv = tgImg.buttonDiv;
    buttonDiv = buttonDiv || ui.overlay([document, tgImg]);
    console.log('BUTTONDIV: ');
    console.log(buttonDiv);
    document.body.appendChild(buttonDiv);
    __redraw(el, buttonDiv);
}

function _drawForever(el, buttonDiv){
    __redraw(el, buttonDiv);
    window.requestAnimationFrame(function(){
        _drawForever(el, buttonDiv);
    });
}

/**
 * This updates the button div position to overlay the element.
 * ASSUMES tgImg has an buttonDiv (ui.button has been called)
 * @param {[[Type]]} el        [[Description]]
 * @param {object}   buttonDiv [[Description]]
 */

function __redraw(el, buttonDiv){
    let imgRect = el.getBoundingClientRect();
    if(isVisible(el, imgRect)){
        if(doTrackVisible){
            __trackButtonSeen(el, imgRect);
        }
        buttonDiv.setAttribute(
            'style',
            `width: ${imgRect.width}px;
            height: ${imgRect.height}px;
            top: ${imgRect.top + window.scrollY}px;
            left: ${imgRect.left}px;
            visibility: visible;
            z-index: 10000000000;`
        );
    }
    else{
        buttonDiv.style.visibility = 'hidden';
    }
}

function __trackButtonSeen(el, rect){
    if(isVisible(el, rect)){
        // Make sure the user sees the button for more than an instant.
        window.setTimeout(function(){
            if(doTrackVisible && isVisible(el, rect)){
                doTrackVisible = false;
                analytics.track('Button Seen');
                REQUESTS.set('Button Seen','property');
            }
        }, 1000);
    }
}
