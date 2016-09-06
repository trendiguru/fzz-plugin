import {PID as pid, API as api} from 'constants';
import {setToChromeStorage} from 'modules/chromeManipulation';

 let initPreferences = {pid, api};
 console.debug(initPreferences);
 // initial update of storageData;
 for(let key in initPreferences){
    setToChromeStorage(key, initPreferences[key]);
 }
