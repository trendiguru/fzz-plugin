import {PID, API} from 'constants';
import {setToChromeStorage} from 'modules/chromeManipulation';

 let initPreferences = {PID, API};
 console.debug(initPreferences);
 // initial update of storageData;
 for(let key in initPreferences){
    setToChromeStorage(key, initPreferences[key]);
 }
