import {PID, API} from 'constants';

let prefences =  {
    pid: PID,
    api: API
}

addEventListener('message', e => {
    if (e.type === 'prefences') {
        Object.assign(prefences, e.data);
    }
});

export default prefences;
