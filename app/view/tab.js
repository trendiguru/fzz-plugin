/* globals React */

const {Component} = React;

export class TabView extends Component {
    constructor (props) {
        super(props);
        this.state = {tab: 0};
    }
    render () {
        let {children} = this.props,
            TitleNodes = [],
            TabNodes = [];
        children = Array.isArray(children) ? children : [children];
        children.forEach((tab, i) => {
            TitleNodes.push(<li key={i} onClick={this.setState.bind(this, {tab: i}, null)} className={this.state.tab == i ? 'select' : ''}>{tab.props.title}</li>);
            TabNodes.push(React.cloneElement(tab, {index: i, select: this.state.tab}));
        });
        let liWidth = 100 / children.length + '%' || 0;
        return <div>
            <nav>
                <ul>
                    {TitleNodes}
                    <label className="indicator" style={{left: this.state.tab * liWidth, width: liWidth}}></label>
                </ul>
            </nav>
            <main style={{position: 'relative'}}>{TabNodes}</main>
        </div>;
    }
}

export class Tab extends Component {
    constructor (props) {
        super(props);
    }
    click () {
        let click = new Event('tab clicked', {bubbles: true});
        click.info = {
            tabIndex: this.props.index
        };
        this.refs.tab.dispatchEvent(click);
    }
    render () {
        return <section ref="tab" onClick={this.click} style={{width: '100%', left: (this.props.index - this.props.select) * 100 + '%', top: 0, position: 'absolute'}}>{this.props.children}</section>;
    }
}