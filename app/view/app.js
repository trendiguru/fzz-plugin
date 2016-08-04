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
        dispatchEvent(new Event('app opened', {bubbles: true}));
    }
    close (e) {
        this.props.close();
        dispatchEvent(new Event('app closed', {bubbles: true}));
    }
    render () {
        let {data} = this.props;
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
        if (data === undefined) {
            TabNodes = <Loading />;
        }
        else if (data === null) {
            TabNodes = <div>No data found for this image</div>;
        }
        else if (data.lables) {
            TabNodes = <Labels labels={this.props.labels}/>;
        }
        else if (data.items) {
            TabNodes = this.props.data.items.map(
                (item, i) => <Tab key={i} title={item.category}>
                    <Assemblage
                        col={5}
                        minWidth={180}
                        margin={8}
                        marginBottom={70}
                        template={img => <Card link={img.link} image={img.src}>
                            <span data-currency={img.price.currency} className="price">{img.price.price}</span>
                            <span className="brand">{img.brand}</span>
                        </Card>}
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
        return <Lightbox ref="app">
            <Aside imageURL={this.props.imageURL} />
            <TabView
                aside={NavButtonNodes}
            >{TabNodes}</TabView>
        </Lightbox>;
    }
}

export default App;
