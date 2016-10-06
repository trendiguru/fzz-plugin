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
        console.log(data);
        if (data && data.items) {
            data.items = data.items.map(item => Object.assign(item, {
                similar_results: item.similar_results.map(result => analytics.appendResultLink(result))
            }));
        }
        return data;
    })
    .then(data => Object.assign({}, images, {data}))
    .catch(() => Object.assign({}, images, {data: null}))
);

images.on('clearImageData', (images) => Object.assign({}, images, {
    imageURL: '',
    data: undefined
}));

export default images;
