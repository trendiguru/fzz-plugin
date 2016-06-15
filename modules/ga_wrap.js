/* global ga */

import runGASnippet from 'ext/ga-snippet';
import * as constants from 'constants';
const {GA_CODE, LIBNAME}  = constants;

export default {
    load () {
        return new Promise(resolve => {
            runGASnippet();
            ga(resolve);
        });
    },
    init (clientId) {
        return new Promise(resolve => {
            if (clientId) {
                ga('create', GA_CODE, {
                    name: LIBNAME,
                    clientId: clientId
                });
            } else {
                ga('create', GA_CODE, {
                    name: LIBNAME
                });
            }
            ga(resolve);
        });
    },
    track (eventName) { // +properties
        let evCat = 'ALL';
        let evAct = eventName;
        let evLabel = '';
        ga(`${LIBNAME} + .send`, {
            hitType: 'event',
            eventCategory: evCat,
            eventAction: evAct,
            eventLabel: evLabel
        });
    },
    getClientId () {
        return new Promise((resolve) => {
            ga(() => {
                // console.log('Here we are in ${ga.getClientId}');
                let fzz_tracker = ga.getByName('fzz');
                resolve(fzz_tracker.get('clientId'));
            });
        });
    }
};
