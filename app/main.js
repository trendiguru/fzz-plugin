/* globals React,ReactDOM */
import App from './view/app';
// import './analytics';
import analytics from './analytics';
import {getImageData} from 'modules/server';
import images from 'app/images';

/*------ RENDER ------*/
ReactDOM.render(
    React.createElement(App, {close, images}),
    document.getElementById('app')
);

/*------ MESSAGES ------*/
addEventListener('message', ({data: {imageURL, data}}) => {
    if (images.imageURL !== imageURL) {
        images.imageURL = imageURL;
        dispatchEvent(CustomEvent('app opened', {bubbles: true}));
        if (typeof data === 'object') {
            images.data = data;
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
                    if (images.imageURL === imageURL){
                    images.data = data;
                }
            }).catch((err)=>{console.debug(err)});
        }
    }
});

document.getElementById('shadow').addEventListener('click', close);
addEventListener('app close', close);

function close () {
    window.parent.postMessage('hide', '*');
    images.data=undefined;
    images.imageURL = '';
}
