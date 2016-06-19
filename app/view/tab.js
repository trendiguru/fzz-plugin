export class TabView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {tab: 0};
    }
    setCategory (i) {
        this.setState({tab: i});
        let e = new Event('tab clicked', {bubbles: true});
        e.info = {
            title: this.props.children[i].props.title
        };
        this.refs.root.dispatchEvent(e);
    }
    render () {
        let {children} = this.props,
            TitleNodes = [],
            TabNodes = [];
        children = Array.isArray(children) ? children : [children];
        children.forEach((tab, i) => {
            TitleNodes.push(<li key={i} onClick={this.setCategory.bind(this, i)} className={this.state.tab == i ? 'select' : ''}>{tab.props.title}</li>);
            TabNodes.push(React.cloneElement(tab, {index: i, select: this.state.tab}));
        });
        let liWidth = 100 / children.length || 0;
        return <div ref="root">
            <nav>
                <ul>
                    {TitleNodes}
                    <label className="indicator" style={{left: this.state.tab * liWidth + '%', width: liWidth + '%'}}></label>
                </ul>
                <aside>{this.props.aside}</aside>
            </nav>
            <main style={{position: 'relative'}}>{TabNodes}</main>
        </div>;
    }
}

export class Tab extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return <section style={{width: '100%', left: (this.props.index - this.props.select) * 100 + '%', top: 0, position: 'absolute'}}>{this.props.children}</section>;
    }
}
