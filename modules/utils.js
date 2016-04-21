import constants from 'constants';
import {devTools} from 'modules/devTools';// with its help we can access to functions from brouser and test them on realLife.

const {USER_CONFIG} = constants;

function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

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

let dictMerge = (dict1, dict2)=>{
    let mergedDict = {};
    for (let [key, obj] of entries(dict1)) {
        mergedDict[key] = obj;
    }
    for (let [key, obj] of entries(dict2)) {
        mergedDict[key] = obj;
    }
    return mergedDict
};

devTools.dictMerge = dictMerge;// only for test 
export {entries, values, delay, promiseWithTimeout, getParameterByName, selectorMatches, dictMerge};