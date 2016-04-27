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
import {getDomainName} from 'modules/utils';

let publisherDomain;
REQUESTS.desktop = 0;


/*------ RENDER ------*/

function close () {
    window.parent.postMessage('hide', '*');
    window.app = ReactDOM.render(React.createElement(App, {onMount: attachAnalytics, close: close}), document.getElementById('main'));
}

window.app = ReactDOM.render(React.createElement(App, {onMount: attachAnalytics, close: close}), document.getElementById('main'));

document.getElementById('shadow').addEventListener('click', close);

/*------ RECIEVE MESSAGES FROM MAIN ------*/

window.addEventListener('message', msg => {
    console.log('FZZ: iframe received message: ' + msg);
    if (window.app.props.imageURL !== msg.data.imageURL) {
        publisherDomain = getDomainName(msg.origin)[1];
        let imageURL = msg.data.imageURL;
        analytics.initializeInApp({refererDomain: window.location.hostname.replace("www.", ""), publisherDomain: publisherDomain.replace("www.", "")});
        getImageData(msg.data.imageURL).then(data => {
            window.app = ReactDOM.render(
                React.createElement(App, {onMount: attachAnalytics, close: close, imageURL: msg.data.imageURL, items: data.items}),
                document.getElementById('main')
            );
            console.log(window.app.props);
        });
    }
});

/*------ ANALYTICS ------*/

function attachAnalytics () {
    analytics.track('App Loaded');   
    REQUESTS.desktop +=1;
    [].forEach.call(ReactDOM.findDOMNode(this).querySelectorAll('a'), a => {
        //alert(a.parentElement.title);
        a.addEventListener('click', () => analytics.track('Result Clicked', {clickUrl: a.href, imageURL: imageURL}));
    });
}
