import {values, entries, promiseWithTimeout}
from 'modules/utils';
import {HOST_DOMAIN}
from 'constants';
//import {console} from 'modules/smartConsole';
import ga_wrap from 'modules/ga_wrap';
import mp_wrap from 'modules/mp_wrap';
import nginx from 'modules/nginx_analytics';

const analyticsLibs = {
    ga: ga_wrap,
    mp: mp_wrap,
    nginx: nginx
};


// First start loading all the necessary snippets and libs
for (let a of values(analyticsLibs)) {
    a.loaded = a.load();
}

let analytics = {};
let tg_uid;
analytics.analyticsLibs = analyticsLibs;

analytics.getClientId = function () {
    /* Something like:
    * 
    * return analyticsLibs.ga.getClientId().then(clientId=>{tg_uid = clientId; return clientId});
    * 
    */
    
    return Promise.resolve('TEST_ID_123');
};


analytics._init = function (clientId) {
    console.log('Reached _init');
    for (let a of values(analyticsLibs)) {
        a.inited = a.loaded.then(a.init(clientId));
    }
};

analytics.initializeInApp = function () {
    analytics.getClientId().then(analytics._init);
};

analytics.initializeInPublisher = function () {
    analytics.getClientId().then(analytics._init);
//    // Create promise which starts on 'Publisher Received fzz_id'
//    let publisherReceivedAppMsg = new Promise(function (resolve, reject) {
//        window.addEventListener('message', function (msg) {
//            //console.log('Publisher Received postMessage: ');
//            //console.log(msg);
//            if (msg.origin === HOST_DOMAIN) {
//                console.log(`Right origin!`);
//                if (tg_uid === undefined && msg.data !== undefined && msg.data.fzz_id) {
//                    tg_uid = msg.data.fzz_id;
//                    resolve(tg_uid);
//                }
//            } else {
//                //console.log(`Wrong origin: ${msg.origin}`);
//            }
//        }, false);
//    });
//
//    for (let a of values(analyticsLibs)) {
//        a.ready = Promise.all([publisherReceivedAppMsg, a.load])
//            .then(a.initializePublisherAnalytics);
//    }
};

// libs is a list of library names to use to track this event
analytics.track = function (eventName, properties, libs) {
    // Use all libs if not specified
    libs = libs || Object.keys(analyticsLibs);
    for (let [lib, analyticsObj] of entries(analyticsLibs)) {
        if (libs.indexOf(lib) > -1) {
            analyticsObj.inited.then(function () {
                analyticsObj.track(eventName, properties);
            });
        }
    }
};

export {analytics};