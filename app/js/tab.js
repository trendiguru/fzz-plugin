/* globals React */

class Tab extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return <section style={{left: (this.props.index - this.props.selected) * 100 + '%'}}>{this.props.children}</section>;
    }
}

class TabView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {selected: 0};
    }
    select (i) {
        this.setState({selected: i});
    }
    render () {
        let TitleNodes = [];
        let TabNodes = this.props.children.map((tab, i) => {
            TitleNodes.push(<li key={i} onClick={this.select.bind(this, i)}>tab.props.title</li>);
            return <Tab key={i} index ={i} selected={this.state.selected}></Tab>;
        });
        return (
            <div>
                <nav><ul>{TitleNodes}</ul></nav>
                <main>{TabNodes}</main>
            </div>
        );
    }
}

export {Tab, TabView};