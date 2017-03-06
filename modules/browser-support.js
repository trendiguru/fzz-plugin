import bowser from 'bowser';
import {PID} from 'constants';

const DEFAULT_MIN_VERSION = '1';
const DEFAULT_MAX_VERSION = '100';
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
        tablet: true,
        mobile: true,
        mobileBrowsers:{
            chrome:{
                MIN_VERSION:'56',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            safari:{
                MIN_VERSION:'9',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
        },
        tabletBrowsers:{
            chrome:{
                MIN_VERSION:'56',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            safari:{
                MIN_VERSION:'9',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
        }
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
        mobileBrowsers:{
            chrome:{
                MIN_VERSION:'56',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            safari:{
                MIN_VERSION:'9',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
        },
        tabletBrowsers:{
            chrome:{
                MIN_VERSION:'56',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
            safari:{
                MIN_VERSION:'9',
                MAX_VERSION:DEFAULT_MAX_VERSION,
                INCLUDE:[],
                EXCLUDE:[],
            },
        }
    }
};

function _versionControl(browserName, browsersListName){
    if (BROWSER_SUPPORT[PID][browsersListName][browserName].EXCLUDE.indexOf(bowser.version)!==-1){
        return false;
    }
    if (BROWSER_SUPPORT[PID][browsersListName][browserName].INCLUDE.indexOf(bowser.version)!==-1){
        return true;
    }
    let minVersion = BROWSER_SUPPORT[PID][browsersListName][browserName].MIN_VERSION;
    let maxVersion = BROWSER_SUPPORT[PID][browsersListName][browserName].MAX_VERSION;
    let currentVersion = bowser.version;
    //compareVersions returns -1, 1 or 0.
    return (bowser.compareVersions([maxVersion, currentVersion])>=0 && bowser.compareVersions([currentVersion, minVersion])>=0);
}


export default function(){
    let browserSupportStatus = false;
    // if does not exist the browsers-support-definition for current PID => run the script independently.
    //TODO: create a default browsers-support-definition.
    if (!BROWSER_SUPPORT[PID]){
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
    let browsersByDevise = (bowser.mobile? 'mobileBrowsers': null) || 
                           (bowser.tablet? 'tabletBrowsers': null) || 
                           'browsers';
    let browserNames = (BROWSER_SUPPORT[PID][browsersByDevise])? Object.keys(BROWSER_SUPPORT[PID][browsersByDevise]):[];
    for(let key of browserNames){
        if (bowser[key]){
            browserSupportStatus=_versionControl(key, browsersByDevise);
        }
    }
    if (browserSupportStatus===false){
        console.log('tg app does not support current browser version.');
    }
    return browserSupportStatus;
}