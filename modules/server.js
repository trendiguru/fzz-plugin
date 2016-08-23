/* eslint-disable console */

import {API_URL, PID} from 'constants';
import {STACKS} from 'modules/devTools';
import URLStore from './urlstore';
import {Query} from './utils';

let urlStore = new URLStore;

export let smartCheckRelevancy = urlStore.append.bind(urlStore);

export function getImageData(imageUrl) {
    return fetch(API_URL + '&pid='+PID+'&' + Query.stringify({
        imageUrl
    }))
    .then(res => res.json());
}
