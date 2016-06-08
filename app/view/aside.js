/* globals React */

const {Component} = React;

class Aside extends Component {
    constructor (props) {
        super(props);
        this.state = {
            img: {
                width: 0,
                height: 0
            }
        };
        this.load(props);
    }
    get height () {
        if (this.refs.root) {
            return this.refs.root.clientHeight;
        }
    }
    componentWillReceiveProps (props) {
        this.load(props);
    }
    load (props) {
        let img = new Image();
        img.src = props.imageURL;
        img.onload = () => this.setState({img});
    }
    render () {
        return <aside ref="root" style={{
            width: this.state.img.width / this.state.img.height * this.height,
            backgroundImage: `url('${this.props.imageURL}')`
        }}></aside>;
    }
}

export default Aside;
