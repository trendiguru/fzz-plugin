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

window.devTools = {};

domready(() => {
    let b = new Box({childNum:126});
    b.fillTable(preferences);
    ReactDOM.render(b.render(), createWrapper());
    updateDevTools();
});

//test------------------------------------------------------------
window.setToChromeStorage = setToChromeStorage;
window.updateStacks = updateStacks;
window.updateDevTools = updateDevTools;
window.reloadPage = reloadPage;
window.updatePreference = updatePreferences;
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
