/* globals React,ReactDOM */

import App from './view/app';
import Analytics from 'modules/analytics_wrapper';
import {REQUESTS} from 'modules/devTools';
import {Query} from 'modules/utils';
import {getImageData} from 'modules/server';

//let publisherDomain;
let analytics = new Analytics('app', Query.parse(location.search));

REQUESTS.desktop = 0;

/*------ RENDER ------*/

function render (props) {
    props = props || {imageURL: ''};
    return window.app = ReactDOM.render(
        React.createElement(App, Object.assign({close}, props)),
        document.getElementById('app')
    );
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
    if (window.app.props.imageURL !== msg.data.imageURL) {
        render({imageURL: msg.data.imageURL});
        getImageData(msg.data.imageURL).then(data => {
            if (data && data.items) {
                data.items = data.items.map(item => {
                    item.similar_results = item.similar_results.map(result => analytics.appendResultLink(result));
                    return item;
                });
            }
            return data;
        })
        .then(data => render({imageURL: msg.data.imageURL, data}));
        // publisherDomain = getLocation(msg.origin).hostname.replace('www.', '');
    }
});

/*------ ANALYTICS ------*/

//publisherDomain = getLocation(document.referrer).hostname.replace('www.', '');

analytics.track('App Loaded');

addEventListener('app opened', () => {
    analytics.track('App Opened');
    REQUESTS.desktop +=1;
});

// addEventListener('result clicked', e => analytics.track('Result Clicked', {clickUrl: e.info.clickURL, imageURL: window.app.props.imageURL}));

addEventListener('tab set', e => analytics.track('Category Clicked', {title: e.info.title}));
