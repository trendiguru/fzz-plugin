import {preferences} from 'preferences';
import {setToChromeStorage} from 'modules/chromeManipulation';
 console.debug(preferences);
 // initial update of storageData;
 for(let key in preferences){
    setToChromeStorage(key, preferences[key]);
 }
