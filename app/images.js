import {Collection} from 'delux';
import analytics from './analytics';

let images = new Collection({imageURL: ''});

images.on('newImageURL', (images, action) => Object.assign({}, images, {
    imageURL: action.payload
}));

images.on('addImageData', (images, action) => Object.assign({}, images, {data: action.payload}));

images.on('getImageData', (images, action) => {
    console.log('getImageData is processed');
    console.log('action');
    console.log(action);
    console.log('images');
    console.log(images);
    return Object.assign({}, images, {data: action.payload})});

images.on('clearImageData', (images) => Object.assign({}, images, {
    imageURL: '',
    data: undefined
}));

export default images;
