/* globals extension storage chrome */

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
