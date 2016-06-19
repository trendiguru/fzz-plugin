import {SERVER_URL} from 'constants';
import {Query} from './utils';

let nginx = {
    // more fields are added in init()
    trackingFields: {
        ver: '0.1'
    },
    serverUrl: SERVER_URL
};

nginx.load = function () {
    return Promise.resolve();
};

nginx.init = function (userId) {
    return new Promise(function (resolve) {
        nginx.trackingFields.userId = userId;
        let vp = viewport();
        nginx.trackingFields.winWidth = vp.width;
        nginx.trackingFields.winHeight = vp.height;
        //nginx.trackingFields.refererDomain = window.location.hostname.replace("www.", ""); // replaced with publisherDomain in the analytics wrapper
        resolve();
    });
};

nginx.track = function (event, properties) {
    // send pixel
    (new Image()).src = nginx.serverUrl + buildQueryString(nginx.trackingFields, event, properties);
};

export function buildQueryString (event, properties = {}) {
    let {trackingFields} = nginx;

    for (let key in trackingFields) {
        trackingFields[key] = encodeURIComponent(trackingFields[key]);
    }

    Object.assign(
        trackingFields,
        {
            rv: Math.floor(Math.random() * 1000000000),
            event: encodeURIComponent(event)
        },
        properties
    );
    // send pixel
    return Query.stringify(trackingFields);
}

function viewport() {
    let viewport = {};
    viewport.width = 0;
    viewport.height = 0;
    // the more standards compliant browsers (mozilla/netscape/opera/IE7)
    //use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth !== 'undefined') {
        viewport.width = window.innerWidth;
        viewport.height = window.innerHeight;
    } else if (typeof document.documentElement !== 'undefined' &&
               typeof document.documentElement.clientWidth !== 'undefined' &&
               document.documentElement.clientWidth != 0) {
        viewport.width = document.documentElement.clientWidth;
        viewport.height = document.documentElement.clientHeight;
    } else {
        let bodyElem = document.getElementsByTagName('body')[0];
        viewport.width = bodyElem.clientWidth;
        viewport.height = bodyElem.clientHeight;
    }
    return viewport;
}

export default nginx;
