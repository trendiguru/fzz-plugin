/* eslint-disable no-console */

import {MIN_IMG_WIDTH, MIN_IMG_HEIGHT} from 'constants';
import imagesLoaded from 'imagesloaded';
import {smartCheckRelevancy} from 'modules/server';
// import {smartCheckRelevancy, getImageData} from 'modules/server';
import TGImage from './tgimage';
import {STACKS} from 'modules/devTools';

let s = STACKS;
let processQueue = [];

export let relevantImgs = {},
    irrelevantImgs = {},
    irrelevantElements = {};

export function process (el, callback) {
    s.set('process', el);
    return Promise.resolve(el)
        .then(el => new TGImage (el))
        .then(isNew)
        .then(isLoaded)
        .then(isSuspicious)
        .then(smartCheckRelevancy)
        // .then(getData)
        .then(
        relevantImg => {
            let date = new Date();
            console.log(`${date}: Found Relevant!: ${relevantImg.url}`);
            s.set('relevantImg', relevantImg.element);
            //TODO: check if not already in processQueue (in process) if so =>
            //remove from processQueue and do nothing.
            callback(relevantImg);
        },
        irrelevantImg => {
            // This will only have a url if it returns from smartRelevacyCheck as irrelevant,
            // the others will arrive as {name: nnn, element:eee} error objects.
            if (irrelevantImg.url) {
                s.set('irrelevantImg', irrelevantImg.element);
            } else {
                logIrrelevant(irrelevantImg);
            }
        });
}

function isNew (tgImg) {
    //if the obtainable object is already wrapped by fzz div => is not new.
    //TODO:define fzz classList in constans
    let isWrapped = (element)=>{
        if (!element.classList.includes("fzz_overlay")){
            let children = element.parentElement.childNodes;
            children.forEach((child)=>{
                if (child.classList && Array.from(child.classList).includes("fzz_overlay")){
                    return true;
                }
            });
        }
        return false;
    }
    if (isWrapped(tgImg.element)) {
        throw {
            name: 'Not a New Image',
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

function logIrrelevant(error) {
    //console.log('reached logIrrelevant');
    let errName = error.name;
    let errElement = error.element;
    let errorCounts = irrelevantElements[errName] = irrelevantElements[errName] || {};
    let errorCountforElem = errorCounts[errElement] = errorCounts[errElement] || 0;
    errorCountforElem += 1;
    s.set('logIrrelevant', error);
}
