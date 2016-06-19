/*global mixpanel*/

import runMixpanelSnippet from 'ext/mixpanel-snippet';
import * as constants from 'constants';
//import mixpanel from 'ext/mixpanel/loader-module';

const {LIBNAME, MIXPANEL_ID} = constants;

export default {
    load () {
        return new Promise(function (resolve) {
            runMixpanelSnippet();
            mixpanel.init(MIXPANEL_ID, {
                loaded: () => resolve()
            }, LIBNAME);
        });
    },
    init (clientId) {
        if (clientId !== undefined) {
            mixpanel[LIBNAME].identify(clientId);
        } else {
            mixpanel.track('No client ID');
        }
        return 0;
    },
    track (eventName, properties) {
        mixpanel[LIBNAME].track(eventName, properties);
    }
};
