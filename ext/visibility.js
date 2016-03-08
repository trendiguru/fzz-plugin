/*
 * Author: Sergey Starodub 
 * Author URI:
 *
 * Description: Checks if a DOM element is truly visible.*/

const VISIBLE_PADDING_TOP = 0.01; // 1% of element's width or/and height may be not visible.
const VISIBLE_PADDING_BOTTOM = 0.7;
const VISIBLE_PADDING_LEFT = 0.7;
const VISIBLE_PADDING_RIGHT = 0.3;
const LEVEL = 2; 

//let tStyles = [['backgroundColor','rgba(0, 0, 0, 0)']];

function isVisible(obj, rect, wndw) {
	wndw = wndw || window;
    rect = rect || obj.getBoundingClientRect();
    let x = rect.left;
    let y = rect.top;
    let w = rect.right - x;
    let h = rect.bottom - y;
    if (onScreen(x, y, w, h, wndw)){
        return checkVisibility(x, y, w, h, LEVEL, obj);
    }
    return false;
}

function onScreen(x, y, w, h, wndw){
    let wHeight = wndw.innerHeight;
    let wWidth = wndw.innerWidth;
    if (y + h * VISIBLE_PADDING_TOP < 0){//"top is out of screen"
        return false;
    }
    if (x + w * VISIBLE_PADDING_LEFT < 0){//"left is out of screen"
        return false;
    }
    if (x + w - w * VISIBLE_PADDING_RIGHT > wWidth){//"right is out of screen"
        return false;
    }
    if (y + h - h * VISIBLE_PADDING_BOTTOM > wHeight){//"bottom is out of screen"
        return false;
    }
    return true;
}

function checkVisibility(x, y, w, h, level, obj){
    if (level === 0) {
        return true;
    }
    if (visibleInPoint(x+w/2, y+h/2, obj)){
        level -=1; 
        return (checkVisibility(x, y, w/2, h/2, level, obj) &&
                checkVisibility(x+w/2, y, w/2, h/2, level, obj) &&
                checkVisibility(x, y+h/2, w/2, h/2, level, obj) &&
                checkVisibility(x+w/2, y+h/2, w/2, h/2, level, obj)
                );
    }
    return false;
}

function getStyle(obj, property) {
    if ( window.getComputedStyle ) {
        return document.defaultView.getComputedStyle(obj,null)[property];
    }
    if ( obj.currentStyle ) {
        return obj.currentStyle[property];
    }
}

function visibleInPoint(x, y, obj, wndw){
    wndw = wndw || window;
 if (obj ===  wndw.document.elementFromPoint(x, y)){
        return true;
    }
    return false;
}

export {isVisible};



// function visibleInPoint(x, y, obj, wndw){
//     wndw = wndw || window;
//     let elmsFromPoint = Array.from(wndw.document.elementsFromPoint(x, y));
//     let i = 0;
//     let elmsLength = elmsFromPoint.length;
//     while (elmsFromPoint[i] !== obj && i<=elmsLength){
//         i++;
//     }
//     if (elmsFromPoint[i] === obj){
//         if (i === 0){
//             return true;
//         }
//         for (let j; j <= i; j++)
//         {
//             if (!transparent(elmsFromPoint[j])){
//                 return false;
//             }
//         }
//         return true;
//     }
//     return false;
// }

// function transparent(obj){
//     for (let stl of tStyles){
//         if (obj.tagNamef != "IMG" && _getStyle(obj, stl[0]) === stl[1]){
//             return true;
//         }
//     }
//     return false;
// }