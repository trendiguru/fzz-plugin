/* globals React */

var body = document.body;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {columns: 5, category: 0};
    }
    setCategory (int) {
        this.setState({category: int});
    }
    size () {
        this.forceUpdate();
        if (body.clientWidth <= 640)
            this.setState({columns: 3});
        else
            this.setState({columns: 5});
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.items) {
            var items = [],
                itemProcesses = nextProps.items.length;
            nextProps.items.forEach((item, j) => {
                items[j] = {
                    results: [],
                    category: item.category
                };
                var resultProccesses = item.similar_results.length;
                item.similar_results.forEach((result, i) => {
                    var img = new Image();
                    img.addEventListener('load', () => {
                        img.proportion = img.height / img.width;
                        items[j].results[i] = img;
                        resultProccesses--;
                        if (!resultProccesses)
                            itemProcesses--;
                        if (!itemProcesses)
                            this.setState({items: items});
                    });
                    img.src = result.images.XLarge;
                });
            });
            window.addEventListener('load', this.size.bind(this));
            window.addEventListener('resize', this.size.bind(this));
            if (typeof this.props.onMount === 'function') {
                this.props.onMount();
            }
        }
    }
    render () {
        if (this.props.imageURL && this.state.items) {
            if (body.clientWidth <= 640 && body.clientWidth < body.clientHeight)
                var width = body.clientWidth;
            else
                width = (body.clientWidth - 160) * 0.66;
            var Categories = [];
            this.state.items.forEach(() => Categories.push([]));
            var CategoryList = this.state.items.map((item, k) => {
                var images = [],
                    index = [];
                for (var i = 0; i < Math.ceil(item.results.length / this.state.columns); i++) {
                    index.push([]);
                }
                item.results.forEach((img, i) => {
                    var r = 0, j = i;
                    while (j >= this.state.columns) {j -= this.state.columns; r++;}
                    img.row = r;
                    img.index = j;
                    index[img.row][img.index] = img;
                    img.width = width / this.state.columns;
                    img.height = img.proportion * (width / this.state.columns);
                    img.top = 0;
                    var row = img.row;
                    while (row) {
                        img.top += width / this.state.columns * index[row - 1][img.index].proportion;
                        row--;
                    }
                    images[i] = img;
                    Categories[k].push(<img key={Math.random() + img.src} src={img.src} style={{width: img.width, height: img.height, top: img.top, left: img.width * img.index}} />);
                });
                return <li key={k} onClick={this.setCategory.bind(this, k)}>{item.category}</li>;
            });
            Categories = Categories.map((category, i) => {
                return <section key={i} className={(i === this.state.category ? 'select' : '')} style={{left: (i - this.state.category) * 100 + '%'}}>{category}</section>;
            });
            return (
                <div id="lightbox">
                <aside style={{backgroundImage: 'url("' + this.props.imageURL + '")'}}></aside>
                <nav>
                    <ul>{CategoryList}</ul>
                    <div id="highlight" style={{left: this.state.category * 10 + 'em'}}></div>
                </nav>
                <main>{Categories}</main>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default App;