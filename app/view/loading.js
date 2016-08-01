import {GIPHY} from 'constants';
import giphy from 'modules/giphy';

export default class Loading extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            giphy: undefined
        };
    }

    componentDidMount () {
        this.setRandomImage();
    }

    setRandomImage () {
        this.setState({
            giphy: randomElementFromArray(GIPHY.LOADING_IMAGES)
        });
    }

    render () {
        return <div className="loading">
            <div className="giphy" onClick={this.setRandomImage.bind(this)} style={{
                backgroundImage: `url('${giphy.GIF(this.state.giphy)}')`
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
