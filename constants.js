import {Query} from 'modules/utils';
//const HOST_DOMAIN =  'http://localhost:8000';
//const HOST_DOMAIN =  'https://fzz.storage.googleapis.com';

let scriptTagData = loadScriptTagData();

//export const HOST_DOMAIN = 'https://localhost:4443',
export const HOST_DOMAIN =  'https://localhost:4443',
    MIN_IMG_WIDTH = 151,
    MIN_IMG_HEIGHT = 181,
    DEBUG = false,
    MIXPANEL_ID = '7b61e0db566195263d0fc9d203495e62',
    GA_CODE = 'UA-51323231-3',
    IFRAME_SRC = `${HOST_DOMAIN}/app/index.html`,
    CSS_URL = `${HOST_DOMAIN}/plugin/css/b_plugin.css`,
    IFRAME_ID = 'fazzi',
    INFO_URL = 'http://fazz.co',
    LIBNAME = 'fzz',
    USER_CONFIG = scriptTagData.userConfig,
    PID = Query.parse(location.search).PID || scriptTagData.pid || '_PD',
    ENV = ['PRODUCTION', 'DEV'][0],
    SERVER_URL = {
        PRODUCTION:'https://track.trendi.guru/tr/web?',
        DEV: 'https://track.trendi.guru/tr/test?'
    }[ENV],
    COOKIE_NAME = 'fzz_ui_3',
    API_URL = {
        '_ND': 'https://api.trendi.guru/images',
        '_PD': 'https://extremeli.trendi.guru/api/images'
    }[PID.substr(-3)] || 'https://extremeli.trendi.guru/api/images',
    LOADING_GIPHIES = [
        'UPAJRWATdepFK',
        'PLw7s7Ezb50OY',
        '13SHVEhqEPfSXC',
        'hLBNOS9GOBCH6',
        '7DNcclBIsgUzC',
        '5AtHzs3lLbbWg',
        'VLHmZU5YQidm8'
    ],
    TUTOIRAL_VERSION = '1.0.0';

export function UISettings (host) {
    let settings = {
        'dev-roundDress': {
            overlay: {
                roundDress: 1.0
            },
            // tutorial: {
            //     bar: 1.0
            // }
        },
        'dev-preview': {
            overlay: {
                preview: 1.0
            }
        },
        '__default': {
            overlay: {
                preview: 0.1,
                roundDress: 0.9
            }
            // tutorial: {
            //     bar: 0.3,
            //     sample: 0.3,
            //     highlight: 0.3
            // }
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
