/* globals Cookies */

import {UI as UI_SETTINGS} from 'constants';
import 'js-cookie';

function getUI (elements) {

    let ui = Cookies.get('ui');

    if (ui) {
        ui = JSON.parse(ui);
    } else {
        ui = UI_SETTINGS[location.host] || UI_SETTINGS.default;
        for (let element in ui) {
            ui[element] = getRandom(element);
        }
        Cookies.set('ui', JSON.stringify(ui));
    }

    for (let element in ui) {
        ui[element] = elements[element][ui[element]];
    }

    return ui;

}

function getRandom (dictionary) {
    let cumulative = 0,
        mapped = Object.keys(dictionary).map(key => [key, cumulative += dictionary[key]]),
        i = Math.random();
    for (let set of mapped) {
        if (i < set[1]) {
            return set[0];
        }
    }
}

export default getUI;
