const winConsole = window.console;
const FZZ = window.FZZ = window.FZZ || {};
const logList = FZZ.logList = [];
export const console = FZZ.console = {
    log (msg) {
        logList.push({timestamp:new Date(), message:msg});
    }
//    print: function(lastN){
//        let logList = FZZ.logList;
//        let logLen = logList.length;
//        lastN = lastN || logLen;
//        for(let i=(logLen - lastN); i<logLen; i++){
//            let logItem = logList[i];
//            winConsole.log('${logItem.timestamp}:${logItem.message}');
//        }
//    }
};
