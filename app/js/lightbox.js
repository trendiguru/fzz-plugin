/* globals React */

class Lightbox extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div id="lightbox">
                {this.props.children}
                <footer>Powered by Fazz™</footer>
            </div>
        );
    }
}

export default Lightbox;