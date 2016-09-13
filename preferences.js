/* eslint-disable no-console */

import {PID, API, ENV} from 'constants';
import {extension, storage} from 'modules/cross-extension';

let preferences = {
    pid: PID,
    api: API,
};

//test----------------------------
window.preferences = preferences;
//--------------------------------

if (ENV === 'DEV'){
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
}
function updatePreference(key){
    storage.local.get(key, (obj) => {
        console.info('constant attribute was changed by developer', obj);
        if (obj) {
            Object.assign(preferences, obj);
            console.info({preferences});
        }
    });
}

function updatePreferences(){
    /* the function returns promise which will be processed when all
    commponents of "preferences" obj will be taken from chrome storage*/
    if (ENV === 'DEV'){
        let promisesList = [];
        for (let key in preferences){
            promisesList.push(new Promise((resolve, reject)=>{
                storage.local.get(key, (obj) => {
                    console.info('constant attribute was changed by developer', obj);
                    if (obj) {
                        Object.assign(preferences, obj);
                        console.info({preferences});
                        resolve();
                    }
                });
            }));
        }
        return Promise.all(promisesList);
    }
    //if we are not in dev mode => return promise that ends emediatly:
    return Promise.resolve();
}

export {preferences, updatePreferences};
