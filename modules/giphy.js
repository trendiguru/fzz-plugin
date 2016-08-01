import {GIPHY} from 'constants';

export default {
    search (query) {
        return fetch(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY.API_KEY}&q=${query}`)
        .then(res => res.json())
        .then(res => {
            res.query = query;
            return res;
        });
    },
    GIF (id) {
        return `http://i.giphy.com/${id}.gif`;
    }
};
