/* globals React */
import giphy from 'modules/giphy';
const {Component} = React;

export default class Labels extends Component {
    constructor (props) {
        super(props);
        this.state = {
            labels: []
        };
    }
    componentDidMount () {
        let {labels} = this.props;
        Promise.all(Object.keys(labels).map(label => giphy(label)))
        .then(responses => this.setState({
            labels: responses.map(response => ({
                query: response.query,
                giphy: response,
                percentage: labels[response.query]
            }))
        }));
    }
    render () {
        let LabelNodes = this.state.labels.map(label => {return <div>
            <img height={92} src={label.giphy.data[0].images.original.url} style={{
                float: 'left'
            }} />
            {label.query}
            <div style={{width: label.percentage * 100, height: 4, background: 'pink'}}></div>
        </div>;});
        return <div>{LabelNodes}</div>;
    }
}
