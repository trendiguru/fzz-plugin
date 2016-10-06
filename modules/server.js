/* eslint-disable console */

import {API_URL, API, PID} from 'constants';
import {STACKS} from 'modules/devTools';
import URLStore from './urlstore';
import {Query} from './utils';

export let urlStore = new URLStore;

export let smartCheckRelevancy = urlStore.append.bind(urlStore);

export function getImageData(imageUrl) {
    return fetch(API_URL + '?' + Query.stringify({imageUrl, pid: PID})).then((res) =>{
        try{
            if (res.status===500){
                throw {name: '500!'};
            }
            return res.json();
        }catch(e){
            console.error(e);
            return null;
        }
    });
}
