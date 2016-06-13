/* globals React */

import 'whatwg-fetch';
import App from 'app/view/app.js';
import Discover from './discover';
import Searchbox from './search';
const {Component} = React;

export default class Demo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            component: Discover,
            components: {
                'Discover': {
                    props: {
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
                    }
                },
                'App': {props: {}}
            }
        };
    }
    close () {
        this.setState(state => {
            state.component = Discover;
            state.components.App.props = {};
            return state;
        });
    }
    search (url) {
        this.setState(state => {
            state.component = App;
            state.components.App.props = {imageURL: url};
            return state;
        });
        getImageData(url).then(data => {
            data.imageURL = url;
            data.close = this.close.bind(this);
            this.setState(state => {
                state.component = App;
                state.components.App.props = data;
                return state;
            });
        });
    }
    render () {
        let {components, component} = this.state,
            ComponentNode;
        if (component) {
            ComponentNode = React.createElement(component, components[component.name].props);
        }
        return <div>
            <img id="logo" className={Object.keys(this.state.components.App.props).length ? 'min' : ''} src="logo.svg" />
            <Searchbox className={Object.keys(this.state.components.App.props).length ? 'min' : ''} search={this.search.bind(this)} />
            {ComponentNode}
        </div>;
    }
}

function getImageData (url) {
    return fetch('http://api.fazz.co/images?imageUrl=' + url)
    .then(res => res.json())
    .then(data => {
        if (data.people.length) {
            let items = [];
            for (let people of data.people) {
                items = [items, ...people.items];
            }
            data.items = items;
        }
        return data;
    });
}
