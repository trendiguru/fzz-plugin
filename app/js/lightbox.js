/* globals React */

class Lightbox extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div id="lightbox">
                {this.props.children}
                <footer>
                    <a href="fazz.co">
                        <img src="img/fazz_trump.svg" />
                    </a>
                </footer>
            </div>
        );
    }
}

export default Lightbox;