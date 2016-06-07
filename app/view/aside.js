/* global React */

const {Component} = React;

class Aside extends Component {
    constructor (props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
    }
    componentDidMount () {
        let img = new Image();
        img.src = this.props.imageURL;
        img.onload = () => {
            let {width, height} = img;
            this.setState({width, height});
            this.forceUpdate();
        };
    }
    render () {
        let {height, width} = this.state;
        return <aside style={{width, height, backgroundImage: `url('${this.props.imageURL}')`}}></aside>;
    }
}

export default Aside;
