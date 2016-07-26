export default class Observer {
    constructor (callback, config = DEFAULT_CONFIG, whitelist = ['*'], blacklist = [], root = document.body) {
        Object.assign(this, {callback, config, whitelist, blacklist, root, observed: []});
        let observer = new MutationObserver(() => this.observeBranches(root));
        observer.observe(root, config);
        this.observeBranches(root);
    }
    observeBranches (root) {
        console.log('observing branches');
        for (let selector of this.whitelist) {
            for (let node of Array.from(root.querySelectorAll(selector))) {
                if (!this.observed.includes(node)) {
                    this.observeBranch(node);
                    this.observed.push(node);
                }
            }
        }
    }
    observeBranch (branch) {
        console.log('observing branch');
        this.observed.push(branch);
        let observer = new MutationObserver(mutation => {
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

// example: new Observer(console.log.bind(console), DEFAULT_CONFIG, ['*'], [], document.body);
