/* globals ENVIRONMENT */
import {extension} from 'modules/cross-extension';
import FzzDataAttributes from 'modules/fzzdataattributes';
import {Query} from 'modules/utils';
import giphy from 'modules/giphy';

const FZZ = window.FZZ = window.FZZ || {};

let {blacklist = '.videoPlayer, .rotatingTeaser, .OUTBRAIN', whitelist, pid, api} = new FzzDataAttributes();
let extUrl = extension ? extension.getURL('').slice(0, -1) : null;

export const HOST_DOMAIN = {
        DEV: extUrl,
        PRODUCTION: 'https://fzz.storage.googleapis.com',
        TEST: 'https://fzz-test.storage.googleapis.com',
        LOCAL_TEST:''
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
    INFO_URL = 'http://infashion.co',
    // iframe
    IFRAME_ID = 'fazzi',
    CSS_URL = `${HOST_DOMAIN}/b_plugin.css`,
    IFRAME_SRC = `${HOST_DOMAIN}/assets/${extension ? 'app.local' : 'app'}.html`,
    // ui
    COOKIE_NAME = 'fzz_ui_3',
    GIPHY = {
        API_KEY: 'dc6zaTOxFJmzC',
    },
    TUTOIRAL_VERSION = '1.0.0',
    // server
    INITIAL_URL_STATE = FZZ.URL_STATE,
    PID = ENVIRONMENT === 'DEV' && localStorage.getItem('pid') ? localStorage.getItem('pid') : Query.parse(location.search).PID || pid || null,
    SERVER_URL = {
        PRODUCTION:'https://track.trendi.guru/tr/web?',
        DEV: 'https://track.trendi.guru/tr/test?'
    }[ENVIRONMENT],
    API = ENVIRONMENT === 'DEV' && localStorage.getItem('api') ? localStorage.getItem('api') :(Query.parse(location.search).API || api).toLowerCase(),
    API_URL = {
        nd: 'https://api.trendi.guru/images',
        pd: 'https://api.trendi.guru/images'
    }[API] || 'https://api.trendi.guru/images',
    DEBUG = false,
    ENV = ENVIRONMENT,
    LOADING_TIMEOUT = '3000',
    LOADING = {
        IMAGES: {
            giphy: [
                'UPAJRWATdepFK',
                'PLw7s7Ezb50OY',
                '13SHVEhqEPfSXC',
                'hLBNOS9GOBCH6',
                '7DNcclBIsgUzC',
                '5AtHzs3lLbbWg',
                'VLHmZU5YQidm8'
            ].map(giphy.GIF),
            recruit: ['/assets/img/recruit_loading_v1.gif']
        }
    },
    APP = {
        CLASSNAME: {
            stylebook: 'stylebook',
            default: ''
        }
    },
    AMPLITUDE_KEY = {
        'Y8Y4jENvaJ2Lsklz':'17417a62462da0797c51e59c675e547f',//healthyceleb
        fashionseoul:'fcdaab0bbcf0b89bf8ddb97ba30197e8',
        '6nGzEP7cp5s957P4':'bf3cbfdc2ba37f15e89af1fc66c1a5e4',//stylebook
        '025s1Aorf58z0MtJ':'a75ce6b5011d4eeb1b7ee02ad2aedab1',//robsshelter
        'xuSiNIs695acaHPE':'26f5cfbe7f5217b1cea019ea71435edb'//amaze-magazine
    }[PID] || '3d4fa64b96ff312455271dade3170591',
    TRACKED_EVENTS = {
        amplitude:['Page Hit', 'Button Seen', 'Trendi Button Clicked'],
        mixpanel:['Page Hit', 'Button Seen', 'Trendi Button Clicked']
    },
    CRAZY_TAB_RECIPIENTS = ['dev', 'DEV', 'Y8Y4jENvaJ2Lsklz'],
    CRAZY_AD_RECIPIENTS = ['dev', 'DEV', 'Y8Y4jENvaJ2Lsklz'],
    UI = {
        'recruit-pilot': {
            overlay: {
                recruit: 1.0,
            },
            loading: {
                recruit: 1.0,
            },
            classname: {
                default: 1.0,
            },
        },
        '6t50LSJxeNEkQ42p': {
            overlay: {
                recruit: 1.0,
            },
            loading: {
                recruit: 1.0,
            },
            classname: {
                default: 1.0,
            },
        },
        '6nGzEP7cp5s957P4': {
            overlay: {
                stylebook: 1.0,
            },
            loading: {
                giphy: 1.0,
            },
            classname: {
                stylebook: 1.0
            }
        },
        '__default': {
            overlay: {
                roundDress: 1.0,
            },
            loading: {
                giphy: 1.0,
            },
            classname: {
                default: 1.0,
            },
        },
    };
