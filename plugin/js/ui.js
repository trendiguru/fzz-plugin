import {UI} from 'constants';
import Cookies from 'js-cookie';

function getUI (elements) {

    let ui = JSON.parse(Cookies.get('ui'));

    if (!ui) {
        ui = new UI(location.host);
        for (let element in ui) {
            ui[element] = getRandom(ui[element]);
        }
        Cookies.set('ui', ui);
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
