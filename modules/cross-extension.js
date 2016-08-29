/* globals extension chrome */

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
