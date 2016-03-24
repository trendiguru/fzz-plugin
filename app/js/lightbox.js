/* globals React */

class Lightbox extends React.Componet {
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