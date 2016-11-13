/* eslint-disable no-console */
import {STACKS} from 'modules/devTools';
import {getBackgroundImage} from 'modules/utils';
let s = STACKS;

class TGImage {
    constructor (elem, url) {
        this.element = elem;
        if (elem.nodeName == 'IMG') {
            this.url = url || elem.src || (location.origin + elem.srcset);
            s.set("TGImage", this);
        } else {
            //TODO: Get the size if possible
            this.url = url || getBackgroundImage(this.element);
            if (!this.url) {
                throw {
                    name: 'No Image found',
                    element: elem
                };
            }
        }
    }
    static isTGButton (el) {
        if (el === undefined || el.classList === undefined) return false;
        if (Array.from(el.classList).includes('fzz-button') && el.tagName === 'BUTTON') {
            return true;
        }
        return false;
    }
}

export default TGImage;
