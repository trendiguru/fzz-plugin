

//TODO: add to this object also FZZ object and MUT object.
const devTools = window.devTools = window.devTools || {};

devTools.markImages = {
	active: true,
	relevantImgsColor: "Red",
	irrelevantImgsColor: "green",
	irrelevantElementsColor: "black", 
	relevantImgs: [],
	irrelevantImgs: [],
	irrelevantElements: [],
	set: (img, mType) => {
		if (this.active === true){
			img.style.opacity = "0.2";
			if (mType === "relevantImgs"){
				img.style.backgroundColor = this.relevantImgsColor;
			}
			if (mType === "irrelevantImgs"){
				img.style.backgroundColor = this.irrelevantImgsColor;
			}
			if (mType === "irrelevantElements"){
				img.style.backgroundColor = this.irrelevantImgsColor;
			}
		}
	}
};


devTools.MUT = {
	active: true,
	srcMut: [],
	nodeMut: [],
	attrMut: [],
	mainObserver: {},
	observers: {},
	set: (obj, mType)=>{
		if (this.active === true){
			if (mType === "node"){
				this.nodeMut.push(obj);
			}
			if (mType === "attribute"){
				this.attrMut.push(obj);
			}
			if (mType === "src"){
				this.srcMut.push(obj);
			}
		}
	}
};


devTools.FZZ = {
	active: false;
	FZZ.relevantImgs: {},
	FZZ.irrelevantImgs: {},
	FZZ.irrelevantElements: {},
	set: (obj, key, mType)=>{
		if (this.active === true){
			if (mType === "relevantImgs"){
				this.relevantImgs[key] = obj;
			}
			if (mType === "irrelevantImgs"){
				this.irrelevantImgs[key] = obj;
			}
			if (mType === "irrelevantElements"){
				this.irrelevantElements[key] = obj;
			}
		}
	}

};




export {devTools};