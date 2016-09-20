/* globals React,ReactDOM */

import App from './view/app';
import './analytics';
import store from './store';

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
            store.dispatch({
                type: 'getImageData',
            });
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
