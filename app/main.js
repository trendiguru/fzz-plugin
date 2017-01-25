/* globals React,ReactDOM */

import App from './view/app';
import './analytics';
import store from './store';

store.use((action) => {
    if (action.type === 'newImageURL') {
        dispatchEvent(CustomEvent('app opened', {bubbles: true}));
    }
});

/*------ RENDER ------*/
ReactDOM.render(
    React.createElement(App, {close}),
    document.getElementById('app')
);

/*------ MESSAGES ------*/
addEventListener('message', ({data: {imageURL, data}}) => {
    if (store.images.state.imageURL !== imageURL) {
        store.dispatch({
            type: 'newImageURL',
            payload: imageURL,
        });
        if (typeof data === 'object') {
            store.dispatch({
                type: 'addImageData',
                payload: data
            });
        }
        else {
            // store.dispatch({
            //     type: 'getImageData',
            // });
            getImageData(images.imageURL)
            .then(data => {
                if (data && data.items) {
                    data.items = data.items.map(item => {
                        item.similar_results = item.similar_results.map(result => analytics.appendResultLink(result));
                        return item;
                    });
                }
                return data;
            })
            .then(data => Object.assign({}, images, {data}))
        }
    }
});

document.getElementById('shadow').addEventListener('click', close);
addEventListener('app close', close);

function close () {
    window.parent.postMessage('hide', '*');
    store.dispatch({
        type: 'clearImageData'
    });
}
