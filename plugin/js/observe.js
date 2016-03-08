import {console} from 'modules/smartConsole';

const forbiddenHTMLObjs = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];
let defaultConfig = {
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
    return (forbiddenHTMLObjs.indexOf(node.tagName) === -1) && !node.classList.contains('fazz');
}

function observe (target, executeFunc, config = defaultConfig) {
    let handleMutations = function (mutations) {
        for (let mutation of mutations) {
            //If object was added To DOM:
            if(mutation.type === 'childList'){
                for(let addedNode of mutation.addedNodes){
                    if(addedNode.querySelectorAll){
                        for (let el of addedNode.querySelectorAll('*')) {
                            if (_objIsInteresting(el)){
                                //console.log('was added: '+el.tagName);
                                MUT.nodeMut.push(el);
                                executeFunc(el);
                            }
                        } 
                    }
                }
            }
            //If in already exested object attribute was changed:
            if (mutation.type === 'attributes'){
                //If src was changed (in image only):
                if (mutation.attributeName!='style'){
                    if (mutation.target.tagName==='IMG'){
                        //console.log('src mutation in obj: '+mutation.target.tagName );
                        MUT.srcMut.push(mutation.target);
                        executeFunc(mutation.target);
                    }
                }else{
                    //if backgroundImage was chenged:
                    let bckgndImg = mutation.target.style.backgroundImage;
                    if (bckgndImg != '' && bckgndImg != null && bckgndImg != undefined && bckgndImg != mutation.oldValue ){
                        //console.log('//'+bckgndImg+'//'+mutation.oldValue+'//'+mutation.target);
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

export default observe;