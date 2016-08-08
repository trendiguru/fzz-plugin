import {isVisible} from 'ext/visibility';
// import {analytics} from 'modules/analytics_wrapper';
import {STACKS} from 'modules/devTools';

const IS_VISIBLE_INTERVAL = 1000;

let doTrackVisible = true;

export default function draw (ui, tgImg) {
    let {buttonDiv} = tgImg;
    buttonDiv = buttonDiv || ui.overlay(tgImg);
    wrap (tgImg);
}

function trackButtonSeen (el) {
    // Make sure the user sees the button for more than an instant.
    let intervalID = setInterval(() => {
        if (doTrackVisible){
            console.log(".");
            let rect = el.getBoundingClientRect();
            if(isVisible(el, rect)){
                console.log("saw!");
                doTrackVisible = false;
                dispatchEvent(new Event('button seen'));
            }
        }
        // }else{
        //     clearInterval(intervalID);
        // }
    }, IS_VISIBLE_INTERVAL);
}

function wrap ({element, buttonDiv, url}) {
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
    trackButtonSeen(element);
    dispatchEvent(Object.assign(new Event('button drawn'), {
        info: {
            image: url
        }
    }));
    //STACKS.set('svg', svg);
    STACKS.set('content', buttonDiv);
}
