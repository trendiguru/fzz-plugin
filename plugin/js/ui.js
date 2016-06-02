import {UISettings, PID} from 'constants';
import Cookies from 'js-cookie';

export default function UIFactory (uiComponentOptions) {
    let UI = {};
    let uiCookie = Cookies.get('fzz_ui');
    uiCookie = uiCookie && JSON.parse(uiCookie);

    console.log('UICOOKIE1: ');
    console.log(uiCookie, !uiCookie);

    if(!uiCookie) {
        console.log('NOT UICOOKIE');
        uiCookie = generateCookie();
        Cookies.set('fzz_ui', uiCookie);
    }

    console.log('UICOOKIE2: ');
    console.log(uiCookie);
    //
    for (let component in uiCookie) {
        let componentOptions = uiComponentOptions[component];
        if(componentOptions){
            UI[component] = componentOptions[uiCookie[component]];
        }
        else {
            //This means it's an old cookie referencing old UI components.
            uiCookie = generateCookie();
            Cookies.set('fzz_ui', uiCookie);
            UI[component] = uiComponentOptions[uiCookie[component]];
        }
    }

    console.log('UI: ');
    console.log(UI);

    return UI;
}

function generateCookie(){
    let uiCookie = {};
    let uiSettings = UISettings(PID);

    console.log('UISETTINGS: ');
    console.log(uiSettings);

    for (let component in uiSettings) {
        uiCookie[component] = getRandom(uiSettings[component]);
    }

    return uiCookie;
}

function getRandom (probabilityDict) {
    let cumulative = 0;
    let cumulativeProbs = Object.keys(probabilityDict).map(
        key => [key, cumulative += probabilityDict[key]]);
    let rand = Math.random();
    for (let [key, cumProb] of cumulativeProbs) {
        if (rand < cumProb) {
            return key;
        }
    }
}
