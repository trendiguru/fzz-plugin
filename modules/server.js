/* eslint-disable console */

import {API_URL, PID} from 'constants';
import {STACKS} from 'modules/devTools';
import {Query, wait} from './utils';

let urlStore = {
    buffer: [],
    state: {},
    append (url) {
        this.buffer.push(url);
        return wait(500)
        .then(() => {
            let tempBuffer = [...this.buffer];
            this.buffer = [];
            return checkRelevancy(tempBuffer);
        })
        .then(res => Object.assign(this.state, res))
        .then(res => res[url]);
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
