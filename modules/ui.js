import {UI as settings, PID, COOKIE_NAME} from 'constants';
import Cookies from 'js-cookie';
import {getRandom} from './utils';

export default class UI {
    constructor (options) {
        Object.assign(this, {options});
        for (let component in this.cookie) {
            let componentOptions = options[component];
            if (componentOptions) {
                this[component] = componentOptions[this.cookie[component]];
            }
            else {
                //This means it's an old cookie referencing old UI components.
                this.refresh();
                this[component] = options[this.cookie[component]];
            }
        }
    }
    get cookie () {
        let cookie = Cookies.get(COOKIE_NAME);
        if (cookie) {
            return JSON.parse(cookie);
        }
        else {
            return this.refresh();
        }
    }
    get settings () {
        for (let pid in settings) {
            if (pid === PID)
                return settings[pid];
        }
        return settings.__default;
    }
    refresh () {
        let uiCookie = {};
        for (let component in this.settings) {
            uiCookie[component] = getRandom(this.settings[component]);
        }
        Cookies.set(COOKIE_NAME, uiCookie);
    }
}
