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
const trackedTargets = window.trackedTargets || {};

let whiteList = undefined;
let blackList = undefined;

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
                            MUT.nodeMut.push(el);
                            console.log('mutation was added: '+el.tagName);
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
                        if (_objIsInteresting(mutTarget) || (whiteList!==undefined && isWhite(mutTarget))){
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

function customObserve(target, executeFunc, config = defaultConfig, whlist ){
    let whList = whList || whiteList;
    if (whList === undefined){
        observe(target, executeFunc, config = defaultConfig)
    }else{
        let config = {
            childList: true,
            subtree: true,
        };
        let observerGenerator = (target)=>{
            trackedTargets.target.className = target;
            console.log("create sub observer");
            observe(target, executeFunc);
        };
        observe(target, observerGenerator);
    } 
}

export default customObserve;