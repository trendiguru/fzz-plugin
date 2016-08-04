import giphy from 'modules/giphy';

export default class Labels extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            labels: []
        };
    }
    componentDidMount () {
        let {labels} = this.props;
        Promise.all(Object.keys(labels).map(label => giphy.search(label)))
        .then(responses => this.setState({
            labels: responses.map(response => ({
                query: response.query,
                giphy: response,
                percentage: labels[response.query]
            }))
        }));
    }
    render () {
        let LabelNodes = this.state.labels.map((label, i) => <div className="label" key={i}>
            <div className="img" style={{backgroundImage: `url(${label.giphy.data[0].images.original.url})`}}></div>
            <div className="tag">
                <h4>{label.query}</h4>
                <div className="graph">
                    <div className="bar" style={{width: label.percentage * 100 + '%'}}></div>
                </div>
            </div>
        </div>);
        return <div>{LabelNodes}</div>;
    }
}
