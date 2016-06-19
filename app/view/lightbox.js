export default class Lightbox extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return <div id="lightbox">
            {this.props.children}
        </div>;
    }
}
