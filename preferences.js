import {PID, API} from 'constants';

let preferences =  {
    pid: PID,
    api: API
}

//test----------------------------
window.preferences = preferences;
//--------------------------------

for(let key in preferences){
    updatePreference(key);
}

chrome.extension.onMessage.addListener(function(msg) {
    if (msg.postKey == 'update preferences') {
        for(let key in preferences){
            updatePreference(key);
        }
    }
});

function updatePreference(key){
    chrome.storage.local.get(key,(obj)=>{
        console.debug("constant attribute was changed by developer");
        console.log(obj);
        if (obj){
            Object.assign(preferences, obj);
            console.debug(preferences);
        }
    });
}

export default preferences;
