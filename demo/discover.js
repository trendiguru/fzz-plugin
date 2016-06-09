/* globals React */

const {Component} = React;

export default class Discover extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        let ImageNodes = this.props.images.map((src, i) => <img key={i} onClick={() => this.props.search(src)} src={src} />);
        return <div id="discover">
                <article>
                    <h1>
                        Shop the Look from Any Picture
                    </h1>
                </article>
                {ImageNodes}
            </div>;
    }
}
