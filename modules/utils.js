//import constants from 'constants';
//const {USER_CONFIG} = constants;

const URL_REGEXP = /url\([''""]?([^'")]*)[''""]?\)/g;

export function getBackgroundImage (element) {
    let urls = [];
    let style = window.getComputedStyle(element); // get url inside url('...')
    style.backgroundImage.replace(URL_REGEXP, function () {
        urls = Array.from(arguments).slice(1, -2);
    });
    if (urls.length > 1) {
        console.error('Too many background images');
    }
    return urls[0];
}

export function wait (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Which ever Promise fulfills first is the result passed to our handler
export function promiseWithTimeout(p, ms) {
    return Promise.race([p, wait(ms)]);
}

/* Usage:
var l = getLocation("http://example.com/path");
console.debug(l.hostname)
>> "example.com"
console.debug(l.pathname)
>> "/path"
*/
export function getLocation(href) {
    return Object.assign(document.createElement('a'), {href});
}

export function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export function dictMerge(dict1, dict2){
    let mergedDict = {};
    if (dict1){
        for (let [key, obj] of Object.entries(dict1)) {
            mergedDict[key] = obj;
        }
    }
    if (dict2){
        for (let [key, obj] of Object.entries(dict2)) {
            mergedDict[key] = obj;
        }
    }
    return mergedDict;
}

export function getDomainName(urlStr){
    return urlStr.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);//es6
}

export function setAttributes (element, attributes) {
    for (let attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }
    return element;
}

export class Query {
    static stringify (query) {
        let result = '';
        for (let [name, value] of Object.entries(query)) {
            result += `${name}=${encodeURIComponent(value)}&`;
        }
        return result.substr(0, result.length - 1);
    }
    static parse (result) {
        let query = {};
        result.substr(1).split('&').forEach(entry => {
            let [name, value] = entry.split('=');
            query[name] = decodeURIComponent(value);
        });
        return query;
    }
}

export class Version {
    static toArray (string) {
        return string.split('.').map(i => parseInt(i));
    }
}

export function cssSplit (cssSelector) {
    let array = cssSelector.split(', ');
    if (array.length == 1 && array[0] == '') {
        array = [];
    }
    return array;
}

export function css2xpath (cssSelector) {
    return cssSelector.replace(/\.(.+)/, 'contains(@class, "$1")').replace(/\#(.+)/, '@id="$1"');
}

export function* evaluateElement (el, xpath) {
    let evaluation = document.evaluate(xpath, el);
    let iterated;
    while (iterated = evaluation.iterateNext()) {
        yield iterated;
    }
}

export function validateSelector (selector) {
    try {
        document.body.matches(selector);
        return true;
    }
    catch (e) {
        return false;
    }
}
