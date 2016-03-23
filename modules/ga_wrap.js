import runGASnippet from 'ext/ga-snippet';
import {GA_CODE, LIBNAME} from 'constants';

export default {
    load: () => {
        new Promise((resolve, reject) => {
            runGASnippet();
            ga(resolve);
        });
    },
    init: (cliendId) => {
        new Promise((resolve, reject) => {
            if (clientId) {
                ga('create', GA_CODE, {
                    name: LIBNAME,
                    clientId: clientId
                });
            } else {
                ga('create', GA_CODE, {
                    name: LIBNAME,
                });
            }
            ga(resolve);
        });
    },
    track: (eventName, properties) => {
        let evCat = 'ALL';
        let evAct = eventName;
        let evLabel = '';
        ga(`${LIBNAME}.send`, {
            hitType: 'event',
            eventCategory: evCat,
            eventAction: evAct,
            eventLabel: evLabel
        });
    }
};