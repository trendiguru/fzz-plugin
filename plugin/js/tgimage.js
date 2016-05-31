/* eslint-disable no-console */
import {STACKS} from 'modules/devTools';
let s = STACKS;

class TGImage {
    constructor (elem, url) {
        this.element = elem;
        if (elem.nodeName == 'IMG') {
            this.url = url || elem.src || (location.origin + elem.srcset);
            s.set("TGImage", this);
        } else {
            //TODO: Get the size if possible
            this.url = url || this.backgroundImage;
            if (!this.url) {
                throw {
                    name: 'No Image found',
                    element: elem
                };
            }
        }
    }
    // from imagesLoaded
    getBackgroundImage() {
        var urls = [];
        // IE8
        var getStyle = window.getComputedStyle || function (elem) {
            return elem.currentStyle;
        };
        var style = getStyle(this.element);
        // get url inside url('...')
        var reURL = /url\(([''""])?(.*?)\1\)/gi;
        var matches = reURL.exec(style.backgroundImage);
        while (matches !== null) {
            var url = matches && matches[2];
            if (url) {
                urls.push(url);
            }
            matches = reURL.exec(style.backgroundImage);
        }
        if (urls.length > 1) {
            console.log('Too many background images');
        }
        return urls[0];
    }
}

export default TGImage;
