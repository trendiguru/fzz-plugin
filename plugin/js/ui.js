import {UISettings, PID} from 'constants';
import Cookies from 'js-cookie';

export default function UIgetter (elements) {
    let uiCookie = Cookies.get('ui'),
        uiElements = {};

    if (uiCookie) {
        uiCookie = JSON.parse(uiCookie);
    }
    else {
        let uiSettings = UISettings(PID);
        for (let element in uiCookie) {
            uiCookie[element] = getRandom(uiSettings[element]);
        }
        Cookies.set('ui', uiCookie);
    }

    for (let element in uiCookie) {
        uiElements[element] = elements[element][uiCookie[element]];
    }

    return uiElements;
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
