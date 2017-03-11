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
    constructor(libs) {
        this.trackAgentData = TRACK_AGENT;
        this.libs = libs;
        this.track = this.track.bind(this);
        this.isValid = this.isValid.bind(this);
        this.correctPID = this.correctPID.bind(this);
    }

    track(eventName, properties) {
        for (let [lib_name, lib] of Object.entries(this.libs)) {
            REQUESTS.set(properties, 'property');
            if (this.isValid(eventName, lib_name)) {
                console.log('valid');
                lib.inited.then(() => {
                    lib.track(eventName, combinedProps);
                });
            }
        }
    }
    correctPID(pid) {
        console.log('correctPID');
        console.log((this.trackAgentData[pid] ? pid : 'default'));
        return (this.trackAgentData[pid] ? pid : 'default');
    }
    isValid(eventName, libName){
        console.log(eventName+" "+libName);
        let libConfig = this.trackAgentData[this.correctPID(PID)][libName];
        return (libConfig && libConfig[eventName] && libConfig[eventName].valid());
    }
}