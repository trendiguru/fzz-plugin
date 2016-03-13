/* globals React */

import Assemblage from './assemblage';

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
            var Categories = this.props.items.map((item, i) => {
                    var src = item.similar_results.map(result => {
                        return result.images.XLarge;
                    });
                    return (
                        <section key={i} className={(i === this.state.category ? 'select' : '')} style={{left: (i - this.state.category) * 100 + '%'}}>
                            <Assemblage src={src} x={this.state.width} col={this.state.col} />
                        </section>
                    );
                }),
                CategoryList = this.props.items.map((item, i) => {
                    return <li key={i} onClick={this.setCategory.bind(this, i)}>{item.category}</li>;
                });
            return (
                <div id="lightbox">
                <aside style={{backgroundImage: 'url("' + this.props.imageURL + '")'}}></aside>
                <nav>
                    <ul>{CategoryList}</ul>
                    <div id="highlight" style={{left: this.state.category * 10 + 'em'}}></div>
                </nav>
                <main>{Categories}</main>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default App;