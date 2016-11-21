import amplitude from '../ext/amplitude-3.3.2-min.gz';
import {AMPLITUDE_KEY, TRACKED_EVENTS} from 'constants';

export default {
    load () {
        return 0;
    },
    init () {
        amplitude.getInstance().init(AMPLITUDE_KEY);
        return Promise.resolve();
    },
    track (eventName, properties) {
        if (TRACKED_EVENTS.amplitude.includes(eventName)){
            amplitude.getInstance().logEvent(eventName, properties);
        }
    },
};
