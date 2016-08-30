import {getDomainName, postMan} from 'modules/utils';

let active = true; //TODO: get 'ective' variable from the current environment variable.
// let OPACITY = '0.01';
export let modules = {};

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
        return STACKS.modify(sName, 12);
    },
    hide (sName) {
        return STACKS.modify(sName, 0);
    },
    modify (sName, borderWidth = 0) {
        if (STACKS.active) {
            for (let [key, stack] of Object.entries(STACKS.storage)) {
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
    ['isNew', 'isLoaded', 'isSuspicious', 'TGImage', 'smartCheckRelevancy', 'process',
     'relevantImg', 'irrelevantImg', 'logIrrelevant', 'smartCheckRelevancy_input',
     'requests', 'observed', 'content','cleanRelevantImgDict_log'].forEach(stack => STACKS.newStack(stack));

    //______ective_functions______//
    modules = {};
    modules.utils = {getDomainName};
}

export function coloredReport () {
    let {sColor, show} = STACKS,
        defaultColor = STACKS.sColor;
    STACKS.sColor = 'yellow';
    show('smartCheckRelevancy_input');
    STACKS.sColor = 'green';
    show('relevantImg');
    STACKS.sColor = 'red';
    show('irrelevantImg');
    STACKS.sColor = defaultColor;
}

export function clrscrn () {
    for (let key in STACKS.storage) {
        STACKS.hide(key);
    }
}

window.devTools = window.devTools || {REQUESTS, STACKS, coloredReport, clrscrn, modules};
postMan('devTools', window.devTools);
