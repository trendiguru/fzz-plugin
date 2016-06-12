/* globals React */

const {Component} = React;

export default class Searchbox extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return <div id="searchbox" className={this.props.className}>
            <input ref="searchbox" type="text" placeholder="Image URL" />
            <button onClick={() => this.props.search(this.refs.searchbox.value)}>search</button>
        </div>;
    }
}
