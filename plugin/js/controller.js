/* eslint-disable no-console */

import {MIN_IMG_WIDTH, MIN_IMG_HEIGHT} from 'constants';
import imagesLoaded from 'imagesloaded';
import {smartCheckRelevancy} from 'modules/server';
import TGImage from './tgimage';
import {devTools} from 'modules/devTools';
let s = devTools.STACKS;

class Controller {
    constructor (callback) {
        Object.assign(this, {
            relevantImgs: {},
            irrelevantImgs: {},
            irrelevantElements: {},
            callback
        });
    }
    process (el) {
        s.set("process", el);
        return Promise.resolve(el)
            .then(el => new TGImage (el))
            .then(this.ensureNew.bind(this))
            .then(this.isLoaded.bind(this))
            .then(this.ensureSuspicious.bind(this))
            .then(smartCheckRelevancy.bind(this))
            .then(
            relevantImg => {
                let date = new Date();
                console.log(`${date}: Found Relevant!: ${relevantImg.url}`);
                this.relevantImgs[relevantImg.url] = relevantImg;
                s.set("relevantImg", relevantImg);
                this.callback(relevantImg);
            },
            irrelevantImg => {
                // This will only have a url if it returns from smartRelevacyCheck as irrelevant,
                // the others will arrive as {name: nnn, element:eee} error objects.
                if (irrelevantImg.url) {
                    this.irrelevantImgs[irrelevantImg.url] = irrelevantImg;
                    s.set("irrelevantImg", irrelevantImg);
                } else {
                    this.logIrrelevant(irrelevantImg);
                }
            });
    }
    logIrrelevant(error) {
        //console.log('reached logIrrelevant');
        let errName = error.name;
        let errElement = error.element;
        let errorCounts = this.irrelevantElements[errName] = this.irrelevantElements[errName] || {};
        let errorCountforElem = errorCounts[errElement] = errorCounts[errElement] || 0;
        errorCountforElem += 1;
        s.set("logIrrelevant", error);
    }

    ensureNew(tgImg) {
        if (tgImg.url in this.relevantImgs || tgImg.url in this.irrelevantImgs) {
            throw {
                name: 'Not a New Image',
                element: tgImg
            };
        }
        s.set("ensureNew");
        return tgImg;
    }

    isLoaded(tgImg) {
        return new Promise(function (resolve, reject) {
            let iml = imagesLoaded(tgImg.element, {
                background: tgImg.background
            });
            iml.on('done', () => resolve(tgImg));
            iml.on('fail', () => reject({
                name: 'Image Load Failed',
                element: tgImg
            }));
        });
    }

    ensureSuspicious(tgImg) {
        let rect = tgImg.element.getBoundingClientRect();
        if (rect.height >= MIN_IMG_HEIGHT && rect.width >= MIN_IMG_WIDTH) {
            return tgImg;
        } else {
            throw {
                name: 'Too Small',
                element: tgImg
            };
        }
    }
}

export default Controller;
