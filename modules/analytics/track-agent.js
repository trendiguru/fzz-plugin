import { PID } from 'constants';
import { REQUESTS } from 'modules/devTools';
import stylebookConfig from './track-agent-configs/stylebook';
import defaultConfig from './track-agent-configs/default';

REQUESTS.active = true;

const TRACK_AGENT = {
    '6nGzEP7cp5s957P4':stylebookConfig,
    'default': defaultConfig,
};

export default class TrackAgent {
    constructor() {
        this.trackAgentData = TRACK_AGENT;
        this.track = this.track.bind(this);
        this.isValid = this.isValid.bind(this);
        this.correctPID = this.correctPID.bind(this);
    }

    track(eventName, properties, lib, libName) {
        if (this.isValid(eventName, libName)) {
            REQUESTS.set(properties, 'property');
            lib.inited.then(() => {
                lib.track(eventName, properties);
            });
        }
    }
    correctPID(pid) {
        return (this.trackAgentData[pid] ? pid : 'default');
    }
    isValid(eventName, libName){
        let libConfig = this.trackAgentData[this.correctPID(PID)][libName];
        return (libConfig && libConfig[eventName] && libConfig[eventName].valid());
    }
}