/* globals React */

class Lightbox extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div id="lightbox">
                <a href="http://fazz.co"><img src="img/fazz_trump.svg" id="logo" /></a>
                {this.props.children}
            </div>
        );
    }
}

export default Lightbox;