/*
 * Author: Sergey Starodub
 * Description: Checks if a DOM element is truly visible.
 */

// relates to "is on screen or not" calculation.
const VISIBLE_PADDING_TOP = 0.01; // 1% of element's width or/and height may be not visible.
const VISIBLE_PADDING_BOTTOM = 0.7;
const VISIBLE_PADDING_LEFT = 0.7;
const VISIBLE_PADDING_RIGHT = 0.3;
// relates to "is under to any object on screen, or not" calculation.
const VISIBLE_PADDING = 0.3; // HERE YOU MAY CHANGE THE VISIBILITY AREA!!!
const UNVISIBLE_PADDING = 1 - VISIBLE_PADDING;
const LEVEL = 2;

//let tStyles = [['backgroundColor','rgba(0, 0, 0, 0)']];

function isVisible(obj, rect, wndw) {
    wndw = wndw || window;
    rect = rect || obj.getBoundingClientRect();
    let x = rect.left;
    let y = rect.top;
    let w = rect.right - x;
    let h = rect.bottom - y;
    if (onScreen(x, y, w, h, wndw)) {
        return checkVisibility(x + w * UNVISIBLE_PADDING, y, w * VISIBLE_PADDING, h * VISIBLE_PADDING, LEVEL, obj);
    }
    return false;
}

function onScreen(x, y, w, h, wndw) {
    let wHeight = wndw.innerHeight;
    let wWidth = wndw.innerWidth;
    if (y + h * VISIBLE_PADDING_TOP < 0) { //"top is out of screen"
        return false;
    }
    if (x + w * VISIBLE_PADDING_LEFT < 0) { //"left is out of screen"
        return false;
    }
    if (x + w - w * VISIBLE_PADDING_RIGHT > wWidth) { //"right is out of screen"
        return false;
    }
    if (y + h - h * VISIBLE_PADDING_BOTTOM > wHeight) { //"bottom is out of screen"
        return false;
    }
    return true;
}

function checkVisibility(x, y, w, h, level, obj) {
    if (level === 0) {
        return true;
    }
    if (visibleInPoint(x + w / 2, y + h / 2, obj)) {
        level -= 1;
        return (checkVisibility(x, y, w / 2, h / 2, level, obj) &&
            checkVisibility(x + w / 2, y, w / 2, h / 2, level, obj) &&
            checkVisibility(x, y + h / 2, w / 2, h / 2, level, obj) &&
            checkVisibility(x + w / 2, y + h / 2, w / 2, h / 2, level, obj)
        );
    }
    return false;
}

function getStyle(obj, property) {
    if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(obj, null)[property];
    }
    if (obj.currentStyle) {
        return obj.currentStyle[property];
    }
    return null;
}

function isFazzDescendant(elem) {
    return (elem && elem.parentElement) ? elem.parentElement.classList.contains("fazz" || "fzz-wrap") : false;
}

// function visibleInPoint(x, y, obj, wndw){
//     wndw = wndw || window;
//     let upperObj = wndw.document.elementFromPoint(x, y);
//     //Serey: if upper obj is the image itself or one of fuzz objects => the image is visible!!!
//     if (obj === upperObj || isFazzDescendant(upperObj)){
//         return true;
//     }
//     return false;
// }

function visibleInPoint(x, y, obj, wndw) {
    wndw = wndw || window;
    let elems = wndw.document.elementsFromPoint(x, y);
    let len = elems.length;
    for (let i = 0; i < len; i++) {
        if (obj === elems[i]) {
            let elemIsNotCovered = true;
            for (let j = 0; j < i; j++) {
            elemIsNotCovered = (isTransparent(elems[j]) ||  isFazzDescendant(elems[j])) && elemIsNotCovered;
            }
            return elemIsNotCovered;
        }
    }
    return false;
}

//TODO: improve the isTransparent function
function isTransparent(el){
    return true;
}

export {
    isVisible
};
