/* globals React */

class Lightbox extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div id="lightbox">
                <a href="http://fazz.co" target="_blank" id="credit">
                    Powered By: <img src="img/fazz_trump.svg" />
                </a>
                {this.props.children}
            </div>
        );
    }
}

export default Lightbox;