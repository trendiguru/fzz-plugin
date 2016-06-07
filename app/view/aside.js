/* global React */

const {Component} = React;

class Aside extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return <aside style={{backgroundImage: `url('${this.props.imageURL}')`}}></aside>;
    }
}

export default Aside;
