import {UI as settings, COOKIE_NAME} from 'constants';
import Cookies from 'js-cookie';
import {getRandom} from './utils';
import preferences from 'preferences';

export default class UI {
    constructor (options) {
        if (!compareKeys(options, this.settings)) {
            throw new Error ('The UI section in constants must include all the used options');
        }
        for (let component in options) {
            this[component] = options[component][this.cookie[component]];
        }
    }
    get cookie () {
        let cookie = JSON.parse(Cookies.get(COOKIE_NAME) || null) || this.update();
        return compareKeys(this.options, cookie)
            ? cookie
            : this.update() && this.cookie;
    }
    update () {
        let uiCookie = {};
        for (let component in this.settings) {
            uiCookie[component] = getRandom(this.settings[component]);
        }
        Cookies.set(COOKIE_NAME, uiCookie);
        return uiCookie;
    }
    get settings () {
        let {__default} = settings;
        for (let pid in settings) {
            if (pid === preferences.pid) {
                return Object.assign({}, __default, settings[pid]);
            }
        }
        return __default;
    }
}

function compareKeys (model, tested) {
    for (let key in model) {
        if (!tested[key]) {
            return false;
        }
    }
    return true;
}
