/* globals ENVIRONMENT */

import {Query} from 'modules/utils';

let {blacklist, whitelist, pid, api} = ScriptElementDataAttributes();

export const HOST_DOMAIN = {
        DEV: 'https://localhost:4443',
        PRODUCTION: 'https://fzz.storage.googleapis.com',
        TEST: 'https://fzz-test.storage.googleapis.com'
    }[ENVIRONMENT],
    MIN_IMG_WIDTH = 151,
    MIN_IMG_HEIGHT = 181,
    DEBUG = false,
    MIXPANEL_ID = '7b61e0db566195263d0fc9d203495e62',
    GA_CODE = 'UA-51323231-3',
    IFRAME_SRC = `${HOST_DOMAIN}/assets/app.html`,
    CSS_URL = `${HOST_DOMAIN}/b_plugin.css`,
    IFRAME_ID = 'fazzi',
    INFO_URL = 'http://fazz.co',
    LIBNAME = 'fzz',
    BLACK_LIST = blacklist,
    WHITE_LIST = whitelist,
    PID = pid || Query.parse(location.search).PID || '',
    SERVER_URL = {
        PRODUCTION:'https://track.trendi.guru/tr/web?',
        DEV: 'https://track.trendi.guru/tr/test?'
    }[ENVIRONMENT],
    RUN_PRIORITY = {
        DEV:1,
        PLUGIN:2,
        EXTENSION:3
    },
    COOKIE_NAME = 'fzz_ui_3',
    API = Query.parse(location.search).API || api,
    API_URL = {
        ND: 'https://api.trendi.guru/images',
        PD: 'https://extremeli.trendi.guru/api/images'
    }[API] || 'https://extremeli.trendi.guru/api/images',
    BUTTON_SEEN_CHECK_INTERVAL = 1000,
    GIPHY = {
        API_KEY: 'dc6zaTOxFJmzC',
        LOADING_IMAGES: [
            'UPAJRWATdepFK',
            'PLw7s7Ezb50OY',
            '13SHVEhqEPfSXC',
            'hLBNOS9GOBCH6',
            '7DNcclBIsgUzC',
            '5AtHzs3lLbbWg',
            'VLHmZU5YQidm8'
        ]
    },
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
        'recruit-pilot': {
            overlay: {
                recruit: 1.0
            }
        },
        '6t50LSJxeNEkQ42p': {
            overlay: {
                recruit: 1.0
            }
        },
        '__default': {
            overlay: {
                roundDress: 1.0
            },
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

function ScriptElementDataAttributes () {
    let data = {
        userConfig: {},
        pid: '',
        api: '',
        whitelist: '*'
    };

    let fzzScript = null;
    for (let script of document.querySelectorAll('#fzz-script')){
        let attr = script.attributes['data-pid'];
        console.log(attr);
        console.log(script);
        if (attr){
            if (ENVIRONMENT === 'PRODUCTION'){
                if (!(attr.textContent.slice(0,3)).includes("dev") && !(attr.textContent.slice(0,3)).includes("ext")){
                    fzzScript = script;
                }
            }
            if (ENVIRONMENT === 'DEV'){
                if ((attr.textContent.slice(0,3)).includes("dev")){
                    fzzScript = script;
                    console.log("dev");
                }
            }
            if (ENVIRONMENT === 'EXT'){
                if ((attr.textContent.slice(0,3)).includes("ext")){
                    fzzScript = script;
                }
            }
        }
    /* if data-pid of "fzz-script" at the beginning contains an ENVIRONMANT
       (string) => that is the script we are running from.
       That means if we will publish an extension we must add
       ENVIRONMENT = "EXT". and data-pid must also contain
       "ext" (at the beginning).

       if (attr.name === 'data-pid' && (attr.textContent).includes(ENVIRONMENT.toLowerCase())){
          fzzScript = script;
       }
     */
    }
    console.log("**********");
    console.log(fzzScript);
    if (fzzScript) {
        for (let attribute of Array.from(fzzScript.attributes)) {
            if (attribute.name.search('data-') == 0) {
                data[attribute.name.substr(5)] = attribute.value;
            }
        }
    }
    return data;
}
