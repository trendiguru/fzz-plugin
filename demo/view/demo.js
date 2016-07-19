/* globals React */

import 'whatwg-fetch';
import API from '../api.js';
import App from 'app/view/app.js';
import Discover from './discover';
import Searchbox from './search';
const {Component} = React;

const API_URLS = [
    'https://extremeli.trendi.guru/api/images',
    'http://api.fazz.co/images?imageUrl='
];

export default class Demo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            component: Discover,
            api_index: 0,
            api: new API(API_URLS[0]),
            components: {
                Discover: {
                    images: [
                        'https://fazz.co/img/demo/gettyimages-490421970.jpg',
                        'https://fazz.co/img/demo/gettyimages-492504614.jpg',
                        'https://fazz.co/img/demo/gettyimages-494515956.jpg',
                        'https://fazz.co/img/demo/gettyimages-490421970.jpg',
                        'https://fazz.co/img/demo/gettyimages-492504614.jpg',
                        'https://fazz.co/img/demo/gettyimages-494515956.jpg',
                        'https://fazz.co/img/demo/gettyimages-490421970.jpg',
                        'https://fazz.co/img/demo/gettyimages-492504614.jpg',
                        'https://fazz.co/img/demo/gettyimages-494515956.jpg'
                    ],
                    search: this.search.bind(this)
                },
                App: {}
            }
        };
    }
    close () {
        this.setState(state => {
            state.component = Discover;
            state.components.App = {};
            return state;
        });
    }
    search (url) {
        this.setState(state => {
            state.component = App;
            state.components.App = {
                imageURL: url,
                close: this.close.bind(this)
            };
            return state;
        });
        let sources = {
            get: this.state.api.get(url),
            post: this.state.api.post([url])
        };
        Promise.race([sources.get, sources.post])
        .then(res => new Promise ((resolve, reject) => {
            if (res.relevancy_dict) { // Is it a POST result?
                if (res.relevancy_dict[url]) { // Is it relevant?
                    resolve(sources.get);
                }
                else {
                    reject();
                }
            }
            else { // It's a GET result
                if (res !== null) { //
                    resolve(res);
                }
                else { // try posting it and check agian
                    sources.post.then(res => {
                        if (res.relevancy_dict[url]) {
                            this.state.api.get(url).then(resolve);
                        }
                        else {
                            reject();
                        }
                    });
                }

            }
        }))
        .then(data => {
            this.setState(state => Object.assign(state.components.App, {data}));
        })
        .catch(() => this.setState(state => {
            state.components.App.data = null;
        }));
    }
    render () {
        let {components, component} = this.state,
            ComponentNode;
        if (component) {
            ComponentNode = React.createElement(component, components[component.name]);
        }
        return <div>
            <img id="logo" className={Object.keys(components.App).length ? 'min' : ''} src="logo.svg" />
            <Searchbox className={Object.keys(components.App).length ? 'min' : ''} search={this.search.bind(this)} />
            <div>
                <label onClick={() => this.setState({
                    api_index: !this.state.api_index,
                    api: API_URLS[!this.state.api_index]
                })} className={this.state.api_index ? 'checked': ''}></label>
            </div>
            {ComponentNode}
        </div>;
    }
}
