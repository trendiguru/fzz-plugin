import {domready} from 'modules/utils';
import {setToChromeStorage, getAnswer} from 'modules/chromeManipulation';

let DEV_CONFIG = {
    'pid':'nd',
    'api':'dev'
};


function getConfigElement(key){

}

function changeConfigElement(key, value){

}










//StorageArea.get(string or array of string or object keys, function callback);

getAnswer("devTools", 0).then((answer)=>{console.log(answer);
console.log("that was from backgroundScript!!!")});
setToChromeStorage('devTools', true);
