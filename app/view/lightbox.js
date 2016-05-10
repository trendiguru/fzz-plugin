/* globals React */

const {Component} = React;

class Lightbox extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return <div id="lightbox">
            {this.props.children}
        </div>;
    }
}

export default Lightbox;