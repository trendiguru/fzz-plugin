/* eslint-disable console */

import 'whatwg-fetch';
import {console} from 'modules/smartConsole';
import {STACKS} from 'modules/devTools';
import {buildQueryString} from 'modules/nginx_analytics';

const API_URL = 'https://extremeli.trendi.guru/api/images';
let serverBuffer = [];

let serverUploader;
export function smartCheckRelevancy(tgImg) {
    STACKS.set('smartCheckRelevancy_input', tgImg.element);
    serverBuffer.push(tgImg);
    console.log('SB length: ' + serverBuffer.length);

    if (!isAccumulating) {
        console.log('WILL ACCUMULATE');
        serverUploader = accumulate(500).then(function () {
            let p = checkRelevancy(serverBuffer.map((im) => im.url));
            serverBuffer = [];
            STACKS.set('smartCheckRelevancy', p);
            return p;
        });

    }

    return new Promise(function (resolve, reject) {
        serverUploader.then(function (response) {
            if (response.relevancy_dict[tgImg.url]) {
                tgImg.relevant = true;
                resolve(tgImg);
            } else {
                reject(tgImg);
            }
        });
    });
}

export function getImageData(imageUrl) {
    return fetch(API_URL+'?imageUrl=' + window.encodeURIComponent(imageUrl), {
        method: 'get'
    })
    .then(function (response) {
        return response.json();
    })
    .catch(function (err) {
        console.log(err);
    });
}

export function appendResultLink (result) {
    result.link = `http://links.trendi.guru/tr/web${result.redirection_path}?${buildQueryString('Result Clicked')}`;
    return result;
}

function checkRelevancy(imageUrls) {
    console.log('Will check relevancy of ${imageUrls.length} image urls.');
    return fetch(API_URL, {
        method: 'post',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
            pageUrl: window.location.href,
            imageList: imageUrls
        })
    })
    .then(function (response) {
        return response.json();
    })
    .catch(function (err) {
        console.log(err);
    });
}

let isAccumulating = false; //???
function accumulate(time, initialValue) {
    isAccumulating = true;
    console.log('FZZ: Set isAccumulating true');
    return new Promise(function (fulfill) {
        setTimeout(function () {
            isAccumulating = false;
            console.log('FZZ: Set isAccumulating false');
            fulfill(initialValue);
        }, time);
    });
}
