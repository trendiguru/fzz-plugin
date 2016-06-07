export function searchPageImages (query) {
    console.log(query);
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${query}`, {
        mode: 'no-cors'
    }).then(res => res.json());
}
