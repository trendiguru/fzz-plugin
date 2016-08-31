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
chrome.storage.local.get('PID',(el)=>{
    console.debug("PID constant attribute was changed by developer");
    console.log(el);
    Object.assign(prefences, el);
    console.debug(prefences);
});
chrome.storage.local.get('PID',(el)=>{
    console.debug("PID constant attribute was changed by developer");
    console.log(el);
    Object.assign(prefences, el);
    console.debug(prefences);
});
export default prefences;
