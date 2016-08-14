/* eslint-disable console */

import {API_URL, PID} from 'constants';
import {STACKS} from 'modules/devTools';
import {Query, wait} from './utils';

let queue = Promise.resolve();

let urlStore = {
    state: {}, // dictionary of urls and thier relevany
    buffer: [], // array of urls to request from server
    /**
     * @param {string} url - URL of given image that we'd like to check if relevant
     * @returns {promise} - A promise that fullfils to a boolean of relevancy
     */
    append (url) {
        return new Promise(resolve => {
            if (this.state[url]) {
                resolve(this.state[url]);
            }
            this.buffer.push(url);
            if (!queue) {
                queue = wait(500)
                .then(() => checkRelevancy(this.buffer))
                .then(res => Object.assign(this.state, res))
                .then(() => resolve(this.state[url]));
            }
            queue.then(() => resolve(this.state[url]));
        });
    }
};

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
