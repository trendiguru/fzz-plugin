/* eslint-disable console */

import {API_URL} from 'constants';
import preferences from 'preferences';
import {STACKS} from 'modules/devTools';
import URLStore from './urlstore';
import {Query} from './utils';

let urlStore = new URLStore;

export let smartCheckRelevancy = urlStore.append.bind(urlStore);

export function getImageData(imageUrl) {
    return fetch(API_URL + '?' + Query.stringify({imageUrl, pid: preferences.pid}))
    .then(res => res.json());
}
