export default class Aside extends React.Component {
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
    static get propTypes () {
        return {
            imageURL: React.PropTypes.string.isRequired
        };
    }
    get height () {
        if (this.refs.root) {
            return this.refs.root.clientHeight;
        }
        else {
            return 0;
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
