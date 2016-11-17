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

if (!document.elementsFromPoint) {
    document.elementsFromPoint = (x, y) => {
        let parents = [];
        let parent;
        do {
            if (parent !== document.elementFromPoint(x, y)) {
                parent = document.elementFromPoint(x, y);
                parents.push(parent);
                parent.style.pointerEvents = 'none';
            } else {
                parent = false;
            }
        } while (parent);
        for (let parent of parents) {
            parent.style.pointerEvents = 'all';
        }
        return parents;
    };
}

// IE 11 node.remove

 if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
