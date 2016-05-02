/* eslint-disable no-console */
/* globals React, ReactDOM */

import {getImageData} from 'modules/server';
// Analytics
import {analytics} from 'modules/analytics_wrapper';
// React
import App from './app';
//developer tools
import {REQUESTS} from 'modules/devTools';
//utils
import {getLocation} from 'modules/utils';

let publisherDomain = getLocation(document.referrer).hostname.replace('www.', '');
let imageURL;

REQUESTS.desktop = 0;

analytics.initializeInApp({publisherDomain: publisherDomain}); 

/*------ RENDER ------*/

function close () {
    window.parent.postMessage('hide', '*');
    window.app = ReactDOM.render(React.createElement(App, {onMount:()=>{analytics.track('App Window Closed');}, close: close}), document.getElementById('main'));
}

window.app = ReactDOM.render(React.createElement(App, {onMount:()=>{analytics.track('App Loaded');}, close: close}), document.getElementById('main'));

document.getElementById('shadow').addEventListener('click', close);

/*------ RECIEVE MESSAGES FROM MAIN ------*/

window.addEventListener('message', msg => {
    //console.log('FZZ: iframe received message: ' + msg);
    if (window.app.props.imageURL !== msg.data.imageURL) {
        //publisherDomain = getLocation(msg.origin).hostname.replace('www.', '');
        imageURL = msg.data.imageURL;
        getImageData(msg.data.imageURL).then(data => {
            window.app = ReactDOM.render(
                React.createElement(App, {onMount: attachAnalytics, close: close, imageURL: msg.data.imageURL, items: data.items}),
                document.getElementById('main')
            );
            //console.log(window.app.props);
        });
    }
});

/*------ ANALYTICS ------*/

function attachAnalytics () {
    analytics.track('App Window Opened');
    REQUESTS.desktop +=1;
    [].forEach.call(ReactDOM.findDOMNode(this).querySelectorAll('a'), a => {
        //alert(a.parentElement.title);
        a.addEventListener('click', () => analytics.track('Result Clicked', {clickUrl: a.href, imageURL: imageURL}));
    });
}
