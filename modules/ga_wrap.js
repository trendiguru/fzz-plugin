/* global ga */

import runGASnippet from 'ext/ga-snippet';
import {GA_CODE, LIBNAME}
from 'constants';

export default {
    load: () => new Promise((resolve) => {
        runGASnippet();
        ga(resolve);
    }),
    init: (clientId) => new Promise((resolve) => {
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
    }),
    track: (eventName, properties) => {
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
    getClientId: () => new Promise((resolve) => {
        ga(function () {
            let fzz_tracker = ga.getByName('fzz');
            resolve(fzz_tracker.get('clientId'));
        });
    })
};