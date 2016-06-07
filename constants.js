
//const HOST_DOMAIN =  'http://localhost:8000';
//const HOST_DOMAIN =  'https://fzz.storage.googleapis.com';

let scriptTagData = loadScriptTagData();

export const HOST_DOMAIN = 'https://localhost:4443',
//export const HOST_DOMAIN =  'https://fzz.storage.googleapis.com',
    MIN_IMG_WIDTH = 151,
    MIN_IMG_HEIGHT = 181,
    DEBUG = false,
    MIXPANEL_ID = '7b61e0db566195263d0fc9d203495e62',
    GA_CODE = 'UA-51323231-3',
    IFRAME_SRC = `${HOST_DOMAIN}/app/desktop.html`,
    CSS_URL = `${HOST_DOMAIN}/plugin/css/plugin.css`,
    IFRAME_ID = 'fazzi',
    INFO_URL = 'http://fazz.co',
    LIBNAME = 'fzz',
    USER_CONFIG = scriptTagData.userConfig,
    PID = scriptTagData.pid,
    ENV = ["PRODUCTION", "DEV"][1];

export function UISettings (host) {
    // let settings = {
    //     'asos': {
    //         overlay: {
    //             roundAsos: 1.0
    //         }
    //     },
    //     'mb1': {
    //         overlay: {
    //             round: 0.05,
    //             roundDress: 0.95
    //         }
    //     },
    //     'gala.de': {
    //         overlay: {
    //             round: 0.1,
    //             roundDress: 0.9
    //         }
    //     },
    //     '__default': {
    //         overlay: {
    //             round: 0.3,
    //             roundDress: 0.7
    //         }
    //     }
    // };
    let settings = {
        '__default': {
            overlay: {
                preview: 1
            }
        }
    };
    for (let domain in settings) {
        if (host && host.includes(domain))
            return settings[domain];
    }
    return settings.__default;
}

function loadScriptTagData(){
    let data = {userConfig:{}, pid:''};
    let fzzScript = document.getElementById('fzz-script');

    if(fzzScript){
        let userConfigJSON = fzzScript.getAttribute('data-fzz');
        if(userConfigJSON){
            data.userConfig = JSON.parse(userConfigJSON);
        }

        data.pid = fzzScript.getAttribute('data-pid');
    }

    data.userConfig.whitelist = data.userConfig.whitelist || '*';

    return data;
}
