/* globals React */

let {Component} = React;

class Card extends Component {
    constructor (props) {
        super(props);
    }
    click () {
        let event = new Event('result clicked', {bubbles: true});
        event.data = {
            result: this.props.link
        };
        this.refs.card.dispatchEvent(event);
    }
    render () {
        let {labels} = this.props;
        let LabelNodes = Object.keys(labels).map(label => <span className="label">{labels[label]}</span>);
        return <a ref="card" href={this.props.link} onClick={this.click} targe="_blank">
            <img src={this.props.image} />
            <div className="tag">{LabelNodes}</div>
        </a>;
    }
}

export default Card;
