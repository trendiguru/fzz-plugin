import {getDomainName, entries} from 'modules/utils';
const devTools = window.devTools = window.devTools || {};


let MUT = devTools.MUT = {
	active: false,
	srcMut: [],
	nodeMut: [],
	attrMut: [],
	mainObserver: [],
	observers: [],
	set: (obj, mType)=>{
		let owner = devTools.MUT;
		if (owner.active === true){
			if (mType === "node"){
				owner.nodeMut.push(obj);
			}
			if (mType === "attribute"){
				owner.attrMut.push(obj);
			}
			if (mType === "src"){
				owner.srcMut.push(obj);
			}
			if (mType === "mainObserver"){
				owner.mainObserver.push(obj);
			}
			if (mType === "observer"){
				owner.observers.push(obj);
			}
		}
	}
};

let REQUESTS = devTools.REQUESTS = {
	active: false,
	queue: [],
	set: (reuestProperties, mType) => {
		if (REQUESTS.active){
			if (mType === "property"){
				REQUESTS.queue.push(reuestProperties);
			}
		}
	}
};

let STACKS = devTools.STACKS={
	active: false,
	storage: {},
	sColor:"RED",
	newStack: (name)=>{
		if (STACKS.active){
			STACKS.storage[name] = [];
		}
	},
	set: (sName, elem)=>{
		if (STACKS.active){
			STACKS.storage[sName].push(elem);
		}
	},
	show: (sName, col)=>{
		if (STACKS.active){
			for (let [key, stack] of entries(STACKS.storage)) {
				if (sName === key){
					for (let elem of stack){
						if (elem!==undefined && elem.style !== undefined){
							elem.style.opacity = "0.2";
							elem.style.backgroundColor =col || STACKS.sColor;
						}
					}
				}
			}
		}
	},
	hide:(sName)=>{
		if (STACKS.active){
			for (let [key, stack] of entries(STACKS.storage)) {
				if (sName === key){
					for (let elem of stack){
						if (elem!==undefined && elem.style !== undefined){
							elem.style.opacity = "1";
							elem.style.backgroundColor = undefined;
						}
					}
				}
			}
		}
	}

};

//______ective_functions______//

devTools.modules = {};
let utils = devTools.modules.utils = {};
utils.getDomainName = getDomainName;

export {MUT, REQUESTS, STACKS, devTools};