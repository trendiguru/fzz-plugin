/* globals ENVIRONMENT */
import {extension} from 'modules/cross-extension';
import FzzDataAttributes from 'modules/fzzdataattributes';
import {Query} from 'modules/utils';

let {blacklist, whitelist, pid, api} = new FzzDataAttributes();
let extUrl = extension ? extension.getURL('').substr(0, extension.getURL('').length - 1) : null;

export const HOST_DOMAIN = {
        DEV: extUrl,
        PRODUCTION: 'https://fzz.storage.googleapis.com',
        TEST: 'https://fzz-test.storage.googleapis.com'
    }[ENVIRONMENT],
    // analytics
    LIBNAME = 'fzz',
    MIXPANEL_ID = '7b61e0db566195263d0fc9d203495e62',
    GA_CODE = 'UA-51323231-3',
    BUTTON_SEEN_CHECK_INTERVAL = 1000,
    // filter
    MIN_IMG_WIDTH = 151,
    MIN_IMG_HEIGHT = 181,
    BLACK_LIST = blacklist,
    WHITE_LIST = whitelist,
    // draw
    INFO_URL = 'http://fazz.co',
    // iframe
    IFRAME_ID = 'fazzi',
    CSS_URL = `${HOST_DOMAIN}/b_plugin.css`,
    IFRAME_SRC = `${HOST_DOMAIN}/assets/app.html`,
    // ui
    COOKIE_NAME = 'fzz_ui_3',
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
    TUTOIRAL_VERSION = '1.0.0',
    // server
    PID = (extension ? 'dev' : Query.parse(location.search).PID || pid || '').toLocaleLowerCase(),
    SERVER_URL = {
        PRODUCTION:'https://track.trendi.guru/tr/web?',
        DEV: 'https://track.trendi.guru/tr/test?'
    }[ENVIRONMENT],
    API = (Query.parse(location.search).API || api).toLowerCase(),
    API_URL = {
        nd: 'https://api.trendi.guru/images',
        pd: 'https://extremeli.trendi.guru/api/images'
    }[API] || 'https://extremeli.trendi.guru/api/images',
    DEBUG = false;

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
console.debug(Query.parse(location.search).API);
