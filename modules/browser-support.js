import bowser from 'bowser';
import {PID} from 'constants';

const DEFAULT_MIN_VERSION = '-1';
const DEFAULT_MAX_VERSION = '1000';
const ua = window.navigator.userAgent;
const BROWSER_SUPPORT = {
    //stylebook:
    '6nGzEP7cp5s957P4':{
        browsers:{
            chrome:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            chromium:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            opera:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            //ie
            msie:{
                MIN_VERSION:'11',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            //edge
            msedge:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            safari:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
        },
        tablet: false,
        mobile: false,
    },
        'dev':{
        browsers:{
            chrome:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            chromium:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            opera:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            //ie
            msie:{
                MIN_VERSION:'11',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            //edge
            msedge:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            safari:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            firefox:{
                MIN_VERSION:DEFAULT_MIN_VERSION,
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
        },
        tablet: true,
        mobile: true,
    }
};

function _versionControl(browserName){
    if (BROWSER_SUPPORT[PID]['browsers'][browserName].EXCLUDE.indexOf(bowser.version)!==-1){
        return false;
    }
    if (BROWSER_SUPPORT[PID]['browsers'][browserName].INCLUDE.indexOf(bowser.version)!==-1){
        return true;
    }
    let minVersion = Number(BROWSER_SUPPORT[PID]['browsers'][browserName].MIN_VERSION.split('.')[0]);
    let maxVersion = Number(BROWSER_SUPPORT[PID]['browsers'][browserName].MAX_VERSION.split('.')[0]);
    let currentVersion = Number(bowser.version.split('.')[0]);//checks only the first number before dot (main version).
    return (currentVersion<=maxVersion && currentVersion>=minVersion);
}


export default function(){
    let browserSupportStatus = false;
    let browserNames = (BROWSER_SUPPORT[PID])? Object.keys(BROWSER_SUPPORT[PID]['browsers']):undefined;
    // if does not exist the browsers-support-definition for current PID => run the script independently.
    //TODO: create a default browsers-support-definition.
    if (!browserNames){
        return true;
    }
    //check if supports mobile-browsers:
    if (!BROWSER_SUPPORT[PID].mobile && bowser.mobile){
        return false;
    }
    //check if supports tablet-browsers:
    if (!BROWSER_SUPPORT[PID].tablet && bowser.tablet){
        return false;
    }
    for(let key of browserNames){
        if (bowser[key]){
            browserSupportStatus=_versionControl(key);
        }
    }
    if (browserSupportStatus===false){
        console.log('tg app does not support current browser version.');
    }
    return browserSupportStatus;
}