/* eslint-disable no-console */

import {MIN_IMG_WIDTH, MIN_IMG_HEIGHT, LOADING_TIMEOUT} from 'constants';
import imagesLoaded from 'imagesloaded';
import {smartCheckRelevancy} from 'modules/server';
// import {smartCheckRelevancy, getImageData} from 'modules/server';
import TGImage from './tgimage';
import {makeContentBlock} from './draw';
import {STACKS} from 'modules/devTools';
import {Loading} from './elements';
import {getImageData} from 'modules/server';

let s = STACKS;

export let relevantImgs = {},
    irrelevantImgs = {},
    irrelevantElements = {};

export function process (el, callback) {
    s.set('process', el);
    return Promise.resolve(el)
        .then(isProcessed)
        .then(el => new TGImage (el))
        .then(isNew)
        .then(isLoaded)
        .then(isSuspicious)
        .then(addContentBlock)
        .then(drawLoading)
        .then(isRelevant)
        .then(removeLoading)
        .then(relevantImg => {
            dispatchEvent(new CustomEvent('button will be drawn'));
            let date = new Date();
            console.log(`${date}: Found Relevant!: ${relevantImg.url}`);
            relevantImgs[relevantImg.url] = relevantImg;
            s.set('relevantImg', relevantImg.element);
            callback(relevantImg);
        })
        .catch(err => {
            // This will only have a url if it returns from smartRelevacyCheck as irrelevant,
            // the others will arrive as {name: nnn, element:eee} error objects.
            if (err.element && err.element.url) {
                irrelevantImgs[err.element.url] = err.element;
                removeContentBlock(err.element);
                s.set('irrelevantImg', err.element.element);
            } else {
                logIrrelevant(err);
            }
        });
}

function isProcessed (element) {
    if (!element.matches) {
        throw {
            name: 'Not a relevant element',
            element: element
        };
    }
    if (element.matches('.fzz-wrap, .fzz-wrap > *')) {
        throw {
            name: 'Proccessed element',
            element
        };
    }
    s.set('isProcessed', element);
    return element;
}

function isNew (tgImg) {
    if (tgImg.url in relevantImgs || tgImg.url in irrelevantImgs) {
        throw {
            name: 'Not a New Image',
            element: tgImg
        };
    }
    else {
        s.set('isNew', tgImg);
    }
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

let passedCheckRelevancy = false;

function isRelevant (tgImg) {
    return smartCheckRelevancy(tgImg.url).then(res => {
        if (res) {
            if (!passedCheckRelevancy) {
                passedCheckRelevancy = true;
                dispatchEvent(CustomEvent('recieved results'));
            }
            s.set('smartCheckRelevancy', tgImg);
            return tgImg;
        }
        else {
            s.set('smartCheckRelevancy_input', tgImg.element);
            throw {
                name: 'Not a Relevant Element',
                element: tgImg
            };
        }
    });
}

function logIrrelevant(error) {
    //console.log('reached logIrrelevant');
    let errName = error.name;
    let errElement = error.element;
    let errorCounts = irrelevantElements[errName] = irrelevantElements[errName] || {};
    let errorCountforElem = errorCounts[errElement] = errorCounts[errElement] || 0;
    errorCountforElem += 1;
    s.set('logIrrelevant', error);
}

/*The function will observe deletitions from DOM and update relevantImgs dict
  up to this changes.*/
export function cleanRelevantImgDict(){
    let clean = (el) => {
        try{
            let tgImg = new TGImage(el);
            if ( tgImg.url !== undefined && (tgImg.url in relevantImgs)){
                delete relevantImgs[tgImg.url];
                delete irrelevantImgs[tgImg.url];
            }
        }
        catch(e){
            s.set('cleanRelevantImgDict_log', e);
        }
    };
    let observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            for (let node of mutation.removedNodes) {
                //if it is realy deletet from dom and not replaced!
                if (node.parentElement === null){
                    clean(node);
                    if (node.querySelectorAll){
                        for (let el of node.querySelectorAll('*')){
                            clean(el);
                        }
                    }
                }
            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

let addContentBlock = (tgImg) => Object.assign(tgImg, {
    contentBlock: tgImg.contentBlock || makeContentBlock(tgImg.element)
});

function drawLoading (tgImg) {
    if (!window['fzz-loading'] && !tgImg.contentBlock.querySelector('.fzz-loading')) {
        tgImg.contentBlock.appendChild(Loading());
    }
    return tgImg;
}

function removeContentBlock(tgImage){
    if (tgImage.contentBlock){
        let fzzParent = tgImage.contentBlock.parentElement
        fzzParent.appendChild(tgImage.element);
        fzzParent.removeChild(tgImage.contentBlock);
    }
}

function removeLoading (tgImg) {
    if (!window['fzz-loading']) {
        tgImg.contentBlock.querySelector('.fzz-loading').remove();
    }
    return tgImg;
}


function removeAllLoading(){
    window['fzz-loading'] = true;
    for (let loading of Array.from(document.querySelectorAll('.fzz-loading'))) {
        loading.remove();
    }
}
addEventListener('button will be drawn', removeAllLoading);
console.log("timeout "+LOADING_TIMEOUT);
setTimeout(removeAllLoading, LOADING_TIMEOUT);
