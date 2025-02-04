import {LOADING, APP} from 'constants';
import UI from 'modules/ui';
import Lightbox from './lightbox';
import {TabView, Tab} from './tab';
import Assemblage from './assemblage';
import Card from './card';
import Aside from './aside';
import Loading from './loading';
import Labels from './labels';
import Price from './price';
import mobxReact from 'mobx-react';

const {observer} = mobxReact;


let ui = new UI ({loading: LOADING.IMAGES, classname: APP.CLASSNAME});

let App = observer(class App extends React.Component {
    static get propTypes () {
        return {
            close: React.PropTypes.func.isRequired
        };
    }
    constructor (props) {
        super(props);
    }
    close () {
        this.props.close();
        dispatchEvent(CustomEvent('app closed', {bubbles: true}));
    }
    render () {
        let {data, imageURL} = this.props.images;
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
            TabNodes = [<Loading key="loading" images={ui.loading} />];
        }
        else if (data === null) {
            TabNodes = [<div>No data found for this image</div>];
        }
        else if (data.labels) {
            TabNodes = [<Labels key="labels" labels={data.labels}/>];
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
        return <Lightbox className={ui.classname}>
            <Aside imageURL={imageURL} />
            <TabView
                aside={NavButtonNodes}
            >{TabNodes}</TabView>
        </Lightbox>;
    }
});

export default App;
