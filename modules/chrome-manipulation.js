import {ENV} from 'constants';
import {extension, storage, runtime, tabs} from './cross-extension';

export let preferences = {
    pid: 'dev',
    api: 'nd',
};

/**
 * Returns promise which will be processed when all commponents of 'preferences' obj will be taken from chrome storage
 * @returns {promise}
 */
export function updateLocalStorage () {
    if (ENV === 'DEV'){
        let promisesList = [];
        for (let key in preferences) {
            promisesList.push(new Promise((resolve, reject)=>{
                storage.local.get(key, (obj) => {
                    console.info('constant attribute was changed by developer', obj);
                    if (obj) {
                        localStorage.setItem(key, obj[key]);
                        console.info(key+' : '+obj+' was stored into local storage');
                        resolve();
                    }
                    else{
                        reject();
                    }
                });
            }));
        }
        return Promise.all(promisesList);
    }
    //if we are not in dev mode => return promise that ends emediatly:
    return Promise.resolve();
}

/**
 * listen to messages from the extension
 */
export function listenToExtension () {
    extension.onMessage.addListener((msg) => {
        if (msg.postKey == 'reload page') {
            location.reload();
        }
    });
    extension.onMessage.addListener((msg) => {
        if (msg.postKey == 'rewrite storage') {
            updateLocalStorage().then(() => location.reload());
        }
    });
}

/**
 * Sets data into crome.storage and returns a promise when the operation is comleted.
 * @param {string} key
 * @param {object} value
 * @returns {promise}
*/
export let setToChromeStorage = (key, value) => new Promise((resolve, reject)=>{
    let obj={};
    obj[key]=value;
    // Check that there's some code there.
    if (!value) {
        console.debug('Error: No value specified');
        reject();
        return;
    }
    // Save it using the Chrome extension storage API.
    storage.local.set(obj, function() {
        // Notify that we saved.
        console.debug(obj);
        console.debug('Settings saved');
        resolve();
    });
});

/**
 * Create message event listener which listens to postMsg request, on reply sends object
 * @param {string} postKey
 * @param {object} obj
 */
export let postResponse = (postKey, obj) => runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.debug(sender.tab ? 'from a content script:' + sender.tab.url : 'from the popup');
    if (request.postKey == postKey) {
        sendResponse(obj);
    }
});

/**
 * Sends a massage and waits for a response
 * @param {string} PostKey
 * @returns {promise}
 */
export let postMsg = (postKey) => new Promise((resolve) => tabs.query(
    {
        active: true,
        currentWindow: true
    },
    (tabs) => tabs.sendMessage(tabs[0].id, {postKey}, (response) => {
        console.log('tabs');
        console.log(tabs);
        resolve(response);
    })
));
