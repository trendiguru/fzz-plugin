import {BUTTON_SEEN_CHECK_INTERVAL} from 'constants';
import {isVisible} from 'ext/visibility';
// import {analytics} from 'modules/analytics_wrapper';
import {STACKS} from 'modules/devTools';

let trackedButton = false;

export default function draw (ui, tgImg) {
    if (!tgImg.buttonDiv) {
        ui.overlay(tgImg);
    }
    wrap (tgImg);
}

function trackButtonSeen (el) {
    if (!trackedButton){
        let IntervalID = setInterval(() => {
            if (!trackedButton && isVisible(el, el.getBoundingClientRect())) {
                trackedButton = true;
                dispatchEvent(CustomEvent('button seen'));
            }
        }, BUTTON_SEEN_CHECK_INTERVAL);
        addEventListener('button seen', () => clearInterval(IntervalID));
    }
}

function wrap ({element, buttonDiv, url}) {
    let div;
    let {width, margin, padding, display, position} = getComputedStyle(element);
    if (element.tagName === 'IMG') {
        let previousHeight = element.clientHeight;
        let parentHeight = element.parentElement.clientHeight || 'xxx';
        div = document.createElement('div');
        element.parentElement.insertBefore(div, element);
        div.appendChild(element);
        if (!element.originalInlineStyle) {
            element.originalInlineStyle = element.getAttribute('style');
        }
        element.setAttribute('style', element.originalInlineStyle);
        Object.assign(element.style, {
            padding: '0px',
            margin: '0px',
            display: 'block'
        });
        Object.assign(div.style, {
            width,
            margin,
            padding
        });
        let currentHeight = element.clientHeight;
        if (currentHeight!==previousHeight && (element.parentElement && previousHeight===parentHeight)){
            div.style.height = '100%';
        }
    }
    else {
        div = element;
    }
    div.classList.add('fzz_wrap');
    div.appendChild(buttonDiv);
    Object.assign(div.style, {
        position: ['absolute', 'fixed'].includes(position) ? position : 'relative',
        isolation: 'isolate',
        display: display !== 'inline' ? display : 'inline-block',
    });
    Object.assign(buttonDiv.style, {
        position: 'absolute',
        top: 0,
        right: 0
    });
    trackButtonSeen(element);
    dispatchEvent(Object.assign(CustomEvent('button drawn'), {
        info: {
            image: url
        }
    }));
    //STACKS.set('svg', svg);
    STACKS.set('content', buttonDiv);
}
