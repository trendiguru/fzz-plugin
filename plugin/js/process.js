/* eslint-disable no-console */

import {MIN_IMG_WIDTH, MIN_IMG_HEIGHT} from 'constants';
import imagesLoaded from 'imagesloaded';
import {smartCheckRelevancy} from 'modules/server';
// import {smartCheckRelevancy, getImageData} from 'modules/server';
import TGImage from './tgimage';
import {STACKS} from 'modules/devTools';

let s = STACKS;
let processQueue = {};

function isQueued (tgImg) {
    s.newStack('isQueued_input', tgImg.element);
    if (processQueue[tgImg.url]) {
        throw {
            name: 'already in process',
            tgImg
        };
    }
    else {
        processQueue[tgImg.url] = tgImg;
        return tgImg;
    }
}

function deleteFromQueue (tgImg) {
    if (tgImg) {
        delete processQueue[tgImg.url];
    }
    return tgImg;
}

export let irrelevantImgs = {},
    irrelevantElements = {};

export function process (el, callback) {
    s.set('process', el);
    return Promise.resolve(el)
        .then(el => new TGImage (el))
        .then(isQueued)
        .then(isNew)
        .then(isLoaded)
        .then(isSuspicious)
        .then(smartCheckRelevancy)
        // .then(getData)
        .then(relevantImg => {
            let date = new Date();
            console.log(`${date}: Found Relevant!: ${relevantImg.url}`);
            s.set('relevantImg', relevantImg.element);
            //TODO: check if not already in processQueue (in process) if so =>
            //remove from processQueue and do nothing.
            callback(relevantImg);
            return relevantImg;
        })
        .catch(irrelevantImg => {
            // This will only have a url if it returns from smartRelevacyCheck as irrelevant,
            // the others will arrive as {name: nnn, element:eee} error objects.
            if (irrelevantImg.url) {
                irrelevantImgs[irrelevantImg.url] = irrelevantImg;
                s.set('irrelevantImg', irrelevantImg.element);
                return irrelevantImg;
            } else {
                s.set('logIrrelevant', irrelevantImg);
            }
        })
        .then(deleteFromQueue);
}

function isNew (tgImg) {
    if (tgImg.element.matches('.fzz_wrap *') || irrelevantImgs[tgImg.url]) {
        throw {
            name: 'Not a New Element',
            element: tgImg
        };
    }
    else {
        s.set('isNew', tgImg);
    }
    //processQueue.push(tgImg.element);
    return tgImg;
}

function isLoaded (tgImg) {
    return new Promise(function (resolve, reject) {
        let iml = imagesLoaded(tgImg.element, {
            background: tgImg.background
        });
        iml.on('done', () =>{
            s.set('isLoaded', tgImg);
            resolve(tgImg);});
        iml.on('fail', () => reject({
            name: 'Image Load Failed',
            element: tgImg
        }));
    });
}

function isSuspicious (tgImg) {
    let rect = tgImg.element.getBoundingClientRect();
    if (rect.height >= MIN_IMG_HEIGHT && rect.width >= MIN_IMG_WIDTH) {
        s.set('isSuspicious', tgImg);
        return tgImg;
    } else {
        throw {
            name: 'Too Small',
            element: tgImg
        };
    }
}

// function getData (tgImg) {
//     return getImageData(tgImg.url).then(data => {
//         tgImg.data = data;
//         return tgImg;
//     });
// }
