/* eslint-disable no-unused-vars */
/* global React,ReactDOM */

// import getMainColor from 'modules/getMainColor';
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
        this.props.close();
        e.target.dispatchEvent(new Event('app closed', {bubbles: true}));
    }
    render () {
        let TabNodes = this.props.items.map(
            (item, i) => <Tab key={i} title={item.category}>
                <Assemblage
                    col="5"
                    margin="8"
                    template={img => <Card link={img.clickUrl} image={img.src} labels={{price: img.price.price, brand: img.brand}} />}
                    src={
                        item.similar_results.map(result => {
                            result.src = result.images.XLarge;
                            return result;
                        }
                    )}
                />
            </Tab>
        ),
            NavButtonNodes = [
                {
                    icon: 'feedback',
                    action: () => location.href = 'mailto:feedback@trendiguru.com'
                },
                {
                    icon: 'close',
                    action: this.close.bind(this)
                }
            ].map(button => <button id={button.icon} onClick={button.action}><i className="md-icon">{button.icon}</i></button>);

        return <Lightbox ref="app">
            <aside style={{backgroundImage: `url('${this.props.imageURL}')`}}></aside>
            <TabView
                aside={NavButtonNodes}
            >{TabNodes}</TabView>
        </Lightbox>;
    }
}

export default App;
