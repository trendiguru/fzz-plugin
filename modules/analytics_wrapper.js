/* globals TimeMe */

import ga_wrap from './ga_wrap';
import mp_wrap from './mp_wrap';
import nginx from './nginx_analytics';
import {HOST_DOMAIN} from 'constants';
import {REQUESTS} from './devTools';
import timeme from 'ext/timeme';

export const analyticsLibs = {
    nginx: nginx,
    ga: ga_wrap,
    mp: mp_wrap
};

export let initProperties = {},
    inited;

let fzz_id;

REQUESTS.active = true;

// First start loading all the necessary snippets and libs
for (let a of Object.values(analyticsLibs)) {
    a.loaded = a.load();
}

export function getClientId () {
    let a = analyticsLibs.ga;
    return a.loaded
    .then(a.init)
    .then(a.getClientId)
    .then(clientId=>{fzz_id = clientId; return clientId;});
}


function _init (clientId) {
    for (let a of Object.values(analyticsLibs)) {
        if(!a.hasOwnProperty('inited')){
            a.inited = a.loaded.then(() => a.init(clientId));
        }
    }
}

export function initializeInApp () {
    inited = getClientId().then(clientId => {
        _init(clientId);
        window.parent.postMessage({
            fzz_id: fzz_id
        }, '*');
    });

    timeme();

    window.addEventListener('beforeunload', () => fetch(`https://track.trendi.guru/tr/web?event=Page%20Unloaded&duration=${TimeMe.getTimeOnCurrentPageInSeconds()}&publisherDomain=${initProperties.publisherDomain}`));
}


export function initializeInPublisher () {
    let publisherReceivedAppMsg = new Promise(resolve => {
        window.addEventListener('message', msg => {
            if (msg.origin === HOST_DOMAIN && msg.data !== undefined && msg.data.fzz_id) {
                fzz_id = msg.data.fzz_id;
                resolve(fzz_id);
            }
        });
    });
    inited = publisherReceivedAppMsg.then(_init);
}

// libs is a list of library names to use to track this event
export function track (eventName, properties = {}, libs) {
    Object.assign(properties, initProperties);
    inited.then(() => {
        // Use all libs if not specified
        libs = libs || Object.keys(analyticsLibs);
        for (let [lib, analyticsObj] of Object.entries(analyticsLibs)) {
            if (libs.indexOf(lib) > -1) {
                REQUESTS.set(properties, 'property');
                analyticsObj.inited.then(() => analyticsObj.track(eventName, properties));
            }
        }
    });
}

export function listen (event) {
    switch (event) {
    case 'scroll': {
        //Track Scroll on Publisher
        let initScrollTop = window.scrollY;
        window.addEventListener('scroll', function () {
            if (window.scrollY - initScrollTop > 20) {
                track('Publisher Scroll', undefined, ['ga']);
                initScrollTop = 100000000;
            }
        });
        break;
    }
    }
}
