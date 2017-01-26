/* globals React,ReactDOM */
import App from './view/app';
// import './analytics';
import analytics from './analytics';
import store from './store';
import {getImageData} from 'modules/server';

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
            getImageData(imageURL)
            .then(data => {
                if (data && data.items) {
                    data.items = data.items.map(item => {
                        item.similar_results = item.similar_results.map(result => analytics.appendResultLink(result));
                        return item;
                    });
                }
                return data;
            })
            .then((data)=>{
                /*
                    This part of code is asynchronous=>  store.images.state.imageURL
                    is not equals to the store.images.state.imageURL at the beginning
                    of event-listener's callback for more information please see comments
                    in #issue269 (MVC-promises-queue issue) or/and in release information of
                    the release 1.3.9.
                 */
                    if (store.images.state.imageURL === imageURL){
                        store.dispatch({
                        type: 'getImageData',
                        payload: data
                    });
                }
            }).catch((err)=>{console.debug(err)});
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
    store.queued = Promise.resolve();
}
