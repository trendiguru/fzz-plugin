export default function giphy (query) {
    return fetch(`http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${query}`)
    .then(res => res.json())
    .then(res => {
        res.query = query;
        return res;
    });
}
