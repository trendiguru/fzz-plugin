import Block from './block';
import React from 'react';
import ReactDOM from 'react-dom';
import {domready} from 'modules/utils';
import {setToChromeStorage, postMsg, postResponse} from 'modules/chromeManipulation';
//import 'extensions/chrome_dev/assets/css/popup.scss'; TODO: learn a little bit more about scss

const BACKGROUND_COLOR = 'rgba(1,2,3,1)';
const BORDER_COLOR = 'blue';
const BORDER_WIDTH = 4;

window.devTools = {};

let props = {
    styleString: {
        fontSize: '50%',
        width: '100%',
        height: '100%',
        lineHeight: '100%',
        left: '-' + BORDER_WIDTH + 'px',
        top: '-' + BORDER_WIDTH + 'px',
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
        resize: 'both',
        borderStyle: 'solid',
        position: 'relative',
    }
};

domready(() => {
    ReactDOM.render(createBoard(15).render(), createWrapper());
    window.setToConfig = (key, value)=>{
            setToChromeStorage(key, value);
    };
});

//test------------------------------------------------------------
window.setToChromeStorage = setToChromeStorage;
window.updateStacks = updateStacks;
window.updateDevTools = updateDevTools;
window.reloadPage = reloadPage;
window.updatePreference = updatePreferences;
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

function createWrapper() {
    let wrapper = document.createElement('DIV');
    wrapper.className = 'react-container';
    console.log(document.body);
    console.log(document.body);
    document.body.appendChild(wrapper);
    wrapper.style.height = '100%';
    return wrapper;
}

function createBoard(rowNum) {
    let l = [];
    for (let i = 0; i < rowNum; i++) {
        let rowProps = {
            styleString: {
                fontSize: '50%',
                height: (100.0 / rowNum) + '%',
                width: '100%',
                left: '-' + BORDER_WIDTH + 'px',
                top: '-' + BORDER_WIDTH + 'px',
                backgroundColor: BACKGROUND_COLOR,
                borderColor: BORDER_COLOR,
                borderWidth: BORDER_WIDTH,
                resize: 'both',
                borderStyle: 'solid',
                position: 'relative',
            }
        };
        l.push((new Block(rowProps)).render());
    }
    props.children = l;
    return new Block(props);
}
