/* eslint-disable console */

import {API_URL, PID} from 'constants';
import {STACKS} from 'modules/devTools';
import {Query} from './utils';

let urlStore = {
    state: {}, // dictionary of urls and thier relevany
    buffers: [], // array of buffers
    /**
     * @param {string} url - URL of given image that we'd like to check if relevant
     * @returns {promise} - A promise that fullfils to a boolean of relevancy
     */
    get lastBuffer () {
        let lastBuffer = this.buffers[this.buffers.length - 1];
        if (lastBuffer && lastBuffer.accumulating) {
            return lastBuffer;
        }
        else {
            let buffer = new Buffer(checkRelevancy, 500);
            buffer.on('fulfill', res => Object.assign(this.state, res));
            return this.buffers[this.buffers.push(buffer)];
        }
    },
    append (url) {
        this.state.url = true;
        return new Promise((resolve, reject) => {
            if (this.state[url]) {
                resolve(this.state[url]);
            }
            else {
                let {lastBuffer} = this;
                lastBuffer.append(url);
                lastBuffer.on('fulfill', () => resolve(this.state[url]));
                lastBuffer.on('error', reject);
            }
        });
    }
};

function Buffer (action, timeout) {
    Object.assign(this, {
        listeners: {
            fulfill: [],
            error: []
        },
        accumulating: true,
        launch () {
            this.accumulating = false;
            Promise.resolve(action(Array.from(this)))
            .then(res => {
                for (let callback of this.listeners.fulfill) {
                    callback(res);
                }
            })
            .catch(err => {
                for (let callback of this.listeners.error) {
                    callback(err);
                }
            });
        },
        append (element) {
            if (this.push(element) == 20) {
                this.launch();
            }
        },
        on (event, callback) {
            this.listeners[event].push(callback);
        }
    });
    setTimeout(this.launch.bind(this), timeout);
}

Buffer.prototype = Object.create(Array.prototype);

export function smartCheckRelevancy(url) {
    return urlStore.append(url);
}

export function getImageData(imageUrl) {
    return fetch(API_URL + '?' + Query.stringify({
        imageUrl,
        PID
    }))
    .then(res => res.json());
}

function checkRelevancy(imageUrls) {
    return fetch(API_URL + '?' + Query.stringify({PID}), {
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
