import {preferences} from 'preferences';
import {setToChromeStorage} from 'modules/chrome-manipulation';
 console.debug(preferences);
 // initial update of storageData;
 for(let key in preferences){
    setToChromeStorage(key, preferences[key]);
 }
