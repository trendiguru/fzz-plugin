export default class API {
    constructor (api_url) {
        Object.assign(this, {api_url});
    }
    get (image_url) {
        return fetch(`${this.api_url}?imageUrl=${image_url}`).then(res => res.json());
    }
    post (image_urls) {
        return fetch(this.api_url, {
            method: 'POST',
            body: JSON.stringify({
                pageUrl: location.href,
                imageList: image_urls
            })
        }).then(res => res.json());
    }
}
