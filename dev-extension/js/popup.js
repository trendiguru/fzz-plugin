
import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';
import Box from './box';
import {domready} from 'modules/utils';
import {setToChromeStorage, postMsg, preferences} from 'modules/chrome-manipulation';
//import 'extensions/chrome_dev/assets/css/popup.scss';// TODO: learn a little bit more about scss

const BACKGROUND_COLOR = 'rgba(1,2,3,1)';
const BORDER_COLOR = 'blue';
const BORDER_WIDTH = 4;

const FUNCTION_LIST = {
    //setToChromeStorage: setToChromeStorage,
    updateStacks: updateStacks,
    updateDevTools: updateDevTools,
    reloadPage: reloadPage,
    coloredReport: coloredReport
};

window.devTools = {};

domready(() => {
    initPage();
});

//----------------------------------------------------------------
Object.assign(window, {setToChromeStorage, updateStacks, updateDevTools, reloadPage, coloredReport});
//----------------------------------------------------------------

function initPage() {
    let b1 = new Box({
        title: 'CONFIGURATION TABLE',
        styleString: {
            height: 'auto',
            top: '-7px'
        }
    });
    b1.fillConfigTable(preferences, updateConfig);
    let b2 = new Box({
        title: 'FUNCTION LIST',
        styleString: {
            height: 'auto',
            top: '-7px'
        }
    });
    b2.fillFunctionsList(FUNCTION_LIST);
    ReactDOM.render((new Block({
        children: [b1.render(), b2.render()],
        styleString: {
            height: 'auto',
            borderColor: 'black',
            borderWidth: '1px',
            borderStyle: 'solid'
        }
    })).render(), createWrapper());
    updateDevTools();
    updateStacks();
}


function updateStacks() {
    postMsg('stacks').then((reply) => {
        window.STACKS = reply;
    });
}

function updateDevTools() {
    postMsg('devTools').then((reply) => {
        window.devTools = reply;
    });
}

function reloadPage() {
    postMsg('reload page');
}

function coloredReport() {
    postMsg('colored report');
}

function rewriteLocalStorage() {
    postMsg('rewrite storage');
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

function updateConfig() {
    let inputs = Array.from(document.getElementsByTagName('INPUT'));
    console.debug(inputs);
    let index = 0;
    let promises = [];
    //be carefull here!
    for (let key in preferences) {
        promises.push(setToChromeStorage(key, inputs[index].value));
        index++;
    }
    Promise.all(promises).then(rewriteLocalStorage());
}
