/* eslint-disable no-console */
/* globals React, ReactDOM */

import {getImageData} from 'modules/server';

// Analytics

import {analytics} from 'modules/analytics_wrapper';

// React

import App from './app';

/*------ RENDER ------*/

function close () {window.parent.postMessage('hide', '*');}

let app = ReactDOM.render(React.createElement(App, {onMount: attachAnalytics, close: close}), document.getElementById('main'));

document.getElementById('shadow').addEventListener('click', close);

/*------ RECIEVE MESSAGES FROM MAIN ------*/

window.addEventListener('message', msg => {
    console.log('FZZ: iframe received message: ' + msg);
    if (app.props.imageURL !== msg.data.imageURL) {
        getImageData(msg.data.imageURL).then(data => {
            app = ReactDOM.render(
                React.createElement(App, {onMount: attachAnalytics, close: close, imageURL: msg.data.imageURL, items: data.items}),
                document.getElementById('main')
            );
            console.log(app.props);
        });
    }
});

/*------ ANALYTICS ------*/

function attachAnalytics () {
    
    console.log('AATTACH ALL THE ANALYTICS!');
    analytics.initializeInApp();
    analytics.track('App Loaded');
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