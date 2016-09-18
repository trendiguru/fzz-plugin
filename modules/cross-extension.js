/* globals extension storage runtime tabs chrome */

let crossExtension = null;

try {
    crossExtension = extension;
}
catch (e) {
    try {
        crossExtension = chrome.extension;
    }
    catch (e) {
        () => e;
    }
}

export {crossExtension as extension};

let crossStorage = null;

try {
    crossStorage = storage;
}
catch (e) {
    try {
        crossStorage = chrome.storage;
    }
    catch (e) {
        () => e;
    }
}

export {crossStorage as storage};

let crossRuntime = null;

try {
    crossRuntime = runtime;
}
catch (e) {
    try {
        crossRuntime = chrome.runtime;
    }
    catch (e) {
        () => e;
    }
}

export {crossRuntime as runtime};

let crossTabs = null;

try {
    crossTabs = tabs;
}
catch (e) {
    try {
        crossTabs = chrome.tabs;
    }
    catch (e) {
        () => e;
    }
}

export {crossTabs as tabs};
