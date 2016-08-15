/* global devTools */

import {cssSplit, css2xpath, evaluateElement, validateSelector} from 'modules/utils';

devTools.STACKS.active = true;

const FORBIDDEN_HTML_TAGS = ['TEXT', 'TIME', 'SCRIPT', 'INPUT'];

export default class Observer {
    constructor ({ callback, config = DEFAULT_CONFIG, whitelist = '*', blacklist = '', root = document.body, callbackExisting = false }) {
        let queue = [];
        let observer = new MutationObserver(mutations => {
            this.callback(mutations.filter(this.filter.bind(this)));
        });
        whitelist = cssSplit(whitelist);
        blacklist = cssSplit(blacklist);
        Object.assign(this, {
            callback,
            config,
            whitelist,
            blacklist,
            cssSelectors: {
                whitelist: whitelist.filter(validateSelector),
                blacklist: blacklist.filter(validateSelector)
            },
            root,
            observed: new Map()
        });
        for (let element of evaluateElement(root, DalmatianPath(whitelist, blacklist))) {
            this.observed.set(element, 1);
            if (callbackExisting) {
                queue.push({type: 'init', target: element});
            }
        }
        this.callback(queue); // que might be empty
        observer.observe(root, config);
        devTools.STACKS.newStack('observed');
        devTools.STACKS.observed = this.observed;
    }
    /*
    * This filters mutations: 1. Cheaply get rid of or let through
    * obvious nodes (which match HTML tags or white or black selectors),
    * 2. Check if the node is part of the white tree index (this.observed)
    */
    filter ({target}) {
        if (FORBIDDEN_HTML_TAGS.includes(target.tagName)) {
            return false;
        }
        if (this.cssSelectors.whitelist.length && target.matches(this.cssSelectors.whitelist.join(', '))) {
            return true;
        }
        if (this.cssSelectors.blacklist.length && target.matches(this.cssSelectors.blacklist.join(', '))) {
            return false;
        }
        if (this.observed.has(target)) {
            return true;
        }
        console.log(target);
        return false;
    }

}

const DEFAULT_CONFIG = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
};

function DalmatianPath (whitelist, blacklist) {
    let white = whitelist.length ? `*[${whitelist.map(css2xpath).join(' or ')}]` : '*';
    let black = blacklist.length ? `*[${blacklist.map(css2xpath).join(' or ')}]` : 'text()';
    return `//${white}//*[not(ancestor-or-self::${black})]`;
}

// example: new Observer(console.log.bind(console), DEFAULT_CONFIG, ['body'], [], document);
