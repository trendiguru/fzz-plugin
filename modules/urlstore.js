import {API_URL, API, PID, INITIAL_URL_STATE} from 'constants';
import {Query} from './utils';
import ActionBuffer from './actionbuffer';

class URLBuffer extends ActionBuffer {
    constructor () {
        super(checkRelevancy, 20, 500);
    }
}

export default class URLStore {
    constructor () {
        this.buffers = [new URLBuffer]; // array of urls to request from server
        this.state = INITIAL_URL_STATE || {};  // dictionary of urls and thier relevany
    }
    get lastBuffer () {
        let {buffers, buffers: {
            [buffers.length - 1]: lastBuffer}
        } = this;
        if (lastBuffer.accumulating) {
            return lastBuffer;
        }
        else {
            buffers.push(new URLBuffer);
            return buffers[buffers.length - 1];
        }
    }
    /**
     * @param {string} url - URL of given image that we'd like to check if relevant
     * @returns {promise} - A promise that fullfils to a boolean of relevancy
     */
    append (url) {
        return new Promise(resolve => {
            if (this.state[url]) {
                resolve(this.state[url]);
            }
            else {
                let {lastBuffer} = this;
                lastBuffer.append(url);
                lastBuffer.on('fulfill', res => resolve(Object.assign(this.state, res)[url]));
            }
        });
    }
}

/**
 * Check wheter each image url is relevant to draw a button on
 * @param imageUrls {array}
 * @returns relevency_dict {array}
 */
function checkRelevancy(imageUrls) {
    return fetch(API_URL + '?' + Query.stringify({method: API, pid: PID}), {
        method: 'POST',
        body: JSON.stringify({
            pageUrl: window.location.href,
            imageList: imageUrls
        })
    })
    .then(res => res.json())
    .then(res => res.relevancy_dict);
}
