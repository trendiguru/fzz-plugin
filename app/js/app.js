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
    }
    render () {
        if (this.props.imageURL && this.props.items) {
            var CategoryNodes = this.props.items.map((item, i) => {
                var src = item.similar_results.map(result => {
                    return {src: result.images.XLarge, href: result.clickUrl, price: result.price.price, brand: result.brand};
                });
                return (
                    <Tab key={i} title={item.category}>
                        <Assemblage
                            src={src}
                            x={this.state.width}
                            col={this.state.col}
                            onMount={this.props.onMount}
                            template={img => <a href={img.href} target="_blank">
                                                <img src={img.src} />
                                                <div>
                                                    <span className="price">{img.price}</span>
                                                    <span className="brand">{img.brand}</span>
                                                </div>
                                            </a>}
                        />
                    </Tab>
                );
            });
            return (
                <Lightbox>
                    <aside style={{backgroundImage: 'url("' + this.props.imageURL + '")'}}></aside>
                    <TabView
                        nav={
                            <aside>
                                {(this.props.close ? <button id="close" onClick={this.props.close}><i className="md-icon">cancel</i></button> : '')}
                            </aside>
                        }
                        >{CategoryNodes}</TabView>
                </Lightbox>
            );
        } else {
            return <Lightbox><Loading /></Lightbox>;
        }
    }
}

export default App;