import {BUTTON_SEEN_CHECK_INTERVAL} from 'constants';
import {isVisible} from 'ext/visibility';
// import {analytics} from 'modules/analytics_wrapper';
import {STACKS} from 'modules/devTools';

let trackedButton = false;

export default function draw (ui, tgImg) {
    if (!tgImg.buttonDiv) {
        ui.overlay(tgImg);
    }
    tgImg.contentBlock.appendChild(tgImg.buttonDiv);
    trackButtonSeen(tgImg.contentBlock);
    dispatchEvent(Object.assign(CustomEvent('button drawn'), {
        info: {
            image: tgImg.url
        }
    }));
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
    let {width, margin, padding, display} = getComputedStyle(element);
    let previousHeight = element.clientHeight;
    let parentHeight = element.parentElement.clientHeight || 'xxx';
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
        display: display !== 'inline' ? display : 'inline-block',
    });
    let currentHeight = element.clientHeight;
    if (currentHeight !== previousHeight && (element.parentElement && previousHeight === parentHeight)) {
        container.style.height = '100%';
    }
    return container;
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
