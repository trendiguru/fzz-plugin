/* globals React,ReactDOM */

import {getImageData} from '../modules/server';

import App from './view/app';

import {analytics} from '../modules/analytics_wrapper';

import {REQUESTS} from '../modules/devTools';

import {getDomainName} from '../modules/utils';

let publisherDomain;

REQUESTS.desktop = 0;

/*------ RENDER ------*/

function render (props) {
    props = props || {imageURL: '', items: []};
    return window.app = ReactDOM.render(React.createElement(App, props), document.getElementById('app'));
}

render();

/*------ MESSAGES ------*/

function close () {
    window.parent.postMessage('hide', '*');
    render();
}

document.getElementById('shadow').addEventListener('click', close);
addEventListener('app close', close);

addEventListener('message', msg => {
    //console.log('FZZ: iframe received message: ' + msg);
    if (window.app.props.imageURL !== msg.data.imageURL) {
        publisherDomain = getDomainName(msg.origin)[1];
        analytics.initializeInApp({refererDomain: window.location.hostname.replace('www.', ''), publisherDomain: publisherDomain.replace('www.', '')});
        getImageData(msg.data.imageURL).then(data => {
            render({imageURL: msg.data.imageURL, items: data.items});
        });
    }
});

/*------ ANALYTICS ------*/

analytics.track('App Loaded');

addEventListener('app opened', () => {
    analytics.track('App Opened');
    REQUESTS.desktop +=1;
});

addEventListener('result clicked', e => analytics.track('Result Clicked', {clickUrl: e.info.clickURL, imageURL: window.app.props.imageURL}));

addEventListener('tab clicked', e => analytics.track('Tab Clicked', {index: e.info.index}));