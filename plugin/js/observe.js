import {selectorMatches} from 'modules/utils';
import constants from 'constants';
import {MUT} from 'modules/devTools';
const {USER_CONFIG} = constants;
const forbiddenHTMLTags = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];
const defaultConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
};

let MutationObserver  = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserve;
 //list of mutation types which may influence on tgElements.
let visibleMutTypes =["childList",'attributes'];
MUT.active = true;

// Object is 'interesting' only if it is not 'forbidden' and not created by trendiGuru.
function _objIsInteresting(node){
    return (forbiddenHTMLTags.indexOf(node.tagName) === -1) && !(node.classList && node.classList.contains('fazz'));
}

let observe = (target, config = defaultConfig) => {
    let handleMutations = function (mutations) {
        let mutTypes = [];
        for (let mutation of mutations) {
            let mutTarget = mutation.target;
            //If object was added To DOM:
            if(mutation.type === 'childList'){
                //console.log("childL: "+mutation.attributeName);
                for(let addedNode of mutation.addedNodes){
                    scanForever(addedNode);
                }
            }
            //If in already existed object attribute was changed:
            if (mutation.type === 'attributes'){
                //console.log("attr: "+mutation.attributeName);
                //If src was changed (in image only):
                if (mutation.attributeName!='style' && mutTarget.tagName==='IMG'){
                    MUT.set(mutTarget, "src");
                    //executeFunc(mutTarget); 
                    sendToProccess(mutTarget);
                }
                else {
                    //if backgroundImage was changed:
                    let bckgndImg = mutTarget.style.backgroundImage;
                    if (bckgndImg && bckgndImg !== mutation.oldValue ){
                        if (_objIsInteresting(mutTarget)){
                            MUT.set(mutTarget, "attribute");
                            //executeFunc(mutTarget);
                            sendToProccess(mutTarget);
                        }
                    }
                }
            }
            mutTypes.push(mutation.type);
        }
        publishMutation(mutTypes);
    };
    let observer = new MutationObserver(handleMutations);
    observer.observe(target, config);
    return observer;
};


/*
For a given node, scan for relevant elements and then 
watch them for changes.
*/
let scanForever = (node) => {
    node = node || document.body;
    
    let parentElems = [];
    if(node.querySelectorAll){
        parentElems = node.querySelectorAll(USER_CONFIG.whitelist) || [];
    }

    let allElems = Array.from(parentElems);

    if (selectorMatches(node, USER_CONFIG.whitelist) && node !== document && node !== document.body) {
        allElems.push(node);
    }

    if (USER_CONFIG.whitelist !== '*') {
        for (let el of parentElems) {
            //add attribute observer
            // If notParentWhiteObject => Then 
            let mObserver = observe(el, 
                {subtree: true,
                 attributes: true,
                 attributeFilter: ['src', 'style']});
            MUT.set(mObserver, "observer"); 
            if(el.querySelectorAll){
                allElems = allElems.concat(Array.from(el.querySelectorAll('*')));
            }
        }
    }
    // if whiteList is empty => listen to all document.body
    else{
        if (node === document.body){
            let mObserver = observe(node, 
                {subtree: true,
                attributes: true,
                attributeFilter: ['src', 'style']});
            MUT.set(mObserver, "mainObserver"); 
        }
    }
    
    //Initial scan
    for (let el of allElems){
        // check el before executing.
        if (_objIsInteresting(el)){
            sendToProccess(el);
            MUT.set(el, "node");
        }
    }
};

let publishMutation = (mutKinds)=>{
    let mutIsSuitable = false;
    let len = mutKinds.length;
    let i = 0;
    if (len > 0){
        while (!mutIsSuitable && i<len){
            if(visibleMutTypes.indexOf(mutKinds[i]) !== -1){
                mutIsSuitable = true;
            }
            i++;
        }
    }
    if (mutIsSuitable){
        let ev = new CustomEvent(
            "suitableMutation", 
            {
                bubbles: true,
                cancelable: true
            }
        );
        window.dispatchEvent(ev);
    }
};

let sendToProccess = (elem)=>{
    let ev = new CustomEvent(
        "newElemToProcess", 
        {   detail: elem,
            bubbles: true,
            cancelable: true
        }
    );
    window.dispatchEvent(ev);
};

export  {scanForever, observe};