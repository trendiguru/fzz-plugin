/*global mixpanel*/

import runMixpanelSnippet from 'ext/mixpanel-snippet';
import {LIBNAME, MIXPANEL_ID}
from 'constants';


export default {
    load: function () {
        return new Promise(function (resolve) {
            runMixpanelSnippet();
            mixpanel.init(MIXPANEL_ID, {
                loaded: function () {
                    resolve();
                }
            }, LIBNAME);
        });
    },
    init: function (clientId) {
        return new Promise(function (resolve) {
            if (clientId !== undefined) {
                mixpanel[LIBNAME].identify(clientId);
            } else {
                console.log('Mixpanel did not receive a client ID');
            }
            resolve();
        });
    },
    track: function (eventName, properties) {
        mixpanel[LIBNAME].track(eventName, properties);
    }
};