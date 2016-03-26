/* globals React, ReactDOM */

import domready from 'ext/domready';
import {getImageData} from 'modules/server';
import {getParameterByName} from 'modules/utils';

// Analytics

import {analytics} from 'modules/analytics_wrapper';

// React

import App from './app';

/*------ RENDER ------*/

let app = ReactDOM.render(React.createElement(App, {onMount: attachAnalytics}), document.getElementById('main'));

/*------ RECIEVE DATA FROM SERVER ------*/

let imageURL = getParameterByName('imageURL');

getImageData(imageURL).then(data => {
    console.log('got data');
    app = ReactDOM.render(
        React.createElement(App, {onMount: attachAnalytics, imageURL: imageURL, items: data.items}),
        document.getElementById('main')
    );
});

/*------ ANALYTICS ------*/

function attachAnalytics () {

//    analytics.initializeInApp();
//
//    let main = document.querySelector('div');
//    let nav = document.querySelector('nav');
//
//    main.addEventListener('scroll', () => {analytics.track('Scrolled in App');});
//
//    [].forEach.call(nav.querySelectorAll('li'), tab => {
//        tab.addEventListener('click', () => {analytics.track('Scrolled in App');});
//    });
//
//    [].forEach.call(main.querySelectorAll('article'), article => {
//        article.addEventListener('click', () => {analytics.track('Scrolled in App');});
//    });

}