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

// Object is 'interesting' only if it is not 'forbidden' and not created by trendiGuru.
function _objIsInteresting(node){
    return (forbiddenHTMLTags.indexOf(node.tagName) === -1) && !(node.classList && node.classList.contains('fazz'));
}

function observe (target, executeFunc, config = defaultConfig) {
    let handleMutations = function (mutations) {
        for (let mutation of mutations) {
            //If object was added To DOM:
            if(mutation.type === 'childList'){
                // for(let addedNode of mutation.addedNodes){
                //     let allElems = getElementsToProcess(addedNode, USER_CONFIG.whitelist);   
                //     for (let el of allElems) {
                //         if (_objIsInteresting(el)){
                //             //console.log('was added: '+el.tagName);
                //             MUT.nodeMut.push(el);
                //             executeFunc(el);
                //         }
                //     } 
                // }
                //executeFunc(mutation.addedNodes);
                for(let addedNode of mutation.addedNodes){
                    watchForTgSourses(addedNode, whiteList, executeFunc){
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
}


//----------------------test--------------------------------

let whiteList = ["body"];

function watchForTgSourses(node, whiteList, executeFunc){
    //the function obtains node, whiteList and executefunction.
    //1. scans all child objects of the obtainable Node.
    //2. adds to it Observer (which listens to all mutations: add and attributes) but only if them are in whiteList.

    //-----getElementsToProcess(node, whiteList) function gets node and list of selectors----------//
    // returns list of child objects of the obtainable node (include the node itself if it is "suitable" (in whiteList)), 
    // if whiteList is empty => returns empty list, 
    // if you track all page you need add a "body" selector to white list. in this case 
    // the function will return list with only document.body in it. 
    // if a selector is "*" will return ALL objects.
    let tgSourses = getElementsToProcess(node, whiteList);
    for (let tgSourse of tgSourses){
        let elems = getElementsToProcess(tgSourse, ["*"]);
        for (let elem of elems){
            if (_objIsInteresting(el)){
                executeFunc(elem);
                MUT.nodeMut.push(elem);
            }
            // here we set an mutation observer for each tgSourse 
        Observe(tgSourse, 
                {childList: true, 
                subtree: true,
                attributes: true,
                attributeFilter: ['src', 'style']},
                executeFunc);// execute function is differen for attributes and for adding now:((((( try think how to repair it!!!!
        }

    }
}



//----------------------------------------------------------

export default observe;