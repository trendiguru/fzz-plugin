import {Collection} from 'delux';
import {getImageData} from 'modules/server';
import analytics from './analytics';

let images = new Collection({imageURL: ''});

images.on('newImageURL', (images, action) => Object.assign({}, images, {
    imageURL: action.payload
}));

images.on('addImageData', (images, action) => Object.assign({}, images, {data: action.payload}));

images.on('getImageData', (images) =>
    getImageData(images.imageURL)
    .then(data => {
        if (data && data.items) {
            /*------------crazy tab------------*/
            window.parent.postMessage({key: 'results', results: data.items}, "*");
            /*------------------------------------*/
            data.items = data.items.map(item => {
                item.similar_results = item.similar_results.map(result => analytics.appendResultLink(result));
                return item;
            });
        }
        return data;
    })
    .then(data => Object.assign({}, images, {data}))
);

images.on('clearImageData', (images) => Object.assign({}, images, {
    imageURL: '',
    data: undefined
}));

export default images;
