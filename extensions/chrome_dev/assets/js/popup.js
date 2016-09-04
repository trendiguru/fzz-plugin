import Block from './block';
import React from 'react';
import ReactDOM from 'react-dom';
import Box from './box'
import {domready} from 'modules/utils';
import {setToChromeStorage, postMsg, postResponse} from 'modules/chromeManipulation';
//import 'extensions/chrome_dev/assets/css/popup.scss';// TODO: learn a little bit more about scss
import preferences from 'preferences';

console.log(preferences);

const BACKGROUND_COLOR = 'rgba(1,2,3,1)';
const BORDER_COLOR = 'blue';
const BORDER_WIDTH = 4;

const FUNCTION_LIST = {
    setToChromeStorage: setToChromeStorage,
    updateStacks: updateStacks,
    updateDevTools: updateDevTools,
    reloadPage: reloadPage,
    updatePreferences: updatePreferences,
    coloredReport: coloredReport
};

window.devTools = {};

domready(() => {
    let b1 = new Box({title: 'CONFIGURATION TABLE',styleString:{ position:'static'}});
    b1.fillConfigTable(preferences, ()=>{console.log("do not forget to build here function")});
    let b2 = new Box({title: 'FUNCTION LIST' ,styleString:{ position:'static'}});
    b2.fillFunctionsList(FUNCTION_LIST);
    ReactDOM.render((new Block({children: [b1.render(),b2.render()]})).render(), createWrapper());
    updateDevTools();
});

//test------------------------------------------------------------
window.setToChromeStorage = setToChromeStorage;
window.updateStacks = updateStacks;
window.updateDevTools = updateDevTools;
window.reloadPage = reloadPage;
window.updatePreferences = updatePreferences;
window.coloredReport = coloredReport;
//----------------------------------------------------------------

function updateStacks(){
    postMsg('stacks').then((reply)=>{window.STACKS = reply;});
}

function updateDevTools(){
    postMsg('devTools').then((reply)=>{window.devTools = reply;});
}

function reloadPage(){
    postMsg('reload page');
}

function updatePreferences(){
    postMsg('update preferences');
}

function coloredReport(){
    postMsg('colored report');
}

function createWrapper() {
    let wrapper = document.createElement('DIV');
    wrapper.className = 'react-container';
    console.log(document.body);
    console.log(document.body);
    document.body.appendChild(wrapper);
    wrapper.style.height = '100%';
    return wrapper;
}
