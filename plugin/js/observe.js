/* global devTools */

devTools.STACKS.active = true;

const FORBIDDEN_HTML_TAGS = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];

export default class Observer {
    constructor (callback, config = DEFAULT_CONFIG, whitelist = ['body'], blacklist = [], root = document) {
        Object.assign(this, {callback, config, whitelist, blacklist, root, observed: []});
        let observer = new MutationObserver(() => this.observeBranches(root));
        observer.observe(root, config);
        devTools.STACKS.newStack('observed');
        this.observeBranches(root);

    }
    observeBranches (root) {
        for (let selector of this.whitelist) {
            for (let node of Array.from(root.querySelectorAll(selector))) {
                if (!this.observed.includes(node)) {
                    this.observeBranch(node);
                    this.observed.push(node);
                    devTools.STACKS.set('observed', node);
                }
            }
        }
    }
    observeBranch (branch) {
        this.callback({type: 'init', target: branch});
        let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
                if (FORBIDDEN_HTML_TAGS.includes(mutation.target.tagName)) {
                    return false;
                }
                for (let selector of this.blacklist) {
                    if (mutation.target.matches(selector)) {
                        return false;
                    }
                    else if (mutation.type == 'childList') {
                        for (let child of mutation.childList) {
                            if (child.matches(selector)) {
                                return false;
                            }
                        }
                    }
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
