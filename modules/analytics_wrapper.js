import {values, entries, promiseWithTimeout, dictMerge} from 'modules/utils';
//import {console} from 'modules/smartConsole';
import ga_wrap from 'modules/ga_wrap';
import mp_wrap from 'modules/mp_wrap';
import nginx from 'modules/nginx_analytics';
import constants from 'constants';
const {HOST_DOMAIN} = constants;

const analyticsLibs = {
    nginx: nginx,
    ga: ga_wrap,
    mp: mp_wrap
};

let initProperties = {};


// First start loading all the necessary snippets and libs
for (let a of values(analyticsLibs)) {
    a.loaded = a.load();
}

let analytics = {};
let fzz_id;
analytics.analyticsLibs = analyticsLibs;

analytics.getClientId = function () { 
    let a = analyticsLibs.ga;
    a.inited = a.loaded.then(a.init);
    
    return a.inited
        .then(a.getClientId)
        .then(clientId=>{fzz_id = clientId; return clientId;});
};


analytics._init = function (clientId) {
    for (let a of values(analyticsLibs)) {
        if(!a.hasOwnProperty('inited')){
            a.inited = a.loaded.then(a.init(clientId));
        }
    }      
};

analytics.initializeInApp = function (initProperties) {
    initProperties = initProperties;
    analytics.inited = analytics.getClientId().then(clientId=>{
        analytics._init(clientId);
        window.parent.postMessage({
            fzz_id: fzz_id
        }, '*');
    });
};

analytics.initializeInPublisher = function (initProperties) {
    initProperties = initProperties;
    let publisherReceivedAppMsg = new Promise((resolve) => {
        window.addEventListener('message', function (msg) {
            if (msg.origin === HOST_DOMAIN) {
                //console.log(`Right origin!`);
                if (msg.data !== undefined && msg.data.fzz_id) {
                    fzz_id = msg.data.fzz_id;
                    resolve(fzz_id);
                }
            } else {
                //console.log(`Wrong origin: ${msg.origin}`);
            }
        }, false);
    });
    
    analytics.inited = publisherReceivedAppMsg.then(analytics._init);
};

// libs is a list of library names to use to track this event
analytics.track = function (eventName, properties, libs) {
    properties  = dictMerge(properties, initProperties);
    analytics.inited.then(() => {
        // Use all libs if not specified
        libs = libs || Object.keys(analyticsLibs);
        for (let [lib, analyticsObj] of entries(analyticsLibs)) {
            if (libs.indexOf(lib) > -1) {
                analyticsObj.inited.then(function () {
                    analyticsObj.track(eventName, properties);
                });
            }
        }
    });
};

export {analytics};