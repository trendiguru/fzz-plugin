import constants from 'constants';
const {USER_CONFIG} = constants;

function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

/** Usage:
 * for (let [key, value] of entries(myObj)) {
 *   // do something with key|value
 *}
 **/

function* values(obj) {
    for (let key of Object.keys(obj)) {
        yield obj[key];
    }
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Which ever Promise fulfills first is the result passed to our handler
function promiseWithTimeout(p, ms) {
    return Promise.race([p, delay(ms)]);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function selectorMatches(el, selector) {
    if(!(el instanceof Element)) return ()=> false;
    
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
}

function getElementsToProcess(node) {
    node = node || document;
    
    
    let parentElems = [];
    if(node.querySelectorAll){
        parentElems = node.querySelectorAll(USER_CONFIG.whitelist) || [];
    }
    let allElems = Array.from(parentElems);

    if (selectorMatches(node, USER_CONFIG.whitelist) && node !== document) {
        allElems.push(node);
    }

    if (USER_CONFIG.whitelist !== '*') {
        for (let el of parentElems) {
            if(el.querySelectorAll){
                allElems = allElems.concat(Array.from(el.querySelectorAll('*')));
            }
        }
    }
    return new Set(allElems);

    //    
    //    if(USER_CONFIG.whitelist === '*'){
    //        let children = new Set(Array.from(node.querySelectorAll('*')));
    //        if(node !== document){
    //            children.add(node);
    //        }
    //        return children;
    //    }
    //    else {
    //        let parentElems = document.querySelectorAll(USER_CONFIG.whitelist);
    //        let allElems = new Set(Array.from(parentElems));
    //        for (let i = 0; i < parentElems.length; i++) {
    //            if(parentElems[i].querySelectorAll){
    //                allElems.add(Array.from(parentElems[i].querySelectorAll('*')));
    //            }
    //        }   
    //    }    
}

export {entries, values, delay, promiseWithTimeout, getParameterByName, getElementsToProcess};