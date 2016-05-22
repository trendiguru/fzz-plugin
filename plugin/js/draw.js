import constants from 'constants';
import {isVisible} from 'ext/visibility';
import {analytics} from 'modules/analytics_wrapper';
import buttonConstructor from './button/round';
import {REQUESTS} from 'modules/devTools';

const {INFO_URL, IFRAME_ID} = constants;

let doTrackVisible = true;

REQUESTS.active = true;


// function draw (tgImg) {
//     _initialDrawButton(tgImg);
//     _drawForever(tgImg, tgImg.buttonDiv);
// }

function initialDrawButton(tgImg){
    let buttonDiv = tgImg.buttonDiv || __createButtonDiv(tgImg);
    redraw(tgImg, buttonDiv);
}

// function _drawForever(tgImg, buttonDiv){
//     __redraw(tgImg, buttonDiv);
//     window.requestAnimationFrame(function(){
//         _drawForever(tgImg, buttonDiv);
//     });
// }


/**
 * This updates the button div position to overlay the element.
 * ASSUMES tgImg has an buttonDiv (__createButtonDiv has been called)
 * @param {[[Type]]} el        [[Description]]
 * @param {object}   buttonDiv [[Description]]
 */
function redraw(tgImg, buttonDiv){
    //draw only the first time or after a "suitable" mutation.
    // if (tgImg.mutFlag){
    //     tgImg.mutFlag = false;

    let el = tgImg.element;
    let imgRect = el.getBoundingClientRect();
    window.requestAnimationFrame(function(){
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
    });
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

/**
 * Create the overlay div and the buttons within
 * @param   {object} tgImg TGImage object for which to draw, attach as its buttonDiv.
 * @returns {object} buttonDiv that was created and attached.
 */

function __createButtonDiv (tgImg) {
    tgImg.buttonDiv           = document.createElement('div');
    tgImg.buttonDiv.button    = document.createElement('button');
    tgImg.buttonDiv.info      = document.createElement('button');
    tgImg.buttonDiv.appendChild(tgImg.buttonDiv.button);
    tgImg.buttonDiv.appendChild(tgImg.buttonDiv.info);
    document.body.appendChild(tgImg.buttonDiv);
    tgImg.buttonDiv.classList.add('fazz', 'fzz_overlay');
    tgImg.buttonDiv.button.addEventListener('click', __buttonCallback.bind(tgImg));
    tgImg.buttonDiv.info.addEventListener('click', __infoCallback);
    buttonConstructor(tgImg);
    return tgImg.buttonDiv;
}

function __buttonCallback (e) {
    let iframe = document.getElementById(IFRAME_ID),
        imageURL = this.url;
    analytics.track('Trendi Button Clicked', {
        'imageURL': imageURL,
        'pageUrl': window.location.href
    });
    var msg_data = {};
    msg_data.imageURL = imageURL;       
    iframe.contentWindow.postMessage(msg_data, '*');
    iframe.style.display = 'block';
    document.body.style.overflow = 'hidden';
    e.preventDefault();
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

function __infoCallback(e){
    analytics.track('Info Button Clicked');

    window.open(INFO_URL, '_blank');

    e.preventDefault();
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//export default draw;
export {initialDrawButton, redraw};