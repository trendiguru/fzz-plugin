/* eslint-disable no-console */
/* globals React, ReactDOM */

import {getImageData} from 'modules/server';

// Analytics

import {analytics} from 'modules/analytics_wrapper';

// React

import App from './app';

/*------ RENDER ------*/

let app = ReactDOM.render(React.createElement(App, {onMount: attachAnalytics}), document.querySelector('div'));

/*------ RECIEVE MESSAGES FROM MAIN ------*/

window.addEventListener('message', msg => {
    console.log('FZZ: iframe received message: ' + msg);
    if (app.state.imageURL !== msg.data.imageUrl) {
        getImageData(msg.data.imageUrl).then(data => {
            app = ReactDOM.render(
                React.createElement(App, {onMount: attachAnalytics, imageURL: msg.data.imageURL, items: data.items}),
                document.querySelector('div')
            );
        });
    }
});

/*------ ANALYTICS ------*/

function attachAnalytics () {

    analytics.initializeInApp();

    let main = document.querySelector('div');
    let nav = document.querySelector('nav');

    main.addEventListener('scroll', () => {analytics.track('Scrolled in App');});

    [].forEach.call(nav.querySelectorAll('li'), tab => {
        tab.addEventListener('click', () => {analytics.track('Scrolled in App');});
    });

    [].forEach.call(main.querySelectorAll('article'), article => {
        article.addEventListener('click', () => {analytics.track('Scrolled in App');});
    });

}