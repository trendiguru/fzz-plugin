/* globals React, ReactDOM */

// import domready from 'ext/domready';
import {getImageData} from 'modules/server';
import {getParameterByName} from 'modules/utils';

// Analytics

import {analytics} from 'modules/analytics_wrapper';

// React

import App from './app';

/*------ RENDER ------*/

window.app = ReactDOM.render(React.createElement(App, {onMount: attachAnalytics}), document.getElementById('main'));

/*------ RECIEVE DATA FROM SERVER ------*/

let imageURL = getParameterByName('imageURL');

getImageData(imageURL).then(data => {
    console.log('got data');
    window.app = ReactDOM.render(
        React.createElement(App, {onMount: attachAnalytics, imageURL: imageURL, items: data.items}),
        document.getElementById('main')
    );
});

/*------ ANALYTICS ------*/

function attachAnalytics () {
    
    analytics.initializeInApp();
    analytics.track('App Loaded');

    [].forEach.call(ReactDOM.findDOMNode(this).querySelectorAll('a'), a => {
        a.addEventListener('click', () => analytics.track('Result Clicked'));
    });
}