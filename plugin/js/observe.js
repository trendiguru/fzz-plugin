import {getElementsToProcess} from 'modules/utils';
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

let whiteList = [];
let blackList = [];

// Object is 'interesting' only if it is not 'forbidden' and not created by trendiGuru.
function _objIsInteresting(node){
    return (forbiddenHTMLTags.indexOf(node.tagName) === -1) && !(node.classList && node.classList.contains('fazz'));
}

function _isWhite(node){
    return (whiteList.indexOf(node.className) !== -1) && !(node.classList && node.classList.contains('fazz'));
}

function observe (target, executeFunc, config = defaultConfig) {
    let handleMutations = function (mutations) {
        for (let mutation of mutations) {
            //If object was added To DOM:
            if(mutation.type === 'childList'){
                for(let addedNode of mutation.addedNodes){
                    let allElems = getElementsToProcess(addedNode, USER_CONFIG.whitelist);
                    
                    for (let el of allElems) {
                        if (_objIsInteresting(el)){
                            //console.log('was added: '+el.tagName);
                            MUT.nodeMut.push(el);
                            executeFunc(el);
                        }
                    } 
                }
            }
            //If in already exested object attribute was changed:
            if (mutation.type === 'attributes'){
                let mutTarget = mutation.target;
                //If src was changed (in image only):
                if (mutation.attributeName!='style' && mutTarget.tagName==='IMG'){
                    MUT.srcMut.push(mutTarget);
                    executeFunc(mutTarget); 
                }
                else {
                    //if backgroundImage was changed:
                    let bckgndImg = mutTarget.style.backgroundImage;
                    if (bckgndImg && bckgndImg !== mutation.oldValue ){
                        if (_objIsInteresting(mutTarget) || (whiteList && isWhite(mutTarget))){
                            MUT.attrMut.push(mutTarget);
                            executeFunc(mutTarget);
                        }
                    }
                }
            }
        }
    };
    let observer = new MutationObserver(handleMutations);
    observer.observe(target, config);
    return observer;
}

function customObserve(target, executeFunc, whitelist = null, config = defaultConfig){
    if (!WhiteList){
        observe(target, executeFunc, config = defaultConfig)
    }else{
        let config = {
            childList: true,
            subtree: true,
        };
        let observerGenerator = (target)=>{
            observe(target, executeFunc);
        };
        observe(target, observerGenerator);
    } 
}

export default customObserve;