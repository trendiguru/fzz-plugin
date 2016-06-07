import {getDomainName, entries} from 'modules/utils';
const devTools = window.devTools || {};


let active = true; //TODO: get "ective" variable from the current environment variable.
let OPACITY = "0.01";
window.devTools = devTools;
let MUT = devTools.MUT = devTools.MUT || {
	active: active,
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

let REQUESTS = devTools.REQUESTS = devTools.REQUESTS || {
	active: active,
	queue: [],
	set: (reuestProperties, mType) => {
		if (REQUESTS.active){
			if (mType === "property"){
				REQUESTS.queue.push(reuestProperties);
			}
		}
	}
};

let STACKS = devTools.STACKS = devTools.STACKS || {
	active: active,
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
							elem.style.opacity = OPACITY;
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
							elem.style.opacity = OPACITY;
							elem.style.backgroundColor = undefined;
						}
					}
				}
			}
		}
	}
};

let s = STACKS;
if (active){
//______STACKS_definition_____//
	s.newStack("isNew");
	s.newStack("isLoaded");
	s.newStack("isSuspicious");
	s.newStack("TGImage");
	s.newStack("smartCheckRelevancy");
	s.newStack("process");
	s.newStack("relevantImg");
	s.newStack("irrelevantImg");
	s.newStack("logIrrelevant");
	s.newStack("smartCheckRelevancy_input");

	//______ective_functions______//
	devTools.modules = {};
	let utils = devTools.modules.utils = {};
	utils.getDomainName = getDomainName;
}

devTools.coloredReport = ()=>{
	let defaultColor  = s.sColor;
	s.sColor = "yellow";
	s.show("smartCheckRelevancy_input");
	s.sColor = "green";
	s.show("relevantImg");
	s.sColor = "red"
	s.show("irrelevantImg");
	s.sColor = defaultColor;
};
devTools.clrscrn = ()=>{
	for (key in s.storage){
		s.hide(key);
	}
};

export {MUT, REQUESTS, STACKS, devTools};
