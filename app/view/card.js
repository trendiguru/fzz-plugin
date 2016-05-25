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
        return <article ref="card" onClick={this.click}>
            <a href={this.props.link}>
                <img src={this.props.cover} />
                {this.props.body.map(field => <span>{field}</span>)}
            </a>
        </article>;
    }
}

export default Card;
