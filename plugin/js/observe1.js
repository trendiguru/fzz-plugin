import {console} from 'modules/smartConsole';

const blackList = ['TEXT', 'TIME', 'SCRIPT', 'SPAN', 'A', 'UL', 'LI','INPUT'];
const defConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
};
const MUT = window.MUT = window.MUT || {};
MUT.srcMut = [];
MUT.nodeMut = [];
MUT.attrMut = [];


class motationTracker {
	constructor(target, executeFunc, config){
		this.muteTarget = target;
		this.executor = executeFunc;
		this.config = config || defConfig;
		this.blackList = blackList;
        this.mutObserver = null;
	}

	observe (target, executeFunc, config = defaultConfig) {
        let handleMutations = (mutations) => {
            for (let mutation of mutations) {
                //If object was added To DOM:
                if(mutation.type === 'childList'){
                    for(let addedNode of mutation.addedNodes){
                	   let components = let el of addedNode.querySelectorAll('*')
                        if (components){
                            for (let el of components)) {
                                if (_isInteresting(el)){
                                    MUT.nodeMut.push(el);
                                    executeFunc(el);
                                }
                            } 
                        }
                    }
                }
                //If in an already exested object attribute was changed:
                let mutTarget = mutation.target;
                if (mutTarget === 'attributes'){
                    //If src was changed (in image only):
                    if (mutation.attributeName!='style'){
                        if (mutTarget.tagName==='IMG'){
                            MUT.srcMut.push(mutTarget);
                            executeFunc(mutTarget);
                        }
                    }else{
                        //if backgroundImage was chenged:
                        let bckgndImg = mutTarget.style.backgroundImage;
                        if (bckgndImg != '' && bckgndImg != null && bckgndImg != undefined && bckgndImg != mutation.oldValue ){
                            if (_isInteresting(mutTarget)){
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
        this.mutObserver = observer;
    }

    _isInteresting(node){
        return (forbiddenHTMLObjs.indexOf(node.tagName) === -1) && !node.classList.contains('fazz');
    }
}