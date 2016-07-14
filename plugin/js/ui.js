import {UISettings, PID, COOKIE_NAME} from 'constants';
import Cookies from 'js-cookie';

export default function getUI (uiComponentOptions) {
    let UI = {};
    let uiCookie = Cookies.get(COOKIE_NAME);
    uiCookie = uiCookie && JSON.parse(uiCookie);

    if(!uiCookie) {
        uiCookie = generateCookie();
        Cookies.set(COOKIE_NAME, uiCookie);
    }

    for (let component in uiCookie) {
        let componentOptions = uiComponentOptions[component];
        if(componentOptions){
            UI[component] = componentOptions[uiCookie[component]];
        }
        else {
            //This means it's an old cookie referencing old UI components.
            uiCookie = generateCookie();
            Cookies.set(COOKIE_NAME, uiCookie);
            UI[component] = uiComponentOptions[uiCookie[component]];
        }
    }

    return UI;
}

function generateCookie(){
    let uiCookie = {};
    let uiSettings = UISettings(PID);

    for (let component in uiSettings) {
        uiCookie[component] = getRandom(uiSettings[component]);
    }

    return uiCookie;
}

function getRandom (probabilityDict) {
    let cumulative = 0;
    let cumulativeProbs = Object.keys(probabilityDict).map(
        key => [key, cumulative += probabilityDict[key]]
    );
    let rand = Math.random();
    for (let [key, cumProb] of cumulativeProbs) {
        if (rand < cumProb) {
            return key;
        }
    }
}
