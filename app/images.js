import {Collection} from 'delux';
import {getImageData} from 'modules/server';
import analytics from './analytics';

let images = new Collection({imageURL: ''});

images.on('newImageURL', (images, action) => images.imageURL = action.payload);

images.on('getImageData', (images) =>
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
    .then(data => images.data = data)
);

images.on('clearImageData', (images) => {
    images.imageURL = '';
    delete images.data;
});

export default images;
