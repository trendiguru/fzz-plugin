/* eslint-disable console */

import {API_URL, API, PID} from 'constants';
import {STACKS} from 'modules/devTools';
import URLStore from './urlstore';
import {Query} from './utils';

export let urlStore = new URLStore;

export let smartCheckRelevancy = urlStore.append.bind(urlStore);

export function getImageData(imageUrl) {
    return fetch(API_URL + '?' + Query.stringify({imageUrl, pid: PID}))
    .then((res) =>{
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    });
}
