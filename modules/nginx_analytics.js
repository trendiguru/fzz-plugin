import {SERVER_URL} from 'constants';

 // more fields are added in init()

export let trackingFields = {
        ver: '0.1'
    },
    serverUrl = SERVER_URL;

export let load = Promise.resolve;

export function init (userId) {
    return new Promise(function (resolve) {
        trackingFields.userId = userId;
        let vp = viewport();
        trackingFields.winWidth = vp.width;
        trackingFields.winHeight = vp.height;
        //nginx.trackingFields.refererDomain = window.location.hostname.replace("www.", ""); // replaced with publisherDomain in the analytics wrapper
        resolve();
    });
}

export function track (event, properties) {
    // send pixel
    (new Image()).src = serverUrl + buildQueryString(event, properties);
}

export function buildQueryString(event, properties){
    let fieldsString = '';
    let rv = Math.floor(Math.random() * 1000000000);

    if(properties){
        for(let key of Object.keys(properties)){
            trackingFields[key] = properties[key];
        }
    }

    for (let attrName in trackingFields) {
        let attrValue = trackingFields[attrName];
        fieldsString += '&' + attrName + '=' + encodeURIComponent(attrValue);
    }

    // send pixel
    return 'rv=' + rv + '&event=' + encodeURIComponent(event) + fieldsString;
}

function viewport () {
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
