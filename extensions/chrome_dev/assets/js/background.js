import {domready} from 'modules/utils';
import {setToChromeStorage, getAnswer} from 'modules/chromeManipulation';

let DEV_CONFIG = {
    'pid':'nd',
    'api':'dev'
};

for(let key in DEV_CONFIG){
    //get object from popup sent with postKey = key;
    //HERE i do not certain which index has got popup tab... hope it is 0...
    getAnswer(key).then((answer)=>{
        console.debug('received from popup');
        console.debug(answer);
        setToChromeStorage(key, answer); });
}

getAnswer("devTools", 0).then((answer)=>{console.log(answer);
console.log("that was from backgroundScript!!!")});
setToChromeStorage('api', 'Sergey');
setToChromeStorage('pid', 'Sergey');
