// ECMAScript

if (!Object.entries) {
    Object.entries = function* (obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    };
}

if (!Object.values) {
    Object.values = function* (obj) {
        for (let key of Object.keys(obj)) {
            yield obj[key];
        }
    };
}

// DOM API

if (!Element.prototype.matches) {
    let {webkitMatchesSelector, mozMatchesSelector, msMatchesSelector} = Element.prototype;
    Element.prototype.matches = webkitMatchesSelector || mozMatchesSelector || msMatchesSelector || function (selector) {
        return Array.from(document.querySelectorAll(selector)).indexOf(this) !== -1;
    };
}

if (!window.getComputedStyle) {
    window.getComputedStyle = (elem) => elem.currentStyle;
}
