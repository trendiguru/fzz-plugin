import {selectorMatches} from 'modules/utils';
import constants from 'constants';
const {USER_CONFIG} = constants;


const forbiddenHTMLTags = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];
const defaultConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
};

const MUT = window.MUT = window.MUT || {};
MUT.srcMut = [];
MUT.nodeMut = [];
MUT.attrMut = [];

let mutObserver = {};

// Object is 'interesting' only if it is not 'forbidden' and not created by trendiGuru.
function _objIsInteresting(node){
    return (forbiddenHTMLTags.indexOf(node.tagName) === -1) && !(node.classList && node.classList.contains('fazz'));
}

mutObserver.observe = (target, executeFunc, config = defaultConfig) => {
    let handleMutations = function (mutations) {
        for (let mutation of mutations) {
            //If object was added To DOM:
            if(mutation.type === 'childList'){
                for(let addedNode of mutation.addedNodes){
                    scanForever(addedNode, executeFunc);
                }
            }
            //If in already exested object attribute was changed:
            if (mutation.type === 'attributes'){
                //If src was changed (in image only):
                if (mutation.attributeName!='style' && mutation.target.tagName==='IMG'){
                    //console.log('src mutation in obj: '+mutation.target.tagName );
                    MUT.srcMut.push(mutation.target);
                    executeFunc(mutation.target); 
                }
                else {
                    //if backgroundImage was changed:
                    let bckgndImg = mutation.target.style.backgroundImage;
                    if (bckgndImg && bckgndImg !== mutation.oldValue ){
                        if (_objIsInteresting(mutation.target)){
                            MUT.attrMut.push(mutation.target);
                            executeFunc(mutation.target);
                        }
                    }
                }
            }
        }
    };
    let observer = new MutationObserver(handleMutations);
    observer.observe(target, config);
    return observer;
};


mutObserver.scanForever = (node, executeFunc) => {
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
            observe(el, 
                {subtree: true,
                 attributes: true,
                 attributeFilter: ['src', 'style']},executeFunc);
            if(el.querySelectorAll){
                allElems = allElems.concat(Array.from(el.querySelectorAll('*')));
            }
        }
    }
    // if whiteList is empty => listen to all document.body
    else{
        observe(node, 
            {subtree: true,
             attributes: true,
             attributeFilter: ['src', 'style']},executeFunc);
    }
    console.log('FZZ: Will check ' + allElems.size + ' items.');
    for (let el of allElems){
        // check el before executing.
        if (_objIsInteresting(el)){
            executeFunc(elem);
            MUT.nodeMut.push(elem);
        }
    }
    //return new Set(allElems);
};

export default mutObserver;