/*global mixpanel*/

import runMixpanelSnippet from 'ext/mixpanel-snippet';
//import mixpanel from 'ext/mixpanel/loader-module';

import constants from 'constants';
const {LIBNAME, MIXPANEL_ID} = constants;


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
                mixpanel.track('No client ID');
            }
            resolve();
        });
    },
    track: function (eventName, properties) {
        mixpanel[LIBNAME].track(eventName, properties);
    }
};