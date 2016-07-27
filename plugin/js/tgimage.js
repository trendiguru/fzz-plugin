/* eslint-disable no-console */
import {STACKS} from 'modules/devTools';
import {getBackgroundImage} from 'modules/utils';
let s = STACKS;

class TGImage {
    constructor (element, url) {
        Object.assign(this, {element});
        if (element.nodeName == 'IMG') {
            this.url = url || element.src || (location.origin + element.srcset);
        } else {
            //TODO: Get the size if possible
            this.url = url || getBackgroundImage(element);
            if (!this.url) {
                throw {
                    name: 'No Image found',
                    element
                };
            }
        }
        s.set('TGImage', this);
    }
}

export default TGImage;
