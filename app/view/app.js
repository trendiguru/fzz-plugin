/* eslint-disable no-unused-vars */
/* global React,ReactDOM */

import Lightbox from './lightbox';
import {TabView, Tab} from './tab';
import Assemblage from './assemblage';
import Card from './card';

const {Component} = React;

class App extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        ReactDOM.findDOMNode(this.refs.app).dispatchEvent(new Event('app opened', {bubbles: true}));
    }
    close (e) {
        e.target.dispatchEvent(new Event('app closed', {bubbles: true}));
    }
    render () {
        let TabNodes = this.props.items.map(
            (item, i) => <Tab key={i} title={item.category}>
                <Assemblage
                    col="5"
                    margin="8"
                    template={img => <a href=""><img src={img.src} style={{width: '100%'}} /><div className="tag"><span className="price">{img.price.price}</span><span className="brand">{img.brand}</span></div></a>}
                    src={item.similar_results.map(result => {
                        result.src = result.images.XLarge;
                        return result;
                    })}
                />
            </Tab>
        );
        return <Lightbox ref="app">
            <aside style={{backgroundImage: `url('${this.props.imageURL}')`}}></aside>
            <TabView>{TabNodes}</TabView>
        </Lightbox>;
    }
}

export default App;
