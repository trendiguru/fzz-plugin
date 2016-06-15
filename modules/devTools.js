import {getDomainName} from 'modules/utils';

let active = true; //TODO: get 'ective' variable from the current environment variable.
// let OPACITY = '0.01';
export let modules = {};
export let MUT = {
    active,
    srcMut: [],
    nodeMut: [],
    attrMut: [],
    mainObserver: [],
    observers: [],
    _node (obj) {this.nodeMut.push(obj);},
    _attribute (obj) {this.attrMut.push(obj);},
    _src (obj) {this.srcMut.push(obj);},
    _mainObserver (obj) {this.mainObserver.push(obj);},
    _observer (obj) {this.observers.push(obj);},
    set (obj, mType) {
        mType = `_${mType}`;
        if (this.active === true && this[mType]) {
            this[mType](obj);
        }
    }
};

export let REQUESTS = {
    active,
    queue: [],
    set (reuestProperties, mType) {
        if (REQUESTS.active && mType === 'property') {
            REQUESTS.queue.push(reuestProperties);
        }
    }
};

export let STACKS = {
    active: active,
    storage: {},
    sColor: 'RED',
    newStack (name) {
        if (STACKS.active) {
            STACKS.storage[name] = [];
        }
    },
    set (sName, elem) {
        if (STACKS.active) {
            STACKS.storage[sName].push(elem);
        }
    },
    show (sName) { // +col
        return this.modify(sName, 12);
    },
    hide (sName) {
        return this.modify(sName, 0);
    },
    modify (sName, borderWidth = 0) {
        if (STACKS.active) {
            for (let key in STACKS.storage) {
                let stack = STACKS.storage[key];
                if (sName === key) {
                    for (let elem of stack) {
                        if (elem !== undefined && elem.style !== undefined) {
                            elem.style.border = `${borderWidth}px solid ${STACKS.sColor}`;
                        }
                    }
                }
            }
        }
    }
};

if (active) {
    //______STACKS_definition_____//
    ['isNew', 'isLoaded', 'isSuspicious', 'TGImage', 'smartCheckRelevancy', 'process', 'relevantImg', 'irrelevantImg', 'logIrrelevant', 'smartCheckRelevancy_input', 'svg', 'content'].forEach(stack => STACKS.newStack(stack));

    //______ective_functions______//
    modules = {};
    modules.utils = {getDomainName};
}

export function coloredReport () {
    let {sColor, show} = STACKS,
        defaultColor = sColor;
    sColor = 'yellow';
    show('smartCheckRelevancy_input');
    sColor = 'green';
    show('relevantImg');
    sColor = 'red';
    show('irrelevantImg');
    STACKS.sColor = defaultColor;
}

export function clrscrn () {
    for (let key in STACKS.storage) {
        STACKS.hide(key);
    }
}

window.devTools = window.devTools || {MUT, REQUESTS, STACKS, coloredReport, clrscrn, modules};
