import {getDomainName} from 'modules/utils';
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


let FZZ = devTools.FZZ = {
	active: false,
	relevantImgs: {},
	irrelevantImgs: {},
	irrelevantElements: {},
	relevantImgsColor: "Red",
	irrelevantImgsColor: "green",
	irrelevantElementsColor: "black",
	set: (obj, key, mType, colorFlag)=>{
		let owner = devTools.FZZ; 
		if (owner.active === true){
			if (mType === "relevantImgs"){
				owner.relevantImgs[key] = obj;
				if (colorFlag === true){
					obj.style.opacity = "0.2";
					obj.style.backgroundColor = owner.relevantImgsColor;
				}
			}
			if (mType === "irrelevantImgs"){
				owner.irrelevantImgs[key] = obj;
				if (colorFlag === true){
					obj.style.opacity = "0.2";
					obj.style.backgroundColor = owner.irrelevantImgsColor;
				}
			}
			if (mType === "irrelevantElements"){
				let error = obj;
				let errName = error.name;
    			let errElement = error.element;
    			let errorCounts =  devTools.FZZ.irrelevantElements[errName] || {};
    			let errorCountforElem = errorCounts[errElement] || 0;
    			errorCountforElem += 1;
				// if (colorFlag === true){
				// 	obj.style.opacity = "0.2";
				// 	obj.style.backgroundColor = owner.irrelevantImgsColor;
				// }
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
}

//______ective_functions______//

devTools.modules = {};
let utils = devTools.modules.utils = {};
utils.getDomainName = getDomainName;


// let MARK = devTools.markImages = {
// 	active: false,
// 	relevantImgsColor: "Red",
// 	irrelevantImgsColor: "green",
// 	irrelevantElementsColor: "black",
// 	set: (img, mType) => {
// 		let owner = devTools.markImages;
// 		if (owner.active === true){
// 			img.style.opacity = "0.2";
// 			if (mType === "relevantImgs"){
// 				img.style.backgroundColor = owner.relevantImgsColor;
// 			}
// 			if (mType === "irrelevantImgs"){
// 				img.style.backgroundColor = owner.irrelevantImgsColor;
// 			}
// 			if (mType === "irrelevantElements"){
// 				img.style.backgroundColor = owner.irrelevantImgsColor;
// 			}
// 		}
// 	}
// };

export {MUT, FZZ, REQUESTS, devTools};