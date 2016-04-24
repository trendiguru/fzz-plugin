/* eslint-disable no-console */
/* globals React, ReactDOM */

import {getImageData} from 'modules/server';

// Analytics

import {analytics} from 'modules/analytics_wrapper';

// React

import App from './app';

analytics.initializeInApp();
analytics.track('iFrame Loaded');

/*------ RENDER ------*/

function render (props) {
    window.app = ReactDOM.render(React.createElement(App, Object.assign({close: close}, props)), document.getElementById('main'));
}

function close () {
    window.parent.postMessage('hide', '*');
    render();
}

render();

document.getElementById('shadow').addEventListener('click', close);

/*------ RECIEVE MESSAGES FROM MAIN ------*/

window.addEventListener('message', msg => {
    console.log('FZZ: iframe received message: ' + msg);
    if (window.app.props.imageURL !== msg.data.imageURL) {
        getImageData(msg.data.imageURL).then(data => {
            render({imageURL: msg.data.imageURL, items: data.items});
            console.log(window.app.props);
            [].forEach.call(ReactDOM.findDOMNode(window.app).querySelectorAll('.assemblage'), assemblage => assemblage.addEventListener('load', attachAnalytics));
        });
    }
});

/*------ ANALYTICS ------*/

function attachAnalytics (e) {
    [].forEach.call(e.target.querySelectorAll('a'), a => {
        a.addEventListener('click', () => {
            analytics.track('Result Clicked', {clickUrl: a.href});
            console.log('this is', this);
        });
    });
}