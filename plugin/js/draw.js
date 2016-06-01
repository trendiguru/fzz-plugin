/* eslint-disable no-console */

import {isVisible} from 'ext/visibility';
import {analytics} from 'modules/analytics_wrapper';
import * as overlay from './overlay';
import {REQUESTS} from 'modules/devTools';
import getUI from './ui';

let ui = getUI({overlay});

let doTrackVisible = true;

REQUESTS.active = true;

export default function draw (tgImg) {
    initialDrawButton(tgImg);
    drawForever(tgImg.element, tgImg.buttonDiv);
}

function initialDrawButton(tgImg){
    console.log(ui.overlay(tgImg));
    let {element, buttonDiv} = tgImg;
    buttonDiv = buttonDiv || ui.overlay(tgImg);
    console.log(buttonDiv);
    document.body.appendChild(buttonDiv);
    redraw(element, buttonDiv);
}

function drawForever(el, buttonDiv){
    redraw(el, buttonDiv);
    window.requestAnimationFrame(() => drawForever(el, buttonDiv));
}

/**
 * This updates the button div position to overlay the element.
 * ASSUMES tgImg has an buttonDiv (ui.button has been called)
 * @param {[[Type]]} el        [[Description]]
 * @param {object}   buttonDiv [[Description]]
 */

function redraw (el, buttonDiv) {
    let imgRect = el.getBoundingClientRect();
    if (isVisible(el, imgRect)) {
        if(doTrackVisible){
            trackButtonSeen(el, imgRect);
        }
        buttonDiv.setAttribute(
            'style',
            `width: ${imgRect.width}px;
            height: ${imgRect.height}px;
            top: ${imgRect.top + window.scrollY}px;
            left: ${imgRect.left}px;
            display: 'block';
            z-index: 10000000000;`
        );
    }
    else {
        buttonDiv.style.display = 'none';
    }
}

function trackButtonSeen(el, rect){
    if(isVisible(el, rect)){
        // Make sure the user sees the button for more than an instant.
        setTimeout(() => {
            if(doTrackVisible && isVisible(el, rect)){
                doTrackVisible = false;
                analytics.track('Button Seen');
                REQUESTS.set('Button Seen','property');
            }
        }, 1000);
    }
}
