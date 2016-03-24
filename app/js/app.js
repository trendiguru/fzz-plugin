/* globals React */

import {TabView, Tab} from './tab';
import Assemblage from './assemblage';
import Lightbox from './lightbox';
import Loading from './loading';

let body = document.body;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width: (body.clientWidth - 160) * 0.66, col: 5, category: 0};
    }
    setCategory (int) {
        this.setState({category: int});
    }
    size () {
        if (body.clientWidth <= 640) {
            this.setState({col: 3});
            if (body.clientWidth < body.clientHeight)
                this.setState({width: body.clientWidth});
        } else {
            this.setState({width: (body.clientWidth - 160) * 0.66, col: 5});
        }
    }
    componentDidMount () {
        window.addEventListener('load', this.size.bind(this));
        window.addEventListener('resize', this.size.bind(this));
        this.props.onMount();
    }
    render () {
        if (this.props.imageURL && this.props.items) {
            var CategoryNodes = this.props.items.map((item, i) => {
                var src = item.similar_results.map(result => {
                    return {url: result.images.XLarge, link: result.clickUrl};
                });
                return (
                    <Tab key={i} title={item.category}>
                        <Assemblage src={src} x={this.state.width} col={this.state.col} />
                    </Tab>
                );
            });
            return (
                <Lightbox>
                    {(this.props.close ? <aside><button id="close" onClick={this.props.close}>x</button></aside> : '')}
                    <aside style={{backgroundImage: 'url("' + this.props.imageURL + '")'}}></aside>
                    <TabView>{CategoryNodes}</TabView>
                </Lightbox>
            );
        } else {
            return <Lightbox><Loading /></Lightbox>;
        }
    }
}

export default App;