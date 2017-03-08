
import * as constants from 'constants';
//import mixpanel from 'ext/mixpanel/loader-module';

const {MIXPANEL_ID, TRACKED_EVENTS} = constants;

export default {
    clientId: '',
    load () {
        return 0;
    },
    init (clientId) {
        return Promise.resolve().then(() => {
            if (clientId)
                this.clientId = clientId;
            else
                this.track('No client ID');
        });
    },
    track (event, properties = {}) {
        if (TRACKED_EVENTS.mixpanel.includes(event)){
            Object.assign(properties, {token: MIXPANEL_ID, distinct_id: this.clientId});
            return fetch(`https://api.mixpanel.com/track/?data=${btoa(JSON.stringify({event, properties}))}`);
        }
        return null;
    }
};
