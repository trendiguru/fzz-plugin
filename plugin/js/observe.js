import {selectorMatches} from 'modules/utils';
import constants from 'constants';
import {MUT, STACKS} from 'modules/devTools';
const {USER_CONFIG} = constants;
const forbiddenHTMLTags = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];
const defaultConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
};
const CHECK_INTERVAL = 1000;

let MutationObserver  = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserve;
let shouldCheck = true;
let followingMut = false;
 //list of mutation types which may influence on tgElements.
let visibleMutTypes =["childList",'attributes'];
STACKS.newStack("countAttrMuts");
STACKS.newStack("countCheckedMuts");

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
                    sendToProccess(mutTarget);
                }
                else {
                    //if backgroundImage was changed:
                    let bckgndImg = mutTarget.style.backgroundImage;
                    if (bckgndImg && bckgndImg !== mutation.oldValue ){
                        if (_objIsInteresting(mutTarget)){
                            MUT.set(mutTarget, "attribute");
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
        //"polling"
        STACKS.set("countAttrMuts", 1);
        if (shouldCheck){
            followingMut = false;
            shouldCheck = false;
            STACKS.set("countCheckedMuts", 1);
            setTimeout(()=>{
                // if at CHECK_INTERVAL pause any mutation was occurred => send an event one more time.
                // (prevents losing of important mutations (especially in carousels));
                if (followingMut){
                    suitableMutation();
                    STACKS.set("countCheckedMuts", 1);
                }
                shouldCheck = true;
            }, CHECK_INTERVAL);
            setTimeout(suitableMutation(), CHECK_INTERVAL/2);
        }
        else{
            followingMut = true;
        }
    }
};

let suitableMutation = ()=>{
    let ev = new CustomEvent(
        "suitableMutation",
        {
            bubbles: true,
            cancelable: true
        }
    );
    window.dispatchEvent(ev);
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
