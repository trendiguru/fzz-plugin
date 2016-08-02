/* global devTools */

devTools.STACKS.active = true;

const FORBIDDEN_HTML_TAGS = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];

export default class Observer {
    constructor ({callback, config = DEFAULT_CONFIG, whitelist = ['*'], blacklist = ['.fzz_black'], root = document, callbackExisting = false}) {
        Object.assign(this, {
            callback,
            config,
            whitelist,
            blacklist,
            root,
            observed: new Map()
        });
        let que = [];
        for (let element of evaluateElement(root, DalmatianPath(this.whitelist, this.blacklist))) {
            this.observed.set(element, 1);
            if (callbackExisting) {
                que.push({type: 'init', target: element});
            }
            devTools.STACKS.set('observed', element);
        }
        this.callback(que); // que might be empty
        let observer = new MutationObserver(mutations => this.callback(mutations.filter(this.filter.bind(this))));
        observer.observe(root, config);
        devTools.STACKS.newStack('observed');
    }
    filter (mutation) {
        let {target, type} = mutation;
        if (FORBIDDEN_HTML_TAGS.includes(target.tagName)) {
            return false;
        }
        for (let selector of this.whitelist) {
            if (target.matches(selector)) {
                return true;
            }
        }
        for (let selector of this.blacklist) {
            if (target.matches(selector)) {
                return false;
            }
        }
        if (type == 'nodeList' && this.observed.has(target)) {
            return false;
        }
    }

}

const DEFAULT_CONFIG = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
};

function* evaluateElement (el, xpath) {
    let evaluation = document.evaluate(xpath, el);
    let iterated;
    while (iterated = evaluation.iterateNext()) {
        yield iterated;
    }
}

function css2xpath (css) {
    return css.replace(/\.(.+)/, '@class="$1"').replace(/\#(.+)/, '@id="$1"');
}

function DalmatianPath (whitelist, blacklist) {
    let white = `*[${whitelist.map(css2xpath).join(' or ')}]`;
    let black = `*[${blacklist.map(css2xpath).join(' or ')}]`;
    return `//${white}//*[not(ancestor-or-self::${black})]`;
}

// example: new Observer(console.log.bind(console), DEFAULT_CONFIG, ['body'], [], document);
