import {extension} from 'modules/cross-extension';
const CURRENT_SCRIPT_ID = 'fzz-script';

export default class FzzDataAttributes {
    constructor () {
        Object.assign(this, {
            pid: 'dev',
            api: extension ? 'nd' : 'pd',
            whitelist: '*'
        });
        let attributes = []
        if (document.currentScript) {
            attributes = Array.from(document.currentScript.attributes);
        }else{
            //IE: in case there are more than 1 fzz-script => will get the attributes from the first one.
            let currentScript = document.getElementById(CURRENT_SCRIPT_ID);
            attributes = Array.from((currentScript)?currentScript.attributes:[]);
        }
        for (let attribute of attributes){
            if (attribute.name.search('data-') == 0) {
                this[attribute.name.substr(5)] = attribute.value;
            }
        }
    }
}