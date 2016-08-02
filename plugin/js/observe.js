/* global devTools */

devTools.STACKS.active = true;

const FORBIDDEN_HTML_TAGS = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];

export default class Observer {
    constructor (callback, config = DEFAULT_CONFIG, whitelist = ['body'], blacklist = [], root = document) {
        Object.assign(this, {
            callback,
            config,
            whitelist,
            blacklist,
            root,
            observed: new Map(),
            not_selector: blacklist.map(black => `${black} *`).join(', ')
        });
        for (let element of evaluateElement(root, DalmatianPath(this.whitelist, this.blacklist))) {
            this.observed.set(element, 1);
            this.callback({type: 'init', target: element});
            devTools.STACKS.set('observed', element);
        }
        let observer = new MutationObserver(mutations => {
            for (let {target, type} of mutations) {
                if (FORBIDDEN_HTML_TAGS.includes(target.tagName)) {
                    return 0;
                }
                for (let selector of whitelist) {
                    if (target.matches(selector)) {
                        // kkk
                        return 0;
                    }
                }
                for (let selector of blacklist) {
                    if (target.matches(selector)) {
                        // harlem
                        return 0;
                    }
                }
                if (type == 'nodeList' && this.observerd.get(target)) {
                    // kkk
                    return 0;
                }
            }
        });
        observer.observe(root, config);
        devTools.STACKS.newStack('observed');
        this.observeBranches(root);
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
