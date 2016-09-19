export default class Aside extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            img: {
                width: 1,
                height: 1
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
            return 1;
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
        let {img} = this.state;
        return <aside ref="root" style={{
            width: img.width / img.height * this.height,
            backgroundImage: `url('${this.props.imageURL}')`
        }}></aside>;
    }
}
