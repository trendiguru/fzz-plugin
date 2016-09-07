/* eslint-disable no-console */

import {PID, API} from 'constants';
import {extension, storage} from 'modules/cross-extension';

let preferences = {
    pid: PID,
    api: API
};

//test----------------------------
window.preferences = preferences;
//--------------------------------

for (let key in preferences) {
    updatePreference(key);
}

extension.onMessage.addListener((msg) => {
    if (msg.postKey == 'update preferences') {
        for (let key in preferences) {
            updatePreference(key);
        }
    }
});

function updatePreference(key){
    storage.local.get(key, (obj) => {
        console.info('constant attribute was changed by developer', obj);
        if (obj) {
            Object.assign(preferences, obj);
            console.info({preferences});
        }
    });
}

export default preferences;
