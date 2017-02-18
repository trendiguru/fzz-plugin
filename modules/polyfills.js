// ECMAScript

//
// returns a list of all elements under the cursor
//
function elementsFromPoint(x,y) {
    console.log('start elements from point.');
	var elements = [], previousPointerEvents = [], current, i, d;

        // get all elements via elementFromPoint, and remove them from hit-testing in order
	while ((current = document.elementFromPoint(x,y)) && elements.indexOf(current)===-1 && current != null) {
          
            // push the element and its current style
		elements.push(current);
		previousPointerEvents.push({
                value: current.style.getPropertyValue('pointer-events'),
                priority: current.style.getPropertyPriority('pointer-events')
            });
          
            // add "pointer-events: none", to get to the underlying element
		current.style.setProperty('pointer-events', 'none', 'important'); 
	}

        // restore the previous pointer-events values
	for(i = previousPointerEvents.length; d=previousPointerEvents[--i]; ) {
		elements[i].style.setProperty('pointer-events', d.value?d.value:'', d.priority); 
	}
      
        // return our results
	return elements;
}
if (!document.elementsFromPoint) {
    document.elementsFromPoint = (document.msElementsFromPoint)? document.msElementsFromPoint: elementsFromPoint;
}

if (!Object.entries) {
    Object.entries = function* (obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    };
}

if (!Object.values) {
    Object.values = function* (obj) {
        for (let key of Object.keys(obj)) {
            yield obj[key];
        }
    };
}

// DOM API

if (!Element.prototype.matches) {
    let {webkitMatchesSelector, mozMatchesSelector, msMatchesSelector} = Element.prototype;
    Element.prototype.matches = webkitMatchesSelector || mozMatchesSelector || msMatchesSelector || function (selector) {
        return Array.from(document.querySelectorAll(selector)).indexOf(this) !== -1;
    };
}

if (!window.getComputedStyle) {
    window.getComputedStyle = (elem) => elem.currentStyle;
}

// IE 11 node.remove

 if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
