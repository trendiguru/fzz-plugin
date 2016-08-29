/* eslint-disable no-unused-vars */
import store from '../store';
import Lightbox from './lightbox';
import {TabView, Tab} from './tab';
import Assemblage from './assemblage';
import Card from './card';
import Aside from './aside';
import Loading from './loading';
import Labels from './labels';
import Price from './price';

const {Component} = React;

class App extends Component {
    constructor (props) {
        super(props);
        store.rerender('images', this);
    }
    componentDidMount () {
        dispatchEvent(new Event('app opened', {bubbles: true}));
    }
    close (e) {
        this.props.close();
        dispatchEvent(new Event('app closed', {bubbles: true}));
    }
    render () {
        let {data, imageURL} = store.state.images;
        let TabNodes = [];
        let buttons = [
            {
                icon: 'feedback',
                action: () => location.href = 'mailto:feedback@trendiguru.com'
            },
            {
                icon: 'close',
                action: this.close.bind(this)
            }
        ];
        let NavButtonNodes = buttons.map((button, i) => <button key={i} id={button.icon} onClick={button.action}>
            <i className="md-icon">{button.icon}</i>
        </button>);
        if (data === undefined) {
            TabNodes = <Loading />;
        }
        else if (data === null) {
            TabNodes = <div>No data found for this image</div>;
        }
        else if (data.labels) {
            TabNodes = <Labels labels={data.labels}/>;
        }
        else if (data.items) {
            TabNodes = data.items.map(
                (item, i) => <Tab key={i} title={item.category}>
                    <Assemblage
                        col={5}
                        minWidth={180}
                        margin={8}
                        marginBottom={70}
                        template={img => <Card link={img.link} image={img.src}>
                            <Price data={img.price} />
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
            <Aside imageURL={imageURL} />
            <TabView
                aside={NavButtonNodes}
            >{TabNodes}</TabView>
        </Lightbox>;
    }
}

export default App;
