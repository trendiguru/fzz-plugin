export default class Loading extends React.Component {

    static get propTypes () {
        return {
            images: React.PropTypes.array
        };
    }

    constructor (props) {
        super(props);
        this.state = {
            image: undefined
        };
    }

    componentDidMount () {
        this.setRandomImage();
    }

    setRandomImage () {
        this.setState({
            image: randomElementFromArray(this.props.images)
        });
    }

    render () {
        return <div className="loading">
            <div className="giphy" onClick={this.setRandomImage.bind(this)} style={{
                backgroundImage: `url('${this.state.image}')`
            }}></div>
            <h3>LOADING</h3>
        </div>;
    }

}

function randomElementFromArray (array) {
    return array[getRandomInt(0, array.length - 1)];
}

// from https://gist.github.com/kerimdzhanov/7529623

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//
