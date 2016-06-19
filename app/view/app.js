/* eslint-disable no-unused-vars */
import Lightbox from './lightbox';
import {TabView, Tab} from './tab';
import Assemblage from './assemblage';
import Card from './card';
import Aside from './aside';
import Loading from './loading';
import Labels from './labels';

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
        let TabNodes = [],
            NavButtonNodes = [
                {
                    icon: 'feedback',
                    action: () => location.href = 'mailto:feedback@trendiguru.com'
                },
                {
                    icon: 'close',
                    action: this.close.bind(this)
                }
            ].map((button, i) => <button key={i} id={button.icon} onClick={button.action}>
                <i className="md-icon">{button.icon}</i>
            </button>);
        if (this.props.items) {
            TabNodes = this.props.items.map(
                (item, i) => <Tab key={i} title={item.category}>
                    <Assemblage
                        col={5}
                        minWidth={180}
                        margin={8}
                        marginBottom={70}
                        template={img => <Card link={img.link} image={img.src} labels={{price: img.price.price, brand: img.brand}} />}
                        src={
                            item.similar_results.map(result => {
                                result.src = result.images.XLarge;
                                return result;
                            }
                        )}
                    />
                </Tab>
            );
        }
        else if (this.props.labels) {
            TabNodes = [<Labels labels={this.props.labels}/>];
        }
        else {
            TabNodes = [<Loading />];
        }
        return <Lightbox ref="app">
            <Aside imageURL={this.props.imageURL} />
            <TabView
                aside={NavButtonNodes}
            >{TabNodes}</TabView>
        </Lightbox>;
    }
}

export default App;
