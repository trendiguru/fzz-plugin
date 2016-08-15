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
}

export default TGImage;
