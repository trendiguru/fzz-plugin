//import constants from 'constants';
//const {USER_CONFIG} = constants;

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

/* Usage:
var l = getLocation("http://example.com/path");
console.debug(l.hostname)
>> "example.com"
console.debug(l.pathname)
>> "/path"
*/
function getLocation(href) {
    let l = document.createElement('a');
    l.href = href;
    return l;
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

function dictMerge(dict1, dict2){
    let mergedDict = {};
    if (dict1){
        for (let [key, obj] of entries(dict1)) {
            mergedDict[key] = obj;
        }
    }
    if (dict2){
        for (let [key, obj] of entries(dict2)) {
            mergedDict[key] = obj;
        }
    }
    return mergedDict;
}

function getDomainName(urlStr){
    return urlStr.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);//es6
}

export {entries,
        values,
        delay,
        promiseWithTimeout,
        getLocation,
        getParameterByName,
        selectorMatches,
        dictMerge,
        getDomainName};
