/* eslint-disable console */

import {API_URL, PID} from 'constants';
import {STACKS} from 'modules/devTools';

let serverBuffer = [];
let serverUploader;

export function smartCheckRelevancy(tgImg) {
    STACKS.set('smartCheckRelevancy_input', tgImg.element);
    serverBuffer.push(tgImg);
    if (!isAccumulating) {
        serverUploader = accumulate(500).then(() => {
            let p = checkRelevancy(serverBuffer.map((im) => im.url));
            serverBuffer = [];
            STACKS.set('smartCheckRelevancy', p);
            return p;
        });

    }
    return new Promise((resolve, reject) => {
        serverUploader.then(res => {
            if (res.relevancy_dict[tgImg.url]) {
                tgImg.relevant = true;
                resolve(tgImg);
            } else {
                reject(tgImg);
            }
        });
    });
}

export function getImageData(imageUrl) {
    return fetch(`${API_URL}?imageUrl=${encodeURIComponent(imageUrl)}&PID=${PID}`)
    .then(res => res.json());
}

function checkRelevancy(imageUrls) {
    return fetch(`${API_URL}?PID=${PID}`, {
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
    .then(res => res.json());
}

let isAccumulating = false; //???
function accumulate(time, initialValue) {
    isAccumulating = true;
    return new Promise(function (fulfill) {
        setTimeout(function () {
            isAccumulating = false;
            fulfill(initialValue);
        }, time);
    });
}
