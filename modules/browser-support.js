import bowser from 'bowser';
import {PID} from 'constants';

const DEFAULT_MIN_VERSION = '-1';
const DEFAULT_MAX_VERSION = '1000';
const ua = window.navigator.userAgent;
const BROWSER_SUPPORT = {
    //stylebook:
    '6nGzEP7cp5s957P4':{
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
            MIN_VERSION:DEFAULT_MIN_VERSION,
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
        }
    }
};

function _versionControl(browserName){
    console.log(BROWSER_SUPPORT[PID][browserName].EXCLUDE);
    console.log(BROWSER_SUPPORT[PID][browserName].INCLUDE);
    console.log(bowser.version);
    if (BROWSER_SUPPORT[PID][browserName].EXCLUDE.indexOf(bowser.version)!==-1){
        return false;
    }
    if (BROWSER_SUPPORT[PID][browserName].INCLUDE.indexOf(bowser.version)!==-1){
        return true;
    }
    let minVersion = Number(BROWSER_SUPPORT[PID][browserName].MIN_VERSION.split('.')[0]);
    let maxVersion = Number(BROWSER_SUPPORT[PID][browserName].MAX_VERSION.split('.')[0]);
    let currentVersion = Number(bowser.version.split('.')[0]);
    console.debug('minVersion: '+minVersion);
    console.debug('maxVersion: '+maxVersion);
    console.debug('currentVersion: '+currentVersion);
    console.debug('the result: '+(currentVersion<=maxVersion && currentVersion>=minVersion));
    return (currentVersion<=maxVersion && currentVersion>=minVersion);
}


export default function(){
    let browserSupportStatus = false;
    let browserNames = Object.keys(BROWSER_SUPPORT[PID]);
    // if does not exist the browsers-support-definition for current PID => run the script independently.
    //TODO: create a default browsers-support-definition.
    if (!browserNames){
        return true;
    }
    for(let key of browserNames){
        if (bowser[key]){
            browserSupportStatus=_versionControl(key);
        }
    }
    return browserSupportStatus;
}
