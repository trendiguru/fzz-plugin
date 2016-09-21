/* globals React,ReactDOM */

import App from './view/app';
import './analytics';
import store from './store';

/*------ RENDER ------*/
console.log("start");
ReactDOM.render(
    React.createElement(App, {close}),
    document.getElementById('app')
);

/*------ MESSAGES ------*/
addEventListener('message', msg => {
    if (store.images.state.imageURL !== msg.data.imageURL) {
        store.dispatch({
            type: 'newImageURL',
            payload: msg.data.imageURL,
        });
        store.dispatch({
            type: 'getImageData',
        });
    }
});

document.getElementById('shadow').addEventListener('click', close);
addEventListener('app close', close);
console.log("end");

function close () {
    window.parent.postMessage('hide', '*');
    store.dispatch({
        type: 'clearImageData'
    });
}
