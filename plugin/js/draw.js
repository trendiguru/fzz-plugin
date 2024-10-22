import {BUTTON_SEEN_CHECK_INTERVAL} from 'constants';
import {isVisible} from 'ext/visibility';
// import {analytics} from 'modules/analytics_wrapper';
import {STACKS} from 'modules/devTools';

let SEEN_IMGS = {};

export default function draw (ui, tgImg) {
    if (!tgImg.buttonDiv) {
        ui.overlay(tgImg);
    }
    tgImg.contentBlock.appendChild(tgImg.buttonDiv);
    trackButtonSeen(tgImg);
    dispatchEvent(Object.assign(CustomEvent('button drawn'),tgImg));
    STACKS.set('content', tgImg.buttonDiv);
}

/**
 * @param {Element} element - element to make content block out of it.
 * @returns {Element} contentBlock - an element that can conatain foreign content elements.
 */
export function makeContentBlock (element) {
    let containable = makeContainable(element);
    let {position} = getComputedStyle(element);
    containable.classList.add('fzz-wrap');
    Object.assign(containable.style, {
        position: ['absolute', 'fixed'].includes(position) ? position : 'relative',
    });
    return containable;
}

/**
 * TODO: general purpose DOM containable check
 * @param {Element} element - element that should be containable.
 * @return {Element} containable - element that is containable, has all the characteristics of the element and element is within it (or itself the element).
 */
export function makeContainable (element) {
    if (element.tagName !== 'IMG') {
        return element;
    }
    let {width, margin, padding, display, height, zIndex} = getComputedStyle(element);
    let container = document.createElement('div');
    element.parentElement.insertBefore(container, element);
    container.appendChild(element);
    if (!element.originalInlineStyle) {
        element.originalInlineStyle = element.getAttribute('style');
    }
    element.setAttribute('style', element.originalInlineStyle);
    Object.assign(container.style, {
        width,
        margin,
        padding,
        zIndex,
        display: display !== 'inline' ? display : 'inline-block',
    });
    if (container.clientHeight === 0){
        container.style.height = height;
    }
    return container;
}

function trackButtonSeen (tgImg) {
    let el = tgImg.contentBlock;
    let imgUrl = tgImg.url;
    if (!SEEN_IMGS[imgUrl]){
        let IntervalID = setInterval(() => {
            if (!SEEN_IMGS[imgUrl] && isVisible(el)) {
                SEEN_IMGS[imgUrl] = IntervalID;
                dispatchEvent(Object.assign(CustomEvent('button seen'),tgImg));
            }
        }, BUTTON_SEEN_CHECK_INTERVAL);
        addEventListener('button seen', ({url: imageURL}) => {
            let IntervalID = SEEN_IMGS[imageURL];
            clearInterval(IntervalID);
        });
    }
}
