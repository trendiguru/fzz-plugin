/* eslint-disable no-console */
import {ENV} from 'constants';
import {extension, storage} from 'modules/cross-extension';

export let preferences = {
    pid: 'dev',
    api: 'nd',
};

export function updateLocalStorage(){
    /* the function returns promise which will be processed when all
    commponents of "preferences" obj will be taken from chrome storage*/
    console.log(ENV);
    if (ENV === 'DEV'){
        let promisesList = [];
        for (let key in preferences){
            promisesList.push(new Promise((resolve, reject)=>{
                storage.local.get(key, (obj) => {
                    console.info('constant attribute was changed by developer', obj);
                    if (obj) {
                        console.log(key);
                        console.log(preferences[key]);
                        localStorage.setItem(key, preferences[key]);
                        console.info(key+" : "+preferences[key]+" was stored into local storage");
                        resolve();
                    }else{reject();}
                });
            }));
        }
        return Promise.all(promisesList);
    }
    //if we are not in dev mode => return promise that ends emediatly:
    return Promise.resolve();
}
