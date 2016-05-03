import constants from 'constants';
import {isVisible} from 'ext/visibility';
import scrollMonitor from 'ext/scrollMonitor';
import {analytics} from 'modules/analytics_wrapper';
import buttonConstructor from './button/round';
import {REQUESTS} from 'modules/devTools';

const {INFO_URL, IFRAME_ID} = constants;

let doTrackVisible = true;
let doUpdateScroll = false;
REQUESTS.active = true;

window.setInterval(function(){
    doUpdateScroll = true;
}, 1000);

function draw (tgImg) {
    _initialDrawButton(tgImg);
    _drawForever(tgImg.element, tgImg.buttonDiv, tgImg.scrollWatcher);
}

function _initialDrawButton(tgImg){
    //Find a better place for this
    scrollMonitor.init();

    let el = tgImg.element;
    let buttonDiv = tgImg.buttonDiv || __createButtonDiv(tgImg);
    let scrollWatcher = tgImg.scrollWatcher || scrollMonitor.create(buttonDiv);
    tgImg.scrollWatcher = scrollWatcher;

    __redraw(el, buttonDiv, scrollWatcher);
}

function _drawForever(el, buttonDiv, scrollWatcher){
    __redraw(el, buttonDiv, scrollWatcher);
    window.requestAnimationFrame(function(){
        _drawForever(el, buttonDiv, scrollWatcher);
    });
}


/**
 * This updates the button div position to overlay the element.
 * ASSUMES tgImg has an buttonDiv (__createButtonDiv has been called)
 * @param {[[Type]]} el        [[Description]]
 * @param {object}   buttonDiv [[Description]]
 */
function __redraw(el, buttonDiv, scrollWatcher){
    let imgRect = el.getBoundingClientRect();
    if(isVisible(el, imgRect)){
        if(doTrackVisible){
            __trackButtonSeen(scrollWatcher);
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

function __trackButtonSeen(scrollWatcher){
    if(doUpdateScroll){
        scrollMonitor.update();
        doUpdateScroll = false;
    }
    if(scrollWatcher.isFullyInViewport){
        // Make sure the user sees the button for more than an instant.
        window.setTimeout(function(){
            if(doTrackVisible && scrollWatcher.isFullyInViewport){
                doTrackVisible = false;
                analytics.track('Button Seen');
                REQUESTS.set('Button Seen',"property");
                scrollMonitor.stop();
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

export default draw;