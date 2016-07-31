/* global devTools */

import Selector from 'modules/selector';

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
            observed: [],
            selector: Selector(whitelist, blacklist)
        });
        console.log(this.selector);
        let observer = new MutationObserver(() => this.observeBranches(root));
        observer.observe(root, config);
        devTools.STACKS.newStack('observed');
        this.observeBranches(root);
    }
    observeBranches (root) {
        for (let node of Array.from(root.querySelectorAll(this.selector))) {
            if (!this.observed.includes(node)) {
                if (!this.observed.includes(node.parentElement)) {
                    this.observeBranch(node);
                }
                this.observed.push(node);
                devTools.STACKS.set('observed', node);
                this.callback({type: 'init', target: node});
            }
        }
    }
    observeBranch (branch) {
        let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
                if (FORBIDDEN_HTML_TAGS.includes(mutation.target.tagName)) {
                    return false;
                }
                this.callback(mutation);
            }
        });
        return observer.observe(branch, this.config);
    }
}

const DEFAULT_CONFIG = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
};

// example: new Observer(console.log.bind(console), DEFAULT_CONFIG, ['body'], [], document);
