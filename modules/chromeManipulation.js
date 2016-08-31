export function setToChromeStorage(key, value) {
    let obj={};
    obj[key]=value;
  // Check that there's some code there.
  if (!value) {
    console.debug('Error: No value specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.local.set(obj, function() {
    // Notify that we saved.
    console.debug('Settings saved');
  });
}

export function publishQuestion(postKey, obj){
    /* the function createss message event listener which listens to message from popup,
       on reply sends object */
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        //console.debug(sender.tab ? "from a content script:" + sender.tab.url : "from the popup");
        if (request.postKey == postKey)
          sendResponse(obj);
    });
}

export function getAnswer(postKey, tabIndex=0){
    return new Promise((resolve, reject)=>{
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[tabIndex].id, {postKey: postKey}, function(response) {
                console.log('tabs');
                console.log(tabs);
                resolve(response);
            });
        });
    })
}
