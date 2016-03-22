import {values, entries, promiseWithTimeout} from 'modules/utils';
import {GA_CODE, MIXPANEL_ID, HOST_DOMAIN} from 'constants';
import runGASnippet from 'ext/ga-snippet';
import runMixpanelSnippet from 'ext/mixpanel-snippet';
import {nginx} from 'modules/nginx_analytics';
//import {console} from 'modules/smartConsole';


let analyticsLibs = {
    ga: {
        load: new Promise(function (resolve, reject) {
            runGASnippet(); // cheng it 
            ga(resolve);
        }),
        track: function (eventName, properties) {
            let evCat = 'ALL';
            let evAct = eventName;
            let evLabel = '';
            ga('fzz.send', {
                hitType: 'event',
                eventCategory: evCat,
                eventAction: evAct,
                eventLabel: evLabel
            });
        },
        initializeInApp: function () {
            console.log("ga initializing in app");
            ga('create', GA_CODE, {
                name: 'fzz'
            });
            ga(function () {
                let fzz_tracker = ga.getByName('fzz');
                tg_uid = fzz_tracker.get('clientId');
                console.log('App got id, will post: ' + tg_uid);
                window.parent.postMessage({
                    fzz_id: tg_uid
                }, '*');
            });

        },
        initializeInPublisher: function (clientId) {
            ga('create', GA_CODE, {
                name: 'fzz',
                clientId: clientId
            });
            ga('fzz.send', 'pageview');
        }
    },
    mp: {
        load: new Promise(function (resolve, reject) {
            runMixpanelSnippet();
            mixpanel.init(MIXPANEL_ID, {
                loaded: function () {
                    resolve();
                }
            }, 'fzz');
        }),
        track: function (eventName, properties) {
            mixpanel.fzz.track(eventName, properties);
        },
        initializeInApp: function(){ return Promise.resolve();},
        initializeInPublisher: function (clientId) {
            mixpanel.fzz.identify(clientId);
        }
    }
};


let analytics = {};
let tg_uid;
analytics.analyticsLibs = analyticsLibs;


analytics.initializeInApp = function(startPromise){
    startPromise = startPromise || Promise.resolve();
    for (let a of values(analyticsLibs)) {
        console.log(a);
        a.ready = Promise.all([a.initializeInApp(), startPromise, a.load]);
    }
};

analytics.initializeInPublisher = function (startPromise) {
    startPromise = startPromise || Promise.resolve();
    
    // Create promise which starts on 'Publisher Received fzz_id'
    let publisherReceivedAppMsg = new Promise(function (resolve, reject) {
        window.addEventListener('message', function (msg) {
            //console.log('Publisher Received postMessage: ');
            //console.log(msg);
            if (msg.origin === HOST_DOMAIN) {
                console.log(`Right origin!`);
                if (tg_uid === undefined && msg.data !== undefined && msg.data.fzz_id) {
                    tg_uid = msg.data.fzz_id;
                    resolve(tg_uid);
                }
            }
            else{
                //console.log(`Wrong origin: ${msg.origin}`);
            }
        }, false);
    });

    for (let a of values(analyticsLibs)) {
        a.ready = Promise.all([publisherReceivedAppMsg, a.load])
            .then(a.initializePublisherAnalytics);
    }
};

analytics.track = function (eventName, properties, libs) {
    libs = libs || Object.keys(analyticsLibs);
    for(let [lib, analyticsObj] of entries(analyticsLibs)){
        if(libs.indexOf(lib) > -1){
            analyticsObj.ready.then(function(){
                analyticsObj.track(eventName, properties);
            });
        }
    }
};

let fakeAnalytics = {};
for (let key of Object.keys(analytics)) {
    console.log(key);
  fakeAnalytics[key] = function(a,b,c,d,e,f){console.log(a);};
}
analytics = fakeAnalytics;

nginx.init('test1234');
analytics.track = nginx.track;

export {analytics};

// new Promise((resolve) => { resolve(val); }); // hardcore es 6! :)