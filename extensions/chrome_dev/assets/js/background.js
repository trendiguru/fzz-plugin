import {domready} from 'modules/utils';
import {setToChromeStorage, getAnswer, publishQuestion} from 'modules/chromeManipulation';

let DEV_CONFIG = {
    'pid':'nd',
    'api':'dev'
};

console.log(chrome.tabs);
getAnswer("devTools",0).then((answer)=>{window.devTools = answer;});
window.setToConfig = (key, value)=>{
        setToChromeStorage(key, value);
        publishQuestion("reload",{});
        //chrome.tabs.reload(0,function(){});
};

for(let key in DEV_CONFIG){
    //get object from popup sent with postKey = key;
    //HERE i do not certain which index has got popup tab... hope it is 0...
    getAnswer(key).then((answer)=>{
        console.debug('received from popup');
        console.debug(answer);
        setToChromeStorage(key, answer); });
        // chrome.tabs.reload(function(){});
}

getAnswer("devTools", 0).then((answer)=>{console.log(answer);
console.log("that was from backgroundScript!!!")});
setToChromeStorage('api', 'Sergey');
setToChromeStorage('pid', 'Sergey');


//test-----------------------------------------------------------------
window.send = ()=>{
    //test-------------------------------------------------------------
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
    // });
// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// console.log("posted");
// port.onMessage.addListener(function(msg) {
//   if (msg.question == "Who's there?")
//     port.postMessage({answer: "Madame"});
//   else if (msg.question == "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });
}
//----------------------------------------------------------------
