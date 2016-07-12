import {LOADING_GIPHIES} from 'constants';

export default class Loading extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            giphy: undefined
        };
    }

    componentDidMount () {
        this.setGiphy();
    }

    setGiphy () {
        this.setState({giphy: LOADING_GIPHIES[getRandomInt(0, LOADING_GIPHIES.length - 1)]});
    }

    render () {
        return <div className="loading">
            <div className="giphy" onClick={this.setGiphy.bind(this)} style={{
                backgroundImage: `url('http://i.giphy.com/${this.state.giphy}.gif')`
            }}></div>
            <h3>LOADING</h3>
        </div>;
    }

}

// from https://gist.github.com/kerimdzhanov/7529623

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//
