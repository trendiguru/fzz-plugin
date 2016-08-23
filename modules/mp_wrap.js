
import * as constants from 'constants';
//import mixpanel from 'ext/mixpanel/loader-module';

const {MIXPANEL_ID} = constants;

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
        Object.assign(properties, {token: MIXPANEL_ID, distinct_id: this.clientId});
        return fetch(`https://api.mixpanel.com/track/?data=${btoa(JSON.stringify({event, properties}))}`);
    }
};
