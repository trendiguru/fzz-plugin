import {API_URL} from 'constants';
import {preferences} from 'preferences';
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
        this.state = {};  // dictionary of urls and thier relevany
    }
    get lastBuffer () {
        let {buffers} = this;
        let lastBuffer = buffers[buffers.length - 1];
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
                lastBuffer.on('fulfill', res => resolve(res[url]));
            }
        });
    }
}

function checkRelevancy(imageUrls) {
    return fetch(API_URL + '?' + Query.stringify({method: preferences.api, pid: preferences.pid}), {
        method: 'POST',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
            pageUrl: window.location.href,
            imageList: imageUrls
        })
    })
    .then(res => res.json())
    .then(res => res.relevancy_dict);
}
