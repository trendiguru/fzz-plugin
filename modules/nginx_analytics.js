//import UAParser from 'ua-parser-js';  //uaparser from....

let nginx = nginx || {
    // more fields are added in init()
    trackingFields: {
        ver: '0.1'
    },
    serverUrl: '//104.154.40.165/tr/web?'
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
        resolve();
    });
};

nginx.track = function (event, properties) {
    var fields = '';
    var rv = Math.floor(Math.random() * 1000000000);
    
    for(let key of Object.keys(properties)){
        nginx.trackingFields[key] = properties[key];
    }

    for (var key in nginx.trackingFields) {
        var attrName = key;
        var attrValue = nginx.trackingFields[key];
        //console.log(attrName + ' : ' + attrValue);
        fields += '&' + attrName + '=' + encodeURIComponent(attrValue);
    }

    // send pixel
    (new Image()).src = nginx.serverUrl + 'rv=' + rv + '&event=' + encodeURIComponent(event) + fields;
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