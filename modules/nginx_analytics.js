//import UAParser from "ua-parser-js";  //uaparser from....

var nginx = nginx || {
    // more fields are added in init()
    trackingFields: {
        ver: "0.1"
    },
    serverUrl:"//104.154.40.165/tr/web?"
};

nginx.init = function(userId) {
    //var uaParser = new UAParser();
    //var uaResult = uaParser.getResult();

    var bugArray = userId[0].split("%25");
    nginx.trackingFields.userId = bugArray[0];
    
    //nginx.trackingFields.userId = userId;
    
    var vp = viewport();
    nginx.trackingFields.winWidth = vp.width;
    nginx.trackingFields.winHeight = vp.height;
    
    //user agent is no longer required in JS since LogStash has a plugin which parses the user_agent HTTP header
    /*
    nginx.trackingFields.br_n = uaResult.browser.name;
    nginx.trackingFields.br_v = uaResult.browser.version;
    nginx.trackingFields.os_n = uaResult.os.name;
    nginx.trackingFields.os_v = uaResult.os.version;

    // on mobile/tablet only
    if (uaResult.device.model) {
        nginx.trackingFields.device_model = uaResult.device.model;
        nginx.trackingFields.device_vendor = uaResult.device.vendor;
        nginx.trackingFields.device_type= uaResult.device.type;
    }
    */
};

nginx.track = function(event) {
    var fields = "";
    var rv = Math.floor(Math.random() * 1000000000);
    
    for(var key in nginx.trackingFields){
        var attrName = key;
        var attrValue = nginx.trackingFields[key];
        console.log(attrName + " : " + attrValue);
        fields += "&" + attrName + "=" + encodeURIComponent(attrValue);
    }
    
    // send pixel
    (new Image()).src = nginx.serverUrl + "rv=" + rv + "&event="+encodeURIComponent(event) + fields;
    //console.error("pixel src: " + nginx.serverUrl + "rv=" + rv + "&event="+encodeURIComponent(event) + fields);
};

var viewport = function(){
    var viewport = new Object();
    viewport.width = 0;
    viewport.height = 0;
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) 
    //use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined')
    {
        viewport.width = window.innerWidth,
        viewport.height = window.innerHeight
    }
    else if (typeof document.documentElement != 'undefined'
    && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0)
    {
        viewport.width = document.documentElement.clientWidth,
        viewport.height = document.documentElement.clientHeight
    }
    else
    {
        viewport.width = document.getElementsByTagName('body')[0].clientWidth,
        viewport.height = document.getElementsByTagName('body')[0].clientHeight
    }
    return viewport;
};

export {nginx}; 