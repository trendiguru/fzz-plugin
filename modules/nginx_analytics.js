import {entries} from 'modules/utils';

let nginx = {
    // more fields are added in init()
    trackingFields: {
        ver: '0.1'
    },
    serverUrl: '//track.trendi.guru/tr/web?'
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
    let fieldsString = '';
    let rv = Math.floor(Math.random() * 1000000000);

    if(properties){
        for(let key of Object.keys(properties)){
            nginx.trackingFields[key] = properties[key];
        }
    }

    for (let [attrName, attrValue] of entries(nginx.trackingFields)) {
        fieldsString += '&' + attrName + '=' + encodeURIComponent(attrValue);
    }

    // send pixel
    (new Image()).src = nginx.serverUrl + 'rv=' + rv + '&event=' + encodeURIComponent(event) + fieldsString;
};

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
