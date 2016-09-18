export class TabView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {tab: 0};
    }
    static get propTypes () {
        return {
            children: React.PropTypes.array.isRequired,
            aside: React.PropTypes.array,
            select: React.PropTypes.number,
        };
    }
    setTab (i) {
        this.setState({tab: i});
        let e = Object.assign(new Event('tab set', {bubbles: true}), {
            info: {
                title: this.props.children[i].props.title
            }
        });
        dispatchEvent(e);
    }
    componentWillReceiveProps () {
        this.setState({tab: 0});
    }
    render () {
        let children = toArray(this.props.children);
        let TitleNodes = [];
        let TabNodes = [];
        let liWidth = 100 / children.length || 0;
        children.forEach((tab, i) => {
            TitleNodes.push(<li key={i} onClick={this.setTab.bind(this, i)} className={this.state.tab == i ? 'select' : ''}>{tab.props.title}</li>);
            TabNodes.push(React.cloneElement(tab, {key: i, index: i, select: this.state.tab}));
        });
        console.log(`translateX(${this.state.tab * 100}%)`);
        return <div ref="root">
            <nav>
                <ul>
                    {TitleNodes}
                    <label className="indicator" style={{
                        width: liWidth + '%',
                        transform: `translateX(${this.state.tab * 100}%)`,
                        webkitTransform: `translateX(${this.state.tab * 100}%)`
                    }}></label>
                </ul>
                <aside>{this.props.aside}</aside>
            </nav>
            <main style={{position: 'relative'}}>{TabNodes}</main>
        </div>;
    }
}

export function Tab (props) {
    return <section style={{
        width: '100%',
        transform: `translateX(${(props.index - props.select) * 100}%)`,
        webkitTransform: `translateX(${(props.index - props.select) * 100}%)`,
        top: 0,
        position: 'absolute'
    }}>{props.children}</section>;
}

Tab.propTypes = {
    index: React.PropTypes.number,
    select: React.PropTypes.number,
    children: React.PropTypes.element
};

let toArray = (array) => Array.isArray(array) ? array : [array];
